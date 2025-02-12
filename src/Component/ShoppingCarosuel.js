import { useNavigation } from "@react-navigation/native";
import React, { useRef, useEffect } from "react";
import { View, FlatList, Image, StyleSheet, Dimensions, Animated, TouchableOpacity, Text } from "react-native";
import Icon from 'react-native-vector-icons/Feather';

const { width, height } = Dimensions.get("window");

const ShoppingCarousel = ({ images = [] }) => {
  const navigation = useNavigation();
  const flatListRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const currentIndex = useRef(0);

  useEffect(() => {
    if (images.length > 0) {
      const interval = setInterval(() => {
        if (flatListRef.current) {
          currentIndex.current = (currentIndex.current + 1) % images.length;
          flatListRef.current.scrollToOffset({
            offset: currentIndex.current * width,
            animated: true,
          });
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [images]);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item }} style={styles.image} />
      {/* <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={styles.cartIcon}>
        <Icon name="shopping-cart" size={22} color="#000" />
      </TouchableOpacity> */}
    </View>
  );

  if (!images || images.length === 0) {
    return (
      <View style={styles.noImageContainer}>
        <Text style={styles.noImageText}>No images available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={images}
        renderItem={renderItem}
        horizontal
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToInterval={width}
        decelerationRate="fast"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        contentContainerStyle={styles.flatListContainer}
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
      />

      <View style={styles.dotsContainer}>
        {images.map((_, index) => {
          const opacity = scrollX.interpolate({
            inputRange: [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ],
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });

          return <Animated.View key={index} style={[styles.dot, { opacity }]} />;
        })}
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('New')} style={styles.exploreButton}>
        <Text style={styles.buttonText}>EXPLORE</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    justifyContent: "center",
    alignItems: "center",
  },
  noImageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: height * 0.5,
  },
  noImageText: {
    fontSize: 16,
    color: "#666",
  },
  flatListContainer: {
    alignItems: "center",
  },
  card: {
    width: width,
    height: height * 0.5,
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    position: 'relative',
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  cartIcon: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 10,
    elevation: 5,
  },
  dotsContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#000",
    marginHorizontal: 6,
  },
  exploreButton: {
    position: "absolute",
    bottom: 20,
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ShoppingCarousel;
