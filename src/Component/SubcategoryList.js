import React from 'react'; 
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const BASE_URL = "https://api.yoraa.in/api";  
const SubCategoryList = ({ subcategories, navigation }) => {
    const fetchItemsBySubcategory = async (subcategoryId) => {
        try {
            navigation.navigate('ItemList', { subcategoryId });
        } catch (error) {
          
        }
    };
    return (
        <View>
            {subcategories.length > 0 ? (
                subcategories.map((sub) => (
                    <TouchableOpacity key={sub._id} style={styles.subcategoryCard} onPress={() => fetchItemsBySubcategory(sub._id)}>
                        <Image source={{ uri: sub.imageUrl }} style={styles.subcategoryImage} />
                        <Text style={styles.subcategoryName}>{sub.name}</Text>
                        {/* <AntDesign name="arrowright" size={20} color="black" style={styles.arrowIcon} /> */}
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
export default SubCategoryList;