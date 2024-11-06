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
import Keychain from 'react-native-keychain';


const HomeScreenlock = ({ onUnlock }: { onUnlock: () => void }) => {
    const dailPad = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    const [enteredPIN, setEnteredPIN] = useState<string>('');
    const [storedPIN, setStoredPIN] = useState<string | null>(null);
    const [confirmPIN, setConfirmPIN] = useState<string | null>(null);
    const [isSettingPIN, setIsSettingPIN] = useState<boolean>(false);
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

    // Fetch the stored PIN from Keychain on component mount
    useEffect(() => {
        const fetchStoredPIN = async () => {
            try {
                const credentials = await Keychain.getGenericPassword();
                if (credentials) {
                    setStoredPIN(credentials.password);
                }
            } catch (error) {
                console.log("Keychain couldn't be accessed!", error);
            }
        };
        fetchStoredPIN();
    }, []);

    // Handle PIN submission and confirm PIN logic
    useEffect(() => {
        const handlePINSubmission = async () => {
            if (enteredPIN.length === 4) {
                if (isSettingPIN) {
                    if (!storedPIN) {
                        // First entry for setting PIN
                        setStoredPIN(enteredPIN);
                        setConfirmPIN(enteredPIN);
                        setEnteredPIN('');
                        setError('Re-enter the PIN to confirm');
                    } else if (enteredPIN === confirmPIN) {
                        try {
                            await Keychain.setGenericPassword('userPIN', enteredPIN);
                            Alert.alert('PIN Set', 'Your new PIN is set!');
                            setError('');
                            setEnteredPIN('');
                            setIsSettingPIN(false);
                        } catch (error) {
                            console.log("Couldn't store the PIN securely!", error);
                        }
                    } else {
                        setError('PINs do not match. Try again.');
                        setTimeout(() => {
                            setConfirmPIN(null);
                            setEnteredPIN('');
                        }, 1000);
                    }
                } else {
                    // Handle unlock logic
                    const credentials = await Keychain.getGenericPassword();
                    if (credentials && enteredPIN === credentials.password) {
                        Alert.alert('Access Granted', 'You have unlocked the app!');
                        setEnteredPIN('');
                        setError('');
                        onUnlock();
                    } else {
                        setError('Incorrect PIN, try again.');
                        setTimeout(() => {
                            setEnteredPIN('');
                        }, 1000);
                    }
                }
            }
        };

        handlePINSubmission();
    }, [enteredPIN]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                {/* PIN circles */}
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

                <Text style={styles.title}>{isSettingPIN ? 'Set PIN' : 'Enter Code'}</Text>

                {/* Error message */}
                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                {/* Number pad */}
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

                {/* Set PIN button */}
                {!storedPIN && !isSettingPIN && (
                    <TouchableOpacity
                        style={styles.setPINButton}
                        onPress={() => setIsSettingPIN(true)}
                    >
                        <Text style={styles.setPINButtonText}>Set New PIN</Text>
                    </TouchableOpacity>
                )}
            </View>
        </SafeAreaView>
    );
};

export default HomeScreenlock;

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
    setPINButton: {
        marginTop: hp('2%'),
        backgroundColor: '#007BFF',
        paddingVertical: hp('2%'),
        paddingHorizontal: wp('20%'),
        borderRadius: wp('5%'),
    },
    setPINButtonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: wp('5%'),
    },
    errorText: {
        color: 'red',
        marginTop: hp('1%'),
        fontSize: wp('4%'),
        marginBottom: hp('1%'),
    },
});
