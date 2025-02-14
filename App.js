// userstatuschecklogin/logedout
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from "react-native-toast-message";
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
import TrackScreen from './src/Screens/TrackScreen';
import TrackingOrderScreen from './src/Screens/TrackingOrderScreen';
import CollectionScreen from './src/Screens/CollectionScreen';
import ProductDetailScreen from './src/Screens/ProductDetailScreen';
import ArrivalScreen from './src/Screens/ArrivalScreen';
import { WishlistProvider } from "./src/services/context/WishlistContext";
// Categories

// Navigation
import BottomTabNavigation from './src/navigation/BottomTabNavigation';
import ItemListScreen from './src/Screens/ItemListScreen';
import { CartProvider } from './src/services/cart/CartContext';
import PaymentGatewayScreen from './src/Screens/PaymentGatewayScreen';
// import { CartProvider } from "./src/services/context/CartContext";
import { initializeApp } from '@react-native-firebase/app';
import FirebaseApp from '@react-native-firebase/app';
import SubCategoryScreen from './src/Screens/SubCategoryScreen';
import GetLatestScreen from './src/Screens/GetLatestScreen';
import AllCollection from './src/Screens/AllCollection';

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
  FirebaseApp.app(); // If already initialized
}

const Stack = createStackNavigator();

const App = () => {
  const [initialRoute, setInitialRoute] = useState(null);

  // Check login state on app start
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          setInitialRoute('Home'); // Navigate to Home if token exists
        } else {
          setInitialRoute('Splash'); // Navigate to Splash/Login if not logged in
        }
      } catch (error) {
        console.error("Error checking login status:", error);
        setInitialRoute('Splash'); // Fallback in case of error
      }
    };

    checkLoginStatus();
  }, []);

  // Show nothing until login state is determined
  if (initialRoute === null) {
    return null; // or show a loading screen
  }

  return (
    <CartProvider>
    <WishlistProvider>
    <NavigationContainer>
     
      <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
        {/* Authentication Screens */}
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="LoginVerifyOtp" component={LoginVerifyOtp} />
        <Stack.Screen name="Signup" component={SignupScreen} />

        {/* Main Screens */}
        <Stack.Screen name="Home" component={BottomTabNavigation} />
        <Stack.Screen name="Wishlist" component={WishlistScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="Address" component={AddressScreen} />
        <Stack.Screen name="ItemList" component={ItemListScreen} />
        {/* Profile Screens */}
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="UpdateProfile" component={UpdateProfileScreen} />

        {/* Support Screens */}
        <Stack.Screen name="Contact" component={ContactusScreen} />
        <Stack.Screen name="Terms" component={TermsConditionScreen} />
        <Stack.Screen name="Privacy" component={PrivacyPolicyScreen} />

        {/* Order Tracking */}
        <Stack.Screen name="Track" component={TrackScreen} />
        <Stack.Screen name="Tracking" component={TrackingOrderScreen} />

        {/* Product Collections */}
        <Stack.Screen name="Collection" component={CollectionScreen} />
        <Stack.Screen name="Product" component={ProductDetailScreen} />
        <Stack.Screen name="Arrival" component={ArrivalScreen} />
        <Stack.Screen name="AllCollection" component={AllCollection} />

        {/* Categories */}
        
        <Stack.Screen name="Payment" component={PaymentGatewayScreen} />
        <Stack.Screen name="SubCategoryScreen" component={SubCategoryScreen} />
        <Stack.Screen name="GetLatest" component={GetLatestScreen} />
      </Stack.Navigator>
      
      <Toast />
    </NavigationContainer>
    </WishlistProvider>
    </CartProvider>
  );
};

export default App;



