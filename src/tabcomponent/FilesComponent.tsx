import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Pressable
} from 'react-native';
import CirclePlayIcon from '../Components/SVG/Icons/CirclePlayIcon';
import ImageIcon from '../Components/SVG/Icons/ImageIcon';
import FileIcon from '../Components/SVG/Icons/FileIcon';
import ListCard from '../Components/ListCard';
import GridIcon from '../Components/SVG/Icons/GridIcon';
import ListIcon from '../Components/SVG/Icons/ListIcon';
import { heightPercentageToDP as hp , widthPercentageToDP as wp } from 'react-native-responsive-screen';
import FlotingButtoncard from '../Components/FloatingButtonCard';

export default function FilesComponent() {
  const [list, setList] = useState<any>([]);
  const [viewType, setListView] = useState<Boolean>(true);
  const [selected, setSelected] = useState<any>('');
  const [items,setItems] = useState<any>([]);
  const [pressed,setPressed] = useState<boolean>(false);

  useEffect(() => {
    let res = ['All', 'Stared', 'Offline'];

    const sampleItems = [
      { id: 1, name: 'O R', desc: 'Description 1', tags: ['Offline', 'All'], fileType:'image' },
      { id: 2, name: 'S', desc: 'Description 2', tags: ['Stared', 'All'], fileType:'image' },
      { id: 5, name: 'R S', desc: 'Description 5', tags: ['All', 'Stared'], fileType:'image' },
      { id: 3, name: 'R', desc: 'Description 3', tags: ['All'], fileType:'file' },
      { id: 4, name: 'O', desc: 'Description 4', tags: ['Offline', 'All'], fileType:'video' },
    ];

    setItems(sampleItems);
    setList(res);
    setSelected(res[0]);
  }, []);

  return (
    <View style={{flex:1,}}>
      <View style={{ padding: 15, marginTop: 20,}}>
        
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            gap: 5,
          }}
        >
          
          {list.map((ele, index) => (
            <TouchableOpacity key={index} onPress={() => setSelected(ele)}>
              <Text style={[styles.category, ele === selected && styles.activeCategory]}>
                {ele}
              </Text>
            </TouchableOpacity>

          ))}
          
        </ScrollView>
        
      </View>


      <View style={{flexDirection:'row-reverse',}} >
          <TouchableOpacity  onPress={ () => {setListView(false);
             setPressed(true);
          }} >
            <Text><GridIcon color={pressed ? '#5f77e3' : '#000'} /></Text>
          </TouchableOpacity>
          <TouchableOpacity  onPress={ () => {setListView(true);
             setPressed(false);
          }} >
            <Text><ListIcon color={pressed ? '#000' : '#5f77e3'}/></Text>
          </TouchableOpacity>
      </View>
      <ScrollView>
        <View>
          <ListCard items={items} selected = {selected } listView={viewType}/>
        </View>
        
      </ScrollView>
      <View style={styles.uploadbutton}>
        <FlotingButtoncard dataList={undefined} />
           
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  category: {
    backgroundColor: '#bebebe',
    fontSize: 18,
    fontWeight: '400',
    color: '#000',
    padding: 4,
    borderRadius: 10,
  },
  activeCategory: {
    backgroundColor: '#2274e3',
    color: '#ffff',
  },
  contentText: {
    fontSize: 16,
    color: '#000',
  },
  uploadbutton:{
    backgroundColor:'transparent',
    position:'absolute',
    bottom: hp('12%'),
    right: hp('3%'),
    width:wp('15%'),
    justifyContent: 'center',
    alignItems:'center',
    height:wp('15%'),
  },
  buttonText:{
    color:'#2275e3',
    fontSize:45, 
    fontWeight:'400',
    overflow:'hidden',
  },
});


