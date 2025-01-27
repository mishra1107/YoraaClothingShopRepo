import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const ImageSection = () => {
  const images = [
    require('../assests/images/men.png'),
     require('../assests/images/women.png'),
    require('../assests/images/kid.png'),
    require('../assests/images/cap.png'),
  ];

  return (
    <View style={styles.container}>
      {images.map((image, index) => (
        <Image key={index} source={image} style={styles.image} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start', 
    paddingVertical: 10,
    paddingLeft: 10, 
  },
  image: {
    width: 35,
    height: 35,
    marginRight: 8, 
    resizeMode: 'contain',
  },
});

export default ImageSection;
