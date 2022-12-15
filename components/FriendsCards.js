import { Image, View, StyleSheet, Text } from "react-native";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

export default function FriendsCards(props) {
  const [friends, setFriends] = useState({});



  useEffect(() => {
    fetch(`http://172.17.188.19:3000/users/profile/${props.friend}`)
      .then((res) => res.json())
      .then((data) => {
        setFriends(data.user);
 
      });
  }, []);




  return (
    <View style={styles.container}>
      <Image
        style={styles.userPicture}
        source={require("../assets/user.jpg")}
      />
      <Text style={styles.textUser}>{friends.username}</Text>
      <Text>{friends.status}</Text>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',

  },
  userPicture: {
    borderRadius: 60,
    width: 70,
    height: 70,
  },
  textUser: {
    color: "#CE2174",
    fontSize: 18,
  },
});
