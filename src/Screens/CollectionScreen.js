import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const { width } = Dimensions.get('window');

const collections = [
  {
    id: '1',
    title: "Men's",
    subtitle: 'COLLECTION',
    image: require('../assests/images/Shopping.png'),
  },
  {
    id: '2',
    title: "Women's",
    subtitle: 'COLLECTION',
    image: require('../assests/images/Shopping.png'),
  },
  {
    id: '3',
    title: "Kid's",
    subtitle: 'COLLECTION',
    image: require('../assests/images/Shopping.png'),
  },
];

const CollectionScreen = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.card}>
      <ImageBackground source={item.image} style={styles.imageBackground} imageStyle={styles.image}>
        {/* Dark overlay to improve text visibility */}
        <View style={styles.overlay} />
        
        {/* Text Overlay */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>COLLECTION</Text>
      <FlatList
        data={collections}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 16,
    marginLeft: 16,
    color: '#000',
  },
  listContainer: {
    paddingHorizontal: 0, 
  },
  card: {
    marginBottom: 16,
    borderRadius: 0, 
    overflow: 'hidden',
  },
  imageBackground: {
    width: width, 
    height: width * 0.9,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  image: {
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', 
  },
  textContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  subtitle: {
    color: '#fff',
    fontSize: 14,
    textTransform: 'uppercase',
  },
});

export default CollectionScreen;
