import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import SearchComponent from './Search_Bar';


const SimpleHeader = () => {
  // const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.headerContainer}>
      
      <SearchComponent/>

      {/* <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
          <NotificationbellIcon size={30} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Recyclebin')}>
          <DeleteIcon />
        </TouchableOpacity>
      </View> */}
    </SafeAreaView>
  );
};

export default SimpleHeader;

const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    paddingBottom: 20,
    paddingTop:0,
    backgroundColor:'#ffff',
  },
  headerText: {
    fontSize: 30,
    color: 'black',
    fontWeight: '700',
    flex: 1,
  },
  iconContainer: {
    flexDirection: 'row',
  },
});
