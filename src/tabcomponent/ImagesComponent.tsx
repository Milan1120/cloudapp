import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import ImagePickerComponent from '../Components/ImagePickerButton';
import MoreOptionCard from '../Components/MoreOptionCard';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import FloatButtonCard from '../Components/FloatingButtonCard';
const ImagesComponent = () => {
  const [images, setImages] = useState<any>([]);

  const handleImagesPicked = (selectedImages: any[]) => {
    setImages(selectedImages);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.contentcontainer}>
        <View>
          {images.length === 0 ? (
            <View style={styles.placeholderContainer}>
              <Image
                source={require('../assets/new/undraw_photos_re_pvh3.png')}
                style={styles.placeholderImage}
              />
              <Text style={styles.placeholderText}>
                No photos yet, automatically back up images to the cloud
              </Text>
              {/* Render the ImagePickerComponent */}
              <ImagePickerComponent onImagesPicked={handleImagesPicked} />
            </View>
          ) : (
            
              <FlatList
                data={images}
                keyExtractor={item => item.uri}
                renderItem={({item}) => (
                  <SafeAreaView>
                    <Text>{item.date}</Text>
                    <View style={styles.imageContainer}>
                      <Image source={{uri: item.uri}} style={styles.image} />
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text style={styles.dateText}>{item.fileName}</Text>
                        <View>
                         <MoreOptionCard dataList={undefined} />
                        </View>
                      </View>
                    </View>
                  </SafeAreaView>
                )}
              />
          )}
        
        </View>
      </ScrollView>
          {/* {images.length !== 0 && (<View style={styles.uploadbutton}>
            <FloatButtonCard dataList={undefined} />
          </View> ) } */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  contentcontainer:{
    // backgroundColor:'red',
  },
  placeholderContainer: {
    marginTop: hp('10%'),
    flex: 1,
    //  backgroundColor:'red',
    alignItems: 'center',
  },
  placeholderImage: {
    width: 250,
    height: 220,
    marginBottom: 16,
    // justifyContent:'center',
    resizeMode: 'contain',

    // backgroundColor:'green',
  },
  placeholderText: {
    fontSize: hp('2.5%'),
    color: '#B5AEAE',
    textAlign: 'center',
    marginTop: wp(2),
  },
  imageContainer: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    // backgroundColor:'red',
  },
  image: {
    width: wp('30%'),
    height: wp('30%'),
    borderRadius: 8,
  },
  dateText: {
    marginTop: 8,
    fontSize: 14,
    color: '#333',
  },
  // uploadbutton: {
  //   borderWidth:1,
  //   backgroundColor: 'none',
  //   position: 'absolute',
  //   bottom: hp('12%'),
  //   right: hp('3%'),
  //   width: wp('15%'),
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   height: wp('15%'),
  // },
});

export default ImagesComponent;
