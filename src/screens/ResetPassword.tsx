import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Keyboard,
  ActivityIndicator
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React, { useState, useEffect } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import CustomToast from '../commanScreen/CustomToast';

const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const ResetPassword = ({ navigation }: any) => {
  // Input
  const [email, setEmail] = useState<string>('');
  const [validemail, setvalidemail] = useState<string>('');
  const [isError, setIsError] = useState<string>('');
  const [isDisabledButton, setIsDisabledButton] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  // validations
  useEffect(() => {
    // Email (User) validate
    if (email.trim().length === 0) {
      setvalidemail('');
    } else if (!emailPattern.test(email)) {
      setvalidemail('Invalid email format');
    } else {
      setvalidemail('');
    };

    // Disable button
    if (email.trim().length > 0) {
      setIsDisabledButton(false)
    } else {
      setIsDisabledButton(true)
    };

  }, [email]);

  // Submit button
  const handleEmail = async() => {
    if (email.trim().length > 0) {
      await sendPasswordRequest();
      return;
    };
  };

  // Fetchdata from api
  const sendPasswordRequest = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://13.233.252.242:8081/api/v1/auth/forget-password`, {
        method: 'Post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
        }),
      });
      if (response.ok) {
        const json = await response.json();
        CustomToast({message: json.message})
        console.log(json.message);
       await navigation.navigate('Email')
      } else {
        const errorResponse = await response.json();
        console.log(errorResponse);
        setIsError(errorResponse.Error);
      }
    } catch (error) {
      console.log('Error', error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <SafeAreaView style={styles.mainContainer}>
      <LinearGradient
        colors={['#355ADC', '#2D4CBA', '#233B8F', '#1C3076']}
        style={styles.mainContainer}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Logo Icon */}
          <View style={styles.imageDiv}>
            
            <Image
              source={require('../assets/new/forgotpassward.png')}
              style={styles.image}
            />
            <Text style={styles.startText}>Forgot Password ?</Text>
          </View>


          <View style={styles.container}>
            <Text style={styles.subText}>No need to worry. Please enter the email address linked with your account.</Text>

            {/* Email input */}
            {isError && <Text style={styles.errorMsg}>{isError}</Text>}
            <Text style={styles.textHeading}>Email</Text>
            <TextInput
              style={styles.textInput}
              placeholder='Enter your email'
              placeholderTextColor='gray'
              value={email}
              onChangeText={(text) => {
                setEmail(text);
              }}
              blurOnSubmit={false}
              onSubmitEditing={Keyboard.dismiss}
            />
            {validemail && <Text style={styles.errorMsg}>{validemail}</Text>}

            {/* Next Button */}
            {loading ? <View style={[styles.submit, { backgroundColor: 'transparent' }]}>
              <ActivityIndicator size={'large'} color={'white'} />
            </View>
              : <TouchableOpacity
                style={[isDisabledButton ? [styles.submit, { backgroundColor: '#355ADC' }] : styles.submit]}
                onPress={handleEmail}>
                <Text style={[styles.resendTxt, { color: '#FFFFFF' }]}>Next</Text>
              </TouchableOpacity>}

          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  )
}

export default ResetPassword;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  imageDiv: {
    alignSelf: 'center',
    marginTop: wp('3%'),
  },
  image: {
    height: hp('30%'),
    width: wp('85%'),
    resizeMode: 'contain',
    marginTop: wp('22%')
  },
  container: {
    marginHorizontal: 30,
    marginTop: wp('8%'),
  },
  startText: {
    color: '#FFFFFF',
    // fontFamily: 'Segoe UI',
    fontWeight: '600',
    fontSize: hp('3%'),
    marginLeft: wp('3%'),
    marginTop: wp('5%'),
    textAlign:"center"
  },
  textHeading: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginTop: wp('5%'),
    marginLeft: wp('3%')
    // fontFamily: 'Segoe UI',
  },
  textInput: {
    height: hp('5%'),
    width: wp('80%'),
    borderWidth: 1,
    backgroundColor: "#FFFFFF",
    opacity: 0.85,
    borderColor: '#000000',
    borderRadius: 10,
    paddingLeft: 15,
    marginTop: wp('3%'),
    color: "#000000",
    alignSelf: 'center',
  },
  submit: {
    backgroundColor: '#355ADC',
    height: hp('5%'),
    width: wp('80%'),
    marginTop: wp('5%'),
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  errorMsg: {
    color: 'red',
    marginLeft: wp('4%'),
  },
  subText: {
    color: '#FFFFFF',
    textAlign:"center",
    fontSize: wp('4%'),
    fontWeight: "600"
  },
  resendTxt: {
    color: '#FF6519',
    fontWeight: '700',
    textAlign:"center",
    fontSize:wp('4%')
  },
});