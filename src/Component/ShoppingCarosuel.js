
import { useNavigation } from "@react-navigation/native";
import React, { useRef, useEffect } from "react";
import { View, FlatList, Image, StyleSheet, Dimensions, Animated, TouchableOpacity, Text } from "react-native";

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
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [images]);
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item }} style={styles.image} />
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

      <View style={styles.indicatorContainer}>
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

          return (
            <View key={index} style={styles.indicatorWrapper}>
              <Animated.View style={[styles.squareDot, { opacity }]} />
              <Animated.View style={[styles.line, { height: opacity.interpolate({
                inputRange: [0.3, 1],
                outputRange: [0, 20],
                extrapolate: "clamp",
              }) }]} />
            </View>
          );
        })}
      </View>
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
    borderRadius: 1,
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
  indicatorContainer: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -30 }],
    alignItems: "center",
  },
  indicatorWrapper: {
    alignItems: "center",
    marginVertical: 5,
  },
  squareDot: {
    width: 8,
    height: 8,
    backgroundColor: "#fff",
  },
  line: {
    width: 2,
    backgroundColor: "#fff",
    marginTop: 2,
  },
});

export default ShoppingCarousel;

