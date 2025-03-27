import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useContext, useState, useMemo } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import Base_URL from '../../../Base_URL';

const SendOTPVerificationScreen = () => {
    const { token } = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState('');
    const navigation = useNavigation();

    const headers = useMemo(() => ({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    }), [token]);

    const sendVerificationEmail = async () => {
        try {
            const response = await fetch(`${Base_URL}/api/users/send-verification`, {
                method: 'POST',
                headers: headers,
            });

            const data = await response.json();
            if (response.ok) {
                alert('Verification email sent successfully');
                navigation.navigate('VerifyOTP'); // Move to OTP screen after sending OTP
            } else {
                setErrorMessage(data.message || 'Failed to send verification email');
            }
        } catch (error) {
            setErrorMessage('Network error, please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Send OTP for Email Verification</Text>
            {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

            <TouchableOpacity style={styles.button} onPress={sendVerificationEmail}>
                <Text style={styles.buttonText}>Send Verification Email</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SendOTPVerificationScreen;

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    text: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
    error: { color: 'red', marginTop: 10 },
    button: { backgroundColor: '#007BFF', padding: 10, borderRadius: 5, marginTop: 10 },
    buttonText: { color: '#FFF', fontSize: 16 },
});
