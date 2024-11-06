import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Alert, ScrollView, TextInput, TouchableWithoutFeedback } from 'react-native';
import React, { useState } from 'react';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const DeactivateAccount = () => {
    const [reason, setReason] = useState(''); 
    const [showInstructions, setShowInstructions] = useState(true); 

    const handleDeactivateAccount = () => {
        if (!reason) {
            Alert.alert('Error', 'Please provide a reason for deactivating your account.');
        } else if (reason.length < 10) {
            Alert.alert('Error', 'Reason must be at least 10 characters long.');
        } else {
            Alert.alert('Account Deactivated', `Reason: ${reason}`);
            // Here, you can add your logic to deactivate the account
        }
    };

    const handleInstructionClick = () => {
        setShowInstructions(false); 
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.viewDiv}>
                    <Text style={{ fontSize: wp('5%'), color: 'black' }}>Are you sure?</Text>
                    <Text style={styles.subHeading}>Deactivate your account</Text>

                    {/* ========================== Instruction ======================= */}
                    <View style={{ marginTop: hp('3%') }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.subHeading}>{'\u2022'}</Text>
                            <Text style={[styles.subHeading, { width: wp('80%') }]}>
                                Your stored data will be erased from the app to ensure your privacy.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.subHeading}>{'\u2022'}</Text>
                            <Text style={[styles.subHeading, { width: wp('80%') }]}>
                                Any information regarding your account will be deleted.
                            </Text>
                        </View>
                    </View>

                    {/* ========================== Instruction reason ======================= */}
                    <Text style={styles.reason}>Your reason for deactivating the account</Text>

                    {/* Dynamic Instruction with TextInput */}
                    <TouchableWithoutFeedback onPress={handleInstructionClick}>
                        <View style={styles.instruction}>
                            <View style={{ padding: wp('4%') }}>
                                {/* Show instruction text until clicked */}
                                {showInstructions ? (
                                    <>
                                        <Text style={styles.text}>
                                            Please state your reason or feedback so that we can improve our services.
                                        </Text>
                                        <Text style={styles.text}>
                                            You can recover your account within 30 days after deactivation, if you log in with previous information.
                                        </Text>
                                    </>
                                ) : (
                                    <TextInput
                                        style={styles.textInputInsideText}
                                        placeholder="Enter Your Reason"
                                        value={reason}
                                        placeholderTextColor={'#000000'}
                                        onChangeText={setReason} 
                                        multiline
                                        autoFocus 
                                    />
                                )}
                            </View>
                        </View>
                    </TouchableWithoutFeedback>

                    {/* ======================== Deactivate button ============================ */}
                    <TouchableOpacity style={styles.button} onPress={handleDeactivateAccount}>
                        <Text style={styles.btnText}>Deactivate account</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default DeactivateAccount;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    viewDiv: {
        marginHorizontal: 20,
        marginTop: wp('5%'),
    },
    Heading: {
        fontSize: wp('5%'),
        color: 'black',
    },
    subHeading: {
        fontSize: wp('4%'),
        marginLeft: wp('2%'),
        marginTop: hp('2%'),
        color: 'black',
    },
    reason: {
        fontSize: wp('4%'),
        marginTop: hp('6%'),
        color: '#000000',
    },
    instruction: {
        backgroundColor: '#D9D9D9',
        marginTop: wp('5%'),
        borderRadius: 15,
        height: hp("20%")
    },
    text: {
        fontSize: wp('3.5%'),
        color: 'grey',
        marginTop: wp('1%'),
        lineHeight: hp('3%'),
    },
    textInputInsideText: {
        backgroundColor: '#FFFFFF',
        borderColor: '#CCCCCC',
        borderWidth: 1,
        borderRadius: 10,
        padding: wp('4%'),
        fontSize: wp('4%'),
        color: '#000000',
        marginTop: hp('1%'),
        height: hp('14%'),
        textAlignVertical: 'top', // Ensures the text starts at the top in multiline
    },
    button: {
        backgroundColor: '#355ADC',
        height: hp('6%'),
        width: wp('60%'),
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: hp('8%'),
    },
    btnText: {
        color: '#FFFFFF',
        fontSize: wp('6%'),
        fontWeight: '600',
    },
});
