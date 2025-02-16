
// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   Image,
//   FlatList,
//   ActivityIndicator,
//   StyleSheet,
//   TouchableOpacity,
//   Alert,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Icon from 'react-native-vector-icons/MaterialIcons';

// const OrderScreen = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       const token = await AsyncStorage.getItem('token');
//       if (!token) {
//         Alert.alert('Error', 'Authentication token not found.');
//         setLoading(false);
//         return;
//       }

//       const response = await fetch('http://10.0.2.2:8080/api/orders/getAllByUser?page=1&limit=1', {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       const responseData = await response.json();
//       console.log('API Response:', responseData);

//       if (response.ok && responseData.success) {
//         if (responseData.orders.length > 0) {
//           setOrders(responseData.orders); // Store all orders
//         }
//       } else {
//         Alert.alert('Error', 'Failed to fetch orders.');
//       }
//     } catch (error) {
//       console.error('Error fetching orders:', error);
//       Alert.alert('Error', 'Something went wrong. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {/* Back Icon and Title (DO NOT CHANGE UI) */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => console.log('Back pressed')}>
//           <Icon name="arrow-back" size={24} color="black" />
//         </TouchableOpacity>
//         <Text style={styles.title}>TRACK ORDER</Text>
//       </View>

//       {/* Loading Indicator */}
//       {loading ? (
//         <ActivityIndicator size="large" color="black" />
//       ) : (
//         <FlatList
//           data={orders}
//           keyExtractor={(item) => item._id}
//           renderItem={({ item }) => (
//             <View style={styles.orderContainer}>
//               {/* Order Item - Image & Details */}
//               <View style={styles.row}>
//                 <Image source={{ uri: item.items[0]?.imageUrl }} style={styles.image} />
//                 <View style={styles.details}>
//                   {/* <Text style={styles.brandName}>LAMEREI</Text> */}
//                   <Text style={styles.productName}>{item.items[0]?.name}</Text>
//                   <Text style={styles.trackingId}>Tracking ID: #{item.awb_code}</Text>

//                   {/* Delivery / Cancellation Status */}
//                   <View style={styles.statusRow}>
//                     <Icon name="circle" size={8} color="gray" />
//                     <Text style={styles.statusText}>
//                       {item.shipping_status === 'Pending'
//                         ? `Delivery by 12/02/2024`
//                         : 'Canceled'}
//                     </Text>
//                   </View>
//                 </View>
//               </View>

//               {/* Track Order Button */}
//               <TouchableOpacity style={styles.trackButton}>
//                 <Icon name="local-shipping" size={20} color="white" />
//                 <Text style={styles.trackButtonText}>TRACK ORDER</Text>
//               </TouchableOpacity>
//             </View>
//           )}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 20,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     flex: 1,
//     textAlign: 'center',
//   },
//   orderContainer: {
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd',
//   },
//   row: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   image: {
//     width: 80,
//     height: 80,
//     marginRight: 10,
//     borderRadius: 5,
//   },
//   details: {
//     flex: 1,
//   },
//   brandName: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#000',
//   },
//   productName: {
//     fontSize: 12,
//     color: '#333',
//     marginBottom: 5,
//   },
//   trackingId: {
//     fontSize: 12,
//     fontWeight: 'bold',
//     color: '#000',
//   },
//   statusRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 5,
//   },
//   statusText: {
//     fontSize: 12,
//     color: '#666',
//     marginLeft: 5,
//   },
//   trackButton: {
//     marginTop: 10,
//     backgroundColor: 'black',
//     padding: 12,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   trackButtonText: {
//     color: 'white',
//     fontSize: 14,
//     fontWeight: 'bold',
//     marginLeft: 5,
//   },
// });

// export default OrderScreen;


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

const OrderScreen = () => {
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

      const response = await fetch('http://10.0.2.2:8080/api/orders/getAllByUser?page=1&limit=1', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const responseData = await response.json();
      console.log('API Response:', responseData);

      if (response.ok && responseData.success) {
        if (responseData.orders.length > 0) {
          setOrders(responseData.orders); // Store all orders
        }
      } else {
        Alert.alert('Error', 'Failed to fetch orders.');
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
        <TouchableOpacity onPress={() => console.log('Back pressed')}>
          <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>TRACK ORDER</Text>
      </View>

      {/* Loading Indicator */}
      {loading ? (
        <ActivityIndicator size="large" color="black" />
      ) : (
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
                      <Text style={styles.trackingId}>Tracking ID: #{item.awb_code}</Text>

                      {/* Delivery / Cancellation Status */}
                      <View style={styles.statusRow}>
                        <Icon name="circle" size={8} color="gray" />
                        <Text style={styles.statusText}>
                          {item.shipping_status === 'Pending'
                            ? `Delivery by 12/02/2024`
                            : 'Canceled'}
                        </Text>
                      </View>
                    </View>
                  </View>

                  {/* Track Order Button */}
                  <TouchableOpacity style={styles.trackButton}>
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
