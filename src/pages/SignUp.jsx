import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import citiesData from '../db/cidades.json';
import estadosData from '../db/estados.json';
import CheckBox from '@react-native-community/checkbox';

export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [password, setPassword] = useState('');
  const [allowData, setAllowData] = useState(false);
  const [wantReceive, setWantReceive] = useState(false);
  const [cities, setCities] = useState([]);
  const [estados, setEstados] = useState([]);

  
  useEffect(() => {
    setCities(citiesData);
    setEstados(estadosData);
  }, []);



  const handleSignUp = async () => {
    try {
      const selectedCity = cities.find(item => item.nome === city);
      const selectedState = estados.find(item=>item.codigo_uf === selectedCity.codigo_uf);

      const userData = {
        name: name,
        email: email,
        phone: phone,
        city: city,
        latitude: selectedCity ? selectedCity.latitude : null,
        longitude: selectedCity ? selectedCity.longitude : null,
        estado: selectedState.nome,
        password: password,
        permite: allowData,
        receber: wantReceive,
      };
  
      const userKey = `userData_${email}`;
  
      await AsyncStorage.setItem(userKey, JSON.stringify(userData));
  
      alert('Cadastro realizado com sucesso');
      console.log(userData);
      navigation.navigate('Login');
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
    }
  };
  
  return (
    <View style={styles.container}>

       <Text style={styles.todayText}>Registre-se!</Text>

      <Text style={styles.label}>Nome:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        onChangeText={(text) => setName(text)}
        value={name}
      />

      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />

      <Text style={styles.label}>Telefone:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu telefone"
        onChangeText={(text) => setPhone(text)}
        value={phone}
      />

      <Text style={styles.label}>Cidade:</Text>
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

      <Text style={styles.label}>Senha:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />
      
      <Text style={styles.label}>Confirme sua senha:</Text>
      <TextInput
        style={styles.input}
        placeholder="Confirme sua senha"
        value={password}
        secureTextEntry={true}
      />

      <View style={styles.checkboxContainer}>
        <CheckBox
          value={allowData}
          onValueChange={setAllowData}
          style={styles.checkbox}
        />
        <Text style={styles.label}>Permito dados</Text>
      </View>
      
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={wantReceive}
          onValueChange={setWantReceive}
          style={styles.checkbox}
        />
        <Text style={styles.label}>Quero receber</Text>
      </View>


      <TouchableOpacity style={styles.loginButton} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#759EFF',
  },
  logoContainer: {
    alignItems: 'center',
  },
  todayText: {
    color: '#FFBF75',
    fontSize: 60,
    fontFamily: 'Inter',
    marginBottom: 0
},
  logo: {
    width: 200,
    height: 150,
    marginBottom: 0,
    alignContent: 'center',
  },
  appNameContainer: {
    flexDirection: 'row',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    alignSelf: 'center'    
  },
  blueText: {
    color: 'blue',
    fontSize: 56,
    fontWeight: 'bold',
    marginBottom: 70,
  },
  orangeText: {
    color: '#FFBF75',
    fontSize: 56,
    fontWeight: 'bold',
    marginBottom: 70,
  },
  label: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFBF75',
    width: '80%',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    color: '#000',
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
  googleButton: {
    backgroundColor: '#75C7FF',
    borderWidth: 2,
    borderColor: '#007bff',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    width: '60%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  googleButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  buttonSpacing: {
    marginVertical: 10,
  },
  orText: {
    color: '#fff',
    fontSize: 16,
  },
  registerLink: {
    color: '#fff',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
});
