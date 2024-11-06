import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Animated,
  Image,
} from 'react-native';
import MoreVertical from './SVG/Icons/MoreVertical';
import CategoryCard from './CategoryCard';
import DocumentPicker from 'react-native-document-picker';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

const FloatButtonCard = ({dataList, ...props}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [slideAnim] = useState(new Animated.Value(100));
  const [categories, setCategory] = useState<any>([]);

  useEffect(() => {
    setCategory([
      {
        id: 1,
        fileType: DocumentPicker.types.allFiles,
        title: 'Files',
        count: 0,
        imageURL: require('../assets/new/folder.png'),
      },
      {
        id: 2,
        fileType: DocumentPicker.types.images, 
        title: 'Images',
        count: 0,
        imageURL: require('../assets/new/photo.png'),
      },
      {
        id: 3,
        fileType: DocumentPicker.types.video,
        title: 'Videos',
        count: 0,
        imageURL: require('../assets/new/video_folder.png'),
      },
      {
        id: 4,
        fileType: DocumentPicker.types.audio,
        title: 'Music',
        count: 0,
        imageURL: require('../assets/new/music.png'),
      },
      {
        id: 5,
        title: 'Apps',
        fileType: DocumentPicker.types.allFiles,
        count: 0,
        imageURL: require('../assets/new/Apps.png'),
      },
      {
        id: 6,
        title: 'New Folder',
        count: 0,
        imageURL: require('../assets/new/folder.png'),
      },
    ]);
  }, []);

  const selectDoc = fileType => async () => {
    try {
      const doc = await DocumentPicker.pick({
        type: [fileType],
        allowMultiSelection: true,
      });
      console.log(doc);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('user cancelled the upload', err);
      } else {
        console.log(err);
      }
    }
  };

  const toggleModal = () => {
    if (modalVisible) {
      Animated.timing(slideAnim, {
        toValue: 100,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setModalVisible(false));
    } else {
      setModalVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.button} onPress={toggleModal}>
          <Image
            source={require('../assets/new/plus-circle.png')}
            style={styles.icon}
          />
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
            {/* <TouchableOpacity style={styles.modalItem} onPress={() => { alert('Rename'); toggleModal(); }}>
              <Text style={styles.modalText}>Rename</Text>
            </TouchableOpacity> */}
            <View style={styles.floatingcss}>
              {categories.map(
                (category: {
                  id: React.Key | null | undefined;
                  imageURL: any;
                  title: any;
                  count: any;
                }) => {
                  return (
                    <View >
                      <CategoryCard
                        key={category.id}
                        image={category.imageURL}
                        id={category.id}
                        title={category.title}
                        onPress={selectDoc(category.fileType)}
                      />
                    </View>
                  );
                },
              )}
            </View>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

export default FloatButtonCard;

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
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  modalContent: {
    backgroundColor: '#ffff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 16,
    width: '100%',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  modalItem: {
    paddingVertical: 10,
  },
  modalText: {
    fontSize: 16,
    color: '#ffff',
  },
  floatingcss: {
    flexDirection: 'row',
    gap: hp('5%'),
    flexWrap: 'wrap',
  },
});
