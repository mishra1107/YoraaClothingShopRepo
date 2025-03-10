import React, { useState } from 'react'; 
import { View, Text, Modal, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCart } from '../services/cart/CartContext';

const SizeChartModal = ({ visible, onClose, sizeChartInch, sizeChartCm, sizeMeasurement, sizes, itemId }) => {
  const navigation = useNavigation();
  const { toggleCart } = useCart();
  const [activeTab, setActiveTab] = useState('Size Chart'); 
  const [unit, setUnit] = useState('In');
  const [selectedSize, setSelectedSize] = useState('S');

  // Available sizes from the provided data
  const availableSizes = sizes.map(item => ({ size: item.size, stock: item.stock }));
  const allSizes = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'];

  // Check if a size is available and has stock
  const isSizeAvailable = (size) => {
    const sizeData = availableSizes.find(s => s.size === size);
    return sizeData && sizeData.stock > 0;
  };

  // Handle Next button press
  // In SizeChartModal
const handleNextPress = async () => {
  const token = await AsyncStorage.getItem('token');
  if (!token) {
    Alert.alert("You need to login/signin first");
    navigation.navigate('Welcome');
  } else {
    console.log("Adding to cart - Item ID:", itemId, "Selected Size:", selectedSize);
    await toggleCart(itemId, selectedSize); // Pass selectedSize along with itemId
    onClose();
    navigation.navigate('Cart');
  }
};

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Close Button */}
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
          <Text style={styles.modalTitle}>SIZE CHART</Text>

          {/* Size Selection */}
          <View style={styles.sizeSelection}>
            {allSizes.map((size) => {
              const available = isSizeAvailable(size);
              return (
                <TouchableOpacity 
                  key={size} 
                  onPress={() => available && setSelectedSize(size)}
                  disabled={!available}
                >
                  <Text 
                    style={[
                      styles.sizeText, 
                      selectedSize === size && available && styles.selectedSize,
                      !available && styles.unavailableSize
                    ]}
                  >
                    {size}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Tab Section */}
          <View style={styles.tabContainer}>
            <TouchableOpacity onPress={() => setActiveTab('Size Chart')}>
              <Text style={[styles.tab, activeTab === 'Size Chart' && styles.activeTab]}>Size Chart</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActiveTab('How To Measure')}>
              <Text style={[styles.tab, activeTab === 'How To Measure' && styles.activeTab]}>How To Measure</Text>
            </TouchableOpacity>
          </View>

          {activeTab === 'Size Chart' ? (
            <>
              {/* Unit Toggle */}
              <View style={styles.unitToggle}>
                <TouchableOpacity onPress={() => setUnit("In")} style={[styles.unitButton, unit === "In" && styles.activeUnit]}>
                  <Text style={[unit === "In" ? styles.activeUnitText : styles.unitText]}>Inch</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setUnit("Cm")} style={[styles.unitButton, unit === "Cm" && styles.activeUnit]}>
                  <Text style={[unit === "Cm" ? styles.activeUnitText : styles.unitText]}>Cm</Text>
                </TouchableOpacity>
              </View>
              {/* Size Chart Image */}
              <Image source={{ uri: unit === 'In' ? sizeChartInch : sizeChartCm }} style={styles.chartImage} />
            </>
          ) : (
            <Image source={{ uri: sizeMeasurement }} style={styles.chartImage} />
          )}

          {/* Next Button */}
          <TouchableOpacity onPress={handleNextPress} style={styles.nextButton}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// Styles remain unchanged
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  closeText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  sizeSelection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  sizeText: {
    fontSize: 14,
    color: '#777',
  },
  selectedSize: {
    fontWeight: 'bold',
    color: 'black',
    textDecorationLine: 'underline',
  },
  unavailableSize: {
    color: '#ccc',
    textDecorationLine: 'line-through',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  tab: {
    fontSize: 14,
    paddingVertical: 10,
    color: '#777',
  },
  activeTab: {
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderColor: 'black',
    color: 'black',
  },
  unitToggle: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 10,
  },
  unitButton: {
    padding: 8,
    marginHorizontal: 5,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  activeUnit: {
    backgroundColor: 'black',
    color: '#000',
  },
  chartImage: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
  },
  unitText: {
    color: "black",
  },
  activeUnitText: {
    color: "white",
  },
  nextButton: {
    backgroundColor: '#000',
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 20,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SizeChartModal;