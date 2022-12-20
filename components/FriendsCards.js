import { Image, View, StyleSheet, Text } from "react-native";
import { useState, useEffect } from "react";
import { FontAwesome5 } from "@expo/vector-icons";

//composant pour afficher les amis sur la page de Profile

//comment on fait pour concrètrement pour faire une demande d'amis ?? et pusher en BD ?
export default function FriendsCards(props) {
  const [friends, setFriends] = useState([]);
  const [isFriendOnline, setIsFriendOnline] = useState(false);
  const [photo, setPhoto] = useState('')

  //useEffect à la connexion de l'utilisateur qui récupère les données des amis (username et photo)
  useEffect(() => {
    fetch(`http://192.168.1.15:3000/users/profile/${props.friend}`)
      .then((res) => res.json())
      .then((data) => {
        setFriends(data.user.username);
        setIsFriendOnline(data.user.status);
        setPhoto(data.user.profilePicture);
      });
    }, []);
    

    
  //style conditionnel pour le statut online ou pas
  let styleOnline = styles.online;
  if (isFriendOnline) {
    styleOnline = styles.online1;
  }

  //il faudra remplacer l'image par l'uri/l de la photo des amis
  return (
    <View style={styles.container}>
   <Image source={{uri: photo}} style={styles.photoFriend}/>
      <View style={styles.friendonline}>
        <Text style={styles.textUser}>{friends}</Text>
        <Text style={styleOnline}></Text>
      </View>
      <FontAwesome5 name="rocketchat" size={20} color="#CE2174" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  textUser: {
    color: "#CE2174",
    fontSize: 18,
  },
  online: {
    marginTop: 10,
    height: 15,
    width: 15,
    backgroundColor: "red",
    borderRadius: 40,
    marginBottom: 8,
  },
  online1: {
    marginTop: 10,
    height: 15,
    width: 15,
    backgroundColor: "green",
    borderRadius: 40,
    marginBottom: 8,
  },
  friendonline: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: 100,
    height: 30,
    alignItems: "center",
    alignContent: "center",
  },
  photoFriend: {
    width: 75,
    height: 75,
    borderRadius: 40,

  }
});
