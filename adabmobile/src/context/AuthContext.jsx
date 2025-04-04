import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Base_URL from '../../Base_URL';
import messaging from '@react-native-firebase/messaging';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [fcmToken, setFcmToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [emailVerification, setEmailVerification] = useState(false);

    useEffect(() => {
        const loadAuthData = async () => {
            try {
                const storedUser = await AsyncStorage.getItem('user');
                const storedToken = await AsyncStorage.getItem('token');
                const storedEmailVerification = await AsyncStorage.getItem('emailVerification');

                if (storedUser && storedToken) {
                    setUser(JSON.parse(storedUser));
                    setToken(storedToken);
                    setEmailVerification(storedEmailVerification === 'true');
                }

                
                const fcmToken = await messaging().getToken();
                setFcmToken(fcmToken);
            } catch (error) {
                console.error('Error loading auth data:', error);
            }
            setLoading(false);
        };

        loadAuthData();
    }, []);

    const login = async (email, password) => {
        try {
            const response = await fetch(`${Base_URL}/api/users/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Login failed');

            setUser(data.user);
            setToken(data.token);
            setEmailVerification(data.user.isEmailVerified);

            await AsyncStorage.setItem('user', JSON.stringify(data.user));
            await AsyncStorage.setItem('token', data.token);
            await AsyncStorage.setItem('emailVerification', JSON.stringify(data.user.isEmailVerified));

            
            const fcmToken = await messaging().getToken();
            setFcmToken(fcmToken);
        } catch (error) {
            console.error('Login Error:', error);
            throw error;
        }
    };

    const register = async (name, email, password, phone, address) => {
        try {
            const fcmToken = await messaging().getToken();  

            const response = await fetch(`${Base_URL}/api/users/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password, phone, address, fcmToken }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Registration failed');

            return data;
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        setUser(null);
        setToken(null);
        setFcmToken(null);
        setEmailVerification(false);
        await AsyncStorage.removeItem('user');
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('emailVerification');
    };

    const updateEmailVerificationStatus = (status) => {
        setEmailVerification(status);
        AsyncStorage.setItem('emailVerification', JSON.stringify(status));
    };

    return (
        <AuthContext.Provider value={{
            user,
            token,
            fcmToken,
            emailVerification,
            login,
            register,
            logout,
            loading,
            updateEmailVerificationStatus
        }}>
            {children}
        </AuthContext.Provider>
    );
};
 