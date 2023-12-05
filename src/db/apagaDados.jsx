import React from 'react';
import { Button, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ClearAsyncStorage = () => {
  const clearAllData = async () => {
    try {
      await AsyncStorage.clear();
      console.log('Todos os dados foram removidos do AsyncStorage.');
    } catch (error) {
      console.error('Erro ao limpar o AsyncStorage:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Apagar todos os dados" onPress={clearAllData} />
    </View>
  );
};

export default ClearAsyncStorage;
