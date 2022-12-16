import React, { useState, useEffect } from "react";
import { Searchbar, ThemeProvider } from "react-native-paper";
// import all the components we are going to use
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
} from "react-native";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (query) => {
    const results = await fetch(`http://172.17.188.9:3000/search/${query}`);
    setResults(results);
  };

  return (
    <ThemeProvider styles={styles.container}>
      <View style={styles.searchContainer}>
        <Searchbar
          styles={styles.searchBar}
          placeholder="Rechercher"
          onChange={(query) => setSearchQuery(query)}
          onSearch={() => handleSearch(searchQuery)}
          data={results}
          renderItem={({ item }) => (
            <TouchableOpacity
              styles={styles.opac}
              onPress={() => setSearchQuery(item.username)}
            >
              <Text styles={styles.text}>{item.username}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </ThemeProvider>
  );
};

const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  searchContainer: {
    width: "90%",
    paddingTop: 40,
    paddingLeft: 20,
  },
  searchBar: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 5,
  },
  opac: {
    opacity: 0.5,
  },
  text: {
    fontSize: 16,
    padding: 5,
  },
};

export default App;
