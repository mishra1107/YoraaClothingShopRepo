import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const ImageSection = ({ selectedCategory }) => {
  const images = {
    MENS: require('../assests/images/men.png'),
    WOMENS: require('../assests/images/women.png'),
    KIDS: require('../assests/images/kid.png'),
    ACCESSROIES: require('../assests/images/cap.png'),  // Using the same typo from API
  };

  // Normalize the selected category name for comparison
  const selectedCategoryName = selectedCategory?.name?.trim().toUpperCase();
  console.log("Selected Category (Normalized):", selectedCategoryName); // Debugging log

  return (
    <View style={styles.container}>
      {Object.keys(images).map((category, index) => {
        // Compare normalized selectedCategoryName with image keys
        const isSelected = selectedCategoryName === category;

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
    justifyContent: 'space-around',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  image: {
    width: 35,
    height: 35,
    marginHorizontal: 8,
    resizeMode: 'contain',
    opacity: 0.5,  // Default faded appearance for unselected icons
  },
  highlightedImage: {
    opacity: 1,  // Fully visible when selected
    borderWidth: 2, 
    borderColor: 'black', 
    borderRadius: 8, 
  },
});

export default ImageSection;
