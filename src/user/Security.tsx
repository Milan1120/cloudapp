import { StyleSheet, Text, Switch, View, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const Security = ({ navigation }: any) => {
    const [isEnabled, setIsEnabled] = useState<boolean>(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);  // toggle switch button

   
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ marginTop: hp('2%')}}>
                    {/* Screen Lock */}
                    <View style={styles.viewDiv}>
                        <Text style={styles.txtData}>Screen lock</Text>
                        <Switch
                            trackColor={{ false: '#000000', true: 'white' }}
                            thumbColor={isEnabled ? '#D9D9D9' : '#656874'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={()=> navigation.navigate('HomeScreenlock')}
                            value={isEnabled}
                        />
                    </View>

                    {/* Change screen lock */}
                    <TouchableOpacity style={styles.viewDiv}
                        onPress={()=> navigation.replace('Changescreenlock')}>
                        <Text style={styles.txtData}>Change screen lock</Text>
                        <Image style={styles.images}
                            source={require('../assets/new/right-arrow.png')}
                        />
                    </TouchableOpacity>

                    {/* Change Password */}
                    <TouchableOpacity style={styles.viewDiv}
                        onPress={()=> navigation.replace('Changepassword')}>
                        <Text style={styles.txtData}>Change password</Text>
                        <Image style={styles.images}
                            source={require('../assets/new/right-arrow.png')}
                        />
                    </TouchableOpacity>

                    {/* Clean Data */}
                    <TouchableOpacity style={styles.viewDiv}
                        onPress={() => navigation.navigate('ClearData')}>
                        <Text style={styles.txtData}>Clean data</Text>
                        <Image style={styles.images}
                            source={require('../assets/new/right-arrow.png')}
                        />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Security;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    viewDiv: {
        flexDirection: 'row',
        backgroundColor: '#F5F5F5',
        height: wp('14%'),
        marginBottom:wp(2),
        margin: wp('1%'),
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: wp('4%'),
        padding: wp('4%'),
        borderRadius: 10
    },
    txtData: {
        fontSize: wp('4%'),
        color:"#000000",
        fontWeight:"400"
    },
    images: {
        height: wp('5%'),
        width: wp('5%'),
        resizeMode: 'contain'
    }
});