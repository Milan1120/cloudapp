import React, { useState } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, ScrollView, Alert, Platform } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const ImagePickerComponent = ({ onImagesPicked }) => {
  const [images, setImages] = useState<any[]>([]); 

  const requestPhotoLibraryPermission = async () => {
    if (Platform.OS === 'ios') {
      const permission = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
      if (permission === RESULTS.GRANTED || permission === RESULTS.LIMITED) {
        pickImages();
      } else {
        Alert.alert('Permission Denied', 'We need access to your photo library to select images.');
      }
    } else if (Platform.OS === 'android') {
      const permission = await request(PERMISSIONS.ANDROID.CAMERA);
      if (permission === RESULTS.GRANTED) {
        pickImages();
      } else {
        Alert.alert('Permission Denied', 'We need access to your storage to select images.');
      }
    }
  };


  const pickImages = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 5,
      },
      (response) => {
        if (response.didCancel) {
          console.log('User canceled image picker');
        } else if (response.errorMessage) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else if (response.assets) {
          const selectedImages = response.assets.map((image) => ({
            uri: image.uri,
            fileName: image.fileName,
          }));

          const updatedImages = [...images, ...selectedImages];
          setImages(updatedImages);
          onImagesPicked(updatedImages);
        }
      }
    );
  };
  const deleteImage = (uri: string) => {

    const updatedImages = images.filter((image) => image.uri !== uri);

    setImages(updatedImages);
    onImagesPicked(updatedImages);
  };

  return (
    <View style={styles.container}>
     
      <TouchableOpacity style={styles.selectButton} onPress={requestPhotoLibraryPermission}>
        <Text style={styles.buttonText}>Upload Images</Text>
      </TouchableOpacity>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {images.map((image, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image source={{ uri: image.uri }} style={styles.imagePreview} />
            <TouchableOpacity style={styles.deleteButton} onPress={() => deleteImage(image.uri)}>
              <Text style={styles.deleteText}>X</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  imageContainer: {
    position: 'relative',
    margin: 10,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  deleteButton: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 15,
    padding: 5,
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
  },
  selectButton: {
    width: wp('40%'),
    backgroundColor: '#355ADC',
    height: hp('6.5%'),
    alignSelf: 'center',
    marginTop: wp(10),
    borderRadius: wp(15),
  },
  buttonText: {
    fontSize: wp('5%'),
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: wp(3),
    fontWeight: '400',
  },
});

export default ImagePickerComponent;
