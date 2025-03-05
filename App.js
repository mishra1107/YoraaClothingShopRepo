import React, { useEffect, useState } from 'react';
import { Alert, PermissionsAndroid, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from "react-native-toast-message";
import messaging from '@react-native-firebase/messaging';
import { initializeApp } from '@react-native-firebase/app';
import FirebaseApp from '@react-native-firebase/app';
// Screens & Contexts
import SplashScreen from './src/Screens/SplashScreen';
import WelcomeScreen from './src/Screens/WelcomeScreen';
import LoginScreen from './src/Screens/LoginScreen';
import LoginVerifyOtp from './src/Screens/LoginVerifyOtp';
import SignupScreen from './src/Screens/SignupScreen';
import WishlistScreen from './src/Screens/WishlistScreen';
import CartScreen from './src/Screens/CartScreen';
import AddressScreen from './src/Screens/AddressScreen';
import ProfileScreen from './src/Screens/ProfileScreen';
import EditProfileScreen from './src/Screens/EditProfileScreen';
import UpdateProfileScreen from './src/Screens/UpdateProfileScreen';
import ContactusScreen from './src/Screens/ContactusScreen';
import TermsConditionScreen from './src/Screens/TermsConditionScreen';
import PrivacyPolicyScreen from './src/Screens/PrivacyPolicyScreen';
import TrackingOrderScreen from './src/Screens/TrackingOrderScreen';
import CollectionScreen from './src/Screens/CollectionScreen';
import ProductDetailScreen from './src/Screens/ProductDetailScreen';
import ArrivalScreen from './src/Screens/ArrivalScreen';
import { WishlistProvider } from "./src/services/context/WishlistContext";
import BottomTabNavigation from './src/navigation/BottomTabNavigation';
import ItemListScreen from './src/Screens/ItemListScreen';
import { CartProvider } from './src/services/cart/CartContext';
import PaymentGatewayScreen from './src/Screens/PaymentGatewayScreen';
import SubCategoryScreen from './src/Screens/SubCategoryScreen';
import GetLatestScreen from './src/Screens/GetLatestScreen';
import AllCollection from './src/Screens/AllCollection';
import ResetPasswordScreen from './src/Screens/ResetPasswordScreen';
import OrderScreen from './src/Screens/OrderScreen';
import FilterScreen from './src/Screens/FilterScreen';
import DeleteAccount from './src/Screens/DeleteAccount';
import ReturnOrderScreen from './src/Screens/ReturnOrderScreen';
import RefundScreen from './src/Screens/RefundScreen';
// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAEJSB5QJl_0MEr13gjLzBNYxdXuUliSk",
  authDomain: "ecommerce-e038c.firebaseapp.com",
  projectId: "ecommerce-e038c",
  storageBucket: "ecommerce-e038c.firebasestorage.app",
  messagingSenderId: "841829729642",
  appId: "1:841829729642:web:ecd6b4d97b2796617cd113",
  measurementId: "G-T9C3WQSSP3"
};

// Initialize Firebase if not already initialized
if (!FirebaseApp.apps.length) {
  initializeApp(firebaseConfig);
} else {
  FirebaseApp.app();
}

const Stack = createStackNavigator();

const App = () => {
  const [initialRoute, setInitialRoute] = useState(null);

  // Function to request Notification Permission (Android)
  const requestUserPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Notification permission granted');
        } else {
          console.log('Notification permission denied');
        }
      } catch (error) {
        console.error('Error requesting notification permission:', error);
      }
    }
  };

  // Function to Get FCM Token
  const getFCMToken = async () => {
    try {
      const token = await messaging().getToken();
      console.log('FCM Token:', token);
      await AsyncStorage.setItem('fcmToken', token);
      console.log('zaibaaa fcmToken',token)
    } catch (error) {
      console.error('Error getting FCM token:', error);
    }
  };


  const sendFCMTokenToServer = async () => {
    try {
        // Retrieve FCM Token
        const fcmToken = await AsyncStorage.getItem('fcmToken');
        if (!fcmToken) {
            console.log('No FCM token found');
            return;
        }

        // Retrieve Auth Token
        const authToken = await AsyncStorage.getItem('token');
        if (!authToken) {
            console.log('No Auth token found');
            return;
        }

        // API URL
        const apiUrl = 'https://api.yoraa.in/api/save-token';

        // Request Body
        const requestBody = JSON.stringify({
            token: fcmToken
        });

        // API Call
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: requestBody
        });

        const data = await response.json();
        console.log('FCM Token Save Response:', data);

        if (data.success) {
            console.log('zaibaaa FCM Token successfully saved to server');
        } else {
            console.error('Error saving FCM token:', data.message);
        }

    } catch (error) {
        console.error('Error sending FCM token to server:', error);
    }
};

  // Handle Incoming Notifications
  useEffect(() => {
    requestUserPermission();
    getFCMToken();
    sendFCMTokenToServer();

    // Foreground notification listener
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('Foreground Notification:', remoteMessage);
      Alert.alert(remoteMessage.notification?.title, remoteMessage.notification?.body);
    });

    // Handle Notification Tap (when the app is in the background)
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('Notification caused app to open from background:', remoteMessage);
    });

    // Handle Notification Tap (when the app is completely closed)
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log('Notification caused app to open from quit state:', remoteMessage);
        }
      });

    return unsubscribe;
  }, []);

  // Check login state on app start
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        setInitialRoute(token ? 'Home' : 'Splash');
      } catch (error) {
        console.error("Error checking login status:", error);
        setInitialRoute('Splash');
      }
    };
    checkLoginStatus();
  }, []);

  if (initialRoute === null) {
    return null;
  }

  return (
    <CartProvider>
      <WishlistProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="LoginVerifyOtp" component={LoginVerifyOtp} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Home" component={BottomTabNavigation} />
            <Stack.Screen name="Wishlist" component={WishlistScreen} />
            <Stack.Screen name="Cart" component={CartScreen} />
            <Stack.Screen name="Address" component={AddressScreen} />
            <Stack.Screen name="ItemList" component={ItemListScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
            <Stack.Screen name="UpdateProfile" component={UpdateProfileScreen} />
            <Stack.Screen name="Contact" component={ContactusScreen} />
            <Stack.Screen name="Terms" component={TermsConditionScreen} />
            <Stack.Screen name="Privacy" component={PrivacyPolicyScreen} />
            <Stack.Screen name="Order" component={OrderScreen} />
            <Stack.Screen name="Tracking" component={TrackingOrderScreen} />
            <Stack.Screen name="Collection" component={CollectionScreen} />
            <Stack.Screen name="Product" component={ProductDetailScreen} />
            <Stack.Screen name="Arrival" component={ArrivalScreen} />
            <Stack.Screen name="AllCollection" component={AllCollection} />
            <Stack.Screen name="Payment" component={PaymentGatewayScreen} />
            <Stack.Screen name="SubCategoryScreen" component={SubCategoryScreen} />
            <Stack.Screen name="GetLatest" component={GetLatestScreen} />
            <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
            <Stack.Screen name="Filter" component={FilterScreen} />
            <Stack.Screen name="Delete" component={DeleteAccount} />
            <Stack.Screen name="ReturnOrder" component={ReturnOrderScreen} />
            <Stack.Screen name="Refund" component={RefundScreen} />
          </Stack.Navigator>
          <Toast />
        </NavigationContainer>
      </WishlistProvider>
    </CartProvider>
  );
};

export default App;
