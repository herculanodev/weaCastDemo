    import React, { useState, useEffect } from 'react';
    import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
    import Icon from 'react-native-vector-icons/Octicons';
    import SideMenu from '../components/Menu';
    import { Picker } from '@react-native-picker/picker';
    import citiesData from '../db/cidades.json';
    import estadosData from '../db/estados.json';
    import WeatherPesq from '../components/WeatherPesq';
    import WeeklyWeatherPesq from '../components/WeeklyWeatherPesq';

    export default function PesquisaCidade({ navigation }) {

        const currentDate = new Date();
        const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
        const months = [
        'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
        'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
        ];
        const dayOfWeek = days[currentDate.getDay()];
        const dayOfMonth = currentDate.getDate();
        const month = months[currentDate.getMonth()];
        const [isMenuOpen, setIsMenuOpen] = useState(false);

        const [city, setCity] = useState('');
        const [cities, setCities] = useState([]);
        const [estados, setEstados] = useState([]);
        const [latitude, setLat] = useState(null);
        const [longitude, setLong] = useState(null);
        const [estado, setEstado] = useState('');

        useEffect(() => {
            setCities(citiesData);
            setEstados(estadosData);
        }, []);

        const toggleMenu = () => {
            setIsMenuOpen(!isMenuOpen);
        };

        const closeMenu = () => {
            setIsMenuOpen(false);
        };

        const handleSelection = async () => {
            try {
            const selectedCity = cities.find(item => item.nome === city);
            const selectedState = estados.find(item=>item.codigo_uf === selectedCity.codigo_uf); 
            setLat(selectedCity.latitude);
            setLong(selectedCity.longitude);
            setEstado(selectedState.nome);
    

            } catch (error) {
            console.error('Erro ao selecionar:', error);
            }
        };

        return (
            <View style={styles.container}>
                <View style={styles.menuIcon}>
                    <TouchableOpacity onPress={toggleMenu}>
                            <Icon name="three-bars" size={30} color='white'/>
                    </TouchableOpacity>
                </View>
                <Text style={styles.dateText}>Selecione uma cidade:</Text>
                <Picker
                    style={styles.input}
                    selectedValue={city}
                    onValueChange={(itemValue) => setCity(itemValue)}
                >
                    <Picker.Item label="Selecione sua cidade" value="" />
                    {cities.map((item) => (
                    <Picker.Item key={item.codigo_ibge} label={item.nome} value={item.nome} />
                    ))}
                </Picker>

                <TouchableOpacity style={styles.loginButton} onPress={handleSelection}>
                    <Text style={styles.buttonText}>Pesquisar</Text>
                </TouchableOpacity>

                <WeatherPesq cidade={city} estado={estado} lat={latitude} long={longitude}/>
                <WeeklyWeatherPesq lat={latitude} long={longitude}/>

                <SideMenu isOpen={isMenuOpen} onClose={closeMenu} navigation={navigation} />
            </View>
        )};

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'black',
            alignItems: 'center',
            justifyContent: 'center',
        },
        menuIcon: {
            position: 'absolute',
            top: 50,
            left: 20,
        },
        todayText: {
            color: '#FFBF75',
            fontSize: 80,
            fontFamily: 'Inter',
            marginBottom: 0,
            marginRight: 140
        },
        dateText: {
            color: 'white',
            fontSize: 25,
            marginBottom: 20,
            marginRight: 60
        },
        weather: {
            borderRadius: 20,
        },
        loginButton: {
            backgroundColor: 'blue',
            borderRadius: 20,
            paddingVertical: 10,
            paddingHorizontal: 20,
            marginVertical: 10,
            width: '60%',
            justifyContent: 'center',
            alignItems: 'center',
        },
        input: {
            backgroundColor: '#FFBF75',
            width: '80%',
            padding: 10,
            marginBottom: 10,
            borderRadius: 5,
            color: '#000',
        },
        });