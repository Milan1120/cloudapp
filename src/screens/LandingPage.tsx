import {
  StyleSheet,
  Text,
  Animated,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  SafeAreaView,
  StatusBar,
  ActivityIndicator
} from 'react-native';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');
const isTablet = width > 600; // Define if the device is a tablet

const LandingPage = ({ navigation }: any) => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const iconAnim = useRef(new Animated.Value(-hp('50%'))).current;
  const btnViewAnimOpacity = useRef(new Animated.Value(0)).current;
  const textViewAnimOpacity = useRef(new Animated.Value(0)).current;
  const [loading, setLoading] = useState<boolean>(false);


  // Get Token for Authorization
  useEffect(() => {
    const getToken = async () => {
      try {
        const newdata = await AsyncStorage.multiGet(['@jwtToken', '@refreshToken']);
        console.log('Tokens:', newdata);

        // Extraxt token from array
        const jwtToken = newdata[0][1];
        const refreshToken = newdata[1][1];

        if (jwtToken && refreshToken) {
          setIsLogin(true);
        } else {
          setIsLogin(false);
        }
      } catch (error) {
        console.error('Error fetching tokens:', error);
        setIsLogin(false);
      }
    };
    getToken();
  }, []);

  // Sequentially animate the views
  useEffect(() => {
    Animated.sequence([
      Animated.timing(iconAnim, {
        toValue: hp('25%'),
        duration: 500,
        useNativeDriver: true
      }),
      Animated.spring(iconAnim, {
        toValue: 1,
        friction: 4,
        tension: 23,
        useNativeDriver: true,
      }),
      Animated.timing(btnViewAnimOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(textViewAnimOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),

    ]).start();
  }, []);

  // Handle button for Authorization
  const handleButton = async() => {
    setLoading(true);
    setTimeout(() => {
    navigation.navigate(isLogin ? 'HomeTab' : 'Auth')
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar hidden={true} />
      {/* line div */}
      <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={{ flex: 1, justifyContent: 'flex-end', }}>

        {/* Logo Icon (Animated)  */}
        <Animated.View
          style={{
            alignSelf: 'center',
            transform: [{ translateY: iconAnim }]
          }}>
          <Image
            source={require('../assets/new/Final_1080.png')}
            style={{ height: hp(isTablet ? '30%' : '20%'), width: wp(isTablet ? '60%' : '50%'), resizeMode: 'contain', paddingBottom: 0, }}
          />
        </Animated.View>

        <View style={styles.container}>
          <Animated.View style={[
            styles.logoText,
            { opacity: btnViewAnimOpacity },
          ]}>

            <Text style={{ fontSize: 40, fontWeight: '800', color: '#ffff' }}>abacus</Text>
          </Animated.View>
          <Animated.View style={[
            styles.text,
            { opacity: textViewAnimOpacity },
          ]}>

            <Text style={styles.text}>No need to worry about storage anymore.</Text>
            <Text style={styles.text}>Download our Cloud storage app.</Text>
          </Animated.View>

          {/* Icon or button div  */}
          {loading ?
            <View style={{ marginTop: hp('20%'), marginBottom: hp('5%') }}>
              <ActivityIndicator size={'large'} color={'white'} />
            </View>
            : <TouchableOpacity style={{ marginTop: hp('20%'), marginBottom: hp('5%') }} onPress={handleButton}>
              <Animated.View
                style={[
                  styles.goBtn,
                  { opacity: btnViewAnimOpacity },
                ]}>
                <Text style={styles.btnText}>Let's go</Text>

              </Animated.View>
            </TouchableOpacity>
          }
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default LandingPage;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  yellowView: {
    backgroundColor: '#8f6f9c',
    height: hp('30%'),
    width: wp('31%'),
  },
  yellowView2: {
    backgroundColor: '#b1b8c5',
    height: hp('35%'),
    marginRight: 15,
    marginLeft: 15,
  },
  text: {
    color: '#ffff',
    fontSize: hp(isTablet ? '2.5%' : '2%'),
    fontWeight: '700',
    alignSelf: 'center',
  },
  goBtn: {
    backgroundColor: '#355adc',
    height: hp(isTablet ? '8%' : '6%'),
    width: wp(isTablet ? '70%' : '60%'),
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',

  },
  btnText: {
    fontWeight: 'bold',
    fontSize: hp(isTablet ? '2.5%' : '2%'),
    color: '#ffff',
  },
  logoText: {
    position: 'relative',
    bottom: hp('3.6%'),

  }

});
