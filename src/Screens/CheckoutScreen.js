import React  ,{ useState }from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import PaymentSucessModal from '../Component/PaymentSucessModal';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import { useNavigation } from '@react-navigation/native';


const CheckoutScreen = () => {

  const navigation=useNavigation();
  
    const [isModalVisible, setModalVisible] = useState(false);

  const handleCheckout = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };
  return (
    <View style={styles.container}>
      {/* Header */}
      <TouchableOpacity   onPress={() => navigation.navigate('Address')}
                 style={styles.backButton}>
      <View style={styles.header}>

         
                 <Icon name="arrow-back" size={24} color="black" />
           
        <Text style={styles.headerText}>CHECKOUT</Text>
      </View>
      </TouchableOpacity>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Cards Section */}
      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CARDS</Text>
          <View style={styles.cardContainer}>
            <View style={styles.card}>
              <Image
                source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png' }}
                style={styles.cardIcon}
                resizeMode="contain"
              />
              <View style={styles.cardDetails}>
                <Text style={styles.cardTitle}>Personal</Text>
                <Text style={styles.cardInfo}>**** 6913 | Secured</Text>
              </View>
            </View>
            <View style={styles.card}>
              <Image
                source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png' }}
                style={styles.cardIcon}
                resizeMode="contain"
              />
              <View style={styles.cardDetails}>
                <Text style={styles.cardTitle}>Personal</Text>
                <Text style={styles.cardInfo}>**** 9818 | Secured</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.addCard}>
              <Text style={styles.addCardText}>Add credit or debit cards</Text>
              <Text style={styles.addButton}>ADD</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* UPI Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PAY BY ANY UPI APP</Text>
          <View style={styles.upiContainer}>
            <TouchableOpacity style={styles.upiOption}>
              <Image
                source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKIAAACUCAMAAAAnDwKZAAAAe1BMVEVfJZ////+dhMFVCprm3+9RAJnj3O1dHJ/Tx+S8qtVUBZpcH55dIZ5bHJ1YFpxXEptFAJPb0On6+Pzt6PP28/qMbre/r9aGY7SYe7+0oNDf1uqnkMdnM6NlL6J9Wa6dgMJtPqZ3S6x0Rap5UKzLvt6tmMymjMjGt9uIaLWJUB20AAADUElEQVR4nO2bbXOiMBCAgyEWSUJAUPEdX1r9/7/w0N5ddTed63WAbGf2+aodn9mUZZPdCMEwDMMwDMN8js6csya0xec4ud3Vo/21cTa0ig/tclnPi2nUEl+OKrQPxGS2mSXl3e9OVcvQTs/o5nUVAda04mjnULBlQcpRoxi2TBcutNcDLyOPYlQ2WWixB1ztc4w1pdyT7yuPYyEoJXHpjeOF1COjDlOP41KRiuPVt9YjUnF0R08cp7M0tNcj7hh74niilB5Fdiix4rihlHqEVZ44xltajk2BHRNJ6bEW1ve+ntOqzLQ7Y8cJqdQjrPA4zmg5mvyC02NNKvW0gZwgx4pWehRGLpFjSSv1tEXFGjmONzq01RPGveH0mIe2AihcQM4dqRR+K3JR4fNKK4W3jjMUx5pWemzXeoGKXFIb1xtuB9e6PFDauN5wR1hAlpuB0qNRXyTfwMKnePrbHtd9Hn+RMarDy4dPk6vrKZ8r/A7+LkVP24bcU1p/l2TbSz7vUjFa9/L/2KliQV+x+gGKvSTzHxDFDpNOX4p2R15RZL4WAS1F4ya+A89vkfT0njbqOknegS/h+JwgYN24+vhocuxt12VleidPwM9P8hSg1Bh8Z//xnb7qiAckUsTF/wtUHA26iWFFVmRFVmRFVmRFVmRFVmRFVmTFTkih4hm3+gIrKtgfL8hFUcHjnRKPiYVeaNjVnR5QDyCwoluAn/cM+gZW1AIqrtBgZWBFkUPF6A2GMbgizDpRtEif4qjTwIoOjyNP10r9PpMzWipXwzPIgRX1yTP9Ge+3763SbFNfYnSiO7CiyDwDWC3VuEhWpf+8eWhFz0r/i6EVjfPMftJS9I3kUFM02f823AZXFNb3UNNSFBJPiFFTFApPA1JTFO6/HIMomgxPLBJTbNd657veREpRuM3yq+3VUIpCO/PmeSlXqxqO9QdTvPWA5WKZjP9mySpO5qNjjjqpARVbMmma0+46a7nuTo1w0prQVTfGaGuzFqu1uZff9BQRrNgFrNgFrNgFrNgFrNgFlr5iCotdeoroyJ6eYganRukpivxMXlGDCxszajdzxO0W6OVhUxOH1vFi1Gn5Z4J1TutS9wdWZeYdSdSQYRiGYRiGYRimI34BgKg2BCZjtJIAAAAASUVORK5CYII=' }}
                style={styles.upiIcon}
                resizeMode="contain"
              />
              <Text style={styles.upiText}>PhonePe UPI</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.upiOption}>
              <Image
                source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlcus-iMKZPf_FQZx-w7oUJxhICAg--KEdhGltl7ujsEmAFM03O6w-ZwY&s' }}
                style={styles.upiIcon}
                resizeMode="contain"
              />
              <Text style={styles.upiText}>Paytm UPI</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.upiOption}>
              <Image
                source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB6UP_P74zBRFqjv7DutImH_kpIhmN9zpfhXWglNILZq_Lx-HQ-tFSPtk&s' }}
                style={styles.upiIcon}
                resizeMode="contain"
              />
              <Text style={styles.upiText}>Google Pay UPI</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.upiOption}>
              <Image
                source={{ uri: 'data:image/jpeg;base64,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' }}
                style={styles.upiIcon}
                resizeMode="contain"
              />
              <Text style={styles.upiText}>Bharat Pay UPI</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.upiOption}>
              <Image
                source={{ uri: 'data:image/png;base64,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' }}
                style={styles.upiIcon}
                resizeMode="contain"
              />
              <Text style={styles.upiText}>Amazon Pay UPI</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.totalText}>TOTAL</Text>
        <Text style={styles.totalAmount}>₹ 240</Text>
        <TouchableOpacity onPress={handleCheckout} style={styles.checkoutButton}>
          <Text style={styles.checkoutText}>CHECKOUT</Text>
        </TouchableOpacity>
      </View>
      <PaymentSucessModal visible={isModalVisible} onClose={handleCloseModal} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
  },
  backButton: {
    position: 'absolute',
    left: 16,
  },
  backIcon: {
    fontSize: 18,
    color: '#000',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#757575',
    marginBottom: 8,
  },
  cardContainer: {
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    padding: 8,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
  },
  cardIcon: {
    width: 36,
    height: 36,
    marginRight: 16,
  },
  cardDetails: {
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 16,
  },
  upiContainer: {
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    padding: 8,
  },
  upiOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
  },
  upiIcon: {
    width: 36,
    height: 36,
    marginRight: 16,
  },
  upiText: {
    fontSize: 16,
    color: '#000',
  },
  footer: {
    borderTopWidth: 1,
    borderColor: '#E0E0E0',
    padding: 16,
    backgroundColor: '#FFF',
  },
  totalText: {
    fontSize: 16,
    color: '#757575',
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 4,
  },
  checkoutButton: {
    backgroundColor: '#000',
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
    padding: 12,
  },
  checkoutText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CheckoutScreen;
