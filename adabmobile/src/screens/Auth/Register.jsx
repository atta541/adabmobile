import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Register = ({ navigation }) => { 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('03');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { register } = useContext(AuthContext);

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword || !phone || !address) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }
    if (!/^03\d{9}$/.test(phone)) {
      Alert.alert('Error', 'Phone number must start with 03 and have 11 digits!');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match!');
      return;
    }
   
    try {
      const data = await register(name, email, password, phone, address);


      if (data) {
        Alert.alert('Success', 'Account created successfully! Please log in.');
        navigation.replace('Login');
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo Section */}
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>آداب</Text>
        <Text style={styles.tagline}>Join Us and Enjoy Authentic Flavors!</Text>
        <Text style={styles.taglineemoji}>🍛🍔🪔🪞🪕🧺✨</Text>
      </View>

      {/* Input Section */}
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Ionicons name="person-outline" size={20} color="#FFF" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor="#FFF"
            value={name} 
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Ionicons name="mail-outline" size={20} color="#FFF" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#FFF"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Ionicons name="call-outline" size={20} color="#FFF" style={styles.icon} />



          <TextInput
            style={styles.input}
            placeholder="Enter your phone number"
            placeholderTextColor="#AAA" // Light gray for better contrast
            keyboardType="phone-pad"
            value={phone}
            onChangeText={(text) => setPhone(text.startsWith("03") ? text : phone)}
          />

        </View>

        <View style={styles.inputWrapper}>
          <Ionicons name="location-outline" size={20} color="#FFF" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter your address"
            placeholderTextColor="#FFF"
            value={address}
            onChangeText={setAddress}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Ionicons name="lock-closed-outline" size={20} color="#FFF" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="#FFF"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Ionicons name="lock-closed-outline" size={20} color="#FFF" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Confirm your password"
            placeholderTextColor="#FFF"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>
      </View>

      {/* Button Section */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerButtonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginText}>
            Already have an account? <Text style={styles.loginLink}>Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;

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
    marginBottom: 30,
  },
  logo: {
    color: 'red',
    fontSize: 80,
    fontWeight: 'bold',
    fontFamily: 'DancingScript-Bold',
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
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#FFF', // Underline Effect
    color: 'white',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#FFF', // Black text
    padding: 15,
    fontSize: 16,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  registerButton: {
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
  registerButtonText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  loginText: {
    color: '#FFF',
    marginTop: 15,
    fontSize: 16,
  },
  loginLink: {
    color: '#FF4500',
    fontWeight: 'bold',
  },
});
