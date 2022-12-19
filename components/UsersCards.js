import { Image, View, StyleSheet, Text } from "react-native";
import { useState, useEffect } from "react";
import { FontAwesome5 } from "@expo/vector-icons";

//composant pour afficher les profils de tous les utilisateurs dans la SearchPage

export default function UsersCards(props) {
  const [usersList, setUsersList] = useState({})

  //useEffect pour récupérer tous les utilisateurs
  useEffect(() => {
    fetch(`http://192.168.1.15:3000/users/usersList`)
      .then((res) => res.json())
      .then((data) => {
        setUsersList(data.usersList)
        console.log(data.userList)
      });
  }, []);

  
  const users = usersList.map((usersList, i) => {
      //style conditionnel pour le statut online ou pas
      let styleOnline = styles.online;
      if (usersList.status) {
        styleOnline = styles.online1;
      }
      return (
        <Text key={i}>
          {usersList}
        </Text>
      );
    })

  return (
    <View style={styles.container}>
    {users}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
