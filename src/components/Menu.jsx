import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';

const SideMenu = ({ isOpen, onClose, navigation }) => {
  if (!isOpen) {
    return null;
  }

  const navigateToScreen = (screenName) => {
    console.log(`Navigating to ${screenName}`);
    onClose();
  };

  return (
    <TouchableOpacity style={styles.overlay} onPress={onClose}>
      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.menuItemText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('PrevisaoSemanal')}>
          <Text style={styles.menuItemText}>Previsão Semanal</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Pesquisa')}>
          <Text style={styles.menuItemText}>Pesquisar Cidade</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Suporte')}>
          <Text style={styles.menuItemText}>Suporte</Text>
        </TouchableOpacity>        
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('SuporteList')}>
          <Text style={styles.menuItemText}>Tickets de Suporte</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('retornaDados')}>
          <Text style={styles.menuItemText}>Retorna Dados</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('apagaDados')}>
          <Text style={styles.menuItemText}>Apaga Dados</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.menuItemText}>Sair</Text>
        </TouchableOpacity>

      </View>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menu: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 200,
    height: '100%',
    backgroundColor: '#222', 
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  menuItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#555', 
    paddingVertical: 10,
  },
  menuItemText: {
    fontSize: 18,
    color: '#fff', 
  },
});

export default SideMenu;
