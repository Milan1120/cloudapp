import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import ArrowIcon from './SVG/Icons/ArrowIcon';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import ArrowLeftIcon from './SVG/Icons/ArrowLeftIcon';

const ArrowbackNav = () => {

  const navigation = useNavigation();
              return (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={{
                    paddingLeft:widthPercentageToDP('3'),
                    }}
                >
                  <ArrowLeftIcon/>
                </TouchableOpacity>
              );
};

export default ArrowbackNav;

const styles = StyleSheet.create({});
