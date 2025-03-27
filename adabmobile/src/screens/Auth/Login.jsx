import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';


const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'All fields are required');
      return;
    }
    try {
      await login(email, password);
      Alert.alert('Success', 'Login successful!');
      navigation.replace('Home');
    } catch (error) {
      Alert.alert('Error', error.message || 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo Section */}
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>آداب</Text>
        <Text style={styles.tagline}>Authentic Desi & Classic English Flavors!</Text>
        <Text style={styles.taglineemoji}>🍛🍔🪔🪞🪕🧺✨</Text>
      </View>

      {/* Input Section */}
      <View style={styles.inputContainer}>
        
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#FFF"
          keyboardType="email-address"
          onChangeText={setEmail}
          value={email}
          
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#FFF"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      {/* Button Section */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerText}>
            Don't have an account? <Text style={styles.registerLink}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    color: 'red',
    fontSize: 80, // Bigger font
    fontWeight: 'bold',
    fontFamily: 'DancingScript-Bold', // Custom Font (Needs to be installed)
    textShadowColor: 'rgba(255, 0, 0, 0.6)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  tagline: {
    color: '#AAA',
    fontSize: 20,
    fontStyle: 'normal',
    marginTop: 10,
  },
  taglineemoji: {
    fontSize: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'transparent', // No background color
    color: '#FFF', // Text color white
    padding: 15,
    fontSize: 16,
    borderBottomWidth: 1, // Bottom border only
    borderBottomColor: '#FFF', // White border
    marginBottom: 15,
  },
  forgotPassword: {
    color: '#FF4500',
    textAlign: 'right',
    fontSize: 14,
    marginTop: 5,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: '#FF0000',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#FF6347',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 5,
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  registerText: {
    color: '#FFF',
    marginTop: 15,
    fontSize: 16,
  },
  registerLink: {
    color: '#FF4500',
    fontWeight: 'bold',
  },
});

