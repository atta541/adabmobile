import React, { useEffect, useState, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider, AuthContext } from './src/context/AuthContext';
import TabNavigator from './src/navigation/TabNavigator';
import AuthNavigator from './src/navigation/AuthNavigator';
import { UserDetailsProvider } from './src/context/UserDetailsContext';
import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid, Platform } from 'react-native';
import {AlertProvider } from './src/context/AlertContext';

export default function App() {
  useEffect(() => {
    requestUserPermission();
  }, []);

  async function requestUserPermission() {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );

      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Notification permission denied');
        return;
      }
    }

    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('FCM Permission Granted:', authStatus);
    }
  }

  return (
    <AuthProvider>
      <AlertProvider>
      <NavigationContainer>
        <UserDetailsProvider>
          <MainNavigator />
        </UserDetailsProvider>
      </NavigationContainer>
      </AlertProvider>
    </AuthProvider>
  );
}

const MainNavigator: React.FC = () => {
  const { token } = useContext(AuthContext);
  return token ? <TabNavigator /> : <AuthNavigator />;
};

// added