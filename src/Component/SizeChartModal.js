import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Image } from 'react-native';

const SizeChartModal = ({ visible, onClose }) => {
  const [activeTab, setActiveTab] = useState('Size Chart'); 

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Close Button */}
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
          <Text style={styles.modalTitle}>SIZE CHART</Text>

          {/* Tab Section */}
          <View style={styles.tabContainer}>
            <TouchableOpacity onPress={() => setActiveTab('Size Chart')}>
              <Text style={[styles.tab, activeTab === 'Size Chart' && styles.activeTab]}>
                Size Chart
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActiveTab('How To Measure')}>
              <Text style={[styles.tab, activeTab === 'How To Measure' && styles.activeTab]}>
                How To Measure
              </Text>
            </TouchableOpacity>
          </View>

          {/* Conditional Rendering */}
          {activeTab === 'Size Chart' ? (
            // Size Chart Table
            <View style={styles.sizeChart}>
              <View style={styles.row}>
                <Text style={[styles.cell, styles.headerCell]}>XS</Text>
                <Text style={styles.cell}>23</Text>
                <Text style={styles.cell}>23</Text>
                <Text style={styles.cell}>23</Text>
                <Text style={styles.cell}>23</Text>
                <Text style={styles.cell}>23</Text>
              </View>
              <View style={styles.row}>
                <Text style={[styles.cell, styles.headerCell]}>S</Text>
                <Text style={styles.cell}>42</Text>
                <Text style={styles.cell}>42</Text>
                <Text style={styles.cell}>42</Text>
                <Text style={styles.cell}>42</Text>
                <Text style={styles.cell}>42</Text>
              </View>
              <View style={styles.row}>
                <Text style={[styles.cell, styles.headerCell]}>M</Text>
                <Text style={styles.cell}>45</Text>
                <Text style={styles.cell}>45</Text>
                <Text style={styles.cell}>45</Text>
                <Text style={styles.cell}>45</Text>
                <Text style={styles.cell}>45</Text>
              </View>
              <View style={styles.row}>
                <Text style={[styles.cell, styles.headerCell]}>L</Text>
                <Text style={styles.cell}>52</Text>
                <Text style={styles.cell}>52</Text>
                <Text style={styles.cell}>52</Text>
                <Text style={styles.cell}>52</Text>
                <Text style={styles.cell}>52</Text>
              </View>
              <View style={styles.row}>
                <Text style={[styles.cell, styles.headerCell]}>XL</Text>
                <Text style={styles.cell}>64</Text>
                <Text style={styles.cell}>64</Text>
                <Text style={styles.cell}>64</Text>
                <Text style={styles.cell}>64</Text>
                <Text style={styles.cell}>64</Text>
              </View>
              <View style={styles.row}>
                <Text style={[styles.cell, styles.headerCell]}>XXL</Text>
                <Text style={styles.cell}>72</Text>
                <Text style={styles.cell}>72</Text>
                <Text style={styles.cell}>72</Text>
                <Text style={styles.cell}>72</Text>
                <Text style={styles.cell}>72</Text>
              </View>
            </View>
          ) : (
            // "How To Measure" Image
            <View style={styles.imageContainer}>
              <Image source={require('../assests/images/Shopping.png')} style={styles.measureImage} />
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default SizeChartModal;

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
  sizeChart: {
    borderWidth: 1,
    borderColor: '#ddd',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 14,
  },
  headerCell: {
    backgroundColor: 'black',
    color: 'white',
    fontWeight: 'bold',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  measureImage: {
    width: 250, // Adjust as needed
    height: 300, // Adjust as needed
    resizeMode: 'contain',
  },
});
