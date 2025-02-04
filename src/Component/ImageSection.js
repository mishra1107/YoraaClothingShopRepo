import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const ImageSection = ({ selectedCategory }) => {
  const images = {
    MEN: require('../assests/images/men.png'),
    WOMEN: require('../assests/images/women.png'),
    KIDS: require('../assests/images/kid.png'),
    ACCESSORIES: require('../assests/images/cap.png'),
  };

  console.log("Selected Category:", selectedCategory?.name?.trim().toUpperCase()); // Debugging Log

  return (
    <View style={styles.container}>
      {Object.keys(images).map((category, index) => {
        const isSelected = selectedCategory?.name?.trim().toUpperCase() === category; 

        return (
          <Image
            key={index}
            source={images[category]}
            style={[
              styles.image,
              isSelected && styles.highlightedImage,
            ]}
          />
        );
      })}
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
    opacity: 0.5,  // ✅ Default opacity
  },
  highlightedImage: {
    opacity: 1,  // ✅ Fully visible when selected
    borderWidth: 2, 
    borderColor: 'black', 
    borderRadius: 8, 
  },
});

export default ImageSection;
