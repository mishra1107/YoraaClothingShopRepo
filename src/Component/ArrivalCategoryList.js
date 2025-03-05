import React from 'react'; 
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ArrivalCategoryList = ({ subcategories, navigation }) => {
    const fetchItemsBySubcategory = async (subcategoryId) => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                console.warn(" No token found in AsyncStorage.");
                return;
            }
            navigation.navigate('GetLatest', { subcategoryId });
        } catch (error) {
            console.error(" Error fetching items:", error.message);
        }
    };
    return (
        <View>
            {subcategories.length > 0 ? (
                subcategories.map((sub) => (
                    <TouchableOpacity key={sub._id} style={styles.subcategoryCard} onPress={() => fetchItemsBySubcategory(sub._id)}>
                        <Image source={{ uri: sub.imageUrl }} style={styles.subcategoryImage} />
                        <Text style={styles.subcategoryName}>{sub.name}</Text>
                          <Text style={styles.optionArrow}>›</Text>
                    </TouchableOpacity>
                ))
            ) : (
                <Text style={styles.noDataText}>No Subcategories Available</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    optionArrow: {
        fontSize: 25,
        color: '#000',
        marginRight:20
      },
    subcategoryCard: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderBottomWidth: 1,
        borderColor: "#ccc",
    },
    subcategoryImage: {
        width: 76,
        height: 76,
        marginRight: 15,
    },
    subcategoryName: {
        fontSize: 16,
        fontWeight: "light",
        flex: 1,
    },
    arrowIcon: {
        padding: 10,
    },
    noDataText: {
        textAlign: "center",
        fontSize: 16,
        color: "gray",
        marginVertical: 10,
    },
});
export default ArrivalCategoryList;