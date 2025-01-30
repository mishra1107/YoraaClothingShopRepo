import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import SplashScreen from './src/Screens/SplashScreen';
import WelcomeScreen from './src/Screens/WelcomeScreen';
import LoginScreen from './src/Screens/LoginScreen';
import LoginVerifyOtp from './src/Screens/LoginVerifyOtp';
import SignupScreen from './src/Screens/SignupScreen';
// import HomeScreen from './src/Screens/HomeScreen';
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

// Categories
import KidScreen from './src/Screens/KidScreen';
import AccessoriesScreen from './src/Screens/AccessoriesScreen';
import WomenScreen from './src/Screens/WomenScreen';
import TopScreen from './src/Screens/TopScreen';
import BottomScreen from './src/Screens/BottomScreen';
import OutwearScreen from './src/Screens/OutwearScreen';
import EthicScreen from './src/Screens/EthicScreen';
import LoungewearScreen from './src/Screens/LoungewearScreen';
import ActiveScreen from './src/Screens/ActiveScreen';

// Navigation
import BottomTabNavigation from './src/navigation/BottomTabNavigation';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
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

        {/* Categories */}
        <Stack.Screen name="Kid" component={KidScreen} />
        <Stack.Screen name="Accessories" component={AccessoriesScreen} />
        <Stack.Screen name="Women" component={WomenScreen} />
        <Stack.Screen name="Top" component={TopScreen} />
        <Stack.Screen name="Bottom" component={BottomScreen} />
        <Stack.Screen name="Outwear" component={OutwearScreen} />
        <Stack.Screen name="Ethic" component={EthicScreen} />
        <Stack.Screen name="Loungewear" component={LoungewearScreen} />
        <Stack.Screen name="Active" component={ActiveScreen} />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
};

export default App;
