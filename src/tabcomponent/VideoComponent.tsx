import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, PermissionsAndroid, Platform } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const VideoComponent = () => {

  const requestGalleryPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        if (Platform.Version >= 33) {
          // Android 13 and above, request for individual media permissions
          const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          ]);
          
          if (granted['android.permission.READ_MEDIA_VIDEO'] === PermissionsAndroid.RESULTS.GRANTED) {
            pickVideo();
          } else {
            Alert.alert('Permission Denied', 'You need to give permission to access the gallery.');
          }
        } else if (Platform.Version >= 29) {
          // Android 10 to Android 12
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_MEDIA_LOCATION,
            {
              title: 'Gallery Permission',
              message: 'App needs access to your gallery to upload videos',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            pickVideo();
          } else {
            Alert.alert('Permission Denied', 'You need to give permission to access the gallery.');
          }
        } else {
          // Android versions below 10
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
              title: 'Gallery Permission',
              message: 'App needs access to your gallery to upload videos',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            pickVideo();
          } else {
            Alert.alert('Permission Denied', 'You need to give permission to access the gallery.');
          }
        }
      } catch (err) {
        console.warn('Permission error: ', err);
      }
    } else {
      pickVideo(); // iOS doesn't require explicit permission
    }
  };
  
  const pickVideo = () => {
    launchImageLibrary(
      {
        mediaType: 'video',  // Ensure you're using the correct media type
        selectionLimit: 5,   // Allow multiple selections (adjust as needed)
      },
      (response) => {
        console.log('Full response: ', response); // Debugging response
        if (response.didCancel) {
          console.log('User cancelled video picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorCode);
          Alert.alert('Error', `An error occurred: ${response.errorCode}`);
        } else if (response.assets && response.assets.length > 0) {
          const videoUri = response.assets[0].uri;
          console.log('Video URI: ', videoUri);
          Alert.alert('Video Selected', `Video URI: ${videoUri}`);
        } else {
          console.log('No video selected');
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/new/videos.png')} style={styles.image} />
      <Text style={styles.txt}>
        Automatically back up videos to the {'\n'}
        cloud
      </Text>
      <View>
        <TouchableOpacity style={styles.btn} onPress={requestGalleryPermission}>
          <Text style={styles.btntxt}>Upload videos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VideoComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  image: {
    width: wp('80%'),
    height: hp('20%'),
    alignSelf: 'center',
    resizeMode: 'contain',
    marginTop: wp(40),
  },
  txt: {
    fontSize: hp('2.5%'),
    color: '#B5AEAE',
    textAlign: 'center',
    marginTop: wp(10),
  },
  btn: {
    width: wp('40%'),
    backgroundColor: '#355ADC',
    height: hp('6%'),
    alignSelf: 'center',
    marginTop: wp(14),
    borderRadius: wp(15),
  },
  btntxt: {
    fontSize: wp('5%'),
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: wp(2),
    fontWeight: '400',
  },
});
