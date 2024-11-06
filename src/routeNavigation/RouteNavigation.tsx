import React, { useState, useEffect, useRef, useCallback } from 'react';
import { NavigationContainer, useFocusEffect, NavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NetInfo from '@react-native-community/netinfo';
import { BackHandler, Alert, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


// Screens
import LandingPage from '../screens/LandingPage';
import Auth from './Auth';
import Tabnavigation from './TabNavigation';
import CheckInternet from '../commanScreen/CheckInternet';
import HomeScreenlock from '../user/HomeScreenlock';
import NotificationPage from '../notification/NotificationPage';
import RecycleBin from '../recyclebin/RecycleBin';
import UserNavigation from './UserNavigation';
import { SafeAreaView } from 'react-native';
import { current } from '@reduxjs/toolkit';
import MusicComponent from '../component/MusicComponent';
import AppsComponents from '../Components/HomeComponentsScreens/AppsComponents';
import VaultComponents from '../Components/HomeComponentsScreens/VaultComponents';


const Stack = createNativeStackNavigator();

const RouteNavigation = () => {
  const [isConnected, setIsConnected] = useState<boolean>(true); 
  const [lastScreen, setLastScreen] = useState<string | null>(null);
  const navigationRef = useRef<NavigationContainerRef<any>>(null);      
  const [isUnlocked, setIsUnlocked] = useState<string | null>(null);
  // console.log('============>',isConnected)

  // Subscribe to internet connection changes
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: any) => {
      setIsConnected(state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  // Save the last screen before losing connection
  useEffect(() => {
    if (!isConnected && navigationRef.current) {
      const currentRoute = navigationRef.current.getCurrentRoute();
      setLastScreen(currentRoute?.name || 'Landing');
    }
  }, [isConnected]);

  // Handle navigation state changes to track the current screen
  const handleNavigationStateChange = (state: any) => {
    if (state) {
      const currentRouteName = state.routes[state.index].name;
      setLastScreen(currentRouteName);
    }
  };


  // Check if a PIN is set for HomeScreenLock
  useEffect(() => {
    const checkPin = async () => {
      // try {
      //   const pin = await getUserPin();
      //   console.log('==============',!!pin)
      //   setIsUnlocked(!!pin);
      // } catch (error) {
      //   console.error('Error fetching PIN:', error);
      // }
    };
    checkPin();
  }, []);

  // Handle back button press for Android
  // useFocusEffect(
  //   useCallback(() => {
  //     const onBackPress = () => {
  //       if (navigationRef.current?.canGoBack()) {
  //         navigationRef.current.goBack();
  //       } else {
  //         Alert.alert(
  //           'Exit App',
  //           'Do you want to exit the app?',
  //           [
  //             { text: 'Cancel', style: 'cancel' },
  //             { text: 'OK', onPress: () => BackHandler.exitApp() },
  //           ],
  //           { cancelable: false }
  //         );
  //       }
  //       return true; 
  //     };

  //     if (Platform.OS === 'android') {
  //       BackHandler.addEventListener('hardwareBackPress', onBackPress);
  //     }

  //     return () => {
  //       if (Platform.OS === 'android') {
  //         BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  //       }
  //     };
  //   }, [])
  // );

  // Show CheckInternet screen when no internet connection
  if (!isConnected) {
    return (
      <CheckInternet
        isConnected={isConnected}
        setIsConnected={setIsConnected}
      />
    );
  };

  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={handleNavigationStateChange}
    >
      <Stack.Navigator initialRouteName={lastScreen || 'Landing'}
        screenOptions={{ headerShown: false }}
        >

        {/* Main Stack Navigator */}
        <Stack.Screen
          name="Landing"
          component={LandingPage}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{ headerShown: false }}
        />

        {/* If PIN is set, show the PinScreen */}
        {isUnlocked ? (<Stack.Screen
          name="HomeScreenlock"
          component={HomeScreenlock}
          options={{ headerShown: false }}
        />)
          : (<Stack.Screen
            name="HomeTab"
            component={Tabnavigation}
            options={{ headerShown: false }}
          />)}

        <Stack.Screen
          name="Notification"
          component={NotificationPage}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Recyclebin"
          component={RecycleBin}
          options={{ headerShown: false }}
        />

        {/* <Stack.Screen
            name="UserNavigation"
            component={UserNavigation}
          /> */}
        <Stack.Screen
          name="Music"
          component={MusicComponent}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Apps"
          component={AppsComponents}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Vault"
          component={VaultComponents}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};



export default RouteNavigation;


const getUserPin = async (): Promise<string | null> => {
  try {
    // Replace with actual logic to retrieve the PIN, e.g., from AsyncStorage
    const pin = await AsyncStorage.getItem('userPin');
    return pin;
  } catch (error) {
    console.error('Error retrieving PIN:', error);
    return null;
  }
};











// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import { NavigationContainer, NavigationContainerRef, NavigationState } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import NetInfo from '@react-native-community/netinfo';
// import { BackHandler, Alert, Platform } from 'react-native';
// import { useFocusEffect } from '@react-navigation/native';

// // Screens
// import LandingPage from '../screens/LandingPage';
// import Auth from './Auth';
// import TabNavigation from './TabNavigation';
// import CheckInternet from '../commanScreen/CheckInternet';
// import HomeScreenlock from '../user/HomeScreenlock';
// import NotificationPage from '../notification/NotificationPage';
// import RecycleBin from '../recyclebin/RecycleBin';
// import MusicComponent from '../component/MusicComponent';
// import AppsComponents from '../Components/HomeComponentsScreens/AppsComponents';
// import VaultComponents from '../Components/HomeComponentsScreens/VaultComponents';

// // Assume getUserPin is defined and exported from '../utils/auth'
// import { getUserPin } from '../utils/auth'; // Adjust the import path as necessary

// const Stack = createNativeStackNavigator();

// const RouteNavigation = () => {
//   const [isConnected, setIsConnected] = useState<boolean>(true); // Track internet connection status
//   const [lastScreen, setLastScreen] = useState<string | null>(null); // Track the last visited screen
//   const [isPinSet, setIsPinSet] = useState<boolean>(false); // Track if PIN is set for HomeScreenLock
//   const navigationRef = useRef<NavigationContainerRef<NavigationState> | null>(null); // Ref to keep track of navigation

//   // Subscribe to internet connection changes
//   useEffect(() => {
//     const unsubscribe = NetInfo.addEventListener((state) => {
//       setIsConnected(state.isConnected ?? false);
//     });
//     return () => unsubscribe();
//   }, []);

//   // Save the last screen before losing connection
//   useEffect(() => {
//     if (!isConnected && navigationRef.current) {
//       const currentRoute = navigationRef.current.getCurrentRoute();
//       setLastScreen(currentRoute?.name || 'Landing');
//     }
//   }, [isConnected]);

//   // Handle navigation state changes to track the current screen
//   const handleNavigationStateChange = (state: NavigationState | undefined) => {
//     if (state) {
//       const currentRouteName = state.routes[state.index].name;
//       setLastScreen(currentRouteName);
//     }
//   };

//   // Check if a PIN is set for HomeScreenLock
//   useEffect(() => {
//     const checkPin = async () => {
//       try {
//         const pin = await getUserPin();
//         setIsPinSet(!!pin);
//       } catch (error) {
//         console.error('Error fetching PIN:', error);
//       }
//     };
//     checkPin();
//   }, []);

//   // Handle back button press for Android
//   useEffect(() => {
//     const onBackPress = () => {
//       if (navigationRef.current?.canGoBack()) {
//         navigationRef.current.goBack();
//       } else {
//         Alert.alert(
//           'Exit App',
//           'Do you want to exit the app?',
//           [
//             { text: 'Cancel', style: 'cancel' },
//             { text: 'OK', onPress: () => BackHandler.exitApp() },
//           ],
//           { cancelable: false }
//         );
//       }
//       return true; // Prevent default behavior (exiting the app)
//     };

//     if (Platform.OS === 'android') {
//       BackHandler.addEventListener('hardwareBackPress', onBackPress);
//     }

//     return () => {
//       if (Platform.OS === 'android') {
//         BackHandler.removeEventListener('hardwareBackPress', onBackPress);
//       }
//     };
//   }, []);

//   // Show CheckInternet screen when no internet connection
//   if (!isConnected) {
//     return (
//       <CheckInternet
//         isConnected={isConnected}
//         setIsConnected={setIsConnected}
//       />
//     );
//   }

//   return (
//     <NavigationContainer
//       ref={navigationRef}
//       onStateChange={handleNavigationStateChange}
//     >
//       <Stack.Navigator
//         initialRouteName={lastScreen || 'Landing'}
//         screenOptions={{ headerShown: false }}
//       >
//         {/* Main Stack Navigator */}
//         <Stack.Screen
//           name="Landing"
//           component={LandingPage}
//           options={{ headerShown: false }}
//         />

//         <Stack.Screen
//           name="Auth"
//           component={Auth}
//           options={{ headerShown: false }}
//         />

//         {/* If PIN is set, show the HomeScreenlock, otherwise show HomeTab */}
//         {isPinSet ? (
//           <Stack.Screen
//             name="HomeScreenlock"
//             component={HomeScreenlock}
//             options={{ headerShown: false }}
//           />
//         ) : (
//           <Stack.Screen
//             name="HomeTab"
//             component={TabNavigation}
//             options={{ headerShown: false }}
//           />
//         )}

//         <Stack.Screen
//           name="Notification"
//           component={NotificationPage}
//           options={{ headerShown: false }}
//         />

//         <Stack.Screen
//           name="Recyclebin"
//           component={RecycleBin}
//           options={{ headerShown: false }}
//         />

//         {/* Uncomment if UserNavigation is needed */}
//         {/* <Stack.Screen
//             name="UserNavigation"
//             component={UserNavigation}
//           /> */}

//         <Stack.Screen
//           name="Music"
//           component={MusicComponent}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="Apps"
//           component={AppsComponents}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="Vault"
//           component={VaultComponents}
//           options={{ headerShown: false }}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default RouteNavigation;
