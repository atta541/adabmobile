import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react'; 
import Avator from '../components/Avator';
import { AuthContext } from '../context/AuthContext';
import SlidingMenu from '../components/SlidingMenu';
import Clipboard from '@react-native-clipboard/clipboard';  // Import Clipboard



const Home = ({ navigation }) => {
  const { token,emailVerification } = useContext(AuthContext); 


  const copyToClipboard = () => {
    Clipboard.setString(token);  
    // alert('Token copied to clipboard!'); 
  };


  return (
    <View style={styles.container}>
      {/* Top Bar Avatar */}
      <View style={styles.topBar}>
        <Avator />
      </View> 

      <View >
        <SlidingMenu />
      </View>

    


<View style={styles.content}>
      <Text style={styles.title}>Welcome to Ad ab</Text>
      <Text style={styles.title}>Welcome! Email Verified: {emailVerification ? '✅ Verified' : '❌ Not Verified'}</Text>

      <Button title="Go to Atta" onPress={() => navigation.navigate('Atta')} />
      <Button title="View Cart" onPress={() => navigation.navigate('Cart')} />

      {token && (
        <>
          <Text style={styles.tokenText}>Token: {token}</Text>
          <Button title="Copy Token" onPress={copyToClipboard} />  {/* Copy button */}
        </>
      )}
    </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: 60, 
    
  },
  topBar: {
    position: 'absolute',
    top: 0,
    width: '100%',
    backgroundColor: 'black',
    paddingVertical: 10,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,

  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  logoutButton: {
    marginTop: 20,
  },
  tokenText: {
    marginTop: 10,
    fontSize: 12,
    color: 'gray',
  },
});
