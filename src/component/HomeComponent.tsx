import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  StatusBar,
  ScrollView,
  Platform,
  Alert
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import PushNotification from 'react-native-push-notification';
import Tabnavigation from '../routeNavigation/TabNavigation';
import SimpleHeader from '../header/SimpleHeader';
import CategoryCard from '../Components/CategoryCard';
import Search_Bar from '../header/Search_Bar';
import HomeListcard from '../Components/HomeListcard';
import PrimiumCard from '../Components/PrimiumCard';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import FinalLogoIcon from '../Components/SVG/Icons/FinalLogoIcon';
import LinearGradient from 'react-native-linear-gradient';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';


const HomeComponent = () => {
  const [categories, setCategory] = useState<any>([]);

  // App Permission
  useEffect(() => {
    requestGalleryPermission();
    requestNotificationPermission();
  }, []);

  // Request gallery permission (storage access)
  const requestGalleryPermission = async () => {
    try {
      let result;
      if (Platform.OS === 'android') {
        result = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
      } else if (Platform.OS === 'ios') {
        result = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
      }

      if (result === RESULTS.GRANTED) {
        console.log('Gallery permission granted');
        // You can now access the gallery
      } else {
        console.log('Gallery permission denied');
      }
    } catch (error) {
      console.log('Error requesting gallery permission:', error);
    }
  };

  // Request notification permission
  const requestNotificationPermission = async () => {
    try {
      let result;
      if (Platform.OS === 'android') {
        result = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
      } else if (Platform.OS === 'ios') {
        result = await request(PERMISSIONS.IOS.NOTIFICATIONS);
      }

      if (result === RESULTS.GRANTED) {
        console.log('Notification permission granted');
        // Initialize notification configuration here
        PushNotification.configure({
          onRegister: function (token) {
            console.log('TOKEN:', token);
          },
          onNotification: function (notification) {
            console.log('NOTIFICATION:', notification);
          },
          requestPermissions: true,
        });
      } else {
        console.log('Notification permission denied');
      }
    } catch (error) {
      console.log('Error requesting notification permission:', error);
    }
  };


  useEffect(() => {
    setCategory([
      {
        id: 1,
        title: 'Files',
        count: 0,
        imageURL: require('../assets/new/folder.png'),
      },
      {
        id: 2,
        title: 'Images',
        count: 0,
        imageURL: require('../assets/new/photo.png'),
      },
      {
        id: 3,
        title: 'Videos',
        count: 0,
        imageURL: require('../assets/new/video_folder.png'),

      },
      {
        id: 4,
        title: 'Music',
        count: 0,
        imageURL: require('../assets/new/music.png'),

      },
      {
        id: 5,
        title: 'Vault',
        count: 0,
        imageURL: require('../assets/new/Vaault.png'),

      },
      {
        id: 6,
        title: 'Apps',
        count: 0,
        imageURL: require('../assets/new/Apps.png'),

      },
    ]);
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <View style={{ margin: 0 }}>
        <StatusBar hidden={false} translucent backgroundColor="transparent" barStyle="dark-content" />
        {/* <SimpleHeader/> */}
        {/* <Search_Bar /> */}
        <PrimiumCard />

        <View style={{ width: wp('100%'), backgroundColor: '#6784e9', paddingVertical: hp('1.5%'), marginVertical: hp('2%') }} >
          <ScrollView horizontal={true}
            style={styles.ContentContainer}
            showsHorizontalScrollIndicator={false}>
            {categories.map((category: any) => {
              return (
                <LinearGradient
                  colors={["#E6E6FA", "#D8BFD8"]}
                  style={styles.categoryContainer}
                >
                  <CategoryCard key={category.id} image={category.imageURL} id={category.id} title={category.title} count={category.count} />
                </LinearGradient>
              );
            })}
          </ScrollView>
        </View>
        <HomeListcard />
      </View>
    </SafeAreaView>
  );
};

export default HomeComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
  },
  ContentContainer: {
    display: 'flex',
    gap: 6,
    paddingHorizontal: wp('2%')
  },
  categoryContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',  // Center content vertically
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 30,
    minHeight: 110,
    padding: 8,
    marginRight: 10,
    aspectRatio: 1,  // Maintain square shape
  },
});