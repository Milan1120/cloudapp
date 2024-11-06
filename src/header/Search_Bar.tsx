/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import NotificationbellIcon from '../Components/SVG/NotificationbellIcon';
import { SafeAreaView } from 'react-native-safe-area-context';
import DeleteIcon from '../Components/SVG/Icons/DeleteIcon';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

const SearchComponent = () => {
  const navigation = useNavigation();
  const [searchPhrase, setSearchPhrase] = useState<any>('');
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<any>(true);

 
  useEffect(() => {
    fetchDataFromApi();
  }, []);

 
  const fetchDataFromApi = async () => {
    try {
      
      setTimeout(() => {
        const apiData = [
          {}
        ];
        setData(apiData);
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.error('Error fetching data: ', error);
      setIsLoading(false);
    }
  };


  // const filteredData = data.filter((item) =>
  //   item.title.toLowerCase().includes(searchPhrase.toLowerCase())
  // );

  return (
    <SafeAreaView style={styles.container}>
       <View style={{display:'flex', flexDirection:'row',justifyContent:'space-between',}}>
        <View style={{paddingRight:wp('2%'),}}>
          <Image source={require('../assets/new/Abacus_logoFinal.png')} style={styles.logo}/>
        </View>
       <View style={styles.searchBar}>
        <Image source={require('../assets/Search.png')} style={styles.SearchIcon}/>
        <TextInput
          style={styles.input}
          placeholder="Search..."
          placeholderTextColor="grey"
          value={searchPhrase}
          onChangeText={setSearchPhrase}
        />
      

    </View>
    <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
          <NotificationbellIcon size={30} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Recyclebin')}>
          <DeleteIcon />
        </TouchableOpacity>
      </View>
    </View>

 
      {/* {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        searchPhrase.length > 0 && filteredData.length > 0 && (
          <FlatList
            data={filteredData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Text style={styles.item}>{item.title}</Text>}
          />
        )
      )} */}
    </SafeAreaView>
  );
};

export default SearchComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:0,
    paddingHorizontal: 0,
    
    
  },
  searchBar: {
    padding:0,
    height:hp('4.5%'),
    flexDirection: 'row',
    width: wp('66%'),
    backgroundColor: '#ffffff',
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 0,
    borderWidth:0.85,
    elevation:8,
    justifyContent:'space-around',
  },
  input: {
    fontSize: 16,
    marginLeft: wp('1%'),
    width: wp('55%'),
    color: 'black',
    padding:0,

  },
  item: {
    padding: 10,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  SearchIcon: {
     padding:wp('2%'),
     height:hp('2.7%'),
     width:hp('2.7%'),
  },
  iconContainer: {
    flexDirection: 'row',
    paddingLeft:wp('1%')
  },
  logo:{
    paddingRight: wp('2%'),
    height: hp('4.3%'),
    width: hp('4.3%')
  }
});
