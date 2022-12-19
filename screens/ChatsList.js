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

  useEffect(() => {
    fetch("http://192.168.1.15:3000/users/allUsers")
      .then((response) => response.json())
      .then((data) => setAllUsers(data.usernames));
  }, []);
  const handleNavigation = (user) => {
    navigation.navigate("Chat", { username: "username", friend: user });
  };

  const chatBoxes = allUsers.map((data, i) => {
    return (
      <BlurView
        key={i}
        intensity={100}
        tint="dark"
        style={styles.chatlinkContainer}
      >
        <TouchableOpacity
          onPress={() => handleNavigation(data)}
          style={styles.chatlink}
        >
          <Image
            source={require("../assets/mia-khalifa.jpg")}
            style={styles.avatar}
          />
          <Text style={{ color: "white" }}> {data} </Text>
        </TouchableOpacity>
      </BlurView>
    );
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <ImageBackground
        source={require("../assets/esquise02.jpg")}
        style={styles.inset}
        imageStyle={{ borderTopLeftRadius: 30, borderTopRightRadius: 30 }}
        blurRadius={0.3}
      >
        <TextInput
          style={styles.input}
          placeholder="Search a friend..."
          placeholderTextColor={"white"}
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
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "#ffffff",
    width: "100%",
    paddingTop: 20,
    position: "relative",
    borderTopColor: "#A8F9DE",
    borderLeftColor: "#A8F9DE",
    borderRightColor: "#A8F9DE",
    borderTopWidth: 4,
    borderRightWidth: 0.1,
    borderLeftWidth: 0.1,
  },
  input: {
    height: "7%",
    width: "90%",
    backgroundColor: "black",
    borderRadius: 10,
    paddingLeft: "2%",
    marginBottom: "3%",
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
