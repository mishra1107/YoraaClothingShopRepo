import React, { useEffect, useState } from 'react';
import { 
  FlatList, 
  ImageBackground, 
  StyleSheet, 
  Text, 
  View, 
  Dimensions, 
  TouchableOpacity, 
  ActivityIndicator 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from '../constants/config';

const { width } = Dimensions.get('window');

const CollectionScreen = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  // Function to fetch categories
  const fetchCategories = async () => {
    try {
      const token = await AsyncStorage.getItem('token');  // Ensure token is stored in AsyncStorage
      const response = await fetch(`${BASE_URL}/categories`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const jsonResponse = await response.json();

      if (jsonResponse.success) {
        const categoryData = jsonResponse.data.map(item => ({
          id: item._id,
          title: item.name,
          image: { uri: item.imageUrl },
          subtitle: 'COLLECTION',
        }));
        setCollections(categoryData);
      } else {
        console.error('Failed to fetch categories:', jsonResponse.message);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.card}>
      <ImageBackground source={item.image} style={styles.imageBackground} imageStyle={styles.image}>
        <View style={styles.overlay} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
        
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

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
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CollectionScreen;
