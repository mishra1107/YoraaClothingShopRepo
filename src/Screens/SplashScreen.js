import React, { useEffect } from 'react'; 
import { View, Image, StyleSheet, Dimensions, useColorScheme } from 'react-native';
import { COLORS } from '../utils/constants';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
    const colorScheme = useColorScheme();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('Welcome'); 
        }, 1000);

        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <View style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#000' : '#fff' }]}>
            <Image
    source={require('../assests/images/Splash.png')}
    style={[styles.image, { tintColor: colorScheme === 'dark' ? '#fff' : '#000' }]}
    resizeMode="contain"
/>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: width * 0.6, 
        height: height * 0.2, 
    },
});

export default SplashScreen;
