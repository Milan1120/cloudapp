import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import { Colors } from 'react-native/Libraries/NewAppScreen';


const CategoryCard = ({id, title, count = undefined, image, onPress = () => {} }) => {
  const navigation = useNavigation();
  return (
    <>
      <TouchableOpacity onPress={count >=0 ? ()=>navigation.navigate(title) : onPress }  style={{alignItems:'center'}}>
      <Image
        source={image}
        style={styles.imagecontainer}
        />
      <Text style={styles.text}>{title}</Text>
      {
        (count >=0) && <Text style={styles.text}>{count}</Text>
      }
      </TouchableOpacity>
      </>
  );
};
  
const styles = StyleSheet.create({
  container: {
    display:'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',  // Center content vertically
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 30,
    minHeight:110,
    padding: 8,
    aspectRatio: 1,  // Maintain square shape
    overflow: 'hidden',  // Prevent overflow outside the container
  },
  text: {
    color: '#000',
    flexWrap: 'wrap',
  },
  imagecontainer:{
    alignItems: 'center',
    height: heightPercentageToDP('6%'),
    width: heightPercentageToDP('6%'),
    // marginTop: heightPercentageToDP('1%'),

  },
});

export default CategoryCard;
