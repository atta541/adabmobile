import React, { useEffect, useState, useContext, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../context/AuthContext';
import Base_URL from '../../../Base_URL';

import { useAlert } from '../../context/AlertContext'; // adjust path if needed


const ORDERS_CACHE_KEY = (token) => `orders_cache_${token}`;
const CACHE_EXPIRY_TIME = 15 * 60 * 1000;

const Orders = () => {

  const { token } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(null);
  const { showAlert } = useAlert(); // ✅ access the custom alert



  const fetchOrders = useCallback(async (forceRefresh = false) => {
    try {

      setLoading(!forceRefresh);
      setRefreshing(forceRefresh);
      setError(null);


      if (!forceRefresh && token) {
        const cachedData = await AsyncStorage.getItem(ORDERS_CACHE_KEY(token));
        if (cachedData) {
          const { data, timestamp } = JSON.parse(cachedData);
          if (Date.now() - timestamp < CACHE_EXPIRY_TIME) {
            setOrders(data);
            setLoading(false);
            return;
          }
        }
      }


      if (!token) throw new Error('Authentication required');

      const response = await fetch(`${Base_URL}/api/orders/`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch orders');

      const data = await response.json();
      setOrders(data);


      if (token) {
        await AsyncStorage.setItem(
          ORDERS_CACHE_KEY(token),
          JSON.stringify({ data, timestamp: Date.now() })
        );
      }
    } catch (error) {
      console.error('Orders fetch error:', error);
      setError(error.message || 'Failed to load orders');


      if (!orders.length) {
        setOrders([]);
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [token]);


  const handleRefresh = useCallback(() => {
    fetchOrders(true);
  }, [fetchOrders]);


  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token, fetchOrders]);



  const reorder = useCallback(async (orderId) => {
    showAlert({
      title: 'Reorder Confirmation',
      message: 'Are you sure you want to reorder this order?',
      cancelText: 'Cancel',
      confirmText: 'Yes',
      onCancel: () => {}, 
      onConfirm: async () => {
        try {
          const response = await fetch(`${Base_URL}/api/orders/reorder/${orderId}`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) throw new Error('Failed to reorder items');

          const data = await response.json();
          setOrders(data);
        } catch (error) {
          console.error('Reorder error:', error);
          showAlert({
            title: 'Error',
            message: 'Something went wrong while reordering.',
            onConfirm: () => {}
          });
        }
      }
    });
  });


  const toggleDropdown = useCallback((index) => {
    setDropdownVisible(dropdownVisible === index ? null : index);
  }, [dropdownVisible]);


  const renderItem = useCallback(({ item, index }) => (
    <View style={styles.orderContainer}>
      <View style={styles.orderHeader}>
        <Text style={styles.orderTitle}>Order #{item.orderNumber || item._id.slice(-6).toUpperCase()}</Text>
        <View style={styles.statusContainer}>
          <Text style={[
            styles.statusText,
            item.status === 'Delivered' && styles.statusDelivered,
            item.status === 'Pending' && styles.statusCancelled,
            item.status === 'Confirmed' && styles.statusProcessing,
          ]}>
            {item.status}
          </Text>
        </View>
      </View>

      <View style={styles.orderInfo}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Order Total:</Text>
          <Text style={styles.infoValue}>PKR {item.totalPrice?.toFixed(2) || '0.00'}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Date:</Text>
          <Text style={styles.infoValue}>
            {item.createdAt ? new Date(item.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            }) : 'N/A'}
          </Text>
        </View>
      </View>

      <Text style={styles.itemsTitle}>Items ({item.cartItems?.length || 0})</Text>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={() => toggleDropdown(index)}
          style={styles.dropdownButton}
          activeOpacity={0.7}
        >
          <Text style={styles.dropdownButtonText}>
            {dropdownVisible === index ? 'Hide Items' : 'Show Items'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.reorderButton}
          activeOpacity={0.7}
          onPress={() => reorder(item._id)}
        >
          <Text style={styles.reorderButtonText}>Reorder</Text>
        </TouchableOpacity>
      </View>

      {dropdownVisible === index && (
        <View style={styles.dropdownContainer}>
          {item.cartItems?.map((cartItem, idx) => (
            <View key={`${item._id}_${idx}`} style={styles.cartItem}>
              <View style={styles.productInfo}>
                {cartItem.picture && (
                  <View style={styles.imageContainer}>
                    {Array.isArray(cartItem.picture) ? (
                      <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.imageScroll}
                      >
                        {cartItem.picture.map((url, imgIdx) => (
                          <Image
                            key={`${item._id}_${idx}_${imgIdx}`}
                            source={{ uri: url }}
                            style={styles.image}
                          />
                        ))}
                      </ScrollView>
                    ) : (
                      <Image
                        source={{ uri: cartItem.picture }}
                        style={styles.image}
                      />
                    )}
                  </View>
                )}
                <View style={styles.productDetails}>
                  <Text style={styles.productName} numberOfLines={2}>
                    {cartItem.name || 'Unnamed Product'}
                  </Text>
                  <Text style={styles.productPrice}>
                    PKR {cartItem.price?.toFixed(2) || '0.00'}
                  </Text>
                  <Text style={styles.quantityText}>
                    Quantity: {cartItem.quantity || 1}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  ), [dropdownVisible, toggleDropdown]);


  if (loading && !refreshing && orders.length === 0) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#FF4B4B" />
      </View>
    );
  }


  if (error && orders.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => fetchOrders(true)}
        >
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#FF4B4B']}
            tintColor="#FF4B4B"
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyMessage}>No orders found</Text>
            <TouchableOpacity
              style={styles.refreshButton}
              onPress={handleRefresh}
            >
              <Text style={styles.refreshButtonText}>Refresh</Text>
            </TouchableOpacity>
          </View>
        }
        contentContainerStyle={styles.listContainer}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={10}
      />
    </View>
  );
};




const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  listContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },


  orderContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },


  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  orderTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },


  statusContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    backgroundColor: '#2A2A2A',
  },
  statusText: {
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statusDelivered: {
    color: '#4CAF50',
  },
  statusCancelled: {
    color: '#FF5252',
  },
  statusProcessing: {
    color: '#FFC107',
  },


  orderInfo: {
    marginBottom: 14,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#9E9E9E',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },


  itemsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 12,
    letterSpacing: 0.5,
  },


  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  dropdownButton: {
    backgroundColor: '#2A2A2A',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#3A3A3A',
  },
  dropdownButtonText: {
    color: '#FF4B4B',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  reorderButton: {
    backgroundColor: '#FF4B4B',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowColor: '#FF4B4B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  reorderButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    letterSpacing: 0.5,
  },


  dropdownContainer: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#2A2A2A',
    paddingTop: 12,
  },


  cartItem: {
    marginBottom: 14,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  productInfo: {
    flexDirection: 'row',
  },
  imageContainer: {
    marginRight: 14,
  },
  imageScroll: {
    flexDirection: 'row',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  productDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  productPrice: {
    fontSize: 15,
    color: '#FF4B4B',
    fontWeight: '700',
    marginBottom: 6,
  },
  quantityText: {
    fontSize: 14,
    color: '#9E9E9E',
    fontWeight: '500',
  },


  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyMessage: {
    fontSize: 17,
    color: '#9E9E9E',
    marginBottom: 20,
    fontWeight: '500',
    textAlign: 'center',
  },
  refreshButton: {
    backgroundColor: '#FF4B4B',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    shadowColor: '#FF4B4B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  refreshButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  errorText: {
    fontSize: 16,
    color: '#FF5252',
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
    fontWeight: '600',
  },
  retryButton: {
    backgroundColor: '#FF4B4B',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    shadowColor: '#FF4B4B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});

export default Orders;





