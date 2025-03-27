import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import React, { useState, useContext, useMemo } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import Base_URL from '../../../Base_URL';

const VerifyOTPScreen = () => {
    const { token } = useContext(AuthContext);
    const [otp, setOtp] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigation = useNavigation();

    const headers = useMemo(() => ({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    }), [token]);

    const verifyOTP = async () => {
        try {
            const response = await fetch(`${Base_URL}/api/users/verify-emailotp`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({ email, otp }),
            });

            const data = await response.json();
            if (response.ok) {
                alert('Email verified successfully');
                navigation.navigate('CheckVerification'); 
            } else {
                setErrorMessage(data.message || 'Invalid OTP');
            }
        } catch (error) {
            setErrorMessage('Network error, please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Verify OTP</Text>

            <TextInput
                style={styles.input}
                placeholder="Enter Email"
                onChangeText={setEmail}
            />

            <TextInput
                style={styles.input}
                placeholder="Enter OTP"
                keyboardType="numeric"
                onChangeText={setOtp}
            />

            {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

            <TouchableOpacity style={styles.button} onPress={verifyOTP}>
                <Text style={styles.buttonText}>Verify OTP</Text>
            </TouchableOpacity>
        </View>
    );
};

export default VerifyOTPScreen;

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    text: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
    input: { borderWidth: 1, borderColor: '#CCC', padding: 10, width: '80%', marginVertical: 10 },
    error: { color: 'red', marginTop: 10 },
    button: { backgroundColor: '#007BFF', padding: 10, borderRadius: 5, marginTop: 10 },
    buttonText: { color: '#FFF', fontSize: 16 },
});
