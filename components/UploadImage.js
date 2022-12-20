import React, { useState, useEffect } from 'react';
import { Image, View, TouchableOpacity, StyleSheet, PermissionsAndroid  } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useSelector } from 'react-redux';

export default function UploadImage() {
  const [image, setImage] = useState(null);
  const user = useSelector((state) => state.user.value);
   

  useEffect(() => {
    fetch(`http://192.168.1.15:3000/users/profile/${user.username}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          setImage(data.user.profilePicture);
        }
        // console.log("datauserprofile", data.user.profilePicture);
      });
  }, []);

  // AUTORISATION D'ACCES GALLERY

  const requestGalleryPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'My App Gallery Permission',
          message: 'My App needs access to your gallery',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can access the gallery');
      } else {
        console.log('Gallery permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  // CHOISIR IMAGE DANS LA GALLERY

  const pickImage = async () => {
    try {
      const granted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
      );
      if (granted) {
        console.log('You already have permission to access the gallery');
      } else {
        console.log('You do not have permission to access the gallery');
        requestGalleryPermission();
        return;
      }

      let _image = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!_image.canceled) {
        const formData = new FormData();
        formData.append('photoFromFront', {
          uri: _image.assets[0].uri,
          name: 'photo.jpg',
          type: 'image/jpeg',
        });
        // console.log("POUETTT", image);
        fetch('http://192.168.0.11:3000/upload', {
          method: 'POST',
          body: formData,
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("IMAAAAGE", data);
            fetch('http://192.168.0.11:3000/users/photo', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                username: user.username,
                profilePicture: data.url,
              }),
            });
            setImage(data.url);
          });
      }
    } catch (err) {
      console.log(err);
    }
  };

  // methode permettant d'ouvrir l'ui utilisateur pour choisir une image

  return (
    <View style={imageUploaderStyles.container}>
      <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />

      <View style={imageUploaderStyles.uploadBtnContainer}>
        <TouchableOpacity
          // onPress={checkForCameraRollPermission}
          onPress={pickImage}
          style={imageUploaderStyles.uploadBtn}
        >
          {/* <Text>{image ? 'Edit' : 'Upload'} Image</Text> */}
          <AntDesign
            name="camera"
            size={20}
            color="black"
            title="Pick an image from the gallery"
            onPress={pickImage}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const imageUploaderStyles = StyleSheet.create({
  container: {
    elevation: 2,
    height: 150,
    width: 150,
    backgroundColor: '#efefef',
    position: 'relative',
    borderRadius: 999,
    overflow: 'hidden',
  },
  uploadBtnContainer: {
    opacity: 0.7,
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: 'lightgrey',
    width: '100%',
    height: '15%',
  },
  uploadBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
