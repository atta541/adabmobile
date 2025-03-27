import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ActivityIndicator, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Base_URL from '../../../Base_URL';
import { AuthContext } from '../../context/AuthContext';

const Cart = () => {
  const navigation = useNavigation();
  const { token } = useContext(AuthContext);
  const [cart, setCart] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart();
  }, []);
 
  const fetchCart = async () => {
    try {
      const response = await fetch(`${Base_URL}/api/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setCart(data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateCart = async (productId, quantity) => {
    try {
      const response = await fetch(`${Base_URL}/api/cart/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity }),
      });
      const data = await response.json();
      setCart(data);
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const deleteFromCart = async (productId) => {
    try {
      const response = await fetch(`${Base_URL}/api/cart/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });
      const data = await response.json();
      setCart(data);
    } catch (error) {
      console.error('Error deleting from cart:', error);
    }
  };

  if (loading) return <ActivityIndicator size="large" color="red" />;

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2038/2038854.png' }} style={styles.emptyImage} />
        <Text style={styles.emptyText}>Your cart is empty!</Text>
        <Text style={styles.subText}>Looks like you haven't added anything yet.</Text>
        <TouchableOpacity style={styles.shopButton} onPress={() => console.log('Navigate to shop')}>
          <Text style={styles.shopButtonText}>Start Shopping</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cart.items}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.productId?.picture || 'https://via.placeholder.com/100' }} style={styles.image} resizeMode="contain" />
            <View style={styles.details}>
              <Text style={styles.itemText}>{item.productId?.name || 'Unknown Product'}</Text>
              <Text style={styles.price}>Price: PKR {item.price.toFixed(2)}</Text>
              <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => updateCart(item.productId?._id, item.quantity + 1)} style={styles.button}>
                  <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => updateCart(item.productId?._id, item.quantity - 1)} style={styles.button}>
                  <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteFromCart(item.productId?._id)} style={styles.button}>
                  <Text style={styles.buttonText}>remove</Text>
                </TouchableOpacity>
              </View>
            </View> 
          </View>
        )}
      />
      <Text style={styles.totalPrice}>Total: PKR {cart.totalPrice?.toFixed(2) || '0.00'}</Text>
      <TouchableOpacity style={styles.checkoutButton} onPress={() => navigation.navigate('Checkout', { cartItems: cart.items, totalPrice: cart.totalPrice })}>
        <Text style={styles.checkoutButtonText}>Proceed to Confirm Order</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: 'black' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' },
  emptyImage: { width: 200, height: 200, marginBottom: 20 },
  emptyText: { fontSize: 20, fontWeight: 'bold', color: 'white' },
  subText: { fontSize: 16, color: 'gray', marginBottom: 20 },
  shopButton: { backgroundColor: 'red', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5 },
  shopButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  item: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#111', padding: 15, borderRadius: 10, marginBottom: 10 },
  image: { width: 80, height: 100, borderRadius: 10 },
  details: { flex: 1, marginLeft: 15 },
  itemText: { fontSize: 18, fontWeight: 'bold', color: 'white' },
  price: { fontSize: 16, color: 'red', marginVertical: 5 },
  quantity: { fontSize: 14, color: 'white' },
  buttonContainer: { flexDirection: 'row', marginTop: 10 },
  button: { backgroundColor: 'red', padding: 8, marginHorizontal: 5, borderRadius: 5 },
  buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  totalPrice: { fontSize: 20, fontWeight: 'bold', color: 'red', textAlign: 'center', marginTop: 20 },
  checkoutButton: { backgroundColor: 'red', paddingVertical: 15, paddingHorizontal: 30, borderRadius: 5, marginTop: 20, alignSelf: 'center' },
  checkoutButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});

export default Cart;
