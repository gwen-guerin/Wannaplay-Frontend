import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { useState, useEffect } from "react";
import { addToFriends, removeFromFriends } from "../reducers/user";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import IPAdress from "../IPAdress";
import FriendsCards from "../components/FriendsCards";

// construction de  la page profile
export default function FriendProfile({ navigation, route: { params } }) {
  const userRed = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const [friend, setFriend] = useState(false);
  const [commonFriends, setCommonFriends] = useState([]);
  const [friendsList, setFriendsList] = useState([]);
  const [user, setUser] = useState({
    username: null,
    firstname: null,
    tags: [],
    friends: [],
    status: false,
    city: null,
    age: null,
    teacher: [],
    description: null,
    profilePicture: null,
  });

  //useEffect utilisé pour charger la page profile de l'utilisateur au  moment de sa connection/signin
  useEffect(() => {
    isFriend();
    handleCommonFriends();
    fetch(`http://${IPAdress}:3000/users/profile/${params.username}`)
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

  const handleCommonFriends = () => {
    fetch(`http://${IPAdress}:3000/search/commonFriends`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        friend: params.username,
        username: userRed.username,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setCommonFriends(data.allFriends);
      });
  };

  useEffect(() => {
    console.log("commonFriends", commonFriends);
    setFriendsList(
      commonFriends.map((friend, i) => {
        return <FriendsCards key={i} friend={friend} />;
      })
    );
  }, [commonFriends]);

  const addOrDelete = () => {
    if (friend) {
      return (
        <TouchableOpacity
          style={styles.ionIcons}
          onPress={() => removeFriend()}
        >
          <Ionicons name="person-remove" size={30} color="#CE2174" />
        </TouchableOpacity>
      );
    } else
      return (
        <TouchableOpacity style={styles.ionIcons} onPress={() => addFriend()}>
          <Ionicons name="person-add" size={30} color="#CE2174" />
        </TouchableOpacity>
      );
  };

  const addFriend = () => {
    fetch(`http://${IPAdress}:3000/friends/addFriend`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: userRed.username,
        friend: params.username,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(addToFriends({ friend: params.username }));
        setFriend(true);
      });
  };

  const removeFriend = () => {
    fetch(`http://${IPAdress}:3000/friends/removeFriend`, {
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
        setFriend(false);
      });
  };

  const handleChat = () => {
    fetch(`http://${IPAdress}:3000/chats/createChat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: userRed.username,
        secondUser: user.username,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        navigation.navigate("Chat", {
          chatData: { chatName: data.chatName, friend: data.friend },
        });
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
      <Text style={[styles.textUser1, { borderColor: color }]} key={i}>
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
      <Text style={[styles.textUser1, { borderColor: color }]} key={i}>
        #{tag}
      </Text>
    );
  });

  return (
    <ImageBackground
      source={require("../assets/illu_02.jpg")}
      imageStyle={{ opacity: 0.4 }}
      style={styles.imgBack}
    >
      <View style={styles.container}>
        <View style={styles.headerProfile}>
          <Image
            source={{ uri: user.profilePicture }}
            style={styles.profilePicture}
          />
          <View style={styles.nameAndTags}>
            <View style={styles.nameAndStatus}>
              <Text style={styles.textUsername}>#{user.username}</Text>
            </View>
            <View style={styles.tagandteach}>
              <View style={styles.tagsList}>{tagsList}</View>
              {user.teacher.length > 0 && (
                <View style={styles.tagsList}>
                  <Text style={styles.textUser}>Wanna teach : </Text>
                  {teacherTag}
                </View>
              )}
            </View>
          </View>
        </View>
        <View style={styles.description}>
          <View style={styles.infoContainer}>
            <Text style={styles.textUser}>About me : </Text>
            <Text style={styles.textUser}>{user.firstname}</Text>
            <Text style={styles.textUser}>{user.age} years old</Text>
            <Text style={styles.textUser}>{user.city}</Text>
          </View>
          <Text style={styles.textDecription}>{user.description}</Text>
          <View style={styles.modifyIcon}></View>
        </View>
        <ScrollView style={styles.friendsCardsContainer} horizontal={true}>
          {friendsList.length < 0 ? (
            <Text>No common friends</Text>
          ) : (
            <View style={styles.commonFriendsContainer}>
              <Text>Common friends:</Text>
              {friendsList}
            </View>
          )}
        </ScrollView>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            style={styles.ionIcons}
            onPress={() => handleChat()}
          >
            <FontAwesome5 name="rocketchat" size={30} color="#CE2174" />
          </TouchableOpacity>
          {addOrDelete()}
        </View>
      </View>
    </ImageBackground>
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
  },
  profilePicture: {
    borderRadius: 60,
    width: 120,
    height: 120,
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
  textUser: {
    fontSize: 15,
    margin: 2,
    alignItems: "center",
    fontWeight: "700",
  },
  textDecription: {
    fontSize: 17,
    color: "#615B5Aaa",
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
    borderWidth: 3,
    backgroundColor: "white",
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
    borderRadius: 40,
  },
  online1: {
    height: 20,
    width: 20,
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
    backgroundColor: "#ffffffaa",
    display: "flex",
    alignItems: "stretch",
    borderRadius: 5,
    width: "100%",
    padding: 5,
    marginTop: 25,
    height: "20%",
  },
  infoContainer: {
    backgroundColor: "#E5EAE9",
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
  imgBack: {
    width: "100%",
    height: "100%",
  },

  ionIcons: {
    borderRadius: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#ffffffaa",
  },
  commonFriendsContainer: {
    flex: 1,
    backgroundColor: 'red',
  },
  friendsCardsContainer: {
    flex: 1,
  }
});
