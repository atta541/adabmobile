import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '../Profile';
import ManageProfile from './ManageProfile';
import CheckVerificationScreen from '../../components/EmailVerification/CheckVerificationScreen';
import SendOTPVerificationScreen from '../../components/EmailVerification/SendOTPVerificationScreen';
import VerifyOTPScreen from '../../components/EmailVerification/VerifyOTPScreen';
import Orders from './Orders';

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen name="ProfileHome" component={Profile} options={{ headerShown: false }} />
      <Stack.Screen 
        name="ManageProfile" 
        component={ManageProfile} 
        options={{ 
          title: 'Manage Profile',
          headerStyle: { backgroundColor: 'black' }, 
          headerTintColor: 'white', 
          headerTitleStyle: { fontWeight: 'bold' } 
        }} 
      />
      <Stack.Screen name="CheckVerification" component={CheckVerificationScreen} />
      <Stack.Screen name="SendOTP" component={SendOTPVerificationScreen} />
      <Stack.Screen name="VerifyOTP" component={VerifyOTPScreen} />

      <Stack.Screen 
        name="orders" 
        component={Orders} 
        options={{ 
          title: 'Orders',
          headerStyle: { backgroundColor: 'black' }, 
          headerTintColor: 'white', 
          headerTitleStyle: { fontWeight: 'bold' } 
        }} 
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
