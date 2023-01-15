import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  TouchableOpacity,
  StyleSheet,
  PermissionsAndroid,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
//ImagePicker : module qui permet d'accéder à la bibliothèque multimédia de l'utilisateur et de séléctionné un actif multimédia
import * as ImagePicker from "expo-image-picker";
import { useSelector } from "react-redux";
import IPAdress from "../IPAdress";

export default function UploadImage() {
  const [image, setImage] = useState(null);
  const user = useSelector((state) => state.user.value);

  //useEffect qui récupère la photo utilisateur au chargement de la page de profil.
  useEffect(() => {
    fetch(`http://${IPAdress}:3000/users/profile/${user.username}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          setImage(data.user.profilePicture);
        }
      });
  }, []);

  // AUTORISATION D'ACCES GALLERY
  const requestGalleryPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: "My App Gallery Permission",
          message: "My App needs access to your gallery",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can access the gallery");
      } else {
        console.log("Gallery permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  // fonction pour choisir une image dans la gallery + fetch "post" pour envoyer l'image sur cloudinary et l'url coudinary de l'image en DB
  const pickImage = async () => {
    try {
      const granted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
      );
      if (granted) {
        console.log("You already have permission to access the gallery");
      } else {
        console.log("You do not have permission to access the gallery");
        requestGalleryPermission();
        return;
      }

  //variable qui attend que l'utilisateur est choisi l'image dans sa bibliothèque
  let _image = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images, //type de média : image uniquement ici
    allowsEditing: true, //autorisation crop image
    aspect: [4, 3],
    quality: 1,
  });
  //si une image est bien choisie, alors la variable fromData est crée. le formData prend en paramètre l'uri, le nom et le type de l'image.
  if (!_image.canceled) {
    //une nouvelle instance de FormData est créée et l'image est ajoutée en utilisant la méthode append.
    //Le premier argument de append est un nom qui sera associé à l'image lorsqu'elle sera envoyée (par exemple, "photoFromFront").
    //Le deuxième argument est l'objet qui représente l'image qui contient l'URI (adresse) de l'image sur le téléphone, son nom et son type.
    const formData = new FormData();
    formData.append("photoFromFront", {
      uri: _image.assets[0].uri,
      name: "photo.jpg",
      type: "image/jpeg",
    });

    //fetch post pour envoyer la photo sur cloudinary
    fetch(`http://${IPAdress}:3000/upload`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        //on fetch en post pour envoyer uniquement l'adresse url de l'image en db
        fetch(`http://${IPAdress}:3000/users/photo`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: user.username,
            profilePicture: data.url,
          }),
        });
        //chargement de l'état Image avec l'url de l'image
        setImage(data.url);
      });
  }
} catch (err) {
  console.log(err);
}
  };

  return (
    <View style={imageUploaderStyles.container}>
      <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />

  <View style={imageUploaderStyles.uploadBtnContainer}>
    <TouchableOpacity
      onPress={pickImage}
      style={imageUploaderStyles.uploadBtn}
    >
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
    height: "15%",
  },
  uploadBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});