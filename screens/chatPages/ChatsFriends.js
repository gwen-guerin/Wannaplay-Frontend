import {
  StyleSheet,
  ScrollView,
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  Image,
  useWindowDimensions,
  TextInput,
  Dimensions,
} from "react-native";
import { BlurView } from "expo-blur";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFriends } from "../../reducers/user";
import IPAdress from "../../IPAdress";
import { useIsFocused } from "@react-navigation/native";

export default function ChatsFriends({ navigation }) {
  const [friends, setFriends] = useState([]);
  const [friendsChats, setFriendsChats] = useState([]);
  const [chatBoxes, setChatBoxes] = useState([]);
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    ("aight");
    fetch(`http://${IPAdress}:3000/friends/getFriends/${user.username}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setFriends(data.friends);
        }
      });
  }, [isFocused]);

  useEffect(() => {
    console.log("friends", friends);
    fetch(`http://${IPAdress}:3000/chats/allChats/${user.username}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setFriendsChats(
          data.allChats.filter((e) => {
            for (let i = 0; i < friends.length; i++)
              if (e.friend === friends[i]) return true;
            return false;
          })
        );
      });
  }, [friends]);

  useEffect(() => {
    console.log("friendsChats", friendsChats);
    setChatBoxes(
      friendsChats.map((data, i) => {
        return (
          <BlurView
            key={i}
            intensity={100}
            tint="light"
            style={styles.chatlinkContainer}
          >
            <TouchableOpacity
              onPress={() => handleNavigation(data)}
              style={styles.chatlink}
            >
              <Image
                source={require("../../assets/jimi.jpg")}
                style={styles.avatar}
              />
              <Text style={{ color: "black" }}> {data.friend} </Text>
            </TouchableOpacity>
          </BlurView>
        );
      })
    );
  }, [friendsChats]);

  const handleNavigation = (data) => {
    navigation.navigate("Chat", { chatData: data });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/illu_02.jpg")}
        style={styles.inset}
        blurRadius={0.3}
      >
        <TextInput
          style={styles.input}
          placeholder="Search a friend..."
          placeholderTextColor={"black"}
          // mode='outlined'
        />
        <ScrollView contentContainerStyle={styles.scrollList}>
          {chatBoxes}
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#000",
  },
  inset: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    width: "100%",
    paddingTop: 20,
    position: "relative",
  },
  input: {
    height: "7%",
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    paddingLeft: "2%",
    marginBottom: "3%",
    borderColor: "#CE2174",
    borderWidth: 2,
    borderRadius: 5,
  },
  header: {
    height: "10%",
    width: "100%",
    backgroundColor: "black",
  },
  scrollList: {
    alignItems: "center",
  },
  chatlinkContainer: {
    backgroundColor: "white",
    padding: Dimensions.get("screen").height * 0.01,
    height: Dimensions.get("screen").height * 0.095,
    width: Dimensions.get("screen").width * 0.95,
    margin: Dimensions.get("screen").width * 0.01,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#CE2174",
  },
  chatlink: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    borderRadius: 5,
  },
  avatar: {
    height: Dimensions.get("screen").height * 0.08,
    width: Dimensions.get("screen").height * 0.08,
    backgroundColor: "grey",
    borderRadius: 50,
  },
});
