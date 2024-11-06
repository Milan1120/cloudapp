import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const NotificationPage = () => {
  return (
    <View>
      <Text>NotificationPage</Text>
    </View>
  )
}

export default NotificationPage

const styles = StyleSheet.create({})

// import React, { useState } from 'react';
// import { View, Text, FlatList, Image, Button, StyleSheet } from 'react-native';

// const ImagesScreen = () => {
//   // Set initial state (start with an empty list for no images)
//   const [images, setImages] = useState<any>([]); // Start with no data

//   // Add a mock function to upload images (for demo purposes)
//   const uploadImages = () => {
//     // Mock data to simulate uploaded images
//     setImages([
//       { id: '1', uri: require('../assets/images.jpg'), date: '26-09-2024' },
//       { id: '2', uri: require('../assets/images.jpg'), date: '26-09-2024' },
//       { id: '3', uri: require('../assets/images.jpg'), date: '26-09-2024' },
//     ]);
//   };

//   return (
//     <View style={styles.container}>
//       {images.length === 0 ? (
//         // No images, show the placeholder
//         <View style={styles.placeholderContainer}>
//           <Image
//             source={require('../assets/images.jpg')} // your second placeholder image
//             style={styles.placeholderImage}
//           />
//           <Text style={styles.placeholderText}>No photos yet, automatically back up images to the cloud</Text>
//           <Button title="Select and upload images" onPress={uploadImages} />
//         </View>
//       ) : (
//         // Display images in a grid
//         <FlatList
//           data={images}
//           keyExtractor={(item) => item.id}
//           numColumns={2}
//           renderItem={({ item }) => (
//             <View style={styles.imageContainer}>
//               <Image source={item.uri} style={styles.image} />
//               <Text style={styles.dateText}>{item.date}</Text>
//             </View>
//           )}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#fff',
//   },
//   // Style for when no images are available
//   placeholderContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   placeholderImage: {
//     width: 150,
//     height: 150,
//     marginBottom: 16,
//   },
//   placeholderText: {
//     textAlign: 'center',
//     marginBottom: 16,
//     fontSize: 16,
//     color: '#666',
//   },
//   // Style for the grid of images
//   imageContainer: {
//     flex: 1,
//     margin: 8,
//     alignItems: 'center',
//   },
//   image: {
//     width: 150,
//     height: 150,
//     borderRadius: 8,
//   },
//   dateText: {
//     marginTop: 8,
//     fontSize: 14,
//     color: '#333',
//   },
// });

// export default ImagesScreen;
