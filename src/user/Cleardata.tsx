import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import React from 'react';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const Cleardata = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* All personel data */}
                <View style={styles.viewDiv}>
                    <Text style={styles.text}>All personel data</Text>
                    <Text style={styles.sbText}>Like name, phone & email</Text>
                </View>

                {/* Clean records */}
                <View style={styles.viewDiv}>
                    <Text style={styles.text}>Clean records</Text>
                    <Text style={styles.sbText}>Shared data & view history will be deleted</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Cleardata

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    viewDiv: {
        flexDirection: 'row'
    },
    text: {
        fontSize: wp('5%'),
    },
    sbText: {
        fontSize: wp('3%'),
    }
})