import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './src/Screens/SplashScreen'; // Adjust path as needed
import WelcomeScreen from './src/Screens/WelcomeScreen';
import LoginScreen from './src/Screens/LoginScreen';
import LoginVerifyOtp from './src/Screens/LoginVerifyOtp';
import HomeScreen from './src/Screens/HomeScreen';
import WishlistScreen from './src/Screens/WishlistScreen';
import CartScreen from './src/Screens/CartScreen';
import AddressScreen from './src/Screens/AddressScreen';
import CheckoutScreen from './src/Screens/CheckoutScreen';
import SignupScreen from './src/Screens/SignupScreen';
import CollectionScreen from './src/Screens/CollectionScreen';
import BottomTabNavigation from './src/navigation/BottomTabNavigation';
import ProfileScreen from './src/Screens/ProfileScreen';
import UpdateProfileScreen from './src/Screens/UpdateProfileScreen';
import ContactusScreen from './src/Screens/ContactusScreen';
import TermsConditionScreen from './src/Screens/TermsConditionScreen';
import PrivacyPolicy from './src/Screens/PrivacyPolicyScreen';
import PrivacyPolicyScreen from './src/Screens/PrivacyPolicyScreen';
import NewScreen from './src/Screens/NewScreen';
import TrackScreen from './src/Screens/TrackScreen';
import TrackingOrderScreen from './src/Screens/TrackingOrderScreen';
import "react-native-gesture-handler";
import KidScreen from './src/Screens/KidScreen';
import AccessoriesScreen from './src/Screens/AccessoriesScreen';
import WomenScreen from './src/Screens/WomenScreen';
 
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="LoginVerifyOtp" component={LoginVerifyOtp} />
        <Stack.Screen name="Home"  screenOptions={{ headerShown: false }} component={BottomTabNavigation}/>
        <Stack.Screen name="Wishlist" component={WishlistScreen}/>
        <Stack.Screen name="Cart" component={CartScreen}/>
        <Stack.Screen name="Address" component={AddressScreen}/>
        <Stack.Screen name="Checkout" component={CheckoutScreen}/>
        <Stack.Screen name="Signup" component={SignupScreen}/>
        <Stack.Screen name="Collection" component={CollectionScreen}/>
        <Stack.Screen name="Profile" component={ProfileScreen}/>
        <Stack.Screen name="UpdateProfile" component={UpdateProfileScreen}/>
        <Stack.Screen name="Terms" component={TermsConditionScreen}/>
        <Stack.Screen name="Privacy" component={PrivacyPolicyScreen}/>
        <Stack.Screen name="Contact" component={ContactusScreen}/>
        <Stack.Screen name="New" component={NewScreen}/>
        <Stack.Screen name="Track" component={TrackScreen}/>
        <Stack.Screen name="Tracking" component={TrackingOrderScreen}/>
        <Stack.Screen name="Kid" component={KidScreen}/>
        <Stack.Screen name="Accessories" component={AccessoriesScreen}/>
        <Stack.Screen name="Women" component={WomenScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
