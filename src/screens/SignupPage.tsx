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
  ActivityIndicator,
  Alert
} from 'react-native';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import CustomToast from '../commanScreen/CustomToast';
import {
  registerSuccess,
  registerFailure
} from '../redux/reducer/RegisterUserSlice';
import { useDispatch, useSelector } from 'react-redux';

const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const strongPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/;


const SignupPage = ({ navigation }: any) => {
  const dispatch = useDispatch(); 
  const storeData = useSelector((state: RootState) => state.registerUser.userData);  // Select data from store

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmpassword] = useState<string>('');
  const [onetimepassword, setOnetimepassword] = useState<string>('');
  // Validation State
  const [validUsername, setvalidUsername] = useState<string>('');
  const [validPassword, setValidPassword] = useState<string>('');
  const [validConfirmPassword, setValidConfirmpassword] = useState<string>('');
  // Secure Text State
  const [secureText, setSecureText] = useState<boolean>(true);  // Secure text entery
  const [secureText1, setSecureText1] = useState<boolean>(true);
  const [veryfyEmail, setVerifyEmail] = useState<boolean>(false);
  const [isDisabledButton, setIsDisabledButton] = useState<boolean>(true)
  const [confirmOtp, setConfirmOtp] = useState<boolean>(false); // Otp screen
  const [validOtp, setValidotp] = useState<string>('');   // error Message
  const [loading, setLoading] = useState<boolean>(false);
  const [loading1, setLoading1] = useState<boolean>(false);
  const [responseData, setResponseData] = useState<string>('');
  // Refrence validation
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  useEffect(() => {
    // Email (username) validation
    if (username.trim().length === 0) {
      setvalidUsername('');
    } else if (!emailPattern.test(username)) {
      setvalidUsername('Invalid email format');
    } else {
      setvalidUsername('');
    };

    // Password validation
    if (password.trim().length === 0) {
      setValidPassword('');
    } else if (password.length < 8) {
      setValidPassword('Please enter atleast 8 character');
    } else if (password.length > 12) {
      setValidPassword('Please maintain password too long');
    } else if (!strongPasswordPattern.test(password)) {
      setValidPassword('please enter strong password');
    } else {
      setValidPassword('');
    };

    // Confirm Password
    if (confirmPassword.trim().length === 0) {
      setValidConfirmpassword('')
    } else if (password !== confirmPassword) {
      setValidConfirmpassword('Password not match')
    } else {
      setValidConfirmpassword('')
    };

    // Disable button
    if (username.trim().length > 0
      && password.trim().length > 0 && confirmPassword.trim().length > 0) {
      setIsDisabledButton(false)
    } else {
      setIsDisabledButton(true)
    };
  }, [username, password, confirmPassword]);


  // Sign-up button
  const handleSignup = async () => {
    if (username.trim().length > 0
       && password.trim().length > 0
      && confirmPassword.trim().length > 0) {
      await postdata();     // Api function call
      setUsername('');
      setPassword('');
      setConfirmpassword('');
      return;
    } else {
      setvalidUsername('');
      setValidPassword('');
      setValidConfirmpassword('');
      return;
    }
  };


  // Register data api
  const postdata = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://13.233.252.242:8081/api/v1/auth/register', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: username,
          password: password,
        }),
      });
      if (response.ok) {
        const json = await response.json();
        dispatch(registerSuccess(json))
        console.log("Registration successful:", json);
        CustomToast({ message: "Registration successful:" });
        setVerifyEmail(true)
        setUsername('');
        setPassword('');
        setConfirmpassword('');
      } else {
        const errorResponse = await response.json();
        dispatch(registerFailure(errorResponse))
        console.log('Failed to register. Please try again:', errorResponse);
        CustomToast({ message: errorResponse.error })
        setResponseData(errorResponse.error)
      }
    } catch (error: any) {
      console.log('data not found', error)
      // setResponseData(error)
    } finally {
      setLoading(false);
    }
  };

  // Handle verify email
  const handleVerifyEmail = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://13.233.252.242:8081/api/v1/auth/send-otp', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: storeData.email,
          userID: storeData.id,
        }),
      });
      if (response.ok) {
        const json = await response.json();
        console.log("Send otp successful:", json);
        CustomToast({ message: json.message });
        setConfirmOtp(true);
      } else {
        const errorResponse = await response.json();
        dispatch(registerFailure(errorResponse));
        console.log('Failed to send otp. Please try again:', errorResponse);
      }
    } catch (error: any) {
      console.log('data not found', error)
    } finally {
      setLoading(false)
    };
  };

  // Handle Verify Otp
  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://13.233.252.242:8081/api/v1/auth/verify-otp', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userID: storeData.id,
          otp: onetimepassword,
        }),
      });
      if (response.ok) {
        const json = await response.json();
        console.log("Otp Verify successful:", json);
        setOnetimepassword('');
        // CustomToast({ message: json.message })
        await navigation.navigate('HomeTab');
      } else {
        const errorResponse = await response.json();
        dispatch(registerFailure(errorResponse));
        setOnetimepassword('');
        setValidotp(errorResponse.error)
        console.log('Failed to verify otp. Please try again:', errorResponse);
      }
    } catch (error: any) {
      console.log('data not found', error);
    } finally {
      setLoading(false)
    };
  }

  // Handle Resend Otp
  const handleResendOtp = async () => {
    setLoading1(true);
    try {
      const response = await fetch('http://13.233.252.242:8081/api/v1/auth/send-otp', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: storeData.email,
          userID: storeData.id,
        }),

      });
      if (response.ok) {
        const json = await response.json();
        console.log("Send otp successful:", json);
        CustomToast({ message: json.message });
        setConfirmOtp(true);
      } else {
        const errorResponse = await response.json();
        dispatch(registerFailure(errorResponse));
        console.log('Failed to send otp. Please try again:', errorResponse);
      }
    } catch (error: any) {
      console.log('data not found', error)
    } finally {
      setValidotp('');
      setLoading1(false)
    };
  };

  // Handle google signup button
  const handleGoogleButton = () => {
    Alert.alert('google login button')
  }


  if (!veryfyEmail) {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <LinearGradient
          colors={['#355ADC', '#2D4CBA', '#233B8F', '#1C3076']}
          style={styles.mainContainer}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            {/*  Logo Icon */}
            <View style={{ alignSelf: 'center', marginTop: 20 }}>
              <Image
                source={require('../assets/new/mainimage.png')}
                style={{ height: hp('25%'), width: wp('100%'), marginTop: wp('2%') }}
              />
            </View>


            {/* Input Details */}
            <View style={styles.container}>
              <View style={{ marginTop: 15 }}>
                <Text style={styles.startText}>Let's get</Text>
                <Text style={styles.startText}>Started</Text>
              </View>

              {/* Handle response  */}
              {responseData
                && <Text style={[styles.errorMsg, { fontWeight: 600, fontSize: 18, alignSelf: 'center' }]}>{responseData}</Text>}

              {/* Username */}
              <Text style={styles.textHeading}>Email</Text>
              <TextInput
                style={styles.textInput}
                placeholder='Enter your Email'
                placeholderTextColor='#000000AB'
                value={username}
                onChangeText={(text) => {
                  setUsername(text);
                }}
                returnKeyType="next"
                onSubmitEditing={
                  () => passwordRef.current
                    && passwordRef.current.focus()
                }
                blurOnSubmit={false}
              />
              {validUsername && <Text style={styles.errorMsg}>{validUsername}</Text>}

              {/* Password */}
              <Text style={styles.textHeading}>Password</Text>
              <View>
                <TextInput
                  style={styles.textInput}
                  ref={passwordRef}
                  placeholder='* * * * * *'
                  placeholderTextColor='#000000AB'
                  maxLength={20}
                  secureTextEntry={secureText}
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                  }}
                  returnKeyType="next"
                  onSubmitEditing={
                    () => confirmPasswordRef.current
                      && confirmPasswordRef.current.focus()
                  }
                  blurOnSubmit={false}
                />
                <TouchableOpacity
                  style={styles.eyeTouch}
                  onPress={() => setSecureText(!secureText)}>
                  <Image
                    style={styles.eye}
                    source={secureText
                      ? require('../assets/new/hidden.png')
                      : require('../assets/new/eye.png')
                    }
                  />
                </TouchableOpacity>
              </View>
              {validPassword && <Text style={styles.errorMsg}>{validPassword}</Text>}

              {/* Confirm password */}
              <Text style={styles.textHeading}>Confirm Password</Text>
              <View>
                <TextInput
                  style={styles.textInput}
                  ref={confirmPasswordRef}
                  placeholder='* * * * * *'
                  placeholderTextColor='#000000AB'
                  maxLength={20}
                  secureTextEntry={secureText1}
                  value={confirmPassword}
                  onChangeText={(text) => {
                    setConfirmpassword(text);
                  }}
                  returnKeyType="next"
                  onSubmitEditing={Keyboard.dismiss}
                  blurOnSubmit={false}
                />
                <TouchableOpacity
                  style={styles.eyeTouch}
                  onPress={() => setSecureText1(!secureText1)}>
                  <Image
                    style={styles.eye}
                    source={secureText1
                      ? require('../assets/new/hidden.png')
                      : require('../assets/new/eye.png')
                    }
                  />
                </TouchableOpacity>
              </View>
              {validConfirmPassword && <Text style={styles.errorMsg}>{validConfirmPassword}</Text>}

              {/* Sign-up Button && loading */}
              {loading ?
                <View style={[styles.signBtn, { backgroundColor: 'transparent' }]}>
                  <ActivityIndicator size={'large'} color={'white'} />
                </View>
                : <TouchableOpacity
                  style={[isDisabledButton ? [styles.signBtn, { backgroundColor: 'gray' }] : styles.signBtn]}
                  disabled={isDisabledButton}
                  onPress={handleSignup}>
                  <Text style={{ fontWeight: '700', fontSize: 20, color: "#FFFFFF" }}>Sign-up</Text>
                </TouchableOpacity>}

              {/* Separator Line  */}
              <View style={styles.lineDiv}>
                <View style={styles.line} />
                <Text style={styles.or}>or</Text>
                <View style={styles.line} />
              </View>

              {/* Google Sign-up Button */}
              <TouchableOpacity
                style={[styles.signBtn, styles.googleBtn]}
                onPress={handleGoogleButton}
              >
                <Image
                  source={require('../assets/new/googleLogo.png')}
                  style={{ height: 18, width: 18, marginRight: 8 }}
                />
                <Text style={{ color: '#000000' }}>Sign up With google</Text>
              </TouchableOpacity>

              {/* Already a User - Login Link  */}
              <Text style={styles.already}>Already a user!</Text>
              <TouchableOpacity
                style={{ marginBottom: 50 }}
                onPress={() => navigation.navigate('Email')}>
                <Text style={styles.login}>Login-in</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </LinearGradient>
      </SafeAreaView>

    )
  }

  // ========================= Veryfy email ==============================
  return (
    <SafeAreaView style={styles.mainContainer}>
      <LinearGradient
        colors={['#355ADC', '#2D4CBA', '#233B8F', '#1C3076']}
        style={styles.mainContainer}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Logo Icon  */}
          <View style={{ alignSelf: 'center', marginTop: hp('10%') }}>
            <Image
              source={require('../assets/new/mainimage.png')}
              style={{ height: hp('25%'), width: wp('100%') }}
            />
          </View>


          {/* Confirm otp screen */}
          {confirmOtp ?
            (<View style={styles.container}>
              <Text style={{ color: '#FFFFFF', fontSize: wp('8%'), fontWeight: 500, marginTop: 25 }}>Enter OTP</Text>
              <Text style={{ color: "#FFFFFF", marginTop: 18 }}>Enter veryfication code you get on your email</Text>
              <Text style={{ color: "#FFFFFF" }}>{storeData.email}</Text>
              <Text style={styles.textHeading}>Enter OTP</Text>
              <View>
                <TextInput
                  style={styles.textInput}
                  placeholder='* * * * * *'
                  keyboardType={'number-pad'}
                  maxLength={6}
                  placeholderTextColor='gray'
                  value={onetimepassword}
                  onChangeText={(text) => {
                    setOnetimepassword(text);
                  }}
                  blurOnSubmit={false}
                />
              </View>
              {validOtp && <Text style={styles.errorMsg}>{validOtp}</Text>}

              {/* Verify otp button && Loader*/}
              {loading ?
                <View style={[styles.signBtn, { backgroundColor: 'transparent' }]}>
                  <ActivityIndicator size={'large'} color={'white'} />
                </View>
                : <TouchableOpacity
                  style={styles.signBtn}
                  onPress={handleVerifyOtp}>
                  <Text style={{ fontWeight: '700', color: "#FFFFFF" }}>Verify OTP</Text>
                </TouchableOpacity>}

              {/* Resend otp */}

              {validOtp && <View>
                {loading1 ? <View style={[styles.signBtn, { backgroundColor: 'transparent' }]}>
                  <ActivityIndicator size={'large'} color={'white'} />
                </View>
                  : <TouchableOpacity
                    style={styles.signBtn}
                    onPress={handleResendOtp}>
                    <Text style={{ fontWeight: '700', color: "#FFFFFF" }}>Resend OTP</Text>
                  </TouchableOpacity>}
              </View>}
            </View>
            )
            : (

              <View >
                <Text style={{ color: '#FFFFFF', fontSize: wp('8%'), fontWeight: '500', marginTop: 50, marginLeft: 25 }}>
                  Verify Email
                </Text>
                <Text style={{ color: '#FFFFFF', fontSize: 20, marginTop: 40, marginLeft: 25 }}>
                  Verify your email to activate account
                </Text>
                <Text style={{ color: '#FFFFFF', marginTop: 15, marginLeft: 25 }}>
                  you will get otp on this email
                </Text>
                <Text style={{ color: '#FFFFFF', marginLeft: 25 }}>
                  {storeData.email}
                </Text>

                {/* Send verification code */}
                {loading ?
                  <View style={[styles.signBtn, { backgroundColor: 'transparent' }]}>
                    <ActivityIndicator size={'large'} color={'white'} />
                  </View>
                  : <TouchableOpacity
                    style={styles.signBtn}
                    onPress={handleVerifyEmail}>
                    <Text style={{ fontWeight: '700', color: '#FFFFFF' }}>Verify Email</Text>
                  </TouchableOpacity>}
              </View>
            )}
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>

  )
}

export default SignupPage

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // backgroundColor: '#355ADC',
  },
  container: {
    marginHorizontal: wp('10%')
  },
  startText: {
    color: '#FFFFFF',
    // fontFamily: 'Segoe UI',
    fontWeight: '500',
    fontSize: hp('3%'),
  },
  textHeading: {
    color: '#FFFFFF',
    fontWeight: '400',
    marginTop: hp('1.5%'),
    marginLeft: wp('1%')
    // fontFamily: 'Segoe UI',
  },
  textInput: {
    height: hp('5%'),
    width: wp('80%'),
    borderWidth: 1,
    backgroundColor: "white",
    opacity: 0.69,
    borderColor: '#000000',
    borderRadius: 10,
    paddingLeft: 15,
    marginTop: 5,
    alignSelf: 'center',
    color: "black"
  },
  signBtn: {
    backgroundColor: '#355ADC',
    height: hp('5%'),
    width: wp('80%'),
    marginTop: 25,
    borderRadius: 16.32,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  lineDiv: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,

  },
  or: {
    color: '#FFFFFF',
    marginRight: 7,
    marginLeft: 7,
  },
  line: {
    width: wp('30%'),
    height: 1,
    backgroundColor: '#FFFFFF',
  },
  googleBtn: {
    backgroundColor: '#FFFFFF',
    width: wp('75%'),
    height: hp('5.5%'),
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    flexDirection: 'row',
    justifyContent: "center"
  },
  already: {
    alignSelf: 'center',
    marginTop: 20,
    color: "#FFFFFF"
  },
  login: {
    color: '#A1BFF7',
    fontWeight: '700',
    alignSelf: 'center',
    marginTop: 15,
  },
  errorMsg: {
    color: '#FD0F0F',
    marginLeft: wp('1%'),
  },
  eye: {
    height: hp('2%'),
    width: wp('5%'),
    resizeMode: 'cover',
  },
  eyeTouch: {
    position: 'absolute',
    right: wp('4%'),
    top: hp('2%')
  },
})