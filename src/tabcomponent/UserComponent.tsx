import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  Platform,
  Modal,
  Pressable, 
  ActivityIndicator
} from 'react-native';
import React, { useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/reducer/LoginUserSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';


const UserComponent = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const setData = useSelector((state: profileData) => state.profile)

  // fetch logout userId
  const logoutWithToken = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('@jwtToken');
      if (!token) {
        console.log('No token found');
        setLoading(false);
        return
      }
      const response = await fetch('http://13.233.252.242:8081/api/v1/auth/logout', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`

        },
        body: JSON.stringify({}),
      });

      if (response.ok) {
        const json = await response.json();
        console.log(json);
        removeToken();
      } else {
        const errorResponse = await response.json();
        console.log('Error Response', errorResponse);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Remove tokens from AsyncStorage
  const removeToken = async () => {
    await AsyncStorage.multiRemove(['@jwtToken', '@refreshToken']);
    dispatch(logout());
    await navigation.navigate('Auth');
  };

  // Handle Logout
  const handleLogout = async () => {
    if (Platform.OS == 'ios') {
      Alert.alert(
        'Logout',
        'Are you sure you want to logout?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Yes',
            style: 'destructive',
            onPress: () => [setModalVisible(true),logoutWithToken()],
          },
        ]
      )
    } else {
      Alert.alert(
        'Logout',
        'Are you sure you want to logout?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: () =>[setModalVisible(true),logoutWithToken()],
          },
        ],
        { cancelable: false }
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={true}>

        {/* Profile view */}
        <TouchableOpacity
          style={styles.profileDiv}
          onPress={() => navigation.navigate('EditUser')}>
          <View style={styles.imageDiv}>
            {setData?.profileImage ? <Image
              source={{ uri: setData.profileImage }}
              style={styles.imageDiv}
            />
              : <Image
                source={require('../assets/new/person.png')}
                style={styles.image}
              />}
          </View>
          <View style={styles.nameDiv}>
            <Text style={styles.nameText}>{setData?.name || 'Username'}</Text>
            <Text style={styles.editText}>Edit Profile</Text>
          </View>
        </TouchableOpacity>

        {/* Store view */}
        <View style={styles.storeDiv}>
          <Text style={styles.storage}>Storage</Text>
          <Text style={[styles.storage, { alignSelf: 'flex-end' }]}>Used 40%</Text>
          <View style={styles.storeView}>
            <View style={styles.storeUsed} />
          </View>
          <Text style={[styles.storage, { alignSelf: 'flex-end' }]}>free 60%</Text>
        </View>

        {/* List view */}
        <View style={styles.listDiv}>

          {/* Premium */}
          <TouchableOpacity
            style={styles.premiumDiv}
            onPress={() => navigation.navigate('Premium')
            }>
            <Image
              source={require('../assets/new/premium.png')}
              style={styles.primiumImg} />
            <Text style={styles.premiumText}>Premium</Text>
          </TouchableOpacity>

          {/* Settings */}
          <TouchableOpacity
            style={styles.premiumDiv}
            onPress={() => navigation.navigate('Setting')}>
            <Image
              source={require('../assets/new/setting.png')}
              style={styles.primiumImg} />
            <Text style={styles.premiumText}>Settings</Text>
          </TouchableOpacity>

          {/* Help */}
          <TouchableOpacity
            style={styles.premiumDiv}
            onPress={() => navigation.navigate('Help')}>
            <Image
              source={require('../assets/new/information.png')}
              style={styles.primiumImg} />
            <Text style={styles.premiumText}>Help</Text>
          </TouchableOpacity>


          {/* Privacy Policy */}
          <TouchableOpacity
            style={styles.premiumDiv}
            onPress={() => navigation.navigate('PrivacyPolicy')}>
            <Image
              source={require('../assets/new/privacy.png')}
              style={styles.primiumImg} />
            <Text style={styles.premiumText}>Privacy Policy</Text>
          </TouchableOpacity>

          {/* Logout */}
          <TouchableOpacity
            style={styles.premiumDiv}
            onPress={handleLogout}>
            <Image
              source={require('../assets/new/exit.png')}
              style={styles.primiumImg} />
            <Text style={styles.premiumText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

        {/* Loading modal */}
       {loading && <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalView}>
              <ActivityIndicator size={'large'} color={'black'}/>
            </View>
          </View>
        </Modal>}
    </SafeAreaView>
  )
}

export default UserComponent


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  profileDiv: {
    flexDirection: 'row',
    margin: wp('5%'),
    // borderWidth: 1,
  },
  imageDiv: {
    height: wp('26%'),
    width: wp('26%'),
    borderRadius: wp('13%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'skyblue'
  },
  image: {
    height: wp('15%'),
    width: wp('15%'),
    resizeMode: 'cover',
  },
  nameDiv: {
    marginLeft: wp('5%'),
    justifyContent: 'center',
  },
  nameText: {
    color: '#000000',
    fontSize: hp('3%'),
    fontWeight: 'bold'
  },
  editText: {
    color: 'gray',
    fontSize: hp('1.7%'),
  },
  storeDiv: {
    marginTop: wp('1%'),
    width: wp('90%'),
    alignSelf: 'center',
  },
  storage: {
    color: '#000000',
    fontSize: hp('2%'),
    fontWeight: "400"
  },
  storeView: {
    height: hp('1%'),
    width: wp('90%'),
    borderWidth: 1,
    borderRadius: wp('2%'),
    backgroundColor: '#E0E0E0',
  },
  listDiv: {
    width: wp('90%'),
    marginLeft: wp('5%'),
  },
  premiumDiv: {
    flexDirection: 'row',
    height: hp('4%'),
    marginTop: wp('3%'),
    alignItems: 'center',
    marginBottom: wp('2%')
  },
  premiumText: {
    marginLeft: wp('5%'),
    fontSize: hp('2.5%'),
    fontWeight: '600',
    color: "black"
  },
  primiumImg: {
    height: wp('7.5%'),
    width: wp('7.5%'),
    resizeMode: 'cover',
  },
  storeUsed: {
    height: '100%',
    width: '40%',
    backgroundColor: 'skyblue',
    borderRadius: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: wp('80%'),
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
    height: wp('20%')
  },

})


interface profileData {
  profile: {
    profileImage: null | string
    name: string,
    phone: string,
    email: string
  }
};

