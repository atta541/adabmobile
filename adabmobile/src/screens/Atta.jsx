import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';


const Atta = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Atta</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

export default Atta;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
