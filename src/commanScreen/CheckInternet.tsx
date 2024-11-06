import { StyleSheet, Text, SafeAreaView, Image } from 'react-native';
import React, { useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

interface CheckInternetProps {
  isConnected: boolean; 
  setIsConnected: (isConnected: boolean) => void;
}

const CheckInternet = ({ isConnected, setIsConnected }: CheckInternetProps) => {
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      console.log('Connection type:', state.type);
      console.log('Is connected?', state.isConnected);
      setIsConnected(!!state.isConnected); // Ensure it's a boolean
    });

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, [setIsConnected]);

  return (
    <SafeAreaView style={styles.container}>
      {!isConnected && (
        <>
          <Image
            style={styles.image}
            source={require('../assets/new/wifi.png')}
          />
          <Text style={styles.text}>No Internet Connection</Text>
        </>
      )}
    </SafeAreaView>
  );
};

export default CheckInternet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: wp('6%'),
    marginTop: hp('2%'),  // Added some space between image and text
  },
  image: {
    height: wp('30%'),
    width: wp('30%'),
  },
});
