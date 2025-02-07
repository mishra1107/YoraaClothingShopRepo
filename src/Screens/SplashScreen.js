import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { COLORS } from '../utils/constants';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
   
    const timer = setTimeout(() => {
      navigation.replace('Welcome'); 
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assests/images/Splash.png')} 
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', 
  
  },
  image: {
    width: '80%', 
    height: '50%', 
  },
});

export default SplashScreen;
