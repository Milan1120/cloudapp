import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'

const UploadAutomaticallycard = () => {
  return (
    <View>
      <TouchableOpacity style ={styles.button} >
        <Text>Unable Automatic Upload</Text>
      </TouchableOpacity>
    </View>
  )
}

export default UploadAutomaticallycard

const styles = StyleSheet.create({
    button:{
        color:'#2073e3',
        
        
    }
})