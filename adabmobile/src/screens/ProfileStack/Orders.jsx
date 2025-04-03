import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Image, ScrollView, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import Base_URL from '../../../Base_URL';

const Orders = () => {
  const { token } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(null); 

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

  const toggleDropdown = (index) => {
    setDropdownVisible(dropdownVisible === index ? null : index); 
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#FF4B4B" />
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

  const renderItem = ({ item, index }) => (
    <View style={styles.orderContainer}>
      <View style={styles.orderHeader}>
        <Text style={styles.orderTitle}>Order Details</Text>
        <View style={styles.statusContainer}>
          <Text style={[styles.statusText, { color: item.status === 'Delivered' ? '#4CAF50' : '#FF9800' }]}>
            {item.status}
          </Text>
        </View>
      </View>

      <View style={styles.orderInfo}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Order Total:</Text>
          <Text style={styles.infoValue}>PKR {item.totalPrice.toFixed(2)}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Date:</Text>
          <Text style={styles.infoValue}>
            {new Date(item.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Text>
        </View>
      </View>

      <Text style={styles.itemsTitle}>Items in your order</Text>




<View style={styles.buttonsContainer}>


<TouchableOpacity onPress={() => toggleDropdown(index)} style={styles.dropdownButton}>
    <Text style={styles.dropdownButtonText}>Show Items</Text>
  </TouchableOpacity>


  <TouchableOpacity style={styles.ReorderButton}>
    <Text style={styles.dropdownButtonText}>Reorder</Text>
  </TouchableOpacity>

 
</View>



      {dropdownVisible === index && (
        <View style={styles.dropdownContainer}>
          {item.cartItems.map((cartItem, idx) => (
            <View key={idx} style={styles.cartItem}>
              <View style={styles.productInfo}>
                {cartItem.picture && (
                  <View style={styles.imageContainer}>
                    {Array.isArray(cartItem.picture) ? (
                      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageScroll}>
                        {cartItem.picture.map((url, idx) => (
                          <Image key={idx} source={{ uri: url }} style={styles.image} />
                        ))}
                      </ScrollView>
                    ) : (
                      <Image source={{ uri: cartItem.picture }} style={styles.image} />
                    )}
                  </View>
                )}
                <View style={styles.productDetails}>
                  <Text style={styles.productName}>{cartItem.name}</Text>
                  <Text style={styles.productPrice}>PKR {cartItem.price.toFixed(2)}</Text>
                  <Text style={styles.quantityText}>Quantity: {cartItem.quantity}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyMessage}>No orders found</Text>
          </View>
        }
        contentContainerStyle={styles.listContainer}
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
  },
  orderContainer: {
    marginBottom: 20,
    borderRadius: 12,
    backgroundColor: '#1E1E1E',
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#2C2C2C',
  },
  orderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  statusContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#333333',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  orderInfo: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 15,
    color: 'white',
  },
  infoValue: {
    fontSize: 15,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  itemsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    padding: 16,
    paddingBottom: 8,
  },
  cartItem: {
    padding: 16,
    paddingTop: 8,
  },
  productInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    marginRight: 16,
  },
  imageScroll: {
    maxHeight: 100,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 8,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 15,
    color: '#FF4B4B',
    fontWeight: '600',
    marginBottom: 4,
  },
  quantityText: {
    fontSize: 14,
    color: '#888888',
  },
 
 
  dropdownContainer: {
    padding: 16,
    backgroundColor: '#2C2C2C',
    borderRadius: 8,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  errorText: {
    color: '#FF4B4B',
    fontSize: 16,
    textAlign: 'center',
    padding: 16,
  },
  emptyContainer: {
    padding: 32,
    alignItems: 'center',
  },
  emptyMessage: {
    color: '#888888',
    fontSize: 16,
    textAlign: 'center',
  },


  buttonsContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between',  
    padding: 10,
  },
  dropdownButton: {
    backgroundColor: '#FF4B4B',  
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: '48%',  
  },
  ReorderButton: {
    backgroundColor: '#4CAF50',  
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: '48%',  
  },
  dropdownButtonText: {
    color: '#fff',  
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default Orders;



