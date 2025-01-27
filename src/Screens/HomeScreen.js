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
import SeeAll from '../Component/SeeAll';

const HomeScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <FilterSection/>
        <ImageSection/>
        <IconSection />
        <CategoryList />

      <Text style={{fontSize:20,fontWeight:'bold',marginStart:20,marginTop:20}}>COLLECTIONS</Text>
     <SeeAll/>
      <CardLayout />
      <Text style={{fontSize:20,fontWeight:'bold',marginStart:20,marginTop:20}}>NEW ARRIVALS</Text>
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
