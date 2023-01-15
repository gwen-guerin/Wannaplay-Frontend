import React, { useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  ImageBackground,
} from "react-native";

import { BlurView } from "expo-blur";
import IPAdress from "../../IPAdress";

export default function SearchTeacher({navigation}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    fetch(`http://${IPAdress}:3000/search/teacher/${searchQuery}`)
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(
          data.users.map((user, i) => {
            return (
              <BlurView
                key={i}
                intensity={100}
                tint="light"
                style={styles.blurbox}
              >
                <TouchableOpacity
                  style={styles.searchedButton}
                  onPress={() =>
                    navigation.navigate("FriendProfile", {
                      username: user.username,
                    })
                  }
                >
                  <Image
                    source={{ uri: user.profilePicture }}
                    style={styles.avatar}
                  />
                  <View style={styles.userInfo}>
                    <Text>{user.username}</Text>
                  </View>
                </TouchableOpacity>
              </BlurView>
            );
          })
        );
      });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/illu_02.jpg")}
        style={styles.background}
      >
        <View style={styles.searchContainer}>
          <TextInput
            multiline={true}
            style={styles.searchBar}
            placeholder="Rechercher"
            onChangeText={(value) => {
              setSearchQuery(value);
            }}
            value={searchQuery}
          />
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => handleSearch()}
          >
            <FontAwesome
              name={"search"}
              size={20}
              color="#CE2174"
              style={styles.searchIcon}
            />
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={styles.scrollList}>
          {searchResults}
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F7EBEC",
  },
  background: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    width: "70%",
    height: "5%",
    justifyContent: "center",
    alignContent: "center",
    margin: "5%",
    backgroundColor: "#FAF6F6",
    borderRadius: 10,
    paddingLeft: "2%",
    paddingRight: "2%",
  },
  searchBar: {
    color: "black",
    width: "90%",
    height: "100%",
    borderColor: "black",
    shadowColor: "black",
  },
  searchButton: {
    height: "100%",
    width: "10%",
    alignItems: "center",
    justifyContent: "center",
  },
  blurbox: {
    width: Dimensions.get("screen").width * 0.35,
    height: Dimensions.get("screen").width * 0.35,
    borderRadius: 25,
    margin: 10,
    borderColor: "#CE2174",
    borderWidth: 2,
  },
  scrollList: {
    width: "95%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  searchedButton: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("screen").width * 0.35,
    height: Dimensions.get("screen").width * 0.35,
    borderRadius: 25,
    borderColor: "#CE2174",
    borderWidth: 2,
  },
  avatar: {
    height: Dimensions.get("screen").height * 0.08,
    width: Dimensions.get("screen").height * 0.08,
    backgroundColor: "grey",
    borderRadius: 50,
    margin: Dimensions.get("screen").width * 0.01,
  },
});
