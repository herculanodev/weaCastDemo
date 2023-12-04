import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/pages/Login';
import SignUpScreen from './src/pages/SignUp';
import HomeScreen from './src/pages/Home';
import ExibirDadosDoAsyncStorage from './src/db/retornaDados';
import ClearAsyncStorage from './src/db/apagaDados';
import PrevSemanal from './src/pages/Previsao_semanal';
import PesquisaCidade from './src/pages/PesquisarCidade';
import Suporte from './src/pages/Suporte';
import SuporteList from './src/pages/SuporteList';

const Stack = createStackNavigator();


const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="PrevisaoSemanal" component={PrevSemanal} />
        <Stack.Screen name="retornaDados" component={ExibirDadosDoAsyncStorage} />
        <Stack.Screen name="apagaDados" component={ClearAsyncStorage} />
        <Stack.Screen name="Pesquisa" component={PesquisaCidade} />
        <Stack.Screen name="Suporte" component={Suporte} />
        <Stack.Screen name="SuporteList" component={SuporteList} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
