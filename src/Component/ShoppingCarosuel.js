import { useNavigation } from "@react-navigation/native";
import React, { useRef, useEffect } from "react";
import { View, Text, FlatList, Image, StyleSheet, Dimensions, Animated, TouchableOpacity } from "react-native";

const { width, height } = Dimensions.get("window");

const data = [
  { id: "1", image: require('../assests/images/Shopping.png') },
  { id: "2", image: require('../assests/images/Shopping.png') },
  { id: "3", image: require('../assests/images/Shopping.png') },
  { id: "4", image: require('../assests/images/Shopping.png') },
];

const ShoppingCarousel = () => {
  const navigation = useNavigation();
  const flatListRef = useRef(null);
  const currentIndex = useRef(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      if (flatListRef.current) {  // ✅ Ensure FlatList ref is set before scrolling
        currentIndex.current = (currentIndex.current + 1) % data.length;
        flatListRef.current.scrollToIndex({
          index: currentIndex.current,
          animated: true,
          viewPosition: 0.5, // Center the item
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderItem}
        horizontal
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        contentContainerStyle={{ alignItems: "center" }}
        initialScrollIndex={0} // ✅ Ensures list is ready for `scrollToIndex`
        getItemLayout={(data, index) => ({
          length: width * 0.8, // Width of each item
          offset: (width * 0.8) * index,
          index,
        })}
      />
      <View style={styles.dotsContainer}>
        {data.map((_, index) => {
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
  card: {
    width: width * 0.8,
    height: height * 0.6,
    borderRadius: 15,
    overflow: "hidden",
    marginHorizontal: width * 0.05,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  dotsContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 90,
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
    bottom: 30,
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
