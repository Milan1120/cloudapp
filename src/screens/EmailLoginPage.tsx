import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState, useRef} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import CustomToast from '../commanScreen/CustomToast';
import LinearGradient from 'react-native-linear-gradient';
import { loginSuccess, loginFailure } from '../redux/reducer/LoginUserSlice';
import { useDispatch, useSelector } from 'react-redux';

const { width } = Dimensions.get('window');
const isTablet = width > 600;
const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const strongPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/;

const EmailLoginPage = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const storeData = useSelector((state) => state)
  const [loading, setLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [validUser, setValidUser] = useState<string>('');
  const [validPassword, setValidPassword] = useState<string>('');
  const [secureText, setSecureText] = useState<boolean>(true);  // show password
  const [isDisabledButton, setIsDisabledButton] = useState<boolean>(true);
  const [responseData, setResponseData] = useState<string>('');
  // Refrences Text input
  const passwordRef = useRef<TextInput>(null);


  useEffect(() => {
    // User validate
    if (username.trim().length === 0) {
      setValidUser('');
    } else if (!emailPattern.test(username)) {
      setValidUser('Invalid email format');
    } else {
      setValidUser('');
    };

    // Password validate
    if (password.trim().length === 0) {
      setValidPassword('');
    } else if (password.length < 8) {
      setValidPassword('Please enter atleast 8 character');
    } else if (password.length > 12) {
      setValidPassword('Please maintain password');
    } else if (!strongPasswordPattern.test(password)) {
      setValidPassword('please enter strong password');
    } else {
      setValidPassword('');
    };

    // Disable/Enable Button
    if (username.trim().length > 0 && password.trim().length > 0) {
      setIsDisabledButton(false)
    } else {
      setIsDisabledButton(true)
    };
    
  }, [username, password])


  // Log-in button
  const handleLogin = async () => {
    if (username.trim().length > 0 
    && password.trim().length > 0) {
      await fetchdata();   // fetch api
      setUsername('');
      setPassword('');
      return;
    };
  };

  // Handle fetch API
  const fetchdata = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://13.233.252.242:8081/api/v1/auth/login', {
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
        dispatch(loginSuccess(json)); 
        CustomToast({ message: 'Login successful' });
        console.log("Login successful:", json);
        await navigation.replace('HomeTab');
      } else {
        const errorResponse = await response.json();
        dispatch(loginFailure(errorResponse))
        console.log('Failed to login. Please try again:', errorResponse);
        setResponseData(errorResponse.error);
        CustomToast({ message: errorResponse.error });
        if (errorResponse.error === 'User is not verified') {
          await navigation.replace('VerifyEmail', { email: username });
        }
      }
    } catch (error) {
      console.log('data not found', error);
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
        <ScrollView showsHorizontalScrollIndicator={false}>
          {/* Logo Icon */}
          <View style={styles.imageDiv}>
            <Image
              source={require('../assets/new/loginimage.png')}
              style={styles.image}
            />
          </View>

          {/* Input Details  */}
          <View style={styles.container}>
            <Text style={styles.startText}>Let's go</Text>

            {responseData
              && <Text style={[styles.errorMsg, { fontSize: 18, alignSelf: "flex-start" }]}>{responseData}</Text>}

            {/* Username */}
            <Text style={styles.textHeading}>Email</Text>
            <TextInput
              style={styles.textInput}
              placeholder='Enter your email'
              placeholderTextColor='gray'
              keyboardType='default'
              value={username}
              onChangeText={(text) => {
                setUsername(text);
              }}
              returnKeyType='next'
              onSubmitEditing={() =>
                passwordRef.current &&
                passwordRef.current.focus()
              }
              blurOnSubmit={false}
            />
            {validUser && <Text style={styles.errorMsg}>{validUser}</Text>}

            {/* Password */}
            <Text style={styles.textHeading}>Password</Text>
            <View>
              <TextInput
                style={styles.textInput}
                ref={passwordRef}
                placeholder='* * * * * *'
                placeholderTextColor='gray'
                secureTextEntry={secureText}
                maxLength={20}
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                }}
                returnKeyType='done'
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                contextMenuHidden={true}
              />
              <TouchableOpacity style={styles.eyeTouch}
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


            {/* Forgot password */}
            <TouchableOpacity onPress={() => navigation.navigate('Reset-Password')}>
              <Text style={styles.forgot}>Forgot Password ? </Text>
            </TouchableOpacity>

            {validUser && <Text style={styles.errorMsg}>{validUser}</Text>}

            {/* Log-in Button */}
            {loading ?
              <View style={[styles.signBtn, { backgroundColor: 'transparent' }]}>
                <ActivityIndicator size={'large'} color={'white'} />
              </View>
              : <TouchableOpacity
                style={[isDisabledButton ? [styles.signBtn, { backgroundColor: 'gray' }] : styles.signBtn]}
                disabled={isDisabledButton}
                onPress={handleLogin}>
                <Text style={{ fontWeight: '700', color: 'white' }}>Log-in</Text>
              </TouchableOpacity>}

            {/* Separator Line */}
            <View style={styles.lineDiv}>
              <View style={styles.line} />
              <Text style={styles.or}>or</Text>
              <View style={styles.line} />
            </View>

            {/* Google Sign-up Button */}
            <TouchableOpacity
              style={[styles.signBtn, styles.otpBtn]}
              onPress={() => navigation.navigate('Phone')}
            >
              <Text style={{ color: '#000000', fontWeight: '500' }}>Log-in via Phone</Text>
            </TouchableOpacity>

            {/* New User - Sign-up Link */}
            <Text style={styles.already}>New user!</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Sign-up')}>
              <Text style={styles.login}>Sign-up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  )
}

export default EmailLoginPage;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    marginTop: isTablet ? hp('3%') : hp('2%'),
    marginHorizontal: wp('3%'),
  },
  image: {
    height: isTablet ? hp('35%') : hp('30%'),
    width: wp('100%'),
    resizeMode: 'contain',
    // backgroundColor:'green',
  },
  imageDiv: {
    alignItems: 'center',
    marginTop: isTablet ? hp('5%') : hp('5%'),
    marginBottom: isTablet ? hp('3%') : hp('2%'),
  },
  startText: {
    color: '#FFFFFF',
    // fontFamily: 'Segoe UI',
    fontWeight: '600',
    marginLeft: wp('7%'),
    marginTop: wp('-1%'),
    fontSize: isTablet ? hp('5%') : hp('4%'),
  },
  textHeading: {
    color: '#ffffff',
    fontWeight: '600',
    marginTop: hp('1.4%'),
    marginLeft: wp('7%'),
    // fontFamily: 'Segoe UI',
  },
  textInput: {
    alignSelf: 'center',
    height: hp('5%'),
    width: wp('80%'),
    borderWidth: 1,
    backgroundColor: "#FFFFFF",
    opacity: 0.67,
    borderColor: '#000000',
    borderRadius: 10,
    color: "black",
    paddingLeft: wp('4%'),
    marginTop: hp('1%'),
  },
  signBtn: {
    backgroundColor: '#355ADC',
    height: hp('5%'),
    width: wp('80%'),
    fontWeight: "700",
    marginTop: 20,
    borderRadius: 15,
    justifyContent: 'center',
    flexDirection: "row",
    alignItems: 'center',
    alignSelf: 'center'
  },


  lineDiv: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: hp('2%'),
  },
  or: {
    color: '#FFFFFF',
    marginHorizontal: wp('2%'),
  },
  line: {
    width: wp('35%'),
    height: 1,
    backgroundColor: '#FFFFFF',
  },
  otpBtn: {
    backgroundColor: '#FFFFFF',
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
    marginLeft: wp('8%'),
  },
  forgot: {
    color: '#FFFFFF',
    alignSelf: 'flex-end',
    marginTop: wp('2%'),
    marginRight: wp('8%'),
    fontSize: hp('1.5%')
  },
  eyeTouch: {
    position: 'absolute',
    right: wp('10%'),
    top: hp('2.5%')
  },
  eye: {
    height: isTablet ? hp('3%') : hp('2%'),
    width: isTablet ? wp('5%') : wp('5%'),
    resizeMode: 'cover',
  },

}) 