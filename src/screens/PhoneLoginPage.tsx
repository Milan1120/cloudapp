import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CountryPicker from 'react-native-country-picker-modal';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { width } = Dimensions.get('window');
const isTablet = width > 600;

const PhoneLoginPage = ({ navigation }: any) => {
  const [confirm, setConfirm] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>('');
  const [validphone, setValidphone] = useState<boolean>(false);
  const [validotp, setValidotp] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<any>(50);

  const [countryCode, setCountryCode] = useState<string>('IN'); // Default country code to India
  const [callingCode, setCallingCode] = useState<string>('+91'); // Default calling code for India

  const ot1 = useRef<TextInput>(null);
  const ot2 = useRef<TextInput>(null);
  const ot3 = useRef<TextInput>(null);
  const ot4 = useRef<TextInput>(null);
  const ot5 = useRef<TextInput>(null);
  const ot6 = useRef<TextInput>(null);

  const [otp1, setOtp1] = useState<string>('');
  const [otp2, setOtp2] = useState<string>('');
  const [otp3, setOtp3] = useState<string>('');
  const [otp4, setOtp4] = useState<string>('');
  const [otp5, setOtp5] = useState<string>('');
  const [otp6, setOtp6] = useState<string>('');

  useEffect(() => {
    let interval: any = null;
    if (seconds > 0) {
      interval = setTimeout(() => {
        setSeconds(seconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      clearTimeout(interval);
    }
    return () => clearTimeout(interval);
  }, [seconds, confirm]);

  const handleSendOtp = () => {
    if (phone.length === 10) {
      setConfirm(true);
      setValidphone(false);
    } else {
      setValidphone(true);
    }
  };

  const handleVerify = () => {
    if (
      otp1.length === 1 &&
      otp2.length === 1 &&
      otp3.length === 1 &&
      otp4.length === 1 &&
      otp5.length === 1 &&
      otp6.length === 1
    ) {
      setValidotp(false);
      navigation.navigate('HomeTab');
    } else {
      setValidotp(true);
    }
  };

  const handleResend = () => {
    setSeconds(30);
  };

  const onSelectCountry = (country: any) => {
    setCountryCode(country.cca2);
    setCallingCode(`+${country.callingCode[0]}`);
  };

  if (!confirm) {
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={['#355ADC', '#2D4CBA', '#233B8F', '#1C3076']}
          style={styles.container}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ flex: 3, marginLeft: 20, marginRight: 20 }}>
              <View style={{ alignSelf: 'center' }}>
                <Image
                  source={require('../assets/new/Final_1080.png')}
                  style={{ height: 140, width: 140, resizeMode: 'contain', marginTop: wp('68%') }}
                />
              </View>

              <Text style={styles.loginTxt}>LOGIN</Text>
              <Text style={styles.enterTxt}>Enter Phone No.</Text>

              {/* =========================== Combined Country Picker and Phone Input ========================== */}
              <View style={styles.phoneInputContainer}>
                <CountryPicker
                  countryCode={countryCode}
                  withFilter
                  withFlag
                  withCallingCode
                  withEmoji
                  onSelect={onSelectCountry}
                  containerButtonStyle={styles.countryPicker} // Style for the country picker button
                />
                <Text style={styles.callingCodeText}>{callingCode}</Text>
                <TextInput
                  style={styles.textInputPhone}
                  placeholder={'- XXXXXXXXXX'}
                  placeholderTextColor={'#000000'}
                  maxLength={10}
                  keyboardType={'number-pad'}
                  value={phone}
                  onChangeText={(text) => setPhone(text)}
                />
              </View>

              {validphone && (
                <Text style={{ color: '#FD0F0F', alignSelf: 'center' }}>
                  Phone number you entered is not valid
                </Text>
              )}

              <TouchableOpacity style={styles.btn} onPress={handleSendOtp}>
                <Text style={{ color: 'white', fontWeight: '400', fontSize: 20 }}>Send OTP</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('Email')}
                style={{ alignSelf: 'center', marginTop: 30 }}
              >
                <Text style={{ color: '#FFFFFF', fontWeight: '700', fontSize: 20 }}>Log-in via Email</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </LinearGradient>
      </SafeAreaView>
    );
  }


  {/* =========================== Enter OTP UI ========================== */ }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.subContainer}>
        <View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.otpText}>Enter</Text>
            <Text style={[styles.otpText, { color: '#5F77E3', fontSize:30,}]}>OTP</Text>
          </View>

          <Text style={{ color: 'gray' }}>A verfication codes has been send to</Text>
          <Text style={{ color: 'gray' }}>(+91) 9899163834</Text>

          {/* =========================== input code ========================== */}
          <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 20 }}>
            <TextInput
              style={[styles.inputOtp,
              { borderColor: otp1.length >= 1 ? 'green' : 'gray' }]}
              ref={ot1}
              value={otp1}
              keyboardType='number-pad'
              maxLength={1}
              onChangeText={(txt) => {
                setOtp1(txt);
                if (txt.length >= 1) {
                  ot2.current?.focus();
                }
              }}
            />
            <TextInput
              style={[styles.inputOtp,
              { borderColor: otp2.length >= 1 ? 'green' : 'gray' }]}
              ref={ot2}
              value={otp2}
              keyboardType='number-pad'
              maxLength={1}
              onChangeText={(txt) => {
                setOtp2(txt);
                if (txt.length >= 1) {
                  ot3.current?.focus();
                } else if (txt.length < 1) {
                  ot1.current?.focus();
                }
              }}
            />
            <TextInput
              style={[styles.inputOtp,
              { borderColor: otp3.length >= 1 ? 'green' : 'gray' }]}
              ref={ot3}
              value={otp3}
              keyboardType='number-pad'
              maxLength={1}
              onChangeText={(txt) => {
                setOtp3(txt);
                if (txt.length >= 1) {
                  ot4.current?.focus();
                } else if (txt.length < 1) {
                  ot2.current?.focus();
                }
              }}
            />
            <TextInput
              style={[styles.inputOtp,
              { borderColor: otp4.length >= 1 ? 'green' : 'gray' }]}
              ref={ot4}
              value={otp4}
              keyboardType='number-pad'
              maxLength={1}
              onChangeText={(txt) => {
                setOtp4(txt);
                if (txt.length >= 1) {
                  ot5.current?.focus();
                } else if (txt.length < 1) {
                  ot3.current?.focus();
                }
              }}
            />
            <TextInput
              style={[styles.inputOtp,
              { borderColor: otp5.length >= 1 ? 'green' : 'gray' }]}
              ref={ot5}
              value={otp5}
              keyboardType='number-pad'
              maxLength={1}
              onChangeText={(txt) => {
                setOtp5(txt);
                if (txt.length >= 1) {
                  ot6.current?.focus();
                } else if (txt.length < 1) {
                  ot4.current?.focus();
                }
              }}
            />
            <TextInput
              style={[styles.inputOtp,
              { borderColor: otp6.length >= 1 ? 'green' : 'gray' }]}
              ref={ot6}
              value={otp6}
              keyboardType='number-pad'
              maxLength={1}
              onChangeText={(txt) => {
                setOtp6(txt);
                if (txt.length < 1) {
                  ot5.current?.focus()
                }
              }}
            />
          </View>
          {validotp && <Text style={{ color: '#FF6519' }}>Please enter valid OTP</Text>}

          {/* =========================== verify button ========================== */}
          <TouchableOpacity style={styles.btn} onPress={handleVerify}>
            <Text style={{color: 'white', fontWeight: '700'}}>VERIFY</Text>
          </TouchableOpacity>

          {/* =========================== resend code ========================== */}
          <View style={styles.codeView}>
            <Text style={{ color: 'gray' }}>Didn't receive the code?  </Text>
            {seconds === 0 ? (
              <TouchableOpacity onPress={handleResend}>
                <Text style={{ color: '#5F77E3', fontWeight: 700 }}>Resend(30s)</Text>
              </TouchableOpacity>
            ) : (
              <Text style={{ color: '#FF6519', fontWeight: 700 }}>
                {seconds < 10 ? `${seconds}'s` : seconds}
              </Text>
            )}
          </View>
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default PhoneLoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  subContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: hp('15%')
  },
  countryPicker: {
    borderRightWidth: 1,
    borderRightColor: '#000000',
    paddingRight: 4,
    paddingLeft:12
  },
  callingCodeText: {
    fontSize: 18,
    marginHorizontal: 5,
    color: '#000000',
    marginTop:wp(-0.4)
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor:"#FFFFFF",
    borderColor: '#000000',
    borderRadius:wp(15),
    marginTop: 10,
    height:hp('7%')
  },
  // yellowView: {
  //   backgroundColor: '#FCDC6C',
  //   height: hp('10%'),
  //   width: wp('31%'),
  // },
  // yellowView2: {
  //   backgroundColor: '#FAAB0A',
  //   height: hp('15%'),
  //   marginRight: 15,
  //   marginLeft: 15,
  // },
  loginTxt: {
    alignSelf: 'center',
    color: '#FFFFFF',
    fontSize: hp('4%'),
    marginTop:wp(3),
    marginBottom: 35,
  },
  enterTxt: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '400',
    marginTop: wp(2),
    marginLeft:wp(1)
  },
  textInputPhone: {
    flex: 1,
    height: hp('9%'),
    paddingHorizontal: wp(-1),
    fontSize: 18,
    color: '#000000',
  },
  btn: {
    backgroundColor: '#355ADC',
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('6.8%'),
    width: wp('45%'),
    borderRadius: 30,
    alignSelf: 'center',
    marginTop: 50
  },
  otpText: {
    color: 'black',
    fontSize: hp('3%'),
    fontWeight: '700',
    marginRight: 10,
    marginBottom: 10,
  },
  inputOtp: {
    borderColor: 'gray',
    borderWidth: 1,
    height: wp('13%'),
    width: wp('13%'),
    margin: 5,
    borderRadius: 5,
    fontSize: Platform.OS === 'android' ? hp('3%') : hp('4%'), 
    fontWeight: '700',
    textAlign: 'center',
    color: 'black',
  },
  codeView: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20
  }
})