import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import DocumentPicker from 'react-native-document-picker'

const DocumentPickerCard = () => {
    const selectDoc = async() => {
        try{
        const doc = await DocumentPicker.pick({
            type:[DocumentPicker.types.allFiles],
            allowMultiSelection: true,
        });
        console.log(doc)
        } catch(err) {
            if(DocumentPicker.isCancel(err)) 
              console.log("user cancelled the upload", err );
            else
              console.log(err)

        }

    }
  return (
    <View>
      <Text>DocumentPicker</Text>
      <View style={{marginHorizontal: wp('2%')}}>
        <TouchableOpacity onPress={() => {selectDoc}}>
          <Text>Select Document</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DocumentPickerCard;

const styles = StyleSheet.create({});
