


// import React, { useEffect, useState } from 'react';
// import {
//   FlatList,
//   ImageBackground,
//   StyleSheet,
//   Text,
//   View,
//   Dimensions,
//   TouchableOpacity,
//   ActivityIndicator
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';
// import { BASE_URL } from '../constants/config';

// const { width } = Dimensions.get('window');

// const CollectionScreen = () => {
//   const [collections, setCollections] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigation = useNavigation();

//   const fetchCategories = async () => {
//     try {
//       const token = await AsyncStorage.getItem('token');
//       const response = await fetch(`${BASE_URL}/categories`, {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       const jsonResponse = await response.json();

//       if (jsonResponse.success) {
//         const categoryData = jsonResponse.data.map(item => ({
//           id: item._id,
//           title: item.name,
//           image: { uri: item.imageUrl },
//         }));
//         setCollections(categoryData);
//       } else {
//         console.error('Failed to fetch categories:', jsonResponse.message);
//       }
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const handleCategoryPress = (categoryId) => {
//     navigation.navigate('SubCategoryScreen', { categoryId });
//   };

//   const renderItem = ({ item }) => (
//     <TouchableOpacity onPress={() => handleCategoryPress(item.id)} style={styles.card}>
//       <ImageBackground source={item.image} style={styles.imageBackground} imageStyle={styles.image}>
//         <View style={styles.overlay} />
//         <View style={styles.textContainer}>
//           <Text style={styles.title}>{item.title}</Text>
//         </View>
//       </ImageBackground>
//     </TouchableOpacity>
//   );

//   if (loading) {
//     return (
//       <View style={styles.loaderContainer}>
//         <ActivityIndicator size="large" color="#000" />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>COLLECTION</Text>
//       <FlatList
//         data={collections}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id}
//         contentContainerStyle={styles.listContainer}
//         showsVerticalScrollIndicator={false}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   header: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginVertical: 16,
//     marginLeft: 16,
//     color: '#000',
//   },
//   listContainer: {
//     paddingHorizontal: 0,
//   },
//   card: {
//     marginBottom: 16,
//     borderRadius: 0,
//     overflow: 'hidden',
//   },
//   imageBackground: {
//     width: width,
//     height: width * 0.9,
//     justifyContent: 'flex-end',
//     alignItems: 'flex-start',
//   },
//   image: {
//     resizeMode: 'cover',
//   },
//   overlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(0, 0, 0, 0.3)',
//   },
//   textContainer: {
//     position: 'absolute',
//     bottom: 20,
//     left: 20,
//   },
//   title: {
//     color: '#fff',
//     fontSize: 24,
//     fontWeight: 'bold',
//     textTransform: 'uppercase',
//   },
//   loaderContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default CollectionScreen;

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

  const fetchCategories = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
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

  const handleCategoryPress = (categoryId) => {
    navigation.navigate('SubCategoryScreen', { categoryId });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleCategoryPress(item.id)} style={styles.card}>
      <ImageBackground source={item.image} style={styles.imageBackground} imageStyle={styles.image}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>COLLECTION</Text>
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
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 16,
    marginLeft: 20,
    color: '#000',
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  card: {
    marginBottom: 16,
    borderRadius: 0,
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
  },
  imageBackground: {
    width: width - 32,
    height: (width - 32) * 0.6,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  image: {
    resizeMode: 'cover',
  },
  textContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  subtitle: {
    color: '#fff',
    fontSize: 14,
    letterSpacing: 2,
    fontFamily: 'sans-serif',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CollectionScreen;