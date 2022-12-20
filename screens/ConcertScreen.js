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
import { useEffect, useState } from "react";

export default function ConcertScreen({ navigation }) {
  const [concert, setConcert] = useState([]);

  useEffect(() => {
    fetch("http://172.20.10.3:3000/concerts")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        res.json({ result: true, concertsList: data });
        setConcert(concertsList);
      });
  });

  return (
    <View styles={styles.container}>
      <Text>{concert}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 25,
    color: "black",
    backgroundColor: "red",
  },
});
