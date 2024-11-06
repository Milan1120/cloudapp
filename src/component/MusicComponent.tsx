import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { heightPercentageToDP as hp , widthPercentageToDP as wp } from 'react-native-responsive-screen';
import FlotingButtoncard from '../Components/FloatingButtonCard';

const MusicComponent = () => {
  return (
    <SafeAreaView style={styles.contentcontainer}>
      <Text>MusicComponent</Text>
      <View style={styles.uploadbutton}>
        <FlotingButtoncard dataList={undefined} />
           
      </View>
    </SafeAreaView>
  )
}

export default MusicComponent

const styles = StyleSheet.create({
  contentcontainer:{
    flex:1
  },
  uploadbutton:{
    backgroundColor:'transparent',
    position:'absolute',
    bottom: hp('12%'),
    right: hp('3%'),
    width:wp('15%'),
    justifyContent: 'center',
    alignItems:'center',
    height:wp('15%'),
  },
})