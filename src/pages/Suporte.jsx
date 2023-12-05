import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert} from 'react-native';
import Weather from '../components/Weather';
import Icon from 'react-native-vector-icons/Octicons';
import SideMenu from '../components/Menu';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Suporte({ navigation }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [text, setText] = useState('');


    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const saveTextToAsyncStorage = async () => {
        try {
          let ticketNumber = await AsyncStorage.getItem('ticketNumber');
          if (!ticketNumber) {
            ticketNumber = '1';
          } else {
            ticketNumber = String(parseInt(ticketNumber) + 1);
          }
    
          await AsyncStorage.setItem(`suporte_ticket_${ticketNumber}`, text);
    
          await AsyncStorage.setItem('ticketNumber', ticketNumber);
    
          setText('');
    
          Alert.alert('Ticket enviado com sucesso!');
        } catch (error) {
          console.error('Erro ao salvar o texto:', error);
        }
      };


   return (
    <View style={styles.container}>
      <View style={styles.menuIcon}>
        <TouchableOpacity onPress={toggleMenu}>
          <Icon name="three-bars" size={30} color="white" />
        </TouchableOpacity>
      </View>

      {/* Caixa de texto e botão */}
      <TextInput
        style={styles.input}
        placeholder="Digite seu texto"
        value={text}
        onChangeText={(value) => setText(value)}
      />
      <TouchableOpacity onPress={saveTextToAsyncStorage} style={styles.button}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
            
        <SideMenu isOpen={isMenuOpen} onClose={closeMenu} navigation={navigation} />
    </View>
  );
}

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
  input: {
    backgroundColor: 'white',
    width: '80%',
    padding: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});