import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
// import { BTMultiSelect } from '@blump-tech/native-base-select';
import { useSelector } from 'react-redux';

export default function Questions({ navigation }) {
  const user = useSelector((state) => state.user.value);
  // console.log('USER', user);
  const [age, setAge] = useState(0);
  const [city, setCity] = useState("");
  const [department, setDepartment] = useState("");
  const [teacher, setTeacher] = useState(false);
  const [instruTaught, setInstruTaught] = useState([]);
  const [tags, setTags] = useState([]);
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
  const [teach, setTeach] = useState({
    value: "",
    list: [
      { _id: 1, name: "Voice" },
      { _id: 2, name: "Guitar" },
      { _id: 3, name: "Drums" },
      { _id: 4, name: "Piano" },
      { _id: 5, name: "Trumpet" },
      { _id: 6, name: "Violin" },
      { _id: 7, name: "Saxophone" },
      { _id: 8, name: "Flute" },
      { _id: 9, name: "Bass" },
      { _id: 10, name: "Harmonica" },
      { _id: 11, name: "BeatMaker" },
      { _id: 12, name: "BeatBox" },
      { _id: 13, name: "Banjo" },
      { _id: 14, name: "Harp" },
      { _id: 15, name: "Clarinet" },
      { _id: 16, name: "Oboe" },
      { _id: 17, name: "Synthesizer" },
    ],
    selectedList: [],
    error: "",
  });
  // console.log(tags);
  const handleFormSubmit = () => {
    // console.log(user.firstname);
    fetch('http://172.16.190.134:3000/users/signupForm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        password: user.password,
        email: user.email,
        age: age,
        city: city,
        teacher: instruTaught,
        tags: tags,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        if (data.result) {
          // dispatch(
          //   login({
          //     username: data.user.username,
          //     token: data.user.token,
          //     firstname: data.user.firstname,
          //     lastname: data.user.lastname,
          //     email: data.user.email,
          //     password: data.user.password,
          //   })
          // );
          setAge(25);
          setCity("");
          setDepartment("");
          setTeacher("");
          setInstruTaught("");
          setSinger(false);
          setTags([]);
        } else {
          // setError(!error);
          alert("username already existing !");
        }
      });
  };

  return (
    <ImageBackground
      source={require("../assets/illu_02.jpg")}
      imageStyle={{ opacity: 0.25 }}
      style={styles.imgBack}
    >
      <ScrollView>
        <View style={styles.scrollContainer}>
          <View style={styles.ageContainer}>
            <Text style={styles.inputText}>How old are you ?</Text>
            <Slider
              step={1}
              minimumValue={7}
              maximumValue={100}
              value={25}
              onValueChange={(slideValue) => setAge(slideValue)}
              minimumTrackTintColor="#1fb28a"
              maximumTrackTintColor="#d3d3d3"
              thumbTintColor="#b9e4c9"
            />
            <Text>I am {age} years old</Text>
          </View>
          <TextInput
            style={styles.inputText}
            placeholder="Where do you live ?"
            placeholderTextColor="#ffffffaa"
            onChangeText={(city) => setCity(city)}
          />
          <TextInput
            style={styles.inputText}
            placeholder="Which department ?"
            placeholderTextColor="#ffffffaa"
            onChangeText={(department) => setDepartment(department)}
          />
          <View>
            <Text style={styles.inputText}>Do you wanna teach something ?</Text>
            <Picker
              selectedValue={teacher}
              onValueChange={(teacher) => setTeacher(teacher)}
            >
              <Picker.Item label="No" value={false} />
              <Picker.Item label="Yes" value={true} />
            </Picker>
          </View>
          {/* Conditionnal rendering if he/she wanna teach something (needs to choose what) */}
          <View style={{ marginTop: -30 }}>
            {teacher ? (
              <BTMultiSelect
                selectInputStyle={styles.test}
                label="What do you wanna teach ?"
                placeholder="Choose your instrument"
                placeHolderStyle={{ textColor: "#ffffff" }}
                value={teach.value}
                list={teach.list}
                selectedList={teach.selectedList}
                onSelection={(value) => {
                  {
                    setTeach({
                      ...teach,
                      value: value.text,
                      selectedList: value.selectedList,
                      error: "",
                    }),
                      setInstruTaught(teach.value);
                  }
                }}
                errorText={teach.error}
                pillStyle={{
                  backgroundColor: "#ffffffaa",
                  borderRadius: 15,
                  textColor: "#CE2174",
                }}
                errorStyle={{ textColor: "red" }}
              />
            ) : null}
          </View>
          <View style={teacher ? { marginTop: 0 } : { marginTop: -100 }}>
            <Text style={styles.inputText}>Are you a singer ?</Text>
            <Picker
              selectedValue={singer}
              onValueChange={(singer) => setSinger(singer)}
            >
              <Picker.Item label="No" value="Like a casserolle under shower" />
              <Picker.Item label="Yes" value="Better than Elvis !" />
            </Picker>
            <Text>{singer}</Text>
          </View>
          <View>
            <BTMultiSelect
              selectInputStyle={styles.test}
              label="What do you play ?"
              placeholder="Select your instruments"
              placeHolderStyle={{ textColor: "#ffffff" }}
              value={instruments.value}
              list={instruments.list}
              selectedList={instruments.selectedList}
              onSelection={(value) => {
                {
                  setInstruments({
                    ...instruments,
                    value: value.text,
                    selectedList: value.selectedList,
                    error: "",
                  }),
                    setTags(instruments.value);
                }
              }}
              errorText={instruments.error}
              pillStyle={{
                backgroundColor: "#ffffffaa",
                borderRadius: 15,
                textColor: "#CE2174",
              }}
              errorStyle={{ textColor: "red" }}
            />
          </View>
          <TouchableOpacity
            style={styles.submitForm}
            onPress={() => handleFormSubmit()}
          >
            <Text style={{ fontSize: 25, color: "#ffffff" }}>SUBMIT</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imgBack: {
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "rgba(80,0,0,0.3)",
  },
  scrollContainer: {
    height: 900,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "stretch",
  },
  inputText: {
    color: "#ffffff",
    fontSize: 25,
    backgroundColor: "#CE2174aa",
    borderRadius: 15,
    padding: 6,
  },
  test: {
    backgroundColor: "#CE2174aa",
    borderRadius: 20,
  },
  submitForm: {
    width: "80%",
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "#CE2174aa",
    borderRadius: 15,
    padding: 6,
  },
});
