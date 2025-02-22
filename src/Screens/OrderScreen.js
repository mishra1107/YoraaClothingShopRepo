
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from '../constants/config';
const OrderScreen = () => {
  const navigation = useNavigation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);
  const fetchOrders = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'Authentication token not found.');
        setLoading(false);
        return;
      }

      const response = await fetch(`${BASE_URL}/orders/getAllByUser?page=1&limit=1`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const responseData = await response.json();
      console.log('API Response:', responseData.orders);

      if (response.ok && responseData.success) {
        if (responseData.orders.length > 0) {
          setOrders(responseData.orders); // Store all orders
        }
      } else {
        Alert.alert('order', 'No order found here.');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Icon and Title (DO NOT CHANGE UI) */}
      <View style={styles.header}>
        
        <TouchableOpacity
                style={styles.backIcon}
                onPress={() => navigation.navigate('Home')} >
                <Image 
                  source={require('../assests/images/BackArrow.png')} 
                  style={styles.backIconImage}
                />
              </TouchableOpacity>

        <Text style={styles.title}>TRACK ORDER</Text>
      </View>

      {/* Loading Indicator */}
      {loading ? (
        <ActivityIndicator size="large" color="black" />
      ) 
      :  orders.length === 0 ? (
        // Display "No Orders" message when list is empty
        <View style={styles.noOrdersContainer}>
          <Text style={styles.noOrdersText}>No orders available</Text>
        </View> ) : 
        
       (
        <FlatList
          data={orders}
          keyExtractor={(order) => order._id}
          renderItem={({ item }) => (
            <View>
              {item.items.map((product, index) => (
                <View key={index} style={styles.orderContainer}>
                  {/* Order Item - Image & Details */}
                  <View style={styles.row}>
                    <Image source={{ uri: product.imageUrl }} style={styles.image} />
                    <View style={styles.details}>
                      <Text style={styles.productName}>{product.name}</Text>
                      <Text style={styles.productName}>{product.description}</Text>

                      <Text style={styles.trackingId}>Tracking ID: #{item.awb_code}</Text>

                      {/* Delivery / Cancellation Status */}
                      <View style={styles.statusRow}>
                        <Icon name="circle" size={8} color="gray" />
                        <Text style={styles.statusText}>
                          Order at {new Date(item.created_at).toLocaleString("en-IN", {
                            timeZone: "Asia/Kolkata",
                            hour12: true, // Optional, for 12-hour format with AM/PM
                          }).replace(/ GMT.*$/, "")}
                        </Text>

                      </View>
                    </View>
                  </View>

                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('Tracking', {
                        awbCode: item.awb_code,
                        address: item.address, // Pass address as prop
                        imageUrl: product.imageUrl, // Pass image URL as prop
                        productName: product.name,
                        description:product.description,
                        orderPlaced:item.created_at,
                        orderId:orders[0]._id

                      })
                    }
                    style={styles.trackButton}
                  >
                    <Icon name="local-shipping" size={20} color="white" />
                    <Text style={styles.trackButtonText}>TRACK ORDER</Text>
                  </TouchableOpacity>

                </View>
              ))}
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  noOrdersContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noOrdersText: {
    fontSize: 16,
    color: '#666',
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  orderContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 5,
  },
  details: {
    flex: 1,
  },
  productName: {
    fontSize: 12,
    color: '#333',
    marginBottom: 5,
  },
  trackingId: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  statusText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 5,
  },
  trackButton: {
    marginTop: 10,
    backgroundColor: 'black',
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  trackButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default OrderScreen;
