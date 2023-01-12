import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useEffect, useState } from 'react';
import IPAdress from '../IPAdress';
import { useIsFocused } from '@react-navigation/native';

export default function ConcertScreen({ navigation }) {
  const [eventName, setEventName] = useState('');
  const [style, setStyle] = useState('');
  const [date, setDate] = useState('');
  const [place, setPlace] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  function handleAddEvent() {
    return setModalVisible(!modalVisible);
  }

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

  const handleSubmitEvent = () => {
    fetch(`http://${IPAdress}:3000/concerts/createConcert`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventName,
        style,
        date,
        place,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log('EVENT', data));
  };

  const concert = concertsList.map((event, i) => {
    return (
      <ScrollView>
      <View style={styles.description} key={i}>
        <View style={styles.eventDetails}>
          <Text style={styles.textUser}>{event.eventName}</Text>
          <Text style={styles.textUser}>{event.style}</Text>
        </View>
        <View style={styles.eventDetails}>
          <Text style={styles.textUser}>{event.place}</Text>
          <Text style={styles.textUser}>{event.date}</Text>
        </View>
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
      <View style={styles.pageContainer}>
        <View style={styles.titleConcert}>
          <Text style={styles.titleText}>🎸NEXT EVENTS🎸</Text>
          <ScrollView style={styles.scrollContainer}>{concert}</ScrollView>
        </View>
        <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.btnAdd}
          onPress={() => handleAddEvent()}
        >
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Add Event</Text>
          <Modal visible={modalVisible} animationType="slide" transparent>
            <View style={{ backgroundColor: '#000000aa', flex: 1 }}>
              <View style={styles.modalContent}>
                <TextInput
                  placeholder="Event"
                  value={eventName}
                  onChangeText={(value) => setEventName(value)}
                  style={styles.inputs}
                ></TextInput>
                <TextInput
                  placeholder="Date"
                  value={date}
                  onChangeText={(value) => setDate(value)}
                  style={styles.inputs}
                ></TextInput>
                <TextInput
                  placeholder="Style"
                  value={style}
                  onChangeText={(value) => setStyle(value)}
                  style={styles.inputs}
                ></TextInput>
                <TextInput
                  placeholder="Place"
                  value={place}
                  onChangeText={(value) => setPlace(value)}
                  style={styles.inputs}
                ></TextInput>
                <View style={styles.submitContainer}>
                  <TouchableOpacity
                    onPress={() => setModalVisible(!modalVisible)}
                    style={styles.buttonsSub}
                  >
                    <Text>X</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      handleSubmitEvent();
                      setModalVisible(!modalVisible);
                    }}
                    style={styles.buttonsSub}
                  >
                    <Text>SUBMIT</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    paddingVertical: 40,
    paddingHorizontal: 100,
    width: '150%',
  },
  titleConcert: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
  description: {
    marginTop: 12,
    marginBottom: 12,
    backgroundColor: '#ffffffaa',
    borderRadius: 10,
    padding: 5,
  },
  textUser: {
    fontSize: 15,
    margin: 2,
    color: 'grey',
    alignItems: 'center',
    fontWeight: '700',
    
  },
  btnAdd: {
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    backgroundColor: '#ffffffaa',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 25,

  },
  modalContent: {
    borderRadius: 40,
    backgroundColor: '#CE2174',
    marginTop: 200,
    padding: 30,
    margin: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsSub: {
    backgroundColor: '#AAA8A8',
    borderRadius: 15,
    width: '45%',
    alignItems: 'center',
  },
  submitContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputs: {
    backgroundColor: '#D9D9D9',
    borderRadius: 20,
    paddingLeft: 10,
    width: '100%',
    fontSize: 16,
    marginBottom: 10,
  },
  scrollContainer: {
    display: 'flex',
    width: '100%',
    height: '100%',
    marginBottom: 50,
  },
  eventDetails: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  btnContainer: {
    alignItems: "center",
  }
});
