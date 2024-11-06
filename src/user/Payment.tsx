import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Payment = () => {
  const [selectedPayment, setSelectedPayment] = useState(''); // Track selected payment method

  return (
    <View style={styles.container}>
      {/* UPI Header */}
      <Text style={styles.upi}>UPI</Text>

      {/* Placeholder for additional payment options */}
      <View style={styles.payment}>
        {/* Google Pay Section */}
        <TouchableOpacity
          style={styles.paymentMethod}
          onPress={() => setSelectedPayment('Google Pay')} // Set selected payment to Google Pay
        >
          <Image
            source={require('../assets/new/Google.png')}
            style={styles.paymentIcon}
          />
          <Text style={styles.paymentText}>Google Pay</Text>
          <View style={styles.radioCircle}>
            {selectedPayment === 'Google Pay' && (
              <View style={styles.selectedRb} />
            )}
          </View>
        </TouchableOpacity>

        {/* Phone Pay Section */}
        <TouchableOpacity
          style={styles.paymentMethod}
          onPress={() => setSelectedPayment('Phone Pay')} // Set selected payment to Phone Pay
        >
          <Image
            source={require('../assets/new/PhonePe.png')}
            style={styles.paymentIcon}
          />
          <Text style={styles.paymentText}>Phone Pay</Text>
          <View style={styles.radioCircle}>
            {selectedPayment === 'Phone Pay' && (
              <View style={styles.selectedRb} />
            )}
          </View>
        </TouchableOpacity>
      </View>

      <Text style={styles.upi}>Credit and Debit Cards</Text>
      <View style={styles.credit}>
        <TouchableOpacity style={styles.add}>
          <Image
            source={require('../assets/new/plus.png')}
            style={styles.plus}
          />
          <Text style={styles.add1}>Add New Card</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnt}>Proceed</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    opacity: 0.92,
    marginTop:vw(-10)
  },
  upi: {
    color: '#000000',
    fontSize: vw(5),
    fontWeight: '600',
    marginLeft: vw(12),
    marginTop: hp(5.5),
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(2),
    marginLeft: vw(7.5),
  },
  paymentIcon: {
    width: vw(15),
    height: vw(15),
    marginRight: vw(3),
    marginLeft: vw(1),
  },
  paymentText: {
    fontSize: vw(5),
    color: '#000000',
    fontWeight: '400',
  },
  payment: {
    backgroundColor: '#E0E5EC',
    marginTop: hp(1),
    width: vw(80),
    height: hp(30),
    padding: vw(5),
    borderRadius: vw(7.5),
    alignSelf: 'center',
  },
  credit: {
    backgroundColor: '#E0E5EC',
    marginTop: hp(1),
    width: vw(80),
    height: hp(22),
    padding: vw(5),
    borderRadius: vw(7.5),
    alignSelf: 'center',
  },
  btn: {
    backgroundColor: '#355ADC',
    width: vw('38%'),
    height: hp('7%'),
    alignSelf: 'center',
    marginTop: vw(12),
    borderRadius: vw(5),
  },
  btnt: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: vw(6),
    marginTop: vw(2.5),
  },
  add: {
    backgroundColor: '#FFFFFF',
    opacity: 0.85,
    width: vw(75),
    height: hp(8),
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: vw(4),
    marginTop: hp(4),
  },
  add1: {
    color: 'black',
    fontSize: vw(4),
    marginLeft: vw(5),
    fontWeight: '400',
  },
  plus: {
    width: vw('19%'),
    height: hp('18%'),
    marginLeft: vw(2.5),
    resizeMode: 'contain',
    marginTop: vw(3),
  },
  // Radio button styles
  radioCircle: {
    height: vw(6),
    width: vw(6),
    borderRadius: vw(3),
    borderWidth: 1,
    marginTop: vw(2.5),
    backgroundColor: '#FFF',
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: vw(8),
  },
  selectedRb: {
    width: vw(3.5),
    height: vw(3.5),
    borderRadius: vw(1.75),
    backgroundColor: '#355ADC',
  },
});
