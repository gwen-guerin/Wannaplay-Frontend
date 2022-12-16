import React, { useState, useEffect } from "react";
import { Searchbar, ThemeProvider } from "react-native-paper";
// import all the components we are going to use
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
} from "react-native";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  const handleSearch = () => {
    if (searchQuery.length > 0) {
      fetch(`http://172.16.190.14:3000/search/${searchQuery}`)
        .then((response) => response.json())
        .then((data) => {
          setSearchResults(
            data.users.map((user, i) => {
              return (
                <TouchableOpacity key={i} style={styles.searchedButton}>
                  <Image
                    source={require("../assets/mia-khalifa.jpg")}
                    style={styles.avatar}
                  />
                  <View style={styles.userInfo}>
                    <Text>{user.username}</Text>
                  </View>
                </TouchableOpacity>
              );
            })
          );
        });
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Rechercher"
        onChangeText={(value) => {
          setSearchQuery(value);
        }}
        value={searchQuery}
      />
      <ScrollView contentContainerStyle={styles.scrollList}>
        {searchResults}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  searchBar: {
    backgroundColor: "gray",
    color: "white",
    width: "85%",
    height: "6%",
    margin: "5%",
  },
  scrollList: {
    // flex: 1,
    // backgroundColor: 'green',
    // width: Dimensions.get("screen").width * 0.95,
    width: "95%",
    flexDirection: "row",
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "space-around",
  },
  searchedButton: {
    flexDirection: "row",
    alignItems: "center",
    width: Dimensions.get("screen").width * 0.35,
    height: Dimensions.get("screen").width * 0.35,
    backgroundColor: "green",
    borderRadius: 25,
    margin: Dimensions.get("screen").width * 0.01,
  },
  avatar: {
    height: Dimensions.get("screen").height * 0.08,
    width: Dimensions.get("screen").height * 0.08,
    backgroundColor: "grey",
    borderRadius: 50,
    margin: Dimensions.get("screen").width * 0.01,
  },
  text: {
    fontSize: 16,
    padding: 5,
  },
});

export default App;
