import React, { useState } from "react";
import {
  BackgroundImage,
  Image,
  Text,
  StyleSheet,
  View,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Slider from "@react-native-community/slider";
//import { BTMultiSelect } from "@blump-tech/native-base-select";

const Questions2 = () => {
  const [age, setAge] = useState(0);
  const [city, setCity] = useState("");
  const [department, setDepartment] = useState("");
  const [teacher, setTeacher] = useState(false);
  const [singer, setSinger] = useState(false);
  const [instruments, setInstruments] = useState({
   
    value: "",
    list: [
      { _id: 1, name: "Guitar" },
      { _id: 2, name: "Drums" },
      { _id: 3, name: "Piano" },
      { _id: 4, name: "Trumpet" },
      { _id: 5, name: "Violin" },
      { _id: 6, name: "Saxophone" },
      { _id: 7, name: "Flute" },
      { _id: 8, name: "Bass" },
      { _id: 9, name: "Harmonica" },
      { _id: 10, name: "BeatMaker" },
      { _id: 11, name: "BeatBox" },
      { _id: 12, name: "Banjo" },
      { _id: 13, name: "Harp" },
      { _id: 14, name: "Clarinet" },
      { _id: 15, name: "Oboe" },
      { _id: 16, name: "Synthesizer" },
    ],
    selectedList: [],
    error: "",
  });


  return (
    <View>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.questionblock}>
            <Text>How old are you ?</Text>
            <Slider
              step={1}
              minimumValue={7}
              maximumValue={100}
              value={age}
              onValueChange={(slideValue) => setAge(slideValue)}
              minimumTrackTintColor="#1fb28a"
              maximumTrackTintColor="#d3d3d3"
              thumbTintColor="#b9e4c9"
            />
            <Text>I am {age} years old</Text>
          </View>
          <TextInput
            value={city}
            placeholder="Where do you live ?"
            onChangeText={(city) => setCity(city)}
          />
          <TextInput
            value={department}
            placeholder="Which department ?"
            onChangeText={(department) => setDepartment(department)}
          />
          <View>
            <Text>Do you wanna teach something ?</Text>
            <Picker
              selectedValue={teacher}
              onValueChange={(teacher) => setTeacher(teacher)}
            >
              <Picker.Item label="No" value="I don't wanna teach :'(" />
              <Picker.Item label="Yes" value="I wanna teach :)" />
            </Picker>
            <Text>{teacher}</Text>
          </View>
          <View>
            <Text>Are you a singer ?</Text>
            <Picker
              selectedValue={singer}
              onValueChange={(singer) => setSinger(singer)}
            >
              <Picker.Item label="No" value="Like a casserolle under shower" />
              <Picker.Item label="Yes" value="Better than Elvis !" />
            </Picker>
            <Text>{singer}</Text>
          </View>
          <BTMultiSelect
            label="instruments"
            placeholder="Select your instruments"
            value={instruments.value}
            list={instruments.list}
            selectedList={instruments.selectedList}
            onSelection={(value) => {
              setInstruments({
                ...instruments,
                value: value.text,
                selectedList: value.selectedList,
                error: "",
              });
            }}
            errorText={instruments.error}
            pillStyle={{ backgroundColor: "yellow" }}
            errorStyle={{ textColor: "red" }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: "space-around",
    height: 600,
  },
});

export default Questions2;
