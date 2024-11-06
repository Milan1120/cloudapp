import {
  StyleSheet,
  Text,
  Switch,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import React, { useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Settings = ({ navigation }: any) => {
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState<boolean>(false); // Track dark mode toggle
  const [isBackupEnabled, setIsBackupEnabled] = useState<boolean>(false); // Track auto backup toggle

  // Toggle dark mode
  const toggleDarkMode = () =>
    setIsDarkModeEnabled((previousState) => !previousState);

  // Toggle auto backup
  const toggleAutoBackup = () =>
    setIsBackupEnabled((previousState) => !previousState);

  // Common function to handle clearing data alerts
  const showAlert = (message: string) => {
    Alert.alert(
      '',
      message,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          style: 'destructive',
          // Add the required functionality here, e.g., clear cache or clear offline data
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ paddingTop: hp('2%') }}>
          {/* Clear all cache data */}
          <TouchableOpacity
            style={styles.viewDiv}
            onPress={() => showAlert('Your cache data will be cleared')}
          >
            <Text style={styles.txtData}>Clear all cache data</Text>
            <Text style={{ color: '#7A7878' }}>0B</Text>
          </TouchableOpacity>

          {/* Clear offline data */}
          <TouchableOpacity
            style={styles.viewDiv}
            onPress={() => showAlert('Your offline data will be cleared')}
          >
            <Text style={styles.txtData}>Clear offline data</Text>
            <Text style={{ color: '#7A7878' }}>0B</Text>
          </TouchableOpacity>

          {/* Dark mode */}
          <View style={styles.viewDiv}>
            <Text style={styles.txtData}>Dark Mode</Text>
            <Switch
              trackColor={{ false: '#D9D9D9', true: '#767577' }} // Custom colors
              thumbColor={isDarkModeEnabled ? '#656874' : 'grey'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleDarkMode}
              value={isDarkModeEnabled}
              style={styles.switchStyle}
            />
          </View>

          {/* Enable Auto Backup */}
          <View style={styles.viewDiv}>
            <Text style={styles.txtData}>Enable Auto Backup</Text>
            <Switch
              trackColor={{ false: '#D9D9D9', true: '#767577' }} // Custom colors
              thumbColor={isBackupEnabled ? '#656874' : 'grey'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleAutoBackup}
              value={isBackupEnabled}
              style={styles.switchStyle}
            />
          </View>

          {/* Account deactivation */}
          <TouchableOpacity
            style={styles.viewDiv}
            onPress={() => navigation.navigate('Deactivateaccount')}
          >
            <Text style={styles.txtData}>Account deactivation</Text>
            <Image
              style={styles.images}
              source={require('../assets/new/right-arrow.png')}
            />
          </TouchableOpacity>

          {/* Security */}
          <TouchableOpacity
            style={styles.viewDiv}
            onPress={() => navigation.navigate('Security')}
          >
            <Text style={styles.txtData}>Security</Text>
            <Image
              style={styles.images}
              source={require('../assets/new/right-arrow.png')}
            />
          </TouchableOpacity>

          {/* About */}
          <TouchableOpacity
            style={styles.viewDiv}
            onPress={() => navigation.navigate('About')}
          >
            <Text style={styles.txtData}>About</Text>
            <Image
              style={styles.images}
              source={require('../assets/new/right-arrow.png')}
            />
          </TouchableOpacity>

          {/* App version */}
          <View style={styles.viewDiv}>
            <Text style={styles.txtData}>App version</Text>
            <Text style={{ color: '#7A7878' }}>1.0.0.2</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  viewDiv: {
    flexDirection: 'row',
    backgroundColor: '#F1F1F1',
    height: wp('14%'),
    margin: wp('1%'),
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: wp('3%'),
    padding: wp('4%'),
    borderRadius: 10,
  },
  txtData: {
    fontSize: wp('4%'),
    color: 'black',
  },
  images: {
    height: wp('5%'),
    width: wp('5%'),
    resizeMode: 'contain',
  },
  switchStyle: {
    transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }],

  },
});
