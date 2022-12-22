import { StyleSheet, View, Text } from "react-native";
import { useEffect, useState } from "react";
import IPAdress from "../IPAdress";

export default function ConcertScreen({ navigation }) {
  const [concert, setConcert] = useState({
    eventName: null,
    date: null,
    style: null,
    place: null,
  });

  useEffect(() => {
    fetch(`http://${IPAdress}:3000/concerts`)
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          setConcert({
            eventName: data.concert.eventName,
            date: data.concert.date,
            style: data.concert.style,
            place: data.concert.place,
          });
        }
      });
  }, []);

  return (
    <View styles={styles.container}>
      <Text>{concert.eventName}</Text>
      <Text>{concert.type}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 50,
    color: "black",
    backgroundColor: "red",
    width: "100%",
    height: "100%",
  },
});
