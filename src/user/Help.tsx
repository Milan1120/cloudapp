import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const Help = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.containerDiv}>
          <Text style={styles.introText}>
            This cloud storage app allows users to store, access,
            and manage their files (such as documents, photos, videos,
            and other digital content) directly from a smartphone or tablet.
            These apps sync your files with cloud servers, meaning they can be
            accessed from multiple devices as long as you have an internet connection.
            Some key features of mobile cloud storage apps include:
          </Text>
          <View style={styles.subDiv}>
            {/* point_1 */}
            <View style={styles.listItem}>
              <Text style={styles.dot}>{'\u2022'}</Text>
              <Text style={styles.itemText}>
                File Uploading: Users can easily upload files from their device
                to the cloud by selecting them from their phone’s storage or using
                the app’s camera feature to capture and upload photos and videos
                instantly.
              </Text>
            </View>

            {/* point_2 */}
            <View style={styles.listItem}>
              <Text style={styles.dot}>{'\u2022'}</Text>
              <Text style={styles.itemText}>
                Automatic Syncing: Any changes made in the app, such as adding,
                deleting, or modifying files, are reflected in real-time across all
                connected devices.
              </Text>
            </View>

            {/* point_3 */}
            <View style={styles.listItem}>
              <Text style={styles.dot}>{'\u2022'}</Text>
              <Text style={styles.itemText}>
                Offline Access: Files can be downloaded and saved for offline use,
                so they are available even without an internet connection.
              </Text>
            </View>

            {/* point_4 */}
            <View style={styles.listItem}>
              <Text style={styles.dot}>{'\u2022'}</Text>
              <Text style={styles.itemText}>
                Sharing Capabilities: Users can share files or folders with others via
                links, email, or messaging apps, with customizable permissions like
                "view-only" or "edit" access.
              </Text>
            </View>

            {/* point_5 */}
            <View style={styles.listItem}>
              <Text style={styles.dot}>{'\u2022'}</Text>
              <Text style={styles.itemText}>
                Organization Tools: Features like folders, search functions,
                and sorting options help keep files organized and easily retrievable.
              </Text>
            </View>

          </View>

          <Text style={styles.conclusionText}>
            This app allows mobile users who need quick, remote access to their
            documents and media, and provides a seamless way to manage and back
            up important data across various devices.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Help;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  containerDiv: {
    alignSelf: 'center',
    margin: 15,
    width: wp('90%'), 
  },
  introText: {
    fontSize: hp('1.8%'),
    color: '#000000',
    marginBottom: 15,
  },
  subDiv: {
    marginLeft: 0,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  dot: {
    fontSize: hp('1.8%'),
    color: '#000000',
    marginRight: 5,
  },
  itemText: {
    fontSize: hp('1.8%'),
    color: '#000000',
    lineHeight: hp('2.5%'),
    flexShrink: 1, 
  },
  conclusionText: {
    marginTop: 10,
    fontSize: hp('1.8%'),
    color: '#000000',
  },
});
