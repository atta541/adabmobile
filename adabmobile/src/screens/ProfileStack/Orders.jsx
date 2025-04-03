import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import Base_URL from '../../../Base_URL';

const Orders = () => {
  const { token } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${Base_URL}/api/orders/`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchOrders();
    }
  }, [token]); 

  
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (

    <View style={styles.orderContainer}>
  <Text style={styles.orderTitle}>Order ID: {item._id}</Text>
  <Text>Name: {item.name}</Text>
  <Text>Email: {item.email}</Text>
  <Text>Phone: {item.phone}</Text>
  <Text>Address: {item.address}</Text>
  <Text>Status: {item.status}</Text>
  <Text>Total Price: ${item.totalPrice}</Text>
  
  {/* Loop through cartItems and display each productId */}
  <Text>Items:</Text>
  {item.cartItems.map((cartItem, index) => (
    <View key={index}>
      <Text>Product ID: {cartItem.productId}</Text>
      <Text>Quantity: {cartItem.quantity}</Text>
      <Text>Price: ${cartItem.price}</Text>
    </View>
  ))}
  
  <Text>Created At: {new Date(item.createdAt).toLocaleString()}</Text>
</View>

  );


  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        ListEmptyComponent={<Text>No orders found</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  orderContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
  },
  orderTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default Orders;
