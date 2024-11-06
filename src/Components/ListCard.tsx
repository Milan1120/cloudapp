import React, { useEffect, useState } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { widthPercentageToDP,heightPercentageToDP } from 'react-native-responsive-screen';
import CirclePlayIcon from './SVG/Icons/CirclePlayIcon';
import ImageIcon from './SVG/Icons/ImageIcon';
import FileIcon from './SVG/Icons/FileIcon';
import CheckCircleIcon from './SVG/Icons/CheckCircleIcon';
import SearchEngineIcon from './SVG/SearchEngineIcon';
import MoreOptionCard from './MoreOptionCard';

const WIDTH = widthPercentageToDP('20');
const HEIGHT = widthPercentageToDP('20');
const ListCard = ({items, selected, listView}) => {
  let [size, setSize] = useState(30);
  useEffect(() => {
    setSize(
      listView ? 30 : widthPercentageToDP('20')
    );
  }, [listView])
  
  function getImageComp(fileType:String) {
    let IconComponent;
    if (fileType === 'video') {
      IconComponent = CirclePlayIcon; 
    } else if (fileType === 'image') {
      IconComponent = ImageIcon; 
    } else if (fileType === 'file') {
      IconComponent = FileIcon; 
    } else {
      return null; // Return null if fileType doesn't match
    }

    return <IconComponent width={size} height={size} color='black' /> 
  }

  return (
    <View style={listView ? styles.list : styles.grid}>
      {items
        .filter(item => item.tags.includes(selected))
        .map((item, index) => (
          <View
            key={index}
            style={listView ? styles.listChild : styles.gridChild}
            >
            
            
            
            <View>{getImageComp(item.fileType)}</View>
            {/* <View><CheckCircleIcon width={WIDTH} height={HEIGHT} color='red'/></View> */}
            { listView  && <Text style={styles.contentText}>{item.name}</Text> }
            { listView  && <Text style={styles.contentText}>{item.desc}</Text> }
            { listView && <View><MoreOptionCard dataList={undefined}/></View>}
          </View>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  contentText: {
    fontSize: 16,
    color: 'black',
  },
  list:{

  },
  grid:{
    flexDirection:'row',
    flexWrap:'wrap',
    padding:widthPercentageToDP('5'),
    gap:20,
    // justifyContent:'flex-start'
  },
  gridChild:{
    borderColor:'red',
    borderWidth:1,
    width:WIDTH,
    height:HEIGHT,
    justifyContent:'center',
    alignItems:'center',
  },
  listChild:{
      flexDirection: 'row',
      margin: 5,
      padding: 10,
      justifyContent: 'space-between',
      borderBottomWidth: 1,
  }
});

export default ListCard;
