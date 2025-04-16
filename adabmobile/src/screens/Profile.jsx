import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Profile = ({ navigation }) => {
  const { logout } = useContext(AuthContext);

  
  const handleLogout = async () => {
    
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Logout",
          onPress: async () => {
            await logout(); 
            navigation.replace('Login'); 
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile Settings</Text>

      {/* Manage Profile Button */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('ManageProfile')}
      >
        <View style={styles.buttonContent}>
          <Icon name="person" size={20} color="black" style={styles.icon} />
          <Text style={styles.buttonText}>Manage Profile</Text>
        </View>
      </TouchableOpacity>

      {/* Email Verification Button */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('CheckVerification')}
      >
        <View style={styles.buttonContent}>
          <Icon name="email" size={20} color="black" style={styles.icon} />
          <Text style={styles.buttonText}>Email Verification</Text>
        </View>
      </TouchableOpacity>


      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('orders')}
      >
        <View style={styles.buttonContent}>
          <Icon name="orders_2" size={20} color="black" style={styles.icon} />
          <Text style={styles.buttonText}>Orders</Text>
        </View>
      </TouchableOpacity>


      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('contactus')}
      >
        <View style={styles.buttonContent}>
          <Icon name="contact-support" size={20} color="black" style={styles.icon} />
          <Text style={styles.buttonText}>Contact Us</Text>
        </View>
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity 
        style={[styles.button, styles.logoutButton]} 
        onPress={handleLogout}
      >
        <View style={styles.buttonContent}>
          <Icon name="exit-to-app" size={20} color="white" style={styles.icon} />
          <Text style={[styles.buttonText, styles.logoutText]}>Logout</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'black',
    paddingTop: 20, 
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#FFF', 
    marginTop: 20,
  },
  button: {
    width: '100%',
    paddingVertical: 15,
    backgroundColor: 'black', 
    borderRadius: 8, 
    marginVertical: 10, 
    borderColor: 'white', 
    borderWidth: 0.2, 
  },
  
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: '500',
    marginLeft: 10,
    
  },
  icon: {
    marginRight: 10,
    color:'white',
  },
  logoutButton: {
    backgroundColor: '#D32F2F', 
  },
  logoutText: {
    fontWeight: 'bold',
  },
});
