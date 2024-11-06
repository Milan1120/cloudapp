import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp , widthPercentageToDP as wp } from 'react-native-responsive-screen';
import FlotingButtoncard from '../../Components/FloatingButtonCard';

const AppsComponents = () => {
  return (
    <SafeAreaView style={styles.contentcontainer}>
      <Text>Apps Components</Text>
      <View style={styles.uploadbutton}>
        <FlotingButtoncard dataList={undefined} />
           
      </View>
    </SafeAreaView>
  )
}

export default AppsComponents

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