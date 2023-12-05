import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import solImage from '../images/ensolarado.png';
import nubladoImage from '../images/nublado.png';
import parcialmenteNubladoImage from '../images/parcialmenteNublado.png';
import chuvaImage from '../images/chuva.png';
import tempestadeImage from '../images/tempestade.png';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [cidade, setCidade] = useState(null);
  const [estado, setEstado] = useState(null);
  const [weatherImage, setWeatherImage] = useState(null);

  useEffect(() => {
    user();
    fetchWeather();
    try{

      setWeatherImage(getWeatherImage(weatherCondition));

    } catch (err){
      console.log(err);
    }
    
  }, []);
  

  const user = async () => {

    try {
      const storedUser = await AsyncStorage.getItem('usuarioLogado');
      console.log(storedUser);

      if (storedUser) {
        const userData =  JSON.parse(storedUser);
        setLat(userData.latitude);
        setLong(userData.longitude);
        setCidade(userData.city);
        setEstado(userData.estado);

      }
    } catch(err){
      console.log("Nenhum usuário logado.")
    }
  }


  const fetchWeather = async () => {
    const options = {
      method: 'GET',
      url: 'https://weatherapi-com.p.rapidapi.com/current.json',
      params: { q: `${lat}, ${long}`, lang: 'pt'}, 
      headers: {
        'X-RapidAPI-Key': 'b06dd854ffmshf49039a0fa670e1p18dda0jsnc9a9db13289b',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
      },      
    };

    try {
      const response = await axios.request(options);
      setWeatherData(response.data);
      setWeatherImage(getWeatherImage(response.data.current.condition.text));
    } catch (error) {
      console.error('Erro ao obter dados da API de previsão do tempo', error);
    }
  };

  const getWeatherImage = (weatherCondition) => {
    switch (weatherCondition) {
      case 'Sol':
        return solImage;
      case 'Parcialmente Nublado':
        return parcialmenteNubladoImage;
      case 'Nublado':
      case 'Encoberto':
      case 'Neblina':
      case 'Nevoeiro':
      case 'Nevoeiro Gelado':
        return nubladoImage;
      case 'Chuva':
      case 'Possibilidade de chuva irregular':
      case 'Possibilidade de neve irregular':
      case 'Possibilidade de neve molhada irregular':
      case 'Possibilidade de chuvisco gelado irregular':
      case 'Nevasca':
      case 'Chuvisco irregular':
      case 'Chuvisco':
      case 'Chuvisco gelado':
      case 'Chuvisco forte gelado':
      case 'Chuva fraca irregular':
      case 'Chuva fraca':
      case 'Períodos de chuva moderada':
      case 'Chuva moderada':
      case 'Chuva fraca e gelada':
      case 'Chuva fraca com neve':
      case 'Queda de neve irregular e fraca':
      case 'Queda de neve fraca':
      case 'Queda de neve moderada e irregular':
      case 'Queda de neve moderada':
      case 'Granizo':
      case 'Aguaceiros fracos':
      case 'Aguaceiros moderados ou fortes':
      case 'Chuva torrencial':
      case 'Aguaceiros fracos com neve':
      case 'Aguaceiros fracos com granizo':
      case 'Chuva fraca irregular com trovoada':
      case 'Neve fraca irregular com trovoada':
        return chuvaImage;
      case 'Tempestade':
      case 'Possibilidade de Trovoada':
      case 'Rajadas de vento com neve':
      case 'Períodos de chuva forte':
      case 'chuva moderada ou forte com neve':
      case 'Chuva gelada moderada ou forte':
      case 'Chuva forte ou moderada com neve':
      case 'Queda de neve forte e irregular':
      case 'Neve intensa':
      case 'Aguaceiros moderados ou fortes com neve':
      case 'Aguaceiros moderados ou fortes com granizo':
      case 'Chuva moderada ou forte com trovoada':
      case 'Neve moderada ou forte com trovoada':
        return tempestadeImage;
      default:
        return null; // Imagem padrão ou nenhuma imagem
    }
  };
  
  if (!weatherData) {
    return <Text>Carregando...</Text>;
  }


  return (
    <View style={styles.square}>
      <View style={styles.weatherContainer}>
        <Text style={styles.cityText}>
          {cidade}, {estado}, Brasil
        </Text>
          <Image source={getWeatherImage(weatherImage)} style={{ width: 100, height: 100 }} />
        <Text style={styles.tempText}>
          {weatherData.current.temp_c}°C
        </Text>
        <Text style={styles.weatherText}>
          {weatherData.current.condition.text}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  weatherContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 0
  },
  weatherText: {
    fontSize: 20,
    color: '#000',
    marginBottom: 10,
  },
  tempText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
    cityText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  square: {
    width: 300,
    height: 300,
    backgroundColor: 'white',
    borderRadius: 20,
    marginBottom: 60,
},
});

export default Weather;
