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
} from 'react-native';
import React, { useState, useEffect } from 'react';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import CustomToast from '../commanScreen/CustomToast';
import { registerFailure } from '../redux/reducer/RegisterUserSlice';
import { useDispatch } from 'react-redux';


const VerifyEmailPage = ({ navigation, route }: any) => {
    const dispatch = useDispatch();  
    const getParams = route?.params
    const [userId, setUserId] = useState<string>('');
    const [onetimepassword, setOnetimepassword] = useState<string>('');
    // Validation State
    const [confirmOtp, setConfirmOtp] = useState<boolean>(false);
    const [validOtp, setValidotp] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [loading1, setLoading1] = useState<boolean>(false);

    // get userid
    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true)
            try {
                const response = await fetch(`http://13.233.252.242:8081/api/v1/user/userid-by-email?email=${getParams.email}`);
                if (response.ok) {
                    const json = await response.json();
                    setUserId(json.userId);
                    console.log(json)
                } else {
                    const errorResponse = response.json();
                    console.log(errorResponse)
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

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
                    email: getParams.email,
                    userID: userId,
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
                    userID: userId,
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
    };

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
                    email: getParams.email,
                    userID: userId,
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
                            <Text style={{ color: "#FFFFFF" }}>{getParams.email}</Text>
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
                                    onSubmitEditing={Keyboard.dismiss}

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
                        : (<View >
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
                                {getParams.email}
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

export default VerifyEmailPage;

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
