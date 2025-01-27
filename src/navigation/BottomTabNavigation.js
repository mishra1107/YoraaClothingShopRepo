import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/AntDesign';
import HomeScreen from '../Screens/HomeScreen';
import CollectionScreen from '../Screens/CollectionScreen';
import NewScreen from '../Screens/NewScreen';
import ProfileScreen from '../Screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: '#000',
          borderTopWidth: 0,
          height: 60,
          paddingBottom: 5,
        },
        headerShown: false,
        tabBarActiveTintColor: '#fff', // Active tab text/icon color
        tabBarInactiveTintColor: '#999', // Inactive tab text/icon color
        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: -5, // Adjust text positioning
        },
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Collection':
              iconName = 'appstore-o';
              break;
            case 'New':
              iconName = 'pluscircleo';
              break;
            case 'Profile':
              iconName = 'user';
              break;
          }

          return <Icon name={iconName} size={24} color={color} />;
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ tabBarLabel: 'Home' }} 
      />
      <Tab.Screen 
        name="Collection" 
        component={CollectionScreen} 
        options={{ tabBarLabel: 'Collection' }} 
      />
      <Tab.Screen 
        name="New" 
        component={NewScreen} 
        options={{ tabBarLabel: 'New' }} 
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ tabBarLabel: 'Profile' }} 
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
