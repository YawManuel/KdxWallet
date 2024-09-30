import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GetCredentialPage } from '../wallet/features/GetCredentialPage';
import { ActivityPage } from '../wallet/features/ActivityPage';
import { RootPage } from '../wallet/features/RootPage';
import { Spinner } from '../wallet/common/Spinner';
// import '../styles/index.css'


const Stack = createStackNavigator();

export default function Wallet() {
  return (
    
      <Stack.Navigator initialRouteName="Spinner">
        <Stack.Screen name="Spinner" component={Spinner} />
        <Stack.Screen name="Activity" component={ActivityPage} />
        <Stack.Screen name="GetCredentials" component={GetCredentialPage} />
        <Stack.Screen name="Root" component={RootPage} />
      </Stack.Navigator>
    
  );
}