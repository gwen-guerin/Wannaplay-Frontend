import React, { useState, useEffect } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import {
  SafeAreaView,
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
import { useSelector, useDispatch } from "react-redux";

export default function SearchUser({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const username = useSelector((state) => state.user.value.username);

  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  const addChat = (friendUsername) => {
    fetch("http://172.16.190.27:3000/users/");
  };

  const handleSearch = () => {
    if (searchQuery.length > 0) {
      // console.log(searchQuery.length)
      fetch(`http://172.16.190.27:3000/search/${searchQuery}`)
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
                      navigation.navigate("FriendProfile", { username: user })
                    }
                  >
                    <Image
                      source={require("../../assets/mia-khalifa.jpg")}
                      style={styles.avatar}
                    />
                    <View style={styles.userInfo}>
                      <Text>{user}</Text>
                    </View>
                  </TouchableOpacity>
                </BlurView>
              );
            })
          );
        });
    } else setSearchResults([]);
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
              color="black"
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
    // borderColor: "#black",
    // borderWidth: 2,
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
    borderColor: "#black",
    borderWidth: 2,
  },
  searchIcon: {},
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
    // margin: Dimensions.get("screen").width * 0.01,
    borderColor: "#black",
    borderWidth: 2,
  },
  avatar: {
    height: Dimensions.get("screen").height * 0.08,
    width: Dimensions.get("screen").height * 0.08,
    borderRadius: 50,
    margin: Dimensions.get("screen").width * 0.01,
  },
  text: {
    fontSize: 16,
    padding: 5,
  },
});
