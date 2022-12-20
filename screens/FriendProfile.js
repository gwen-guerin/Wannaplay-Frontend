import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useState, useEffect } from "react";
import FriendsCards from "../components/FriendsCards";
import UploadImage from "../components/UploadImage";
import { SimpleLineIcons } from "@expo/vector-icons";
import { addToFriends, removeFromFriends, logout } from "../reducers/user";
import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";

// construction de  la page profile
export default function FriendProfile({ navigation, route: { params } }) {
  const userRed = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const [friend, setFriend] = useState(false);
  const [user, setUser] = useState({
    username: null,
    firstname: null,
    tags: [],
    friends: [],
    // status: false,
    city: null,
    age: null,
    teacher: [],
    description: null,
    profilePicture: null,
  });

  //useEffect utilisé pour charger la page profile de l'utilisateur au  moment de sa connection/signin
  useEffect(() => {
    isFriend()
    fetch(`http://192.168.1.118:3000/users/profile/${params.username}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          setUser({
            username: data.user.username,
            firstname: data.user.firstname,
            age: data.user.age,
            tags: data.user.tags,
            friends: data.user.friends,
            city: data.user.city,
            teacher: data.user.teacher,
            firstname: data.user.firstname,
            description: data.user.description,
            profilePicture: data.user.profilePicture,
          });
        }
      });
  }, []);

  const isFriend = () => {
    for (let i = 0; i < userRed.friends.length; i++) {
      if (userRed.friends[i] === params.username) setFriend(true);
    }
  };

  const addOrDelete = () => {
    if (friend) {
      return (
        <TouchableOpacity
          onPress={() => removeFriend()}
        >
          <Ionicons name='person-remove' size={30} color="#CE2174"/>
        </TouchableOpacity>
      );
    } else
      return (
        <TouchableOpacity
          onPress={() => addFriend()}
        >
          <Ionicons name='person-add' size={30} color="#CE2174"/>
        </TouchableOpacity>
      );
  };

  const addFriend = () => {
    fetch("http://192.168.1.118:3000/friends/addFriend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: userRed.username,
        friend: user.username,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(addToFriends({ friend: params.username }));
        setFriend(true)
      });
  };

  const removeFriend = () => {
    fetch("http://192.168.1.118:3000/friends/removeFriend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: userRed.username,
        friend: user.username,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(removeFromFriends({ friend: params.username }));
        setFriend(false)
      });
  };

  //on map sur l'état teacher pour faire ressortir les tags/les instruments que l'utilisateur veut enseigner
  const teacherTag = user.teacher.map((teacher, i) => {
    function randomColor() {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color + "aa";
    }
    const color = randomColor();
    return (
      <Text style={[styles.textUser1, { backgroundColor: color }]} key={i}>
        #{teacher}
      </Text>
    );
  });

  //on map sur l'état tags pour faire ressortir les tags/les instruments pratiqué par l'utilisateur
  const tagsList = user.tags.map((tag, i) => {
    function randomColor() {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color + "aa";
    }
    const color = randomColor();
    return (
      <Text style={[styles.textUser1, { backgroundColor: color }]} key={i}>
        #{tag}
      </Text>
    );
  });

  //on map sur l'état friends pour faire ressortir les amis de l'utilisateur
  // if (friends.length > 0) {
  //   setError(false);
  // } else {
  //   setError(true)
  //   const friendsList = friends.map((friend, i) => {
  //     return <FriendsCards key={i} friend={friend} />;
  //   });
  // }

  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate("Home");
  };

  const handleModify = () => {
    navigation.navigate("UpdateProfile");
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerProfile}>
        <Image
          source={{ uri: user.profilePicture }}
          style={styles.profilePicture}
        />
        <View style={styles.nameAndTags}>
          <View style={styles.nameAndStatus}>
            <Text style={styles.textUsername}>#{user.username}</Text>
            {/* <View style={styleOnline}></View> */}
            <SimpleLineIcons
              style={styles.logoLogout}
              name="logout"
              size={20}
              color="black"
              onPress={() => handleLogout()}
            />
          </View>
          <View style={styles.tagandteach}>
            <View style={styles.tagsList}>{tagsList}</View>
            <View style={styles.tagsList}>
              {user.teacher && (
                <Text style={styles.textUser}>Wanna teach : </Text>
              )}
              {teacherTag}
            </View>
          </View>
        </View>
      </View>
        <View style={styles.description}>
          <View style={styles.infoContainer}>
            <Text style={styles.textUser}>About me : </Text>
            <Text style={styles.textUser}>{user.firstname}</Text>
            <Text style={styles.textUser}>{user.age}ans</Text>
            <Text style={styles.textUser}>{user.city}</Text>
          </View>
          <Text style={styles.textDecription}>{user.description}</Text>
          <View style={styles.modifyIcon}>
            <FontAwesome
              onPress={() => handleModify()}
              name="pencil-square-o"
              size={16}
              color="#A3A3A3"
            />
          </View>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity>
            <FontAwesome5 name="rocketchat" size={30} color="#CE2174" />
          </TouchableOpacity>
          {addOrDelete()}
        </View>
        {/* {error && (
          <View>
            <View style={styles.friendsView}>
              <Text style={styles.friends}>My friends</Text>
              <FontAwesome5 name="rocketchat" size={30} color="#CE2174" />
            </View>
            <ScrollView horizontal={true}>
              <View style={styles.friendsTab}>{friendsList}</View>
            </ScrollView>
          </View>
        )} */}
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
  profilePicture: {
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
    fontSize: 15,
    margin: 2,
    color: "#CE2174",
    alignItems: "center",
    fontWeight: "700",
  },
  textDecription: {
    fontSize: 17,
    color: "#CE2174",
    alignItems: "center",
    padding: 5,
    fontWeight: "700",
  },
  textUser1: {
    fontSize: 14,
    fontWeight: "800",
    color: "black",
    borderRadius: 20,
    paddingVertical: 3,
    paddingHorizontal: 8,
    margin: 5,
  },
  textUsername: {
    fontWeight: "bold",
    fontSize: 25,
    alignItems: "center",
    color: "#CE2174",
  },
  nameAndStatus: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: 150,
    justifyContent: "space-around",
    alignItems: "center",
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
    height: 20,
    width: 20,
    // backgroundColor: 'red',
    borderRadius: 40,
  },
  online1: {
    height: 20,
    width: 20,
    // backgroundColor: 'green',
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
    // backgroundColor: 'red',
    display: "flex",
    marginTop: 20,
    marginBottom: 20,
  },
  headerProfile: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  nameAndTags: {
    marginLeft: 20,
    width: 150,
  },
  description: {
    backgroundColor: "#C5C5C5",
    alignItems: "stretch",
    borderRadius: 5,
    width: "100%",
    padding: 5,
    marginTop: 25,
  },
  infoContainer: {
    backgroundColor: "#A3A3A3aa",
    padding: 5,
    borderRadius: 5,
    flexDirection: "row",
  },
  modifyIcon: {
    alignItems: "flex-end",
    marginTop: -15,
  },
  iconContainer: {
    marginTop: 60,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  // friendButton: {
  //   height: '30%',
  //   width: '30%',
  //   borderColor: "red",
  //   borderWidth: 2,
  // },
});
