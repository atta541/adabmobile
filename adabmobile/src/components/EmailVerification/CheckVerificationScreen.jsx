
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const CheckVerificationScreen = () => {
    const { emailVerification } = useContext(AuthContext);
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Email Verification Status</Text>
            <Text>Status: {emailVerification ? 'Verified ✅' : 'Not Verified ❌'}</Text>

            {!emailVerification && (
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => navigation.navigate('SendOTP')}
                >
                    <Text style={styles.buttonText}>Proceed to Verification</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default CheckVerificationScreen;

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    text: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
    button: { backgroundColor: '#007BFF', padding: 10, borderRadius: 5, marginTop: 10 },
    buttonText: { color: '#FFF', fontSize: 16 },
});
