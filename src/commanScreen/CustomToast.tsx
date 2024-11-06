import React from 'react';
import { Platform } from 'react-native';
import Toast from 'react-native-simple-toast';

const CustomToast = ({ message, duration = Toast.LONG }) => {
  // Custom wrapper to show Toast based on platform
  const showToast = () => {
    if (Platform.OS === 'android') {
      Toast.showWithGravity(message, duration, Toast.TOP); 
    } else if(Platform.OS=== 'ios') {
      Toast.showWithGravity(message, duration, Toast.TOP); 
    }
  };

  return showToast();
};

export default CustomToast;