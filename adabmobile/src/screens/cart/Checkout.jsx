import React, { useContext, useState } from 'react';
import {
    View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList, ScrollView, Alert
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { UserDetailsContext } from '../../context/UserDetailsContext';
import Base_URL from '../../../Base_URL';
import { AuthContext } from '../../context/AuthContext';

const Checkout = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { fcmToken, emailVerification } = useContext(AuthContext);
    const { cartItems, totalPrice } = route.params || {};
    const { userDetails, loading } = useContext(UserDetailsContext);

    const [name, setName] = useState(userDetails?.name || '');
    const [phone, setPhone] = useState(userDetails?.phone || '');
    const [address, setAddress] = useState(userDetails?.address || '');
    const [nearestPlace, setNearestPlace] = useState('');
    const [email, setEmail] = useState(userDetails?.email || '');

    const handlePlaceOrder = async () => {
        if (!emailVerification) {
            Alert.alert(
                "Email Verification Required",
                "Please verify your email before placing an order.",
                [
                    { text: "Verify Now", onPress: () => navigation.navigate('SendOTP') },
                    { text: "Cancel", style: "cancel" }
                ]
            );
            return;
        }

        try {
            const orderData = {
                userId: userDetails?._id,
                name,
                email,
                phone,
                address,
                nearestPlace,
                city: "Lahore",
                cartItems,
                totalPrice,
                fcmToken
            };

            const response = await fetch(`${Base_URL}/api/orders`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData),
            });

            const result = await response.json();

            if (response.ok) {
                Alert.alert(
                    "🎉 Order Successful",
                    "Your order has been placed successfully!",
                    [{ text: "OK", onPress: () => navigation.navigate('Home') }]
                );
            } else {
                Alert.alert(
                    "Order Failed",
                    `Failed to place order: ${result.message}`,
                    [{ text: "Try Again", style: "cancel" }]
                );
            }
        } catch (error) {
            console.error('Error placing order:', error);
            Alert.alert(
                "Error",
                "Something went wrong while placing the order.",
                [{ text: "OK", style: "cancel" }]
            );
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Checkout</Text>
            <Text style={styles.subtitle}>Complete your order details below</Text>

            {loading ? (
                <ActivityIndicator size="large" color="#FFA500" />
            ) : userDetails ? (
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} placeholder="Enter your name" value={name} onChangeText={setName} />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your email"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <TextInput style={styles.input} placeholder="Enter your phone number" keyboardType="phone-pad" value={phone} onChangeText={setPhone} />
                    <TextInput style={styles.input} placeholder="Enter your address" value={address} onChangeText={setAddress} />
                    <TextInput
                        style={styles.input}
                        placeholder="Nearest Place (optional)"
                        placeholderTextColor="#FFFFFF"
                        value={nearestPlace}
                        onChangeText={setNearestPlace}
                    />
                    <TextInput
                        style={[styles.input, styles.disabledInput]}
                        value="Lahore"
                        editable={false}
                    />
                </View>
            ) : (
                <Text style={styles.subtitle}>User details not available</Text>
            )}

            {/* Cart Items Section */}
            <Text style={styles.cartTitle}>🛒 Your Cart </Text>
            <FlatList
                data={cartItems}
                keyExtractor={(item) => item._id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.cartItem}>
                        <Text style={styles.cartText}>
                            {item.productId?.name || 'Unknown Product'} - {item.quantity} x PKR {item.price.toFixed(2)}
                        </Text>
                    </View>
                )}
            />
            <Text style={styles.totalPrice}>Total: PKR {totalPrice?.toFixed(2) || '0.00'}</Text>

            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.backButtonText}>⬅ Back to Cart</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.orderButton} onPress={handlePlaceOrder}>
                    <Text style={styles.orderButtonText}>✅ Place Order</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default Checkout;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: 'black',
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#FFA500',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 16,
        color: '#B0B0B0',
        marginBottom: 20,
    },
    inputContainer: {
        width: '100%',
    },
    input: {
        width: '100%',
        backgroundColor: '#1E1E1E',
        color: 'white',
        padding: 12,
        borderRadius: 8,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#444',
        fontSize: 16,
    },
    disabledInput: {
        backgroundColor: '#333',
        color: '#AAAAAA',
    },
    cartTitle: {
        fontSize: 20,
        color: '#FFA500',
        fontWeight: 'bold',
        marginTop: 20,
        alignSelf: 'flex-start',
    },
    cartItem: {
        padding: 12,
        backgroundColor: '#222',
        borderRadius: 10,
        marginVertical: 5,
        width: '100%',
    },
    cartText: {
        color: '#FFF',
        fontSize: 16,
    },
    totalPrice: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFA500',
        marginVertical: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
    },
    backButton: {
        backgroundColor: '#FF3B30',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        flex: 1,
        marginRight: 10,
        alignItems: 'center',
        elevation: 5,
    },
    backButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    orderButton: {
        backgroundColor: '#28A745',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        flex: 1,
        marginLeft: 10,
        alignItems: 'center',
        elevation: 5,
    },
    orderButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
