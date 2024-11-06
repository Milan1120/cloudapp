import React, { useState } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wv,
  heightPercentageToDP as vh,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

// Offer Data for the PrimiumCard
const offer = [
  {id: 1, name: 'Add-Free', image: require('../assets/new/adblocker.png')},
  {id: 2, name: 'More Storage', image: require('../assets/new/database.png')},
  {id: 3, name: 'HD Images', image: require('../assets/new/hd.png')},
];

const PrimiumCard = () => {
  const blackTextOffers = ['Add-Free', 'Large Space', 'More Benefits'];

  return (
    <LinearGradient
      colors={['#355ADC', '#2D4CBA', '#233B8F', '#1C3076']}
      style={styles.container}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}>
      <View style={styles.offerContainer}>
        {offer.map((item, index) => (
          <View key={index} style={styles.offers}>
            {/* Circle View containing the Image */}
            <View style={styles.circleContainer}>
              <Image
                source={item.image}
                style={styles.circleImage}
                resizeMode="cover"
              />
            </View>
            <Text
              style={[styles.offerText,
                { color: blackTextOffers.includes(item.name) ? 'black' : '#000000' },
              ]}>
              {item.name}
            </Text>
          </View>
        ))}
      </View>
      <Text style={styles.t1}>BUY premium to unlock 10+ privileges</Text>
    </LinearGradient>
  );
};

// Plans Component
const Plans = () => {
  const [selectedPlan, setSelectedPlan] = useState(null); // State to hold selected plan
  const navigation = useNavigation();

  const handleSelectPlan = (planType) => {
    setSelectedPlan(planType);
  };

  const isSelected = (planType) => selectedPlan === planType;

  const handlePaymentPress = () => {
    if (selectedPlan) {
      navigation.navigate('Payment');
    } else {
      Alert.alert('No Plan Selected', 'Please select a plan before proceeding.');
    }
  };

  return (
    <View style={styles.plansContainer}>
      <Text style={styles.header}>Plans</Text>

      {/* Monthly Plan */}
      <Text style={styles.subHeader}>
        For new users <Text style={styles.subHeader1}>(first time only)</Text>
      </Text>
      <TouchableOpacity
        style={[styles.planContainer, isSelected('Monthly') && styles.selectedPlan]}
        onPress={() => handleSelectPlan('Monthly')}>
        <Text style={styles.planType}>Monthly</Text>
        <Text style={styles.planPrice}>₹79.00</Text>
        <Text style={styles.planOffer}>
          This offer is valid for first time users.
        </Text>
      </TouchableOpacity>

      {/* Yearly Plan */}
      <TouchableOpacity
        style={[styles.planContainer, isSelected('Yearly') && styles.selectedPlan]}
        onPress={() => handleSelectPlan('Yearly')}>
        <Text style={styles.planType}>Yearly</Text>
        <Text style={styles.planPrice}>₹2450.00</Text>
        <Text style={styles.planOffer}>
          This offer is valid for first time users.
        </Text>
      </TouchableOpacity>

      <Text style={{color: '#000000', marginLeft: wv(3), marginTop: wv(1), marginBottom: wv(1)}}>
        For existing users
      </Text>

      {/* 1 Month Plan */}
      <TouchableOpacity
        style={[styles.planContainer, isSelected('1 Month') && styles.selectedPlan]}
        onPress={() => handleSelectPlan('1 Month')}>
        <Text style={styles.planType}>1 Month</Text>
        <Text style={styles.planPrice2}>₹379.00</Text>
      </TouchableOpacity>

      {/* 1 Year Plan */}
      <TouchableOpacity
        style={[styles.planContainer, isSelected('1 Year') && styles.selectedPlan]}
        onPress={() => handleSelectPlan('1 Year')}>
        <Text style={styles.planType}>1 Year</Text>
        <Text style={styles.planPrice2}>₹4299.00</Text>
      </TouchableOpacity>

      {/* Pay Now Button */}
      <View style={styles.payNowButtonContainer}>
        <TouchableOpacity onPress={handlePaymentPress}>
          <Text style={styles.payNowButton}>Pay Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Main App Component
export default function App() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <PrimiumCard />
        <Plans />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: wv(3),
    borderRadius: wv(5),
    marginTop: vh(0),
  },
  offerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ffff',
    margin: wv(4),
    padding: wv(2),
    height: vh('12.5%'),
    borderRadius: wv(2),
    marginBottom: wv(12),
  },
  t1: {
    fontSize: wv(3.8),
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: wv(-8),
    marginBottom: wv(2),
  },
  offers: {
    alignItems: 'center',
  },
  circleContainer: {
    width: wv(12),
    height: wv(12),
    borderRadius: wv(7.5),
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: wv(0.5),
    borderColor: '#000',
    marginBottom: vh(1),
  },
  circleImage: {
    width: wv('9%'),
    height: vh('4%'),
  },
  offerText: {
    fontSize: wv(3.2),
    fontWeight: '500',
    color: '#FFFFFF',
  },

  // Styles for Plans Section
  plansContainer: {
    padding: wv(4),
    backgroundColor: '#f0f0f0',
  },
  header: {
    fontSize: wv(6),
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginTop: vh(-2),
  },
  subHeader: {
    fontSize: wv(4),
    color: '#000000',
    marginBottom: vh(1),
    marginLeft: wv(3),
  },
  subHeader1: {
    fontSize: wv(3),
    color: '#000000',
  },
  planContainer: {
    backgroundColor: '#E8E4E4',
    borderRadius: wv(5),
    padding: wv(4),
    height: vh('10%'),
    marginBottom: vh(1),
    borderColor: '#EB7338',
    opacity: 1.54,
    borderWidth: 0.5,
  },
  planType: {
    fontSize: wv(4),
    fontWeight: '600',
    color: '#333',
    marginBottom: vh(0.5),
  },
  planPrice: {
    fontSize: wv(4),
    color: '#5F77E3',
    fontWeight: '600',
    marginTop: wv(-7),
    textAlign: 'right',
  },
  planPrice2: {
    color: '#D74B05',
    fontWeight: '600',
    textAlign: 'right',
    marginTop: wv(-6),
  },
  planOffer: {
    fontSize: wv(3.4),
    color: '#000000',
    marginTop: wv(5),
    textAlign: 'left',
  },
  payNowButtonContainer: {
    backgroundColor: '#355ADC',
    borderRadius: wv(15),
    width: wv('35%'),
    alignSelf: 'center',
    padding: vh(1.5),
    marginTop: wv(2),
  },
  payNowButton: {
    fontSize: wv(5),
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  selectedPlan: {
    borderColor: '#355ADC',
    borderWidth: 1.5,
  },
});
