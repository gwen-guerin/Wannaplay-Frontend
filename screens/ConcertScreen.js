import { ScrollView,StyleSheet, View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import { useEffect, useState } from 'react';
import IPAdress from '../IPAdress';
import { useIsFocused } from '@react-navigation/native';


export default function ConcertScreen({ navigation }) {
  // const [eventName, setEventName] = useState("")
  // const [style, setStyle] = useState("")
  // const [date, setDate] = useState("")
  // const [place, setPlace] = useState("")

  const isFocused = useIsFocused();
  useEffect(() => {
    fetch(`http://${IPAdress}:3000/concerts`)
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          setConcertsList(data.concerts);
        }
      });
  }, [isFocused]);

  const [concertsList, setConcertsList] = useState([]);
  console.log('concertlist', concertsList);

  // const handleAddEvent = () => {
  //   fetch(`http://${IPAdress}:3000/concerts/createConcert`, {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({
  //       eventName,
  //       style,
  //       date,
  //       place,
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => console.log(data));
  // };

  const concert = concertsList.map((event, i) => {
    return (
      <ScrollView>
      <View style={styles.description} key={i}>
        <View style={styles.infoContainer}>
          <Text style={styles.textUser}>{event.eventName}</Text>
          <Text style={styles.textUser}>{event.style}</Text>
          <Text style={styles.textUser}>{event.place}</Text>
          <Text style={styles.textUser}>{event.date}</Text>
        </View>
        {/* <Text style={styles.textDecription}>{concert.description}</Text> */}
      </View>

      </ScrollView>
    );
  });
  return (
    <ImageBackground
      source={require('../assets/illu_02.jpg')}
      imageStyle={{ opacity: 0.4 }}
      style={styles.imgBack}
    >
      <View style={styles.titleConcert}>
        <Text style={styles.titleText}>🎸NEXT EVENTS🎸</Text>
        {concert}
      </View>
      <TouchableOpacity style={styles.btnAdd} onpress={() => handleAddEvent()}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Add Event</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  titleConcert: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#C5C5C5aa',
    padding: 10,
    borderRadius: 30,
  },
  titleText: {
    fontSize: 40,
  },
  imgBack: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  concertList: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    // backgroundColor: '#C5C5C5aa',
    alignItems: 'stretch',
    borderRadius: 5,
    width: '90%',
    padding: 5,
    marginTop: 25,
  },
  infoContainer: {
   
    backgroundColor: '#ffffffaa',
    padding: 5,
    borderRadius: 10,
    flexDirection: 'row',
  },
  textUser: {
    fontSize: 15,
    margin: 2,
    color: 'grey',
    alignItems: 'center',
    fontWeight: '700',
    
  },
  textDecription: {
    fontSize: 17,
    color: '#CE2174',
    alignItems: 'center',
    padding: 5,
    fontWeight: '700',
  },
  btnAdd: {
    backgroundColor: 'grey',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 25,
  },
});
