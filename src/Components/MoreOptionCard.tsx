import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Animated,
} from 'react-native';
import MoreVertical from './SVG/Icons/MoreVertical';
import PencilIcon from './SVG/Icons/PencilIcon';
import CheckCircleIcon from './SVG/Icons/CheckCircleIcon';
import ShareIcon from './SVG/Icons/ShareIcon';
import StarIcon from './SVG/Icons/StarIcon';
import DownloadIcon from './SVG/Icons/DownloadIcon';
import MoveTOFolderIcon from './SVG/Icons/MoveToFolderIcon';
import CopyIcon from './SVG/Icons/CopyIcon';
import DetailsIcon from './SVG/Icons/DetailsIcon';
import DeleteIcon from './SVG/Icons/DeleteIcon';

const MoreOptionCard = ({dataList, ...props}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [slideAnim] = useState(new Animated.Value(100));
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    setData([
      {
        label: 'Rename',
        onPress: () => {
          alert('Rename');
          toggleModal();
        },
        Icon: <PencilIcon />,
      },
      {
        label: 'Select',
        onPress: () => {
          alert('Selected');
          toggleModal();
        },
        Icon: <CheckCircleIcon color={'#000'} />,
      },
      {
        label: 'Share',
        onPress: () => {
          alert('Share');
          toggleModal();
        },
        Icon: <ShareIcon />,
      },
      {
        label: 'Add to Starred',
        onPress: () => {
          alert('Added to starred');
          toggleModal();
        },
        Icon: <StarIcon />,
      },
      {
        label: 'Download',
        onPress: () => {
          alert('Downloaded');
          toggleModal();
        },
        Icon: <DownloadIcon />,
      },
      {
        label: 'Move',
        onPress: () => {
          alert('Move');
          toggleModal();
        },
        Icon: <MoveTOFolderIcon />,
      },
      {
        label: 'Copy',
        onPress: () => {
          alert('Copy');
          toggleModal();
        },
        Icon: <CopyIcon />,
      },
      {
        label: 'Details',
        onPress: () => {
          alert('Details');
          toggleModal();
        },
        Icon: <DetailsIcon />,
      },
      {
        label: 'Delete',
        onPress: () => {
          alert('Delete');
          toggleModal();
        },
        Icon: <DeleteIcon />,
      },
    ]);
  }, []);

  const toggleModal = () => {
    if (modalVisible) {
      Animated.timing(slideAnim, {
        toValue: 100,
        duration: 300, // Adjust speed here
        useNativeDriver: true,
      }).start(() => setModalVisible(false));
    } else {
      setModalVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300, // Adjust speed here
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleModal}>
          <MoreVertical color="black" />
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="none"
        onRequestClose={toggleModal}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={toggleModal}>
          <Animated.View
            style={[
              styles.modalContent,
              {transform: [{translateY: slideAnim}]},
            ]}>
            {data.map((dt,index) => (
              <View key={index} style={{flexDirection: 'row',gap:5 , alignItems:'center', }}>
                {dt.Icon}
                <TouchableOpacity style={styles.modalItem} onPress={dt.onPress}>
                  <Text style={styles.modalText}>{dt.label}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

export default MoreOptionCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContent: {
    backgroundColor: '#ffff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 16,
    width: '100%',
    alignItems: 'flex-start',
    elevation: 5,
    borderWidth:1,
  },
  modalItem: {
    paddingVertical: 10,
    
  },
  modalText: {
    fontSize: 16,
    color: '#000',
  },
});
