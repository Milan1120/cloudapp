import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import { widthPercentageToDP as vw, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Addcard = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [saveCard, setSaveCard] = useState(false); // Use this state for the checkbox

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Card</Text>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Card Number"
          placeholderTextColor="#808080"
          keyboardType="number-pad"
          value={cardNumber}
          onChangeText={setCardNumber}
        />

        {/* Valid Through (MM/YY) and CVV */}
        <View style={styles.row}>
          <TextInput
            style={[styles.input, { flex: 0.7, marginRight: vw(1), marginLeft: vw(8) }]}
            placeholder="Valid Through (MM/YY)"
            placeholderTextColor="#808080"
            value={expiryDate}
            onChangeText={setExpiryDate}
            keyboardType="number-pad"
          />
          <TextInput
            style={[styles.input, { flex: 0.25, marginRight: vw(7), textAlign: 'left' }]}
            placeholder="CVV"
            placeholderTextColor="#808080"
            keyboardType="number-pad"
            secureTextEntry={true}
            value={cvv}
            onChangeText={setCvv}
          />
        </View>

        {/* Name on Card */}
        <TextInput
          style={styles.input}
          placeholder="Name on Card"
          placeholderTextColor="#808080"
          value={nameOnCard}
          onChangeText={setNameOnCard}
        />

        {/* Checkbox for "Save this card" */}
        <View style={styles.radioContainer}>
          <TouchableOpacity
            style={styles.radioCircle}
            onPress={() => setSaveCard(!saveCard)} // Toggle saveCard state
          >
            {saveCard && <View style={styles.selectedRb} />}
          </TouchableOpacity>
          <Text style={styles.radioText}>Save this card</Text>

        </View>
      </View>

      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnt}>Proceed</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Addcard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    opacity:0.98
  },
  header: {
    fontSize: 20,
    color: "#000000",
    fontWeight: "400",
    marginLeft: vw(10),
    marginTop: vw(6),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(1),
  },
  input: {
    backgroundColor: '#FFFFFF',
    opacity: 0.85,
    width: vw(85),
    height: hp(7),
    padding: vw(1.5),
    borderRadius: vw(4),
    fontSize: vw(4),
    color: '#000',
    fontWeight:"400",
    borderColor: "#000000",
    borderWidth: 1,
    alignSelf: 'center',
    marginTop: vw(8),
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: vw(8),
    marginTop: vw(6),
  },
  radioCircle: {
    height: vw(6),
    width: vw(6),
    borderRadius: vw(3),
    borderWidth: 1,
    marginTop: vw(-2.5),
    backgroundColor: "#FFF",
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRb: {
    width: vw(3.5),
    height: vw(3.5),
    borderRadius: vw(1.75),
    backgroundColor: '#355ADC',
  },
  radioText: {
    fontSize: vw(3.5),
    color: '#686868',
    marginLeft: vw(2),
    marginTop:vw(-3)
  },
  btn: {
    backgroundColor: '#355ADC',
    width: vw('87%'),
    height: hp('6%'),
    alignSelf: 'center',
    marginTop: vw(10),
    borderRadius: vw(5),
  },
  btnt: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '400',
    fontSize: vw(5),
    marginTop: vw(2.5),
  },
});
