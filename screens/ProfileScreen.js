import { View, StyleSheet, Text, ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import FriendsCards from "../components/FriendsCards";
import { FontAwesome5 } from "@expo/vector-icons";
import UploadImage from "../components/UploadImage";
import { SimpleLineIcons } from "@expo/vector-icons";
import { logout } from "../reducers/user";

// construction de  la page profile
export default function ProfileScreen({ navigation }) {
  //useSelector
  const users = useSelector((state) => state.user.value);

  //Etats useState
  const [tags, setTags] = useState([]);
  const [friends, setFriends] = useState([]);
  const [status, setStatus] = useState(false);
  const [city, setCity] = useState("");
  const [teacher, setTeacher] = useState([]);
  const [age, setAge] = useState("");
  const [error, setError] = useState(false);

  //useEffect utilisé pour charger la page profile de l'utilisateur au  moment de sa connection/signin
  useEffect(() => {
    fetch(`http://192.168.1.118:3000/users/profile/${users.username}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          setTags(data.user.tags);
          setFriends(data.user.friends);
          setStatus(true);
          setCity(data.user.location.city);
          setTeacher(data.user.teacher);
          setAge(data.user.age);
        }
      });
  }, []);

  //style conditionnel pour le statut online ou pas
  let styleOnline = styles.online;
  if (status) {
    styleOnline = styles.online1;
  }

  //on map sur l'état teacher pour faire ressortir les tags/les instruments que l'utilisateur veut enseigner
  const teacherTag = teacher.map((teacher, i) => {
    function randomColor() {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
    const color = randomColor();
    return (
      <Text style={[styles.textUser1, { backgroundColor: color }]} key={i}>
        #{teacher}
      </Text>
    );
  });

  //on map sur l'état tags pour faire ressortir les tags/les instruments pratiqué par l'utilisateur
  const tagsList = tags.map((tag, i) => {
    function randomColor() {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
    const color = randomColor();
    return (
      <Text style={[styles.textUser1, { backgroundColor: color }]} key={i}>
        #{tag}
      </Text>
    );
  });

  //on map sur l'état firends pour faire ressortir les amis de l'utilisateur
  const friendsList = friends.map((friend, i) => {
    if (i > 0) {
      setError(false);
    }
    return <FriendsCards key={i} friend={friend} />;
  });

  //handle du logout
  const handleLogout = () => {
    dispactch(logout());
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <View style={styles.photoandlogout}>
        <UploadImage />
        <SimpleLineIcons
          name="logout"
          size={45}
          color="black"
          onPress={() => handleLogout()}
        />
      </View>
      <ScrollView>
        <View style={styles.profilusernameandpicture}>
          <Text style={styles.textUsername}>{users.username}</Text>
          <Text style={styleOnline}></Text>
        </View>
        <View style={styles.descriptionUser}>
          <Text style={styles.textUser}>{users.firstname}</Text>
          <Text style={styles.textUser}>Age:{age}</Text>
          <Text style={styles.textUser}>{city}</Text>
          <View style={styles.tagandteach}>
            <View style={styles.tagsList}>
              {/* <Text style={styles.textUser1}></Text> */}
              {tagsList}
            </View>
            <View style={styles.tagsList}>
              {/* <Text style={styles.textUser1}></Text> */}
              {teacherTag}
            </View>
          </View>
        </View>
        {error && (
          <View>
            <View style={styles.friendsView}>
              <Text style={styles.friends}>My friends</Text>

              <FontAwesome5 name="rocketchat" size={30} color="#CE2174" />
            </View>
            <ScrollView horizontal={true}>
              <View style={styles.friendsTab}>{friendsList}</View>
            </ScrollView>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    width: "100%",
    height: "100%",
    paddingTop: 50,
    padding: 10,
    backgroundColor: "#A8F9DE",
  },
  userPicture: {
    borderRadius: 60,
    width: 80,
    height: 80,
  },
  friendsTab: {
    backgroundColor: "white",
    opacity: 0.9,
    borderRadius: 40,
    height: 140,
    display: "flex",
    flexDirection: "row",
    padding: 10,
    opacity: 0.6,
  },
  friendsList: {
    borderWidth: 1,
    width: 100,
    height: 100,
  },
  textUser: {
    fontSize: 20,
    margin: 2,
    color: "#CE2174",
    height: 35,
    alignItems: "center",
  },
  textUser1: {
    fontSize: 15,
    margin: 5,
    fontWeight: "500",
    color: "black",
    // backgroundColor: '#C5C5C5',
    borderRadius: 20,
    padding: 8,
  },
  textUsername: {
    fontWeight: "bold",
    fontSize: 30,
    alignItems: "center",
    color: "#CE2174",
  },
  profilusernameandpicture: {
    fontSize: 25,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 15,
    width: 150,
    // backgroundColor: 'red',
    justifyContent: "space-around",
    alignItems: "center",
    alignContent: "center",
  },
  background: {
    width: "100%",
    height: "100%",
  },
  friends: {
    fontWeight: "bold",
    fontSize: 20,
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
  friendsView: {
    marginTop: 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 8,
  },
  tagsList: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    borderRadius: 20,
  },
  tagandteach: {
    marginTop: 20,
    marginBottom: 20,
  },
  photoandlogout: {
    flexDirection: "row",
    width: 330,
    // justifyContent: 'space-around',
    alignItems: "center",
    justifyContent: "space-between",
  },
});
