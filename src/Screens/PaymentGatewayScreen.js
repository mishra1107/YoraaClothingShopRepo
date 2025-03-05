import React, { useState, useEffect } from "react";
import { View, Button, Alert, ActivityIndicator, StyleSheet } from "react-native";
import RazorpayCheckout from "react-native-razorpay";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from '@react-navigation/native'; //  Import useRoute
import { BASE_URL } from "../constants/config";
const PaymentGatewayScreen = () => {
  const navigation=useNavigation();
  const route = useRoute(); //  Get route parameters
  const { itemIds,address,cart,onPaymentSuccess,totalAmount } = route.params || {}; 
  //console.log("sssssssssssssss",itemIds)
  const [loading, setLoading] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    customerName: "",
    email: "",
    phoneNumber: "",
    amount: "", // Amount in INR
  });

  // Fetch user details from AsyncStorage
  useEffect(() => {
    
    const fetchUserDetails = async () => {
      try {
        const name = await AsyncStorage.getItem("user_name");
        const email = await AsyncStorage.getItem("user_email");
        const phoneNumber = await AsyncStorage.getItem("user_phNo");
       
        if (name && email && phoneNumber) {
          setPaymentDetails((prevDetails) => ({
            ...prevDetails,
            customerName: name,
            email: email,
            phoneNumber: phoneNumber,
            amount: totalAmount, // Set the total amount
          }));
        } else {
          console.warn("User details not found in AsyncStorage.");
        }
      } catch (error) {
        console.error("Error fetching user details from AsyncStorage:", error.message);
      }
    };
    fetchUserDetails();
  }, []);

  const handlePayment = async () => {
    setLoading(true);
    const token = await AsyncStorage.getItem("token"); // Retrieve token
    if (!token) {
      Alert.alert("Authentication Error", "User is not logged in.");
      return;
    }
    try {
      const staticAddress = {
       address: address.address,
       city:address.city,
       country:address.country,
       firstName:address.firstName,
       lastName:address.lastName,
       phoneNumber:address.phoneNumber,
       pinCode:address.pincode,
       state:address.state,
       type:address.type,
       _id:address._id,
       createdAt:address.createdAt,
       updatedAt:address.updatedAt,
       user:address.user,
       pinCode:address.pinCode

      };
     
      const orderResponse = await fetch(`${BASE_URL}/razorpay/create-order`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` //  Pass token here
        },
                body: JSON.stringify({ amount: paymentDetails.amount, itemIds,staticAddress,cart }),
      });
  
      const orderData = await orderResponse.json();
      if (!orderData.id) throw new Error("Order creation failed");
  
      const options = {
        key: "rzp_live_VRU7ggfYLI7DWV",
        amount: orderData.amount,
        currency: "INR",
        name: paymentDetails.customerName,
        description: "Order Payment",
        order_id: orderData.id,
        prefill: {
          name: paymentDetails.customerName,
          email: paymentDetails.email,
          contact: paymentDetails.phoneNumber,
        },
        theme: { color: "#F37254" },
      };
  
      const paymentResponse = await RazorpayCheckout.open(options);
      // Verify Payment
      const verifyResponse = await fetch(`${BASE_URL}/razorpay/verify-payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentResponse),
      });
      //console.log("verifyResponse",verifyResponse)

      const verifyData = await verifyResponse.json();
      //console.log("verifyData",verifyData)
      if (verifyData.success) {
        Alert.alert("Success", "Payment successful!");
     
        if (onPaymentSuccess) {
          onPaymentSuccess(); 
      }
        navigation.navigate('Order')
        
      } else {
        Alert.alert("Error", "Payment verification failed.");
      }
    } catch (error) {
      console.error("Payment Error:", error);
      Alert.alert("Payment Failed", "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Button
        title={loading ? "Processing..." : `Pay ₹${paymentDetails.amount}`}
        onPress={handlePayment}
        disabled={loading || !paymentDetails.customerName}
      />
      {loading && <ActivityIndicator size="large" color="#F37254" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
});

export default PaymentGatewayScreen;



