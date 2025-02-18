
// import React, { useEffect, useState } from "react";
// import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator, Linking } from "react-native";
// import Icon from "react-native-vector-icons/MaterialIcons";
// const TrackingOrderScreen = ({ route, navigation }) => {
//   const { awbCode, address } = route.params; // Receiving props
//   const [trackingUrl, setTrackingUrl] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchTrackingDetails();
//   }, []);

//   const fetchTrackingDetails = async () => {
//     try {
//       const response = await fetch(`https://apiv2.shiprocket.in/v1/external/courier/track/awb/${awbCode}`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       const responseData = await response.json();
//       console.log("Tracking API Response:", responseData);

//       if (responseData.tracking_data) {
//         setTrackingUrl(responseData.tracking_data.track_url);
//       }
//     } catch (error) {
//       console.error("Error fetching tracking data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Icon name="arrow-back" size={24} color="#000" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>TRACK ORDER</Text>
//       </View>

//       <ScrollView contentContainerStyle={styles.content}>
//         {/* Product Info */}
//         <View style={styles.productCard}>
//           <Image source={require("../assests/images/Shopping.png")} style={styles.productImage} />
//           <View style={styles.productDetails}>
//             <Text style={styles.productName}>LAMEREI</Text>
//             <Text style={styles.productDescription}>RECYCLE BOUCLE KNIT CARDIGAN PINK</Text>
//             <Text style={styles.trackingId}>
//               Tracking ID: <Text style={styles.boldText}>#{awbCode}</Text>
//             </Text>
//             <Text style={styles.deliveryDate}>Delivery by 12/02/2024</Text>
//           </View>
//         </View>

//         {/* Delivery Address */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>DELIVER TO</Text>
//           <Text style={styles.address}>{`${address.firstName} ${address.lastName}, ${address.address}, ${address.city}, ${address.state}, ${address.country} - ${address.pinCode}`}</Text>
//           <Text style={styles.phone}>{address.phoneNumber}</Text>
//         </View>

//         {/* Order Status */}
//         <View style={styles.section}>
//           {Array(4)
//             .fill(0)
//             .map((_, index) => (
//               <View key={index} style={styles.statusRow}>
//                 <View style={styles.statusIconContainer}>
//                   <View style={styles.statusIcon} />
//                   {index < 3 && <View style={styles.dottedLine} />}
//                 </View>
//                 <View>
//                   <Text style={styles.statusText}>Order Placed</Text>
//                   <Text style={styles.statusDate}>on 12/02/2024</Text>
//                 </View>
//               </View>
//             ))}
//         </View>

//         {/* Cancel Order Button */}
//         <TouchableOpacity style={styles.cancelButton}>
//           <Text style={styles.cancelButtonText}>CANCEL ORDER</Text>
//         </TouchableOpacity>
//       </ScrollView>

//       {/* Track Order Button (Opens URL in Browser) */}
//       {loading ? (
//         <ActivityIndicator size="large" color="#000" />
//       ) : (
//         <TouchableOpacity style={styles.trackOrderButton} onPress={() => trackingUrl && Linking.openURL(trackingUrl)}>
//           <Icon name="local-shipping" size={20} color="#fff" />
//           <Text style={styles.trackOrderButtonText}>TRACK ORDER</Text>
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ccc",
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginLeft: 16,
//   },
//   content: {
//     padding: 16,
//   },
//   productCard: {
//     flexDirection: "row",
//     marginBottom: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ccc",
//     paddingBottom: 16,
//   },
//   productImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 8,
//   },
//   productDetails: {
//     marginLeft: 16,
//     flex: 1,
//   },
//   productName: {
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   productDescription: {
//     fontSize: 14,
//     color: "#555",
//     marginVertical: 4,
//   },
//   trackingId: {
//     fontSize: 14,
//     color: "#333",
//   },
//   boldText: {
//     fontWeight: "bold",
//   },
//   deliveryDate: {
//     fontSize: 14,
//     color: "#888",
//   },
//   section: {
//     marginBottom: 16,
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: "bold",
//     marginBottom: 8,
//   },
//   address: {
//     fontSize: 14,
//     color: "#555",
//   },
//   phone: {
//     fontSize: 14,
//     color: "#555",
//     marginTop: 4,
//   },
//   statusRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   statusIconContainer: {
//     alignItems: "center",
//     marginRight: 16,
//   },
//   statusIcon: {
//     width: 24,
//     height: 24,
//     borderRadius: 12,
//     backgroundColor: "#000",
//   },
//   dottedLine: {
//     width: 2,
//     height: 40,
//     backgroundColor: "#ccc",
//     marginTop: 4,
//   },
//   statusText: {
//     fontSize: 14,
//     fontWeight: "bold",
//   },
//   statusDate: {
//     fontSize: 12,
//     color: "#555",
//   },
//   cancelButton: {
//     backgroundColor: "#fff",
//     borderWidth: 1,
//     borderColor: "#000",
//     padding: 16,
//     alignItems: "center",
//     marginVertical: 16,
//   },
//   cancelButtonText: {
//     fontSize: 14,
//     fontWeight: "bold",
//     color: "#000",
//   },
//   trackOrderButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#000",
//     padding: 16,
//   },
//   trackOrderButtonText: {
//     fontSize: 14,
//     fontWeight: "bold",
//     color: "#fff",
//     marginLeft: 8,
//   },
// });
// export default TrackingOrderScreen;


import React, { useEffect, useState } from "react";
import { 
  View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, 
  ActivityIndicator, Linking, Alert 
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
const TrackingOrderScreen = ({ route, navigation }) => {
  const { awbCode, address, imageUrl,productName } = route.params;
  const [trackingUrl, setTrackingUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    authenticateAndFetchTracking();
  }, []);

  const authenticateAndFetchTracking = async () => {
    try {
      // Step 1: Verify Token from Shiprocket API
      const authResponse = await fetch("https://apiv2.shiprocket.in/v1/external/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "hraj6398@gmail.com",
          password: "cxzytrewq@1Q"
        }),
      });

      const authData = await authResponse.json();
      if (!authResponse.ok || !authData.token) {
        throw new Error("Authentication failed.");
      }
      const authToken = authData.token;
      setToken(authToken);

      // Step 2: Fetch Tracking Details with the Verified Token
      fetchTrackingDetails(authToken);
    } catch (error) {
      console.error("Error authenticating or fetching tracking data:", error);
      Alert.alert("Error", "Failed to fetch tracking details.");
      setLoading(false);
    }
  };

  const fetchTrackingDetails = async (authToken) => {
    try {
      const response = await fetch(`https://apiv2.shiprocket.in/v1/external/courier/track/awb/${awbCode}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`
        },
      });

      const responseData = await response.json();
      console.log("Tracking API Response:", responseData);

      if (responseData.tracking_data) {
        setTrackingUrl(responseData.tracking_data.track_url);
      } else {
        throw new Error("Tracking data not available.");
      }
    } catch (error) {
      console.error("Error fetching tracking data:", error);
      Alert.alert("Error", "Failed to fetch tracking URL.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>TRACK ORDER</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Product Info */}
        <View style={styles.productCard}>
          {/* <Image source={require("../assests/images/Shopping.png")} style={styles.productImage} /> */}
          <Image source={{ uri: imageUrl }} style={styles.productImage} />
          <View style={styles.productDetails}>
            {/* <Text style={styles.productName}>LAMEREI</Text> */}
            <Text style={styles.productName}>Product: {productName}</Text>
            <Text style={styles.productDescription}>RECYCLE BOUCLE KNIT CARDIGAN PINK</Text>
            <Text style={styles.trackingId}>
              Tracking ID: <Text style={styles.boldText}>#{awbCode}</Text>
            </Text>
            <Text style={styles.deliveryDate}>Delivery by 12/02/2024</Text>
          </View>
        </View>

        {/* Delivery Address */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>DELIVER TO</Text>
          <Text style={styles.address}>
            {`${address.firstName} ${address.lastName}, ${address.address}, ${address.city}, ${address.state}, ${address.country} - ${address.pinCode}`}
          </Text>
          <Text style={styles.phone}>{address.phoneNumber}</Text>
        </View>

        {/* Order Status */}
        <View style={styles.section}>
          {Array(4).fill(0).map((_, index) => (
            <View key={index} style={styles.statusRow}>
              <View style={styles.statusIconContainer}>
                <View style={styles.statusIcon} />
                {index < 3 && <View style={styles.dottedLine} />}
              </View>
              <View>
                <Text style={styles.statusText}>Order Placed</Text>
                <Text style={styles.statusDate}>on 12/02/2024</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Cancel Order Button */}
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.cancelButtonText}>CANCEL ORDER</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Track Order Button (Opens URL in Browser) */}
      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <TouchableOpacity 
          style={styles.trackOrderButton} 
          onPress={() => trackingUrl ? Linking.openURL(trackingUrl) : Alert.alert("Error", "Tracking URL not available.")}>
          <Icon name="local-shipping" size={20} color="#fff" />
          <Text style={styles.trackOrderButtonText}>TRACK ORDER</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 16,
  },
  content: {
    padding: 16,
  },
  productCard: {
    flexDirection: "row",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 16,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  productDetails: {
    marginLeft: 16,
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productDescription: {
    fontSize: 14,
    color: "#555",
    marginVertical: 4,
  },
  trackingId: {
    fontSize: 14,
    color: "#333",
  },
  boldText: {
    fontWeight: "bold",
  },
  deliveryDate: {
    fontSize: 14,
    color: "#888",
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  address: {
    fontSize: 14,
    color: "#555",
  },
  phone: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  statusIconContainer: {
    alignItems: "center",
    marginRight: 16,
  },
  statusIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#000",
  },
  dottedLine: {
    width: 2,
    height: 40,
    backgroundColor: "#ccc",
    marginTop: 4,
  },
  cancelButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#000",
    paddingVertical: 14, // Adjusted padding to match Figma
    paddingHorizontal: 16,
    alignItems: "center",
    marginVertical: 16,
    borderRadius: 8, // Rounded corners as per Figma
  },
  cancelButtonText: {
    fontSize: 16, // Adjusted font size for better visibility
    fontWeight: "bold",
    color: "#000",
    textTransform: "uppercase", // Ensures uppercase text as per Figma
  },




  trackOrderButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
    paddingVertical: 20, // Increased padding for better height
    paddingHorizontal: 16,
    width: "100%", // Full-width button
    position: "absolute",
    bottom: 0, // Fixed at the bottom
    left: 0,
  },
  trackOrderButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 8,
  },

});
export default TrackingOrderScreen;



