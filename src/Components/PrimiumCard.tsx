import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wv, heightPercentageToDP as vh } from 'react-native-responsive-screen';
import UserNavigation from '../routeNavigation/UserNavigation';

const offer = [
  { id: 1, name: 'Add-Free', image: require('../assets/new/adblocker.png') },
  { id: 2, name: 'Large Space', image: require('../assets/new/cloud.png') },
  { id: 3, name: 'More Benefits', image: require('../assets/new/database.png') },
];


const PrimiumCard = () => {
  const blackTextOffers = ['Add-Free', 'Large Space', 'More Benefits'];

  return (
    <LinearGradient
      colors={['#355ADC', '#2D4CBA', '#233B8F', '#1C3076']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.header}>
        <Text style={styles.premiumText}>Premium</Text>
        <Text style={styles.buyButton}>Buy</Text>
      </View>
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
              style={[
                styles.offerText,
                { color: blackTextOffers.includes(item.name) ? 'black' : 'inherit' }
              ]}
            >
              {item.name}
            </Text>
          </View>
        ))}
      </View>
    </LinearGradient>
  );
};

export default PrimiumCard;

const styles = StyleSheet.create({
  container: {
    margin: wv(2), // Margin based on viewport width
    borderRadius: wv(5), 
    marginTop: vh(1),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: vh(0.5),
    paddingLeft: wv(1),
    paddingRight: wv(3),
  },
  premiumText: {
    fontSize: wv(7), 
    fontWeight: '400',
    marginLeft: wv(2),
    color: '#FFFFFF',
  },
  buyButton: {
    backgroundColor: 'white',
    borderRadius: wv(3),
    width: wv(15),
    height: vh(5),
    fontSize: wv(5),
    margin: wv(1.5),
    padding: wv(1),
    color: '#000000',
    textAlign: 'center',
  },
  offerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ffff',
    margin: wv(2),
    padding: wv(4),
    borderRadius: wv(4),
    height:vh('13%')
  },
  offers: {
    alignItems: 'center',
    padding: wv(-1),
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
    width:wv('9%'),
    height:vh('4%')
  },
  offerText: {
    fontSize: wv(3.2), 
    fontWeight: '500', 
  },
});
