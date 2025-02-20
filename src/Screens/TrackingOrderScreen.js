
// import React, { useEffect, useState } from "react";
// import { 
//   View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, 
//   ActivityIndicator, Linking, Alert 
// } from "react-native";
// import Icon from "react-native-vector-icons/MaterialIcons";
// const TrackingOrderScreen = ({ route, navigation }) => {
//   const { awbCode, address, imageUrl,productName } = route.params;
//   const [trackingUrl, setTrackingUrl] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [token, setToken] = useState(null);

//   useEffect(() => {
//     authenticateAndFetchTracking();
//   }, []);

//   const authenticateAndFetchTracking = async () => {
//     try {
//       // Step 1: Verify Token from Shiprocket API
//       const authResponse = await fetch("https://apiv2.shiprocket.in/v1/external/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email: "hraj6398@gmail.com",
//           password: "cxzytrewq@1Q"
//         }),
//       });

//       const authData = await authResponse.json();
//       if (!authResponse.ok || !authData.token) {
//         throw new Error("Authentication failed.");
//       }
//       const authToken = authData.token;
//       setToken(authToken);

//       // Step 2: Fetch Tracking Details with the Verified Token
//       fetchTrackingDetails(authToken);
//     } catch (error) {
//       console.error("Error authenticating or fetching tracking data:", error);
//       Alert.alert("Error", "Failed to fetch tracking details.");
//       setLoading(false);
//     }
//   };

//   const fetchTrackingDetails = async (authToken) => {
//     try {
//       const response = await fetch(`https://apiv2.shiprocket.in/v1/external/courier/track/awb/${awbCode}`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${authToken}`
//         },
//       });

//       const responseData = await response.json();
//       console.log("Tracking API Response:", responseData);

//       if (responseData.tracking_data) {
//         setTrackingUrl(responseData.tracking_data.track_url);
//       } else {
//         throw new Error("Tracking data not available.");
//       }
//     } catch (error) {
//       console.error("Error fetching tracking data:", error);
//       Alert.alert("Error", "Failed to fetch tracking URL.");
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
//           {/* <Image source={require("../assests/images/Shopping.png")} style={styles.productImage} /> */}
//           <Image source={{ uri: imageUrl }} style={styles.productImage} />
//           <View style={styles.productDetails}>
//             {/* <Text style={styles.productName}>LAMEREI</Text> */}
//             <Text style={styles.productName}>Product: {productName}</Text>
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
//           <Text style={styles.address}>
//             {`${address.firstName} ${address.lastName}, ${address.address}, ${address.city}, ${address.state}, ${address.country} - ${address.pinCode}`}
//           </Text>
//           <Text style={styles.phone}>{address.phoneNumber}</Text>
//         </View>

//         {/* Order Status */}
//         <View style={styles.section}>
//           {Array(4).fill(0).map((_, index) => (
//             <View key={index} style={styles.statusRow}>
//               <View style={styles.statusIconContainer}>
//                 <View style={styles.statusIcon} />
//                 {index < 3 && <View style={styles.dottedLine} />}
//               </View>
//               <View>
//                 <Text style={styles.statusText}>Order Placed</Text>
//                 <Text style={styles.statusDate}>on 12/02/2024</Text>
//               </View>
//             </View>
//           ))}
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
//         <TouchableOpacity 
//           style={styles.trackOrderButton} 
//           onPress={() => trackingUrl ? Linking.openURL(trackingUrl) : Alert.alert("Error", "Tracking URL not available.")}>
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
//   cancelButton: {
//     backgroundColor: "#fff",
//     borderWidth: 1,
//     borderColor: "#000",
//     paddingVertical: 14, // Adjusted padding to match Figma
//     paddingHorizontal: 16,
//     alignItems: "center",
//     marginVertical: 16,
//     borderRadius: 8, // Rounded corners as per Figma
//   },
//   cancelButtonText: {
//     fontSize: 16, // Adjusted font size for better visibility
//     fontWeight: "bold",
//     color: "#000",
//     textTransform: "uppercase", // Ensures uppercase text as per Figma
//   },




//   trackOrderButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#000",
//     paddingVertical: 20, // Increased padding for better height
//     paddingHorizontal: 16,
//     width: "100%", // Full-width button
//     position: "absolute",
//     bottom: 0, // Fixed at the bottom
//     left: 0,
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
// import Icon from "react-native-vector-icons/FontAwesome";
import Icon from "react-native-vector-icons/MaterialIcons";

// const trackingData1 = {
//   "tracking_data": {
//     "track_status": 1,
//     "shipment_status": 7,
//     "shipment_track": [
//       {
//         "id": 236612717,
//         "awb_code": "141123221084922",
//         "courier_company_id": 51,
//         "shipment_id": 236612717,
//         "order_id": 237157589,
//         "pickup_date": "2022-07-18 20:28:00",
//         "delivered_date": "2022-07-19 11:37:00",
//         "weight": "0.30",
//         "packages": 1,
//         "current_status": "Delivered",
//         "delivered_to": "Chittoor",
//         "destination": "Chittoor",
//         "consignee_name": "",
//         "origin": "Banglore",
//         "courier_agent_details": null,
//         "courier_name": "Xpressbees Surface",
//         "edd": null,
//         "pod": "Available",
//         "pod_status": "https://s3-ap-southeast-1.amazonaws.com/kr-shipmultichannel/courier/51/pod/141123221084922.png"
//       }
//     ],
//     "shipment_track_activities": [
//       {
//         "date": "2022-07-19 11:37:00",
//         "status": "DLVD",
//         "activity": "Delivered",
//         "location": "MADANPALLI, Madanapalli, ANDHRA PRADESH",
//         "sr-status": "7",
//         "sr-status-label": "DELIVERED"
//       },
//       {
//         "date": "2022-07-19 08:57:00",
//         "status": "OFD",
//         "activity": "Out for Delivery Out for delivery: 383439-Nandinayani Reddy Bhaskara Sitics Logistics  (356231) (383439)-PDS22200085719383439-FromMob , MobileNo:- 9963133564",
//         "location": "MADANPALLI, Madanapalli, ANDHRA PRADESH",
//         "sr-status": "17",
//         "sr-status-label": "OUT FOR DELIVERY"
//       },
//       {
//         "date": "2022-07-19 07:33:00",
//         "status": "RAD",
//         "activity": "Reached at Destination Shipment BagOut From Bag : nxbg03894488",
//         "location": "MADANPALLI, Madanapalli, ANDHRA PRADESH",
//         "sr-status": "38",
//         "sr-status-label": "REACHED AT DESTINATION HUB"
//       },
//       {
//         "date": "2022-07-18 21:02:00",
//         "status": "IT",
//         "activity": "InTransit Shipment added in Bag nxbg03894488",
//         "location": "BLR/FC1, BANGALORE, KARNATAKA",
//         "sr-status": "18",
//         "sr-status-label": "IN TRANSIT"
//       },
//       {
//         "date": "2022-07-18 20:28:00",
//         "status": "PKD",
//         "activity": "Picked Shipment InScan from Manifest",
//         "location": "BLR/FC1, BANGALORE, KARNATAKA",
//         "sr-status": "6",
//         "sr-status-label": "SHIPPED"
//       },
//       {
//         "date": "2022-07-18 13:50:00",
//         "status": "PUD",
//         "activity": "PickDone ",
//         "location": "RTO/CHD, BANGALORE, KARNATAKA",
//         "sr-status": "42",
//         "sr-status-label": "PICKED UP"
//       },
//       {
//         "date": "2022-07-18 10:04:00",
//         "status": "OFP",
//         "activity": "Out for Pickup ",
//         "location": "RTO/CHD, BANGALORE, KARNATAKA",
//         "sr-status": "19",
//         "sr-status-label": "OUT FOR PICKUP"
//       },
//       {
//         "date": "2022-07-18 09:51:00",
//         "status": "DRC",
//         "activity": "Pending Manifest Data Received",
//         "location": "RTO/CHD, BANGALORE, KARNATAKA",
//         "sr-status": "NA",
//         "sr-status-label": "NA"
//       }
//     ],
//     "track_url": "https://shiprocket.co//tracking/141123221084922",
//     "etd": "2022-07-20 19:28:00",
//     "qc_response": {
//       "qc_image": "",
//       "qc_failed_reason": ""
//     }
//   }
// }

const milestoneSteps = [
  { label: "Order Placed", status: "OP" },
  { label: "Picked Up", status: "PKD" },
  { label: "In Transit", status: "IT" },
  { label: "Reached at Destination", status: "RAD" },
  { label: "Out for Delivery", status: "OFD" },
  { label: "Delivered", status: "DLVD" },
];
const TrackingOrderScreen = ({ route, navigation }) => {
  const { awbCode, address,orderPlaced, imageUrl, productName, description } = route.params;
  const [trackingData, setTrackingData] = useState(null);
  const [trackingData1, setTrackingData1] = useState(null);

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
    setLoading(true)
    try {
      const response = await fetch(`https://apiv2.shiprocket.in/v1/external/courier/track/awb/${awbCode}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`
        },
      });

      const responseData = await response.json();
      console.log("trackingdetails",responseData)
      if (responseData.tracking_data) {
        setTrackingData(responseData.tracking_data);
        setTrackingData1(responseData)
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
console.log("trackingdata1",trackingData1)
if (loading) {
  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="large" color="#000" />
    </View>
  );
}
  // Ensure completedStatuses is always an array
  const completedStatuses = trackingData1.tracking_data?.shipment_track_activities
    ? trackingData1.tracking_data.shipment_track_activities.map(activity => activity.status)
    : [];

  // If completedStatuses is empty or doesn't include "OP", add "OP" to the beginning
  if (!completedStatuses.includes("OP")) {
    completedStatuses.unshift("OP");
  }

  const visibleMilestones = milestoneSteps.filter(step => completedStatuses.includes(step.status));

  console.log("visibleMilestones", visibleMilestones);
  console.log("completedStatuses", completedStatuses);

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
          <Image source={{ uri: imageUrl }} style={styles.productImage} />
          <View style={styles.productDetails}>
            <Text style={styles.productName}>Product: {productName}</Text>
            <Text style={styles.productDescription}>{description}</Text>
            <Text style={styles.trackingId}>
              Tracking ID: <Text style={styles.boldText}>#{awbCode}</Text>
            </Text>
            <Text style={styles.deliveryDate}>
              {trackingData && trackingData.shipment_track[0].delivered_date
                ? `Delivered on: ${new Date(trackingData.shipment_track[0].delivered_date).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }).replace(/ GMT.*$/, "")}`
                : trackingData && trackingData.shipment_track[0].edd
                ? `Estimated Delivery: ${new Date(trackingData.shipment_track[0].edd).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }).replace(/ GMT.*$/, "")}`
                : "Delivery date not available"}
            </Text>
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

        <View style={styles.trackingContainer}>
        {milestoneSteps.map((step, index) => {
          const isCompleted = completedStatuses.includes(step.status);
          return (
            <View key={index} style={styles.trackingStep}>
              <View style={styles.iconContainer}>
                <View style={[styles.dot, isCompleted && styles.completedDot]} />
                {index < milestoneSteps.length - 1 && <View style={styles.dashedLine} />}
              </View>
              <View>
                <Text style={[styles.stepText, isCompleted && styles.completedText]}>{step.label}</Text>
                <Text style={styles.stepDate}>
                <Text style={styles.stepDate}>
  {step.status === "OP"
    ? new Date(orderPlaced).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    : trackingData1.tracking_data.shipment_track_activities ? trackingData1.tracking_data.shipment_track_activities.find(activity => activity.status === step.status)?.date || "Pending":"Pending"}
</Text>
                </Text>
              </View>
            </View>
          );
        })}
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
          onPress={() => trackingData && trackingData.track_url ? Linking.openURL(trackingData.track_url) : Alert.alert("Error", "Tracking URL not available.")}>
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
  loaderContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
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
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: "center",
    marginVertical: 16,
    borderRadius: 8,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    textTransform: "uppercase",
  },
  trackOrderButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
    paddingVertical: 20,
    paddingHorizontal: 16,
    width: "100%",
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  trackOrderButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 8,
  },
  statusIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "gray",
  },
  activeStatus: {
    backgroundColor: "blue",
  },
  inactiveStatus: {
    backgroundColor: "gray",
  },
  dottedLine: {
    width: 2,
    height: 30,
    backgroundColor: "gray",
  },
  activeLine: {
    backgroundColor: "blue",
  },
  inactiveLine: {
    backgroundColor: "gray",
  },
   trackingContainer: {
    marginBottom: 16,
  },
  trackingStep: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  iconContainer: {
    alignItems: "center",
    marginRight: 12,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "black",
  },
  completedDot: {
    backgroundColor: "#33f9ff",
  },
  dashedLine: {
    width: 2,
    height: 20,
    backgroundColor: "gray",
    marginTop: 4,
  },
  stepText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  completedText: {
    color: "black",
  },
  stepDate: {
    fontSize: 12,
    color: "gray",
  },
});

export default TrackingOrderScreen;



