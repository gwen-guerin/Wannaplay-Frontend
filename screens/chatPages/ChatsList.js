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

export default function ChatsList({ navigation }) {
  const [allUsers, setAllUsers] = useState([]);
  const [chatBoxes, setChatBoxes] = useState([]);

  useEffect(() => {
    fetch("http://172.20.10.3:3000/users/allUsers")
      .then((response) => response.json())
      .then((data) => { console.log(data) 
        setAllUsers(data.usersList)});
  }, []);

  useEffect(() => {
    setChatBoxes(
      allUsers.map((data, i) => {
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
                source={require("../../assets/mia-khalifa.jpg")}
                style={styles.avatar}
              />
              <Text style={{ color: "black" }}> {data.username} </Text>
            </TouchableOpacity>
          </BlurView>
        );
      })
    );
  }, [allUsers]);

  const handleNavigation = (user) => {
    navigation.navigate("Chat", { username: "username", friend: user });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/esquise02.jpg")}
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
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingLeft: "2%",
    marginBottom: "3%",
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 5,
  },
  header: {
    height: "10%",
    width: "100%",
    backgroundColor: "black",
  },
  scrollList: {
    // flex: 1,
    // backgroundColor: 'green',
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
    borderColor: 'black',
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
