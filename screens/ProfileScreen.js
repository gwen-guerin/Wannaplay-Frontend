import {
  Image,
  View,
  StyleSheet,
  Text,
  TextInput,
  Button,
  ScrollView,
  ImageBackground,
} from "react-native";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import FriendsCards from "../components/FriendsCards";

export default function ProfilScreen() {
  const users = useSelector((state) => state.user.value);
  const [tags, setTags] = useState([]);
  const [friends, setFriends] = useState([]);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    fetch(`http://172.16.190.11:3000/users/profile/${users.username}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          setTags(data.user.tags);
          setFriends(data.user.friends);
          setStatus(true);
        }
      });
  }, []);

  let styleOnline = styles.online;
  if (status) {
    styleOnline = styles.online1;
  }

  const tagsList = tags.map((tag, i) => {
    return (
      <Text style={styles.textUser} key={i}>
        {tag}
      </Text>
    );
  });

  const friendsList = friends.map((friend, i) => {
    return <FriendsCards key={i} friend={friend} />;
  });

  return (
    <ImageBackground
      source={require("../assets/illu_02.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.profilusernameandpicture}>
          <Image
            style={styles.userPicture}
            source={require("../assets/user.jpg")}
          />
          <Text style={styles.textUsername}>{users.username}</Text>
          <Text style={styleOnline}></Text>
        </View>
        <ScrollView>
          <View style={styles.descriptionUser}>
            <Text style={styles.textUser}>{users.firstname}</Text>
            <Text style={styles.textUser}>Age:{users.age}</Text>
            <Text style={styles.textUser}>{users.email}</Text>
            <ScrollView>{tagsList}</ScrollView>
            <Text style={styles.textUser}>{users.teacher}</Text>
            <Text style={styles.textUser}>{users.status}</Text>
            <Text style={styles.textUser}>{users.city}</Text>
          </View>
          <View>
            <Text style={styles.friends}>My friends</Text>
          </View>
          <View style={styles.friendsTab}>{friendsList}</View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "space-between",
    width: "100%",
    paddingTop: 50,
    paddingBottom: 30,
    padding: 10,
  },
  userPicture: {
    borderRadius: 60,
    width: 90,
    height: 90,
  },
  friendsTab: {
    backgroundColor: "white",
    opacity: 0.9,
    borderRadius: 40,
    height: 300,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    // justifyContent: "space-between",
  },
  friendsList: {
    borderWidth: 1,
    width: 100,
    height: 100,
  },

  textUser: {
    fontSize: 18,
    margin: 5,
  },
  textUsername: {
    fontWeight: "bold",
    fontSize: 30,
    margin: 15,
    color: "#CE2174",
  },
  profilusernameandpicture: {
    fontSize: 25,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    // justifyContent: "space-between",
  },
  background: {
    width: "100%",
    height: "100%",
  },
  friends: {
    fontWeight: "bold",
    fontSize: 25,
    marginLeft: 5,
    color: "#CE2174",
  },
  online: {
    height: 30,
    width: 30,
    backgroundColor: "red",
    borderRadius: 40,
  },
  online1: {
    height: 30,
    width: 30,
    backgroundColor: "green",
    borderRadius: 40,
  },
});
