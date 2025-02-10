import React, { useEffect, useState } from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute, useNavigation } from '@react-navigation/native';
import { BASE_URL } from '../constants/config';

const { width } = Dimensions.get('window');

const SubCategoryScreen = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const navigation = useNavigation();
  const { categoryId } = route.params;

  const fetchSubcategories = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`${BASE_URL}/subcategories/category/${categoryId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const jsonResponse = await response.json();

      if (jsonResponse.success) {
        const subcategoryData = jsonResponse.data.map(item => ({
          id: item._id,
          title: item.name,
          image: { uri: item.imageUrl },
        }));
        setSubcategories(subcategoryData);
      } else {
        console.error('Failed to fetch subcategories:', jsonResponse.message);
      }
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubcategories();
  }, []);

  const handleSubCategoryPress = (subcategoryId) => {
    navigation.navigate('ItemList', { subcategoryId });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleSubCategoryPress(item.id)}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
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
      <Text style={styles.header}>SUBCATEGORIES</Text>
      <FlatList
        data={subcategories}
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
    paddingHorizontal: 16,
  },
  card: {
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
  },
  image: {
    width: width - 32,
    height: 200,
    resizeMode: 'cover',
  },
  title: {
    padding: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SubCategoryScreen;
