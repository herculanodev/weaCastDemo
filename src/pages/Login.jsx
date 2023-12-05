import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const storedUser = await AsyncStorage.getItem(`userData_${username}`);
      console.log(storedUser);
      if (storedUser) {
        const userData = JSON.parse(storedUser); 
  
        if (username === userData.email && password === userData.password) {

          await AsyncStorage.setItem('usuarioLogado', storedUser);

          navigation.navigate('Home');
        } else {
          alert('Nome de usuário ou senha incorretos');
        }
      } else {
        alert('Usuário não encontrado');
      }
    } catch (error) {
      console.error('Erro ao autenticar:', error);
    }
  };
  
  
  const handleCadastro = () => {
    navigation.navigate('SignUp');
  }
  
  const handleGoogleLogin = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../images/imagem.png")}
          style={styles.logo}
        />
        
        <View style={styles.appNameContainer}>
          <Text style={styles.blueText}>Wea</Text>
          <Text style={styles.orangeText}>Cast</Text>
        </View>
      </View>

      <Text style={styles.label}>Nome de Usuário:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome de usuário"
        onChangeText={(text) => setUsername(text)}
        value={username}
      />

      <Text style={styles.label}>Senha:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.buttonSpacing}>
        <Text style={styles.orText}>ou</Text>
      </View>

      <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
        <Image
          source={require("../images/google-icon.png")} 
          style={styles.googleIcon}
        />
        <Text style={styles.googleButtonText}>Google</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleCadastro}>
        <Text style={styles.registerLink}>Registrar-se</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  logoContainer: {
    alignItems: 'center',
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
    marginBottom: 20,
    borderRadius: 5,
    color: '#000',
  },
  loginButton: {
    backgroundColor: '#759EFF',
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
