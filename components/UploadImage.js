import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  Platform,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { addPhoto } from "../reducers/user";

//création du composant qui permet d'uploader une photo du téléphone de l'utilisateur

export default function UploadImage() {
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  //autorisation pour l'accès à fichier média utilisateur
  const checkForCameraRollPermission = async () => {
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
    console.log(status);
    if (status !== "granted") {
      alert(
        "Please grant camera roll permissions inside your system's settings"
      );
    } else {
      console.log("Media Permissions are granted");
    }
  };

  //on borde la permission avec un useEffect afin de garantir que cette dernière soit déclenchée avant que l'utilisateur
  //n'interagisse avec le sélecteur d'image
  useEffect(() => {
    checkForCameraRollPermission();
  }, []);

  // methode permettant d'ouvrir l'ui utilisateur pour choisir une image
  const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!_image.canceled) {
      const formData = new FormData();
      formData.append("photoFromFront", {
        uri: _image.assets[0].uri,
        name: "photo.jpg",
        type: "image/jpeg",
      });

      fetch("http://192.168.0.11:3000/upload", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          setImage(data.url);
          data.result && dispatch(addPhoto(data.url));
          fetch("http://192.168.0.11:3000/users/photo", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: user.username,
              photoUrl: data.url,
            }),
          });
        });
    }
  };

  return (
    <View style={imageUploaderStyles.container}>
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
      <View style={imageUploaderStyles.uploadBtnContainer}>
        <TouchableOpacity
          onPress={addImage}
          style={imageUploaderStyles.uploadBtn}
        >
          {/* <Text>{image ? 'Edit' : 'Upload'} Image</Text> */}
          <AntDesign name="camera" size={30} color="black" />
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
    backgroundColor: "#efefef",
    position: "relative",
    borderRadius: 999,
    overflow: "hidden",
  },
  uploadBtnContainer: {
    opacity: 0.7,
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "lightgrey",
    width: "100%",
    height: "25%",
  },
  uploadBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
