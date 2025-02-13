
import { useNavigation } from "@react-navigation/native"; 
import React, { useRef, useEffect, useState } from "react";
import { View, Text, FlatList, Image, StyleSheet, Dimensions, Animated, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get("window");

const ItemCarousel = () => {
  const navigation = useNavigation();
  const flatListRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const currentIndex = useRef(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const token = await AsyncStorage.getItem('token');
      try {
        const response = await fetch('http://18.144.80.232:8080/api/items?page=1&limit=4', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const result = await response.json();
        const images = result.items.map(item => ({ id: item._id, image: { uri: item.imageUrl } }));
        setData(images);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (flatListRef.current && data.length > 0) {
        currentIndex.current = (currentIndex.current + 1) % data.length;
        flatListRef.current.scrollToOffset({
          offset: currentIndex.current * width,
          animated: true,
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [data]);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
   

      <Image source={item.image} style={styles.image} />
    </View>
  );

  return (
    
    <View style={styles.container}>
      {/* NEW ARRIVALS Header */}
    

      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderItem}
        horizontal
        keyExtractor={(item) => item.id}
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
        {Array(4).fill().map((_, index) => {
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
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    alignSelf: "flex-start",
    marginLeft: 20,
    marginBottom: 10,
    color: "#000",
  },
  flatListContainer: {
    alignItems: "center",
  },
  card: {
    width: width,
    height: height * 0.5,
    borderRadius: 0,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
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

export default ItemCarousel;
