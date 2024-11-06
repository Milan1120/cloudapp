import React, { useCallback } from 'react';
import { BackHandler, Alert, Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';

// import component
import EmailLoginPage from '../screens/EmailLoginPage';
import PhoneLoginPage from '../screens/PhoneLoginPage';
import SignupPage from '../screens/SignupPage';
import VerifyEmailPage from '../screens/VerifyEmailPage';
import ResetPassword from '../screens/ResetPassword';

const Stack = createNativeStackNavigator();

const Auth = ({ navigation }: any) => {
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        // Custom behavior on back press
        if (navigation.canGoBack()) {
          navigation.goBack()
        } else {
          Alert.alert(
            'Exit Abacus',
            'Do you want to exit',
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'OK', onPress: () => BackHandler.exitApp() }
            ],
            { cancelable: false }
          );
        }
        return true;
      };
      if (Platform.OS === 'android') {
        BackHandler.addEventListener('hardwareBackPress', onBackPress);

      }
      return () => {
        if (Platform.OS === 'android') {
          BackHandler.removeEventListener('hardwareBackPress', onBackPress);

        }
      }
    }, [navigation])
  );
  return (
    <Stack.Navigator
      initialRouteName='Email'
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Phone' component={PhoneLoginPage} />
      <Stack.Screen name='Email' component={EmailLoginPage} />
      <Stack.Screen name='Sign-up' component={SignupPage} />
      <Stack.Screen name='VerifyEmail' component={VerifyEmailPage} />
      <Stack.Screen name='Reset-Password' component={ResetPassword} />
    </Stack.Navigator>
  )
}

export default Auth;
