import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; 
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const categories = [
  {
    id: "1",
    title: "ALL CLOTHING",
    image: require('../assests/images/Shopping.png'),
  },
  {
    id: "2",
    title: "WINTER WEAR",
    image: require('../assests/images/Shopping.png'),
  },
  {
    id: "3",
    title: "YOUTH 8-16 YEARS",
    image: require('../assests/images/Shopping.png'),
  },
  {
    id: "4",
    title: "KIDS 4-8 YEARS",
    image: require('../assests/images/Shopping.png'),
  },
  {
    id: "5",
    title: "TODDLERS 0-4 YEARS",
    image: require('../assests/images/Shopping.png'),
  },
  {
    id: "6",
    title: "KIDS 4-8 YEARS",
    image: require('../assests/images/Shopping.png'),
  },
  {
    id: "7",
    title: "TODDLERS 0-4 YEARS",
    image: require('../assests/images/Shopping.png'),
  },
  {
    id: "8",
    title: "TODDLERS 0-4 YEARS",
    image: require('../assests/images/Shopping.png'),
  },
  {
    id: "9",
    title: "TODDLERS 0-4 YEARS",
    image: require('../assests/images/Shopping.png'),
  },
];

const AccessoriesScreen = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => alert(`Selected: ${item.title}`)}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Icon name="chevron-right" size={16} color="#999" style={styles.arrow} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 15,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  arrow: {
    marginRight: 10,
  },
});

export default AccessoriesScreen;
