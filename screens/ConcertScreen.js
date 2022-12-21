import { StyleSheet, View, Text } from 'react-native';
import { useEffect, useState } from 'react';

export default function ConcertScreen({ navigation }) {
  const [concert, setConcert] = useState({
    eventName: null,
    date: null,
    style: null,
    place: null
  });

  useEffect(() => {
    fetch(`http://172.17.188.35:3000/concerts`)
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          // console.log(data.concert);
          setConcert({
            eventName: data.concert.eventName,
            date: data.concert.date,
            style: data.concert.style,
            place: data.concert.place
          })
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
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 50,
    color: 'black',
    backgroundColor: 'red',
    width: '100%',
    height: '100%',
  },
});

