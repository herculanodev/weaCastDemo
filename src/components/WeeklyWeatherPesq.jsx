import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import solImage from '../images/ensolarado.png';
import nubladoImage from '../images/nublado.png';
import parcialmenteNubladoImage from '../images/parcialmenteNublado.png';
import chuvaImage from '../images/chuva.png';
import tempestadeImage from '../images/tempestade.png';

const WeeklyWeatherPesq = ({lat, long}) => {
  const [weatherData, setWeatherData] = useState(null);


useEffect(() => {
    user();
    if (lat !== null && long !== null) {
      fetchWeather();
    }
  }, [lat, long]);

  const user = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('usuarioLogado');
      console.log(storedUser);

      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setLat(userData.latitude);
        setLong(userData.longitude);
        setCidade(userData.city);
        setEstado(userData.estado);
      }
    } catch (err) {
      console.log("Nenhum usuário logado.")
    }
  };

  const fetchWeather = async () => {
    const options = {
      method: 'GET',
      url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
      params: {
        q: `${lat},${long}`,
        days: '4',
        lang: 'pt' 
        
      },
      headers: {
        'X-RapidAPI-Key': 'b06dd854ffmshf49039a0fa670e1p18dda0jsnc9a9db13289b',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      setWeatherData(response.data);
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
     
    }
  };
  

  if (!weatherData) {
    return <Text>Carregando...</Text>;
  }

  
  const weatherCondition = weatherData.current.condition.text;

  return (
    <View style={styles.container}>
      <View style={styles.forecastContainer}>
        {weatherData.forecast.forecastday.map((dayForecast, index) => (
          <View key={index} style={styles.dayContainer}>
            <Text style={styles.weatherText}>
              {dayForecast.date}
            </Text>
          <Image source={getWeatherImage(dayForecast.day.condition.text)} style={{ width: 50, height: 50 }} />
            <Text style={styles.tempText}>
              {dayForecast.day.avgtemp_c}°C
            </Text>
            <Text style={styles.weatherText}>
              {dayForecast.day.condition.text}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cityText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  forecastContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    },
  dayContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
    backgroundColor: 'white',
    width: 135,
    height: 135
  },
  weatherText: {
    fontSize: 13,
    color: 'blue',
    marginBottom: 5,
  },
  tempText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    flexWrap: 'wrap',
  },
});

export default WeeklyWeatherPesq;
