// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const BASE_URL = "http://18.144.80.232:8080/api";  

// const IconSection = ({ selectedCategory, setSelectedCategory }) => {
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         // const token = await AsyncStorage.getItem('token');
//         // if (!token) {
//         //   console.warn("No token found in AsyncStorage.");
//         //   return;
//         // }

//         const apiUrl = `${BASE_URL}/categories/`;
//         console.log("Fetching Categories from:", apiUrl);

//         const response = await fetch(apiUrl, {
//           method: "GET",
//           headers: {
//             // Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         });

//         if (!response.ok) throw new Error("Failed to fetch categories");

//         const data = await response.json();
//         console.log("Categories Data:", data);

//         if (data?.data?.length > 0) {
//           setCategories(data.data);
//           setSelectedCategory(data.data[0]);  // Default to the first category
//           console.log("Categories Data:", data.data.map(cat => cat.name));  // Log category names

//         }
//       } catch (error) {
//         console.error("Error fetching categories:", error.message);
//       }
//     };

//     fetchCategories();
//   }, []);

//   return (
//     <View style={styles.container}>
//       {categories.map((category) => (
//         <TouchableOpacity
//           key={category._id}
//           style={[
//             styles.touchable,
//             selectedCategory?._id === category._id && styles.selected,
//           ]}
//           onPress={() => setSelectedCategory(category)}
//         >
//           <Text 
//             style={[
//               styles.text, 
//               selectedCategory?._id === category._id && styles.selectedText
//             ]}
//             numberOfLines={1}
//             ellipsizeMode="tail"
//           >
//             {category.name.toUpperCase()}
//           </Text>
//         </TouchableOpacity>
//       ))}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: "row",
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 5,
//     overflow: "hidden",
//     margin: 10,
//   },
//   touchable: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: 10,
//     borderRightWidth: 1,
//     borderColor: "#ccc",
//     backgroundColor: "white",
//   },
//   selected: {
//     backgroundColor: "black", 
//   },
//   text: {
//     fontSize: 14,
//     fontWeight: "bold",
//     color: "black",
//     textAlign: 'center',
//   },
//   selectedText: {
//     color: "white",
//   },
// });

// export default IconSection;


// Tabs are scrollable designs

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = "http://18.144.80.232:8080/api";  

const IconSection = ({ selectedCategory, setSelectedCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const apiUrl = `${BASE_URL}/categories/`;
        console.log("Fetching Categories from:", apiUrl);

        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("Failed to fetch categories");

        const data = await response.json();
        console.log("Categories Data:", data);

        if (data?.data?.length > 0) {
          setCategories(data.data);
          setSelectedCategory(data.data[0]);  // Default to the first category
        }
      } catch (error) {
        console.error("Error fetching categories:", error.message);
      }
    };

    fetchCategories();
  }, []);

  return (
    <View style={styles.wrapper}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.container}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category._id}
              style={[
                styles.touchable,
                selectedCategory?._id === category._id && styles.selected,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text 
                style={[
                  styles.text, 
                  selectedCategory?._id === category._id && styles.selectedText
                ]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {category.name.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",  // Ensures ScrollView takes full width
  },
  scrollContainer: {
    flexDirection: "row",
    flexGrow: 1, // Fixes scrolling issue by ensuring proper width
  },
  container: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    overflow: "hidden",
    margin: 10,
  },
  touchable: {
    minWidth: 100, // Ensures each tab has enough space to be scrollable
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 20, // Added extra padding for better spacing
    borderRightWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "white",
  },
  selected: {
    backgroundColor: "black", 
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
    textAlign: 'center',
  },
  selectedText: {
    color: "white",
  },
});

export default IconSection;
