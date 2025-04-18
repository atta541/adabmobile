// import React, { useContext, useState } from 'react';
// import {
//     View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList, ScrollView, Alert, Modal
// } from 'react-native';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import { UserDetailsContext } from '../../context/UserDetailsContext';
// import Base_URL from '../../../Base_URL';
// import { AuthContext } from '../../context/AuthContext';

// const Checkout = () => {
//     const navigation = useNavigation();
//     const route = useRoute();
//     const { fcmToken, emailVerification } = useContext(AuthContext);
//     const { cartItems, totalPrice } = route.params || {};
//     const { userDetails, loading } = useContext(UserDetailsContext);

//     const [name, setName] = useState(userDetails?.name || '');
//     const [phone, setPhone] = useState(userDetails?.phone || '');
//     const [address, setAddress] = useState(userDetails?.address || '');
//     const [nearestPlace, setNearestPlace] = useState('');
//     const [email, setEmail] = useState(userDetails?.email || '');
//     const [isLoading, setIsLoading] = useState(false);

//     const handlePlaceOrder = async () => {
//         if (!emailVerification) {
//             Alert.alert(
//                 "Email Verification Required",
//                 "Please verify your email before placing an order.",
//                 [
//                     { text: "Verify Now", onPress: () => navigation.navigate('SendOTP') },
//                     { text: "Cancel", style: "cancel" }
//                 ]
//             );
//             return;
//         }

//         setIsLoading(true);

//         try {
//             const orderData = {
//                 userId: userDetails?._id,
//                 name,
//                 email,
//                 phone,
//                 address,
//                 nearestPlace,
//                 city: "Lahore",
//                 cartItems,
//                 totalPrice,
//                 fcmToken
//             };

//             const response = await fetch(`${Base_URL}/api/orders`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(orderData),
//             });

//             const result = await response.json();
//             setIsLoading(false);

//             if (response.ok) {
//                 Alert.alert(
//                     "🎉 Order Successful",
//                     "Your order has been placed successfully!",
//                     [{ text: "OK", onPress: () => navigation.navigate('Home') }]
//                 );
//             } else {
//                 Alert.alert(
//                     "Order Failed",
//                     `Failed to place order: ${result.message}`,
//                     [{ text: "Try Again", style: "cancel" }]
//                 );
//             }
//         } catch (error) {
//             setIsLoading(false);
//             console.error('Error placing order:', error);
//             Alert.alert(
//                 "Error",
//                 "Something went wrong while placing the order.",
//                 [{ text: "OK", style: "cancel" }]
//             );
//         }
//     };

//     return (
//         <View style={styles.container}>
//             {/* Loading Modal */}
//             {isLoading && (
//                 <Modal transparent={true} animationType="fade">
//                     <View style={styles.loaderContainer}>
//                         <ActivityIndicator size="large" color="#FFA500" />
//                         <Text style={styles.loadingText}>Placing Order...</Text>
//                     </View>
//                 </Modal>
//             )}

//             <ScrollView contentContainerStyle={styles.scrollContainer}>
//                 <Text style={styles.subtitle}>Complete your order details below</Text>

//                 {loading ? (
//                     <ActivityIndicator size="large" color="#FFA500" />
//                 ) : userDetails ? (
//                     <View style={styles.inputContainer}>
//                         <TextInput style={styles.input} placeholder="Enter your name" value={name} onChangeText={setName} />
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Enter your email"
//                             keyboardType="email-address"
//                             value={email}
//                             onChangeText={setEmail}
//                         />
//                         <TextInput style={styles.input} placeholder="Enter your phone number" keyboardType="phone-pad" value={phone} onChangeText={setPhone} />
//                         <TextInput style={styles.input} placeholder="Enter your address" value={address} onChangeText={setAddress} />
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Nearest Place (optional)"
//                             placeholderTextColor="#FFFFFF"
//                             value={nearestPlace}
//                             onChangeText={setNearestPlace}
//                         />
//                         <TextInput
//                             style={[styles.input, styles.disabledInput]}
//                             value="Lahore"
//                             editable={false}
//                         />
//                     </View>
//                 ) : (
//                     <Text style={styles.subtitle}>User details not available</Text>
//                 )}

//                 {/* Cart Items Section */}
//                 <Text style={styles.cartTitle}>🛒 Your Cart </Text>
//                 <FlatList
//                     data={cartItems}
//                     keyExtractor={(item) => item._id.toString()}
//                     renderItem={({ item }) => (
//                         <View style={styles.cartItem}>
//                             <Text style={styles.cartText}>
//                                 {item.productId?.name || 'Unknown Product'} - {item.quantity} x PKR {item.price.toFixed(2)}
//                             </Text>
//                         </View>
//                     )}
//                 />
//                 <Text style={styles.totalPrice}>Total: PKR {totalPrice?.toFixed(2) || '0.00'}</Text>

//                 {/* Action Buttons */}
//                 <View style={styles.buttonContainer}>
//                     <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//                         <Text style={styles.backButtonText}>⬅ Back to Cart</Text>
//                     </TouchableOpacity>

//                     <TouchableOpacity style={styles.orderButton} onPress={handlePlaceOrder}>
//                         <Text style={styles.orderButtonText}>✅ Place Order</Text>
//                     </TouchableOpacity>
//                 </View>
//             </ScrollView>
//         </View>
//     );
// };

// export default Checkout;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: 'black',
//         padding: 20,
//         alignItems: 'center',
//     },
//     scrollContainer: {
//         flexGrow: 1,
//     },
//     subtitle: {
//         fontSize: 16,
//         color: '#B0B0B0',
//         marginBottom: 20,
//     },
//     inputContainer: {
//         width: '100%',
//     },
//     input: {
//         width: '100%',
//         backgroundColor: '#1E1E1E',
//         color: 'white',
//         padding: 12,
//         borderRadius: 8,
//         marginBottom: 10,
//         borderWidth: 1,
//         borderColor: '#444',
//         fontSize: 16,
//     },
//     disabledInput: {
//         backgroundColor: '#333',
//         color: '#AAAAAA',
//     },
//     cartTitle: {
//         fontSize: 20,
//         color: '#FFA500',
//         fontWeight: 'bold',
//         marginTop: 20,
//         alignSelf: 'flex-start',
//     },
//     cartItem: {
//         padding: 12,
//         backgroundColor: '#222',
//         borderRadius: 10,
//         marginVertical: 5,
//         width: '100%',
//     },
//     cartText: {
//         color: '#FFF',
//         fontSize: 16,
//     },
//     totalPrice: {
//         fontSize: 22,
//         fontWeight: 'bold',
//         color: '#FFA500',
//         marginVertical: 10,
//     },
//     buttonContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         width: '100%',
//         marginTop: 20,
//     },
//     backButton: {
//         backgroundColor: '#FF3B30',
//         paddingVertical: 12,
//         paddingHorizontal: 20,
//         borderRadius: 8,
//         flex: 1,
//         marginRight: 10,
//         alignItems: 'center',
//         elevation: 5,
//     },
//     orderButton: {
//         backgroundColor: '#28A745',
//         paddingVertical: 12,
//         paddingHorizontal: 20,
//         borderRadius: 8,
//         flex: 1,
//         marginLeft: 10,
//         alignItems: 'center',
//         elevation: 5,
//     },
//     loaderContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'rgba(0, 0, 0, 0.7)',
//     },
//     loadingText: {
//         color: 'white',
//         fontSize: 18,
//         marginTop: 10,
//     },
// });




import React, { useContext, useState } from 'react';
import {
    View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList, ScrollView, Alert, Modal
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { UserDetailsContext } from '../../context/UserDetailsContext';
import Base_URL from '../../../Base_URL';
import { AuthContext } from '../../context/AuthContext';
import { useAlert } from '../../context/AlertContext';



const Checkout = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { fcmToken, emailVerification } = useContext(AuthContext);
    const { cartItems, totalPrice } = route.params || {};
    const { userDetails, loading } = useContext(UserDetailsContext);
    const { showAlert } = useAlert();


    const [name, setName] = useState(userDetails?.name || '');
    const [phone, setPhone] = useState(userDetails?.phone || '');
    const [address, setAddress] = useState(userDetails?.address || '');
    const [nearestPlace, setNearestPlace] = useState('');
    const [email, setEmail] = useState(userDetails?.email || '');
    const [paymentMethod, setPaymentMethod] = useState('COD'); // Default
    const [isLoading, setIsLoading] = useState(false);

    // const handlePlaceOrder = async () => {
    //     if (!emailVerification) {
    //         Alert.alert(
    //             "Email Verification Required",
    //             "Please verify your email before placing an order.",
    //             [
    //                 { text: "Verify Now", onPress: () => navigation.navigate('SendOTP') },
    //                 { text: "Cancel", style: "cancel" }
    //             ]
    //         );
    //         return;
    //     }

    //     setIsLoading(true);

    //     try {
    //         const orderData = {
    //             userId: userDetails?._id,
    //             name,
    //             email,
    //             phone,
    //             address,
    //             nearestPlace,
    //             city: "Lahore",
    //             cartItems,
    //             totalPrice,
    //             fcmToken,
    //             paymentMethod
    //         };

    //         const response = await fetch(`${Base_URL}/api/orders`, {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify(orderData),
    //         });

    //         const result = await response.json();
    //         setIsLoading(false);

    //         if (response.ok) {
    //             Alert.alert(
    //                 "🎉 Order Successful",
    //                 "Your order has been placed successfully!",
    //                 [{ text: "OK", onPress: () => navigation.navigate('Home') }]
    //             );
    //         } else {
    //             Alert.alert(
    //                 "Order Failed",
    //                 `Failed to place order: ${result.message}`,
    //                 [{ text: "Try Again", style: "cancel" }]
    //             );
    //         }
    //     } catch (error) {
    //         setIsLoading(false);
    //         console.error('Error placing order:', error);
    //         Alert.alert(
    //             "Error",
    //             "Something went wrong while placing the order.",
    //             [{ text: "OK", style: "cancel" }]
    //         );
    //     }
    // };



    const handlePlaceOrder = async () => {
        if (!emailVerification) {
            showAlert({
                title: "Email Verification Required",
                message: "Please verify your email before placing an order.",
                onConfirm: () => navigation.navigate('SendOTP'),
                onCancel: () => {},
                confirmText: "Verify Now",
                cancelText: "Cancel"
            });
            return;
        }

        setIsLoading(true);

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
                fcmToken,
                paymentMethod
            };

            const response = await fetch(`${Base_URL}/api/orders`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData),
            });

            const result = await response.json();
            setIsLoading(false);

            if (response.ok) {
                showAlert({
                    title: "🎉 Order Successful",
                    message: " Your order has been placed successfully!",
                    onConfirm: () => navigation.navigate('Home')
                });
            } else {
                showAlert({
                    title: "Order Failed",
                    message: `Failed to place order: ${result.message}`,
                    onConfirm: () => {},
                    confirmText: "Try Again"
                });
            }
        } catch (error) {
            setIsLoading(false);
            console.error('Error placing order:', error);
            showAlert({
                title: "Error",
                message: "Something went wrong while placing the order.",
                onConfirm: () => {}
            });
        }
    };

    return (
        <View style={styles.container}>
            {isLoading && (
                <Modal transparent={true} animationType="fade">
                    <View style={styles.loaderContainer}>
                        <ActivityIndicator size="large" color="#FFA500" />
                        <Text style={styles.loadingText}>Placing Order...</Text>
                    </View>
                </Modal>
            )}

            <ScrollView contentContainerStyle={styles.scrollContainer}>
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

           
                {/* Cart Items */}
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






     {/* Payment Method */}
     <Text style={styles.sectionTitle}>💳 Choose Payment Method</Text>
                <View style={styles.paymentOptions}>
                    <TouchableOpacity
                        style={[
                            styles.paymentOption,
                            paymentMethod === 'COD' && styles.selectedOption
                        ]}
                        onPress={() => setPaymentMethod('COD')}
                    >
                        <Text style={styles.optionText}>Cash on Delivery</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.paymentOption,
                            paymentMethod === 'Online' && styles.selectedOption
                        ]}
                        onPress={() => setPaymentMethod('Online')}
                    >
                        <Text style={styles.optionText}>Online Payment</Text>
                    </TouchableOpacity>
                </View>



                {/* Buttons */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Text style={styles.backButtonText}>⬅ Back to Cart</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.orderButton} onPress={handlePlaceOrder}>
                        <Text style={styles.orderButtonText}>✅ Place Order</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

export default Checkout;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        padding: 20,
        alignItems: 'center',
    },
    scrollContainer: {
        flexGrow: 1,
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
    sectionTitle: {
        fontSize: 18,
        color: '#FFA500',
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        alignSelf: 'flex-start',
    },
    paymentOptions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
    },
    paymentOption: {
        flex: 1,
        backgroundColor: '#222',
        padding: 15,
        marginHorizontal: 5,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#555',
        alignItems: 'center',
    },
    selectedOption: {
        borderColor: '#FFA500',
        backgroundColor: '#333',
    },
    optionText: {
        color: '#FFF',
        fontSize: 16,
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
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    loadingText: {
        color: 'white',
        fontSize: 18,
        marginTop: 10,
    },
});
