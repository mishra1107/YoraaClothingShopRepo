import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import HomeScreen from '../Screens/HomeScreen';
import CollectionScreen from '../Screens/CollectionScreen';
import NewScreen from '../Screens/NewScreen';
import ProfileScreen from '../Screens/ProfileScreen';

// Import custom icons
import HomeIcon from '../assests/images/Home.png';
import ProfileIcon from '../assests/images/Profile.png';
import NewIcon from '../assests/images/New.png';
import CollectionIcon from '../assests/images/Collection.png';

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: '#000',
          borderTopWidth: 0,
          height: 80,
          paddingTop:15
        },
        headerShown: false,
        tabBarShowLabel: false, // Hides the text labels
        tabBarIcon: ({ focused }) => {
          let iconSource;

          switch (route.name) {
            case 'Home':
              iconSource = HomeIcon;
              break;
            case 'Collection':
              iconSource = CollectionIcon;
              break;
            case 'New':
              iconSource = NewIcon;
              break;
            case 'Profile':
              iconSource = ProfileIcon;
              break;
          }

          return (
            <Image
              source={iconSource}
              style={{
                width: 24 ,
                height: 24,
                tintColor: focused ? '#fff' : '#999', // Change color on focus
              }}
              resizeMode="contain"
            />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Collection" component={CollectionScreen} />
      <Tab.Screen name="New" component={NewScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
