import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ScrollView,
    TextInput,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    Keyboard,
    Platform,
} from 'react-native';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const strongPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/;

const Changepassword = ({ navigation }: any) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [validOldPassword, setValidOldPassword] = useState('');
    const [validNewPassword, setValidNewPassword] = useState('');
    const [validConfirmPassword, setValidConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [showOld, setShowOld] = useState(true);
    const [showNew, setShowNew] = useState(true);
    const [showConfirm, setShowConfirm] = useState(true);
    const [isDisable, setIsDisable] = useState(true);
    const [loading, setLoading] = useState(false);

    const newPasswordRef = useRef<TextInput>(null);
    const confirmPasswordRef = useRef<TextInput>(null);


    useEffect(() => {
        // Old Password
        if (oldPassword.trim().length === 0) {
            setValidOldPassword('');
        } else if (oldPassword.length < 8) {
            setValidOldPassword('Please enter atleast 8 character');
        } else if (oldPassword.length > 12) {
            setValidOldPassword('Please maintain password too long');
        } else if (!strongPasswordPattern.test(oldPassword)) {
            setValidOldPassword('please enter strong password');
        } else {
            setValidOldPassword('');
        };

        // New Password
        if (newPassword.trim().length === 0) {
            setValidNewPassword('');
        } else if (newPassword.length < 8) {
            setValidNewPassword('Please enter atleast 8 character');
        } else if (newPassword.length > 12) {
            setValidNewPassword('Please maintain password too long');
        } else if (!strongPasswordPattern.test(newPassword)) {
            setValidNewPassword('please enter strong password');
        } else if (oldPassword == newPassword){
            setValidNewPassword('Use Different password can not be same');
        }else {
            setValidNewPassword('');
        };

        // Confirm Password
        if (confirmPassword.trim().length === 0) {
            setValidConfirmPassword('')
        } else if (newPassword !== confirmPassword) {
            setValidConfirmPassword('Password not match')
        } else {
            setValidConfirmPassword('')
        };

        // IsDisable 
        if (oldPassword.trim().length > 0
            && newPassword.trim().length > 0
            && confirmPassword.trim().length > 0) {
            setIsDisable(false)
        } else {
            setIsDisable(true)
        };
    }, [oldPassword, newPassword, confirmPassword]);

    // Function to delete tokens from AsyncStorage
    const deleteTokens = async () => {
        setLoading(true);
        try {
            await AsyncStorage.multiRemove(['@jwtToken', '@refreshToken']);
            console.log('Tokens removed successfully');
            await navigation.navigate('Auth')
        } catch (error) {
            console.log('Error removing tokens:', error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch Api data
    const fetchData = async () => {
        setLoading(true);
        try {
            const token = await AsyncStorage.getItem('@jwtToken');
            if (!token) {
                console.log('No token found');
                setErrorMessage('Invalid or missing token');
                setLoading(false);
                return
            }
            const response = await fetch('http://13.233.252.242:8081/api/v1/auth/change-password', {
                method: 'Post',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    oldPassword: oldPassword,
                    newPassword: newPassword
                }),
            });
            if (response.ok) {
                const json = await response.json();
                console.log(json);
                await deleteTokens();
            } else {
                const errorResponse = await response.json();
                console.log(errorResponse);
                setErrorMessage(errorResponse.error);
            }
        } catch (error) {
            console.log('Catch Error:', error);
        } finally {
            setLoading(false);
        }
    };

    // Handle Save button
    const handleSaveButton = async () => {
        if (oldPassword.trim().length > 0
            && newPassword.trim().length > 0
            && confirmPassword.trim().length > 0) {
            await fetchData();
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
        };
    };



    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={{ alignItems: 'center' }}>
                    <Image
                        source={require('../assets/new/passwordfinal.png')}
                        style={styles.image} />
                </View>


                <View style={{ marginHorizontal: wp('10%'), marginTop: hp('1%') }}>
                    {errorMessage && <Text style={[styles.errorMsg, { alignSelf: 'center' }]}>{errorMessage}</Text>}
                    {/* Old password */}
                    <Text style={styles.inputTxt}>Old Password</Text>
                    <View>
                        <TextInput
                            style={styles.input}
                            placeholder='* * * * * *'
                            placeholderTextColor='#000000AB'
                            maxLength={20}
                            secureTextEntry={showOld}
                            value={oldPassword}
                            onChangeText={(text) => {
                                setOldPassword(text)
                            }}
                            returnKeyType='next'
                            blurOnSubmit={false}
                            onSubmitEditing={() =>
                                newPasswordRef.current
                                && newPasswordRef.current.focus()
                            }
                        />
                        <TouchableOpacity
                            style={styles.eyeBtn}
                            onPress={() => setShowOld(!showOld)} >
                            <Image
                                style={styles.eye}
                                source={showOld
                                    ? require('../assets/new/hidden.png')
                                    : require('../assets/new/eye.png')
                                } />
                        </TouchableOpacity>
                        {validOldPassword && <Text style={styles.errorMsg}>{validOldPassword}</Text>}
                    </View>

                    {/* New Password */}
                    <Text style={styles.inputTxt}> New Password</Text>
                    <View>
                        <TextInput
                            style={styles.input}
                            ref={newPasswordRef}
                            placeholder='* * * * * *'
                            placeholderTextColor='#000000AB'
                            maxLength={20}
                            secureTextEntry={showNew}
                            value={newPassword}
                            onChangeText={(text) => {
                                setNewPassword(text)
                            }}
                            returnKeyType='next'
                            blurOnSubmit={false}
                            onSubmitEditing={() =>
                                confirmPasswordRef.current
                                && confirmPasswordRef.current.focus()
                            }
                        />
                        <TouchableOpacity
                            style={styles.eyeBtn}
                            onPress={() => setShowNew(!showNew)}
                        >
                            <Image
                                style={styles.eye}
                                source={showNew
                                    ? require('../assets/new/hidden.png')
                                    : require('../assets/new/eye.png')
                                }
                            />
                        </TouchableOpacity>
                        {validNewPassword && <Text style={styles.errorMsg}>{validNewPassword}</Text>}
                    </View>

                    {/* Confirm password*/}
                    <Text style={styles.inputTxt}>Confirm Password</Text>
                    <View>
                        <TextInput
                            style={styles.input}
                            ref={confirmPasswordRef}
                            placeholder='* * * * * *'
                            placeholderTextColor='#000000AB'
                            maxLength={20}
                            secureTextEntry={showConfirm}
                            value={confirmPassword}
                            onChangeText={(text) => {
                                setConfirmPassword(text)
                            }}
                            returnKeyType='done'
                            onSubmitEditing={Keyboard.dismiss}
                            blurOnSubmit={false}
                        />
                        <TouchableOpacity
                            style={styles.eyeBtn}
                            onPress={() => setShowConfirm(!showConfirm)}
                        >
                            <Image
                                style={styles.eye}
                                source={showConfirm
                                    ? require('../assets/new/hidden.png')
                                    : require('../assets/new/eye.png')
                                }
                            />
                        </TouchableOpacity>
                        {validConfirmPassword && <Text style={styles.errorMsg}>{validConfirmPassword}</Text>}
                    </View>

                    {/* Save button */}
                    {loading ? <View style={[styles.btn, { backgroundColor: 'transparent' }]}>
                        <ActivityIndicator size={'large'} color={'black'} />
                    </View>
                        : <TouchableOpacity
                            disabled={isDisable}
                            style={[isDisable ? [styles.btn, { backgroundColor: 'gray' }] : styles.btn]}
                            onPress={handleSaveButton}>
                            <Text style={styles.btnTxt}>Save</Text>
                        </TouchableOpacity>}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default Changepassword;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    image: {
        height: wp('70%'),
        width: wp('60%'),       
    },
    eye: {
        height: wp('5%'),
        width: wp('5%'),
        resizeMode: 'cover'
    },
    eyeBtn: {
        position: 'absolute',
        right: wp('4%'),
        top: hp('2%')
    },
    inputTxt: {
        color: 'black',
        fontWeight: '400',
        marginTop: hp('1%'),
        marginLeft: hp('.5%'),
        fontSize: Platform.OS === 'ios' ? wp('4%') : wp('3.8%'),
    },
    input: {
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
    btn: {
        backgroundColor: '#355ADC',
        height: hp('5%'),
        borderRadius: 10,
        fontWeight: "400",
        marginTop: hp('3%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnTxt: {
        color: 'white',
        fontWeight: '700',
        fontSize: hp('2.3%'),
    },
    errorMsg: {
        color: 'red',
        fontWeight: '400',
    }
});

