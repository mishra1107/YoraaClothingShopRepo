import React from 'react';
import { View, ScrollView ,Text,TouchableOpacity, StyleSheet} from 'react-native';
import FilterSection from './../Component/FilterSection';
import IconSection from './../Component/IconSection';
import ImageSection from './../Component/ImageSection';
import CategoryList from './../Component/CategoryList';
import CardLayout from '../Component/CardLayout';
import Icon from 'react-native-vector-icons/AntDesign';
import ShoppingCarousel from '../Component/ShoppingCarosuel';
import HeaderContent from '../Component/HeaderContent';

const HomeScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <FilterSection/>
        <ImageSection/>
        <IconSection />
        <CategoryList />

      <Text style={{fontSize:20,fontWeight:'bold',marginStart:10,marginTop:20}}>COLLECTIONS</Text>
      <TouchableOpacity style={styles.row}>
      <Text style={styles.text}>SEE ALL</Text>
      <Icon name="arrowright" size={16} color="#333" style={styles.icon} />
      </TouchableOpacity>
      <CardLayout />
      <Text style={{fontSize:20,fontWeight:'bold',marginStart:10,marginTop:20}}>NEW ARRIVALS</Text>
       <ShoppingCarousel/>
       <HeaderContent/>
      
      </ScrollView>

     
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
row: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 10,
  marginHorizontal: 10,
},
text: {
  fontSize: 20,
  marginStart: 10,
  color: '#333',
},
icon: {
  marginStart: 5,
}
})
