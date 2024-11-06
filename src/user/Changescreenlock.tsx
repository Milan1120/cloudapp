import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const Changescreenlock = () => {
    const dailPad = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'] // dail pad
    const correctPIN = '1234';  // correct pin
    const [enteredPIN, setEnteredPIN] = useState<string>('');
    const [error, setError] = useState<string>('');

    // Handle PIN input
    const handleNumberPress = (num: string) => {
        if (enteredPIN.length < 4) {
            setEnteredPIN(enteredPIN + num);
        }
    };

    // Handle delete button press
    const handleDeletePress = () => {
        setEnteredPIN(enteredPIN.slice(0, -1));
    };

    // Handle PIN submission
    useEffect(() => {
        if (enteredPIN.length === 4) {
            if (enteredPIN === correctPIN) {
                Alert.alert('Access Granted', 'You have unlocked the app!');
                setEnteredPIN('');
                setError('');
            } else {
                setError('Incorrect PIN, try again.');
                setTimeout(() => {
                    setEnteredPIN('');
                }, 1000);
            }
        }
    }, [enteredPIN]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>

                {/* ===================== PIN circles ===================== */}
                <View style={styles.pinContainer}>
                    {Array(4).fill(0).map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.pinDot,
                                enteredPIN.length > index && styles.pinFilled
                            ]}
                        />
                    ))}
                </View>

                <Text style={styles.title}>Enter old Code</Text>

                {/* Error message */}
                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                {/*========================= Number pad ===========================*/}
                <View style={styles.numberPad}>
                    {dailPad.map((num, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.numberButton}
                            onPress={() => handleNumberPress(num)}
                        >
                            <Text style={styles.numberText}>{num}</Text>
                        </TouchableOpacity>
                    ))}
                    <TouchableOpacity
                        style={styles.numberButton}
                        onPress={handleDeletePress}
                    >
                        <Text style={styles.numberText}>Del</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Changescreenlock;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
    },
    content: {
        width: wp('100%'),
        alignItems: 'center',
        // borderWidth: 1
    },
    title: {
        fontSize: wp('7%'),
        fontWeight: '600',
        color: '#333',
    },
    pinContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: hp('3%'),
        width: wp('40%'),
    },
    pinDot: {
        width: wp('8%'),
        height: wp('8%'),
        borderRadius: wp('4%'),
        borderWidth: 1,
        borderColor: '#999',
        backgroundColor: 'transparent',
    },
    pinFilled: {
        backgroundColor: '#333',
    },
    numberPad: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        gap: wp('1%'),
        width: wp('93%'),
    },
    numberButton: {
        width: wp('30%'),
        height: hp('10%'),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DDD',
    },
    numberText: {
        fontSize: wp('6%'),
        color: '#333',
        fontWeight: '600',
    },
    errorText: {
        color: 'red',
        marginTop: hp('1%'),
        fontSize: wp('4%'),
        marginBottom: hp('1%')
    },
});

