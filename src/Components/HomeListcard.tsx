import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import FileIcon from './SVG/Icons/FileIcon';
import ImageIcon from './SVG/Icons/ImageIcon';
import CirclePlayIcon from './SVG/Icons/CirclePlayIcon';
import { weakMapMemoize } from '@reduxjs/toolkit';
import { widthPercentageToDP } from 'react-native-responsive-screen';


const HomeListcard = () => {
  const [list, setList] = useState([]);
  const [seleted, setSelected] = useState('');
  const [items, setItems] = useState([]);
  useEffect(() => {
    let res = [
        'Recent',
        'Starred',
      'Offline',
    ];
    const sampleItems = [
        { id: 1, name: 'O R', desc: 'Description 1', tags: ['Offline', 'Recent'],image:<CirclePlayIcon color={'black'}/> },
        { id: 2, name: 'S', desc: 'Description 2', tags: ['Starred'],image:<FileIcon color={'black'}/> },
        { id: 5, name: 'R S', desc: 'Description 5', tags: ['Recent', 'Starred'],image:<FileIcon color={'black'}/> },
        { id: 3, name: 'R', desc: 'Description 3', tags: ['Recent'],image:<ImageIcon color={'black'}/> },
        { id: 4, name: 'O', desc: 'Description 4', tags: ['Offline'], image:<CirclePlayIcon color={'black'}/> },
      ];
      setItems(sampleItems);
        setList(res);
        setSelected(res[0]);
  }, []);

  return (
    <View>
      <View
        style={{
          backgroundColor: '#b1b8c5',
          padding: 15,
          marginTop: 20,
        }}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap:widthPercentageToDP('25%')
          }} 
        >
          {list.map((ele, index) => (
            <TouchableOpacity key={index} onPress={() => setSelected(ele)}>
              <Text style={[styles.category, ele === seleted && styles.activeCategory]}>
                {ele}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <ScrollView>
        <View>
            {
                items.filter((item) => item.tags.includes(seleted)) 
                    .map((item, index) => (
                    <View key={index} style={{flexDirection:'row',margin:5, padding:10,justifyContent:'space-between', borderBottomWidth:1, }}>
                         <View>{item.image}</View>
                        <Text style={styles.contentText}>{item.name}</Text>
                        <Text  style={styles.contentText}>{item.desc}</Text>
                    </View>
                    ))
            }
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 20,
    backgroundColor: 'red',
    paddingBottom: 30,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
  },
  contentText: {
    fontSize: 16,
    color: '#000',
    margin: 5,
  },
  category:{
    color:'#000',
    fontSize:16,

  },
  activeCategory:{
    color:'#0000ff',
    fontSize:17,

  }
});

export default HomeListcard;
