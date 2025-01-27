
import React from 'react';
import { View, Text, Modal, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Ensure you have react-native-vector-icons installed

const PaymentSuccessModal = ({ visible, onClose }) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Cross Icon */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Icon name="close" size={24} color="black" />
          </TouchableOpacity>

          {/* Modal Content */}
          <Text style={styles.successText}>PAYMENT SUCCESS</Text>
          <Image
            source={require('../assests/images/paymentsucess.png')} // Replace with your local image
            style={styles.successImage}
          />
          <Text style={styles.messageText}>Your payment was successful.</Text>
          <Text style={styles.paymentIdText}>Payment ID: 15263541</Text>

          <Text style={styles.rateText}>Rate your purchase</Text>
          <View style={styles.ratingContainer}>
            {/* Replace with icons if needed */}
            <Text style={styles.ratingIcon}>😡</Text>
            <Text style={styles.ratingIcon}>😐</Text>
            <Text style={styles.ratingIcon}>😊</Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.submitButton} onPress={onClose}>
              <Text style={styles.buttonText1}>SUBMIT</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.homeButton} onPress={onClose}>
              <Text style={styles.buttonText}>BACK TO HOME</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    buttonText1: {
            fontSize: 14,
            fontWeight: 'bold',
            color: 'white',
          },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    position: 'relative', // Important for positioning the close button
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  successText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  successImage: {
    width: 72,
    height: 62,
    marginBottom: 20,
  },
  messageText: {
    fontSize: 16,
    marginBottom: 10,
  },
  paymentIdText: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 20,
  },
  rateText: {
    fontSize: 16,
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginBottom: 20,
  },
  ratingIcon: {
    fontSize: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  submitButton: {
    flex: 1,
    backgroundColor: 'black',
    paddingVertical: 10,
    marginRight: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  homeButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'black',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default PaymentSuccessModal;
