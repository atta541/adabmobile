import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Base_URL from '../../Base_URL';

const ResetPassword = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (route.params?.token) {
      setToken(route.params.token);
    }
  }, [route.params]);

  const handleResetPassword = async () => {
    try {
      const response = await fetch(`${Base_URL}/api/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Password reset successfully!');
        navigation.navigate('Login');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error resetting password:', error);
    }
  };

  return (
    <View>
      <Text>Enter New Password</Text>
      <TextInput
        placeholder="New Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Reset Password" onPress={handleResetPassword} />
    </View>
  );
};

export default ResetPassword;
