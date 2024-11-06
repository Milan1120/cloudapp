import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  ActionSheetIOS,
  Platform,
  PermissionsAndroid
} from 'react-native';
import React, { useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { 
  ImageLibraryOptions, 
  launchCamera, 
  launchImageLibrary, 
  CameraOptions, 
  Asset 
} from 'react-native-image-picker';
import { useDispatch } from 'react-redux';
import { 
  setProfileImage, 
  setUserData         // Redux action to save image URI
 } from '../redux/reducer/UserProfileSlice';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const Edituser = ({ navigation }: any) => {
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [validName, setValidName] = useState<boolean>(true);
  const [validPhone, setValidPhone] = useState<boolean>(true);
  const [validEmail, setValidEmail] = useState<boolean>(true);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const dispatch = useDispatch(); // Dispatch for redux store

  // Handle changes button
  const handleChanges = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isNameValid = name.trim().length >= 2;
    const isPhoneValid = phone.trim().length === 10 && /^\d+$/.test(phone);
    const isEmailValid = emailRegex.test(email.trim());
    setValidName(isNameValid);
    setValidPhone(isPhoneValid);
    setValidEmail(isEmailValid);

    if (isNameValid && isPhoneValid && isEmailValid) {
      dispatch(setUserData({ name, phone, email }));
      navigation.navigate('User');
    } else {
      Alert.alert('Please correct the invalid fields');
    }
  };

  // Upload Image
  const selectImage = () => {
    if (Platform.OS === 'ios') {
      showActionSheetIOS();
    } else {
      Alert.alert(
        'Profile Picture',
        'Choose an option',
        [
          { text: 'Take Photo', onPress: openCamera },
          { text: 'Choose from Library', onPress: openGallery },
          { text: 'Cancel', style: 'cancel' }
        ],
        { cancelable: true }
      );
    }
  };

  // Handle show actionsheet in iOS
  const showActionSheetIOS = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Remove', 'Camera', 'Upload from Gallery'],
        cancelButtonIndex: 0,
      },
      buttonIndex => {
        if (buttonIndex === 1) {
          openCamera();
        } else if (buttonIndex === 2) {
          openGallery();
        }
      }
    );
  };

  // Request camera permission for Android
  const requestCameraPermission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: "Camera Permission",
        message: "This app needs access to your camera to take pictures.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  };

  // Open camera to take a picture with permission handling
  const openCamera = async () => {
    if (Platform.OS === 'android') {
      const permissionGranted = await requestCameraPermission();
      if (!permissionGranted) {
        Alert.alert('Camera permission is required to use this feature');
        return;
      }
    } else {
      const result = await check(PERMISSIONS.IOS.CAMERA);
      if (result !== RESULTS.GRANTED) {
        const requestResult = await request(PERMISSIONS.IOS.CAMERA);
        if (requestResult !== RESULTS.GRANTED) {
          Alert.alert('Camera permission is required to use this feature');
          return;
        }
      }
    }

    const options: CameraOptions = {
      mediaType: 'photo',
      saveToPhotos: true,
    };

    launchCamera(options, (response) => {
      handleImageResponse(response.assets);
    });
  };

  // Open gallery to pick an image
  const openGallery = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
    };
    launchImageLibrary(options, (response) => {
      handleImageResponse(response.assets);
    });
  };

  // Handle image response
  const handleImageResponse = (assets: Asset[] | undefined) => {
    if (assets && assets.length > 0) {
      const uri = assets[0].uri;
      setImageUri(uri || null);
      dispatch(setProfileImage(uri || '')); // Dispatch the image URI to Redux store
    } else {
      Alert.alert('No image selected');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Edit Image */}
        <View style={styles.profileDiv}>
          <TouchableOpacity style={styles.profileView} onPress={selectImage}>
            {imageUri ?
              <Image source={{ uri: imageUri }} style={styles.showimage} />
              : <Image source={require('../assets/new/person.png')} style={styles.image} />}
            <Image source={require('../assets/new/camera.png')} style={styles.camera} />
          </TouchableOpacity>
        </View>

        {/* Edit Details */}
        <View style={styles.detailsDiv}>
          {/* Name */}
          <Text style={styles.textname}>Name</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={[styles.inputWithIcon, !validName && styles.invalidInput]}
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <Image source={require('../assets/new/name.png')} style={styles.inputIcon} />
          </View>
          {!validName && <Text style={styles.errorText}>Name must be at least 2 characters long</Text>}

          {/* Phone */}
          <Text style={styles.textname}>Phone</Text>
          <TextInput
            style={[styles.input, !validPhone && styles.invalidInput]}
            value={phone}
            onChangeText={(text) => {
              // Restrict input to numeric values and a maximum of 10 characters
              if (/^\d*$/.test(text) && text.length <= 10) {
                setPhone(text);
              }
            }}
            keyboardType="numeric"
          />
          {!validPhone && <Text style={styles.errorText}>Phone number must be exactly 10 digits</Text>}

          {/* Email */}
          <Text style={styles.textname}>Email</Text>
          <TextInput
            style={[styles.input, !validEmail && styles.invalidInput]}
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
          />
          {!validEmail && <Text style={styles.errorText}>Enter a valid email address</Text>}

          {/* Apply change button */}
          <TouchableOpacity style={styles.button} onPress={handleChanges}>
            <Text style={styles.buttonText}>Apply Changes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Edituser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  profileDiv: {
    marginTop: hp('2%'),
    alignItems: 'center',
  },
  profileView: {
    height: wp('40%'),
    width: wp('40%'),
    borderRadius: wp('20%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#B8B8B8C2',
  },
  image: {
    height: wp('25%'),
    width: wp('25%'),
    resizeMode: 'cover',
  },
  showimage: {
    height: wp('40%'),
    width: wp('40%'),
    borderRadius: wp('20%'),
    resizeMode: 'cover'
  },
  camera: {
    height: wp('10%'),
    width: wp('10%'),
    borderRadius: wp('8%'),
    position: 'absolute',
    bottom: 0,
    right: wp('5%'),
    backgroundColor: 'black',
    tintColor: '#355ADC'
  },
  detailsDiv: {
    height: hp('60%'),
    margin: wp('10%'),
  },
  textname: {
    marginTop: hp('1%'),
    marginBottom: hp('0.5%'),
    fontSize: wp('4%'),
    marginLeft: wp('3%'),
    color: "#5B5D5E9E"
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.2,
    borderRadius: wp('7%'),
    borderColor: '#000',
    backgroundColor: '#fff',
    paddingHorizontal: wp('2%')
  },
  input: {
    borderWidth: 1.2,
    borderRadius: wp('7%'),
    borderColor: '#000',
    color:"black",
    backgroundColor: '#fff',
    paddingHorizontal: wp('2%'),
    fontSize: wp('4%'),
    marginBottom: hp('1%'),
    height: hp('5%')
  },
  inputWithIcon: {
    flex: 1,
    paddingHorizontal: 10,
    height: hp('5%'),
    color:"black"
  },
  invalidInput: {
    borderColor: 'red',
  },
  inputIcon: {
    width: wp('5%'),
    height: wp('5%'),
    resizeMode: 'contain'
  },
  button: {
    backgroundColor: '#355ADC',
    borderRadius: wp('5%'),
    width:wp('45%'),
    height: hp('7%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('7%'),
    marginLeft:wp(20)
  },
  buttonText: {
    color: '#fff',
    fontSize: wp('5%'),
  },
  errorText: {
    color: 'red',
    fontSize: wp('3.5%'),
  }
});
