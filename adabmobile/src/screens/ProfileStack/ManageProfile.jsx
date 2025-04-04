import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import { AuthContext } from '../../context/AuthContext';
import Base_URL from '../../../Base_URL';

const ManageProfile = () => {
  const navigation = useNavigation();
  const { token, user } = useContext(AuthContext);
    const { emailVerification } = useContext(AuthContext); 
  

  
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [address, setAddress] = useState(user?.address || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
      setAddress(user.address || '');
    }
  }, [user]);

  const handleUpdateProfile = async () => {
    if (!token) {
      Alert.alert('Error', 'You are not authenticated');
      return;
    }

    if (!name.trim() || !phone.trim() || !address.trim()) {
      Alert.alert('Error', 'All fields except email are required');
      return;
    }

    if (!currentPassword) {
      Alert.alert('Error', 'Please enter your current password to verify identity');
      return;
    }

    const updatedData = { name, phone, address, currentPassword, newPassword };
    
    if (!emailVerification) {
      updatedData.email = email; 
    }

    try {
      const response = await fetch(`${Base_URL}/api/users/update-profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData), 
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', data.message);
      } else {
        Alert.alert('Error', data.message || 'Failed to update profile');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>

      {/* Name Input */}
      <View style={styles.inputContainer}>
        <Icon name="person" size={20} color="white" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#888"
          value={name}
          onChangeText={setName}
        />
      </View>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Icon name="email" size={20} color="white" style={styles.icon} />
        <TextInput
          style={[styles.input, user.isEmailVerified ? styles.disabledInput : null]}
          placeholder="Email"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          editable={!emailVerification}
        />
        {emailVerification ? (
          <Text style={styles.verifiedText}>Verified</Text>
        ) : (
          <TouchableOpacity onPress={() => navigation.navigate('SendOTP')}>
            <Text style={styles.verifyText}>click to Verify</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Phone Input */}
      <View style={styles.inputContainer}>
        <Icon name="phone" size={20} color="white" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Phone"
          placeholderTextColor="#888"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
      </View>

      {/* Address Input */}
      <View style={styles.inputContainer}>
        <Icon name="location-on" size={20} color="white" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Address"
          placeholderTextColor="#888"
          value={address}
          onChangeText={setAddress}
        />
      </View>

      {/* Current Password Input */}
      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="white" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Current Password"
          placeholderTextColor="#888"
          value={currentPassword}
          onChangeText={setCurrentPassword}
          secureTextEntry
        />
      </View>

      {/* New Password Input */}
      <View style={styles.inputContainer}>
        <Icon name="lock-outline" size={20} color="white" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="New Password (optional)"
          placeholderTextColor="#888"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
        />
      </View>

      {/* Update Button */}
      <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
        <Text style={styles.buttonText}>Update Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ManageProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    marginBottom: 20,
    marginTop: 15,
    
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    color: '#fff',
    fontSize: 16,
  },
  disabledInput: {
    color: '#888',
  },
  verifiedText: {
    color: 'green',
    fontWeight: 'bold',
    fontSize:16,
  },
  verifyText: {
    color: 'red',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});