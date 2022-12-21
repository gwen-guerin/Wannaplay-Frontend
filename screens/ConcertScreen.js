import { StyleSheet, View, Text, ImageBackground } from "react-native";
import { useEffect, useState } from "react";

export default function ConcertScreen({ navigation }) {
  const [concerts, setConcerts] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch("http://172.16.190.30:3000/concerts")
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          console.log("NTM", data.concert);
          setConcerts(data.concerts);
        }
      });
  }, []);

  useEffect(() => {
    console.log(concerts);
    setList(
      concerts.map((data, i) => {
        return (
          <View style={styles.ev} key={i}>
            <Text style={styles.text}>
              {data.eventName} | {data.date} | {data.type} | {data.places}
            </Text>
          </View>
        );
      })
    );
  }, [concerts]);

  return (
    <ImageBackground
      source={require("../assets/illu_02.jpg")}
      style={styles.container}
    >
      <View>{list}</View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomColor: "#ccc",
    backgroundColor: "#A8F9DE",
    height: "100%",
    width: "100%",
  },
  ev: {
    fontSize: 25,
    fontWeight: "bold",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#19205C",
    margin: 20,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    
  },
  text: {
    fontSize: 25,
    color: "#CE2174",
    fontWeight: "bold",
    backgroundColor: "#C5C5C5",
    height: "100%",
    width: "100%",
  },
});
