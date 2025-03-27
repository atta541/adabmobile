import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';

const Profile = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile Settings</Text>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('ManageProfile')}
      >
        <Text style={styles.buttonText}>Manage Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('CheckVerification')}
      >
        <Text style={styles.buttonText}>Email Verification</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.button, styles.logoutButton]} 
        onPress={() => console.log('Logout Clicked')}
      >
        <Text style={[styles.buttonText, styles.logoutText]}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#F5F5F5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  button: {
    width: '100%',
    paddingVertical: 15,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: '#FF4D4D',
  },
  logoutText: {
    fontWeight: 'bold',
  },
});
