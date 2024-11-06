/* eslint-disable react/no-unstable-nested-components */
import React, { lazy } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import component
import HomeComponent from '../component/HomeComponent';
import FilesComponent from '../tabcomponent/FilesComponent';
import ImagesComponent from '../tabcomponent/ImagesComponent';
import VideoComponent from '../tabcomponent/VideoComponent';
import UserNavigation from './UserNavigation';

// Icons
import HomeIcon from '../Components/SVG/Icons/HomeIcon';
import FileIcon from '../Components/SVG/Icons/FileIcon';
import CirclePlayIcon from '../Components/SVG/Icons/CirclePlayIcon';
import UserIcon from '../Components/SVG/Icons/UserIcon';
import ImageIcon from '../Components/SVG/Icons/ImageIcon';
import SimpleHeader from '../header/SimpleHeader';
import MoreVertical from '../Components/SVG/Icons/MoreVertical';
import ArrowbackNav from '../Components/Arrowback';
import CheckCircleIcon from '../Components/SVG/Icons/CheckCircleIcon';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FileCompModalCard from '../Components/FileCompModalCard';

const Tab = createBottomTabNavigator();

type ScreenOptions = {
  route: {
    name: string;
  };
};

const Tabnavigation: React.FC = () => {
  return (
    // <NavigationContainer independent={true}>
    <Tab.Navigator
      // lazy={true}
      screenOptions={({ route }: ScreenOptions) => ({
        headerShown: true,

        tabBarIcon: ({ focused }) => {
          let IconComponent;
          switch (route.name) {
            case 'Home':
              IconComponent = HomeIcon;
              break;
            case 'Files':
              IconComponent = FileIcon;
              break;
            case 'Images ':
              IconComponent = ImageIcon;
              break;
            case 'Videos':
              IconComponent = CirclePlayIcon;
              break;
            case 'UserTab':
              IconComponent = UserIcon;
              break;
            default:
              IconComponent = ImageIcon;
          }

          return <IconComponent color={focused ? '#5f77e3' : '#000'} />;
        },
        tabBarLabel: () => null,
        tabBarStyle: {
          borderTopWidth: 0,

          position: 'absolute',
          bottom: 0,
          elevation: 10,
          backgroundColor: 'white',
          height: 60,
          shadowColor: 'black',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.25,
          shadowRadius: 3.5,
        },

      })}
    >
      <Tab.Screen
      name="Home"
        component={HomeComponent}
        options={{
          header: () => { return (<SimpleHeader />); },
        }}
        />

      <Tab.Screen
      name="Files"
      component={FilesComponent}
        options={{
          headerShown: true,
          headerTitle: 'Files',
          headerTitleStyle: {
            fontSize: 25,
            fontWeight: '400',
            color: 'black',
            alignSelf: 'flex-start',
          },
          headerStyle: {
            backgroundColor: '#f8f8f8',
            shadowColor: 'transparent',
            elevation: 8,
          },
          headerLeft: () => <ArrowbackNav />,
          headerRight: () => {
            return (
              <TouchableOpacity>
                <FileCompModalCard/>
              </TouchableOpacity>);
          },
        }}
        />

      <Tab.Screen
      name="Images"
        component={ImagesComponent}
        options={{
          headerTitle: 'Images',
          headerLeft: () => <ArrowbackNav/>,
          headerRight: () => {
            return (
              <TouchableOpacity style={{flexDirection:'row',paddingHorizontal:hp('2%')}}>
                <Text style={{color:'#000',}}>Select all </Text>
                <CheckCircleIcon color='#000' />
              </TouchableOpacity>);
          },
        }}
        />

      <Tab.Screen
       name="Videos"
        component={VideoComponent}
        options={{
          headerTitle: 'Video',
          headerLeft: () => <ArrowbackNav />,
        }}
        />

      <Tab.Screen
      name="UserTab"
        component={UserNavigation}
        options={{
          headerTitle: 'User',
          headerShown:false,
          headerLeft: () => <ArrowbackNav />,
        }}

        />

    </Tab.Navigator>
    // </NavigationContainer>
  );
};

export default Tabnavigation;
