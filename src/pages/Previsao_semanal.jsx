import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import WeeklyWeather from '../components/WeeklyWeather';
import Icon from 'react-native-vector-icons/Octicons';
import SideMenu from '../components/Menu';
import Weather from '../components/Weather';



export default function PrevSemanal({ navigation }) {

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

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.menuIcon}>
                <TouchableOpacity onPress={toggleMenu}>
                        <Icon name="three-bars" size={30} color='white'/>
                </TouchableOpacity>
            </View>
            <Text style={styles.todayText}>Hoje</Text>
            <Text style={styles.dateText}>{`${dayOfWeek}, ${dayOfMonth} de ${month}`}</Text>
            <Weather style={styles.weather}/>
            <WeeklyWeather />
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
    }
    });