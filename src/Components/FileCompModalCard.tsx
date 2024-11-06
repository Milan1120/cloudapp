import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import MoreVertical from './SVG/Icons/MoreVertical';


const DropdownMenu = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('fileType'); // Default selected option

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleOptionPress = (option) => {
    setSelectedOption(option);
    toggleModal();
  };

  return (
    <SafeAreaView style={styles.container}>

      <TouchableOpacity onPress={toggleModal} style={styles.threeDots}>
        <MoreVertical />
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={toggleModal}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={toggleModal}
        >
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={() => handleOptionPress('fileName')}
              style={styles.modalItem}
            >
              <Text
                style={[
                  styles.modalText,
                  selectedOption === 'fileName' && styles.selectedText,
                ]}
              >
                {selectedOption === 'fileName' && <Text style={styles.blueDot}>• </Text>}
                Sort by file name
              </Text>
            </TouchableOpacity>

    
            <View style={styles.divider} />

            {/* Sort by Size */}
            <TouchableOpacity
              onPress={() => handleOptionPress('size')}
              style={styles.modalItem}
            >
              <Text
                style={[
                  styles.modalText,
                  selectedOption === 'size' && styles.selectedText,
                ]}
              >
                {selectedOption === 'size' && <Text style={styles.blueDot}>• </Text>}
                Sort by size
              </Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            {/* Sort by Time */}
            <TouchableOpacity
              onPress={() => handleOptionPress('time')}
              style={styles.modalItem}
            >
              <Text
                style={[
                  styles.modalText,
                  selectedOption === 'time' && styles.selectedText,
                ]}
              >
                {selectedOption === 'time' && <Text style={styles.blueDot}>• </Text>}
                Sort by time
              </Text>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Sort by File Type */}
            <TouchableOpacity
              onPress={() => handleOptionPress('fileType')}
              style={styles.modalItem}
            >
              <Text
                style={[
                  styles.modalText,
                  selectedOption === 'fileType' && styles.selectedText,
                ]}
              >
                {selectedOption === 'fileType' && <Text style={styles.blueDot}>• </Text>}
                Sort by file type
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

export default DropdownMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  threeDots: {
    padding: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 50, 
    paddingRight: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    width: 250,
    borderRadius: 5,
    padding: 10,
    elevation: 5,
  },
  modalItem: {
    paddingVertical: 15,
  },
  modalText: {
    fontSize: 16,
    color: '#000',
  },
  selectedText: {
    color: '#007aff', // Blue color for the selected text
  },
  blueDot: {
    color: '#007aff',
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 8,
    
  },
});
