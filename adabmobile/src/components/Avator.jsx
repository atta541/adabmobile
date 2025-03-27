import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { useContext } from 'react';
import { UserDetailsContext } from '../context/UserDetailsContext';

const Avatar = () => {
    const { userDetails, loading } = useContext(UserDetailsContext);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.container}>
            {/* User Name on the Left */}
            <Text style={styles.text}>{userDetails?.name || 'Guest'}</Text>

            {/* Urdu Word on the Right */}
            <Text style={styles.logo}>آداب</Text>
        </View>
    );
    // return (
    //     <View style={styles.container}></View>
    //         <Text style={styles.text}>{userDetails?.name || 'Guest'}</Text>
};

export default Avatar;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        paddingHorizontal: 15, 
        paddingVertical: 10, 
        width: '100%', 
        borderWidth: 1, 
        borderColor: 'red', 
        borderRadius: 5, 
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "white",
        textAlign: 'left', 
    },
    logo: {
        color: 'red',
        fontSize: 22, 
        fontWeight: 'bold',
        textShadowColor: 'rgba(255, 0, 0, 0.6)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
        textAlign: 'right', 
    },
});






    