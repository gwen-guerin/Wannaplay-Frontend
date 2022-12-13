import React, { useRef, useState } from 'react';
import { FormItem, Form } from 'react-native-form-component';
import {
  KeyboardAvoidingView,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Dimensions,
} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';

export default function Questions() {
  const [selected, setSelected] = useState(false);
  const data = [
    { key: '1', value: 'I Wanna Teach' },
    { key: '2', value: "I Don't Wanna Teach" },
  ];

  const {
    ageInput,
    cityInput,
    departmentInput,
    teacherInput,
    tagsInput,
    singerInput,
  } = useRef();

  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [department, setDepartment] = useState('');
  const [teacher, setTeacher] = useState(false);
  const [tags, setTags] = useState([]);
  const [singer, setSinger] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Form>
          <FormItem
            label="Age"
            isRequired
            value={age}
            onChangeText={(age) => setAge(age)}
            asterik
            ref={ageInput}
          />
          <FormItem
            label="City"
            isRequired
            value={city}
            onChangeText={(city) => setCity(city)}
            asterik
            ref={cityInput}
          />
          <FormItem
            label="Department"
            isRequired
            value={department}
            onChangeText={(department) => setDepartment(department)}
            asterik
            ref={departmentInput}
          />
          <FormItem label="Teach or not">
            <SelectList
            placeholder="Teach or not"
            search={false}
              setSelected={(value) => setSelected(!selected)}
              data={data}
              save="value"
            />
          </FormItem>
          <FormItem
            label="Teacher"
            isRequired
            value={teacher}
            onChangeText={(teacher) => setTeacher(teacher)}
            asterik
            ref={teacherInput}
            // customValidation={boolean}
          />
          <FormItem
            label="Instruments"
            isRequired
            value={tags}
            onChangeText={(tags) => setTags(tags)}
            asterik
            ref={tagsInput}
          />
          <FormItem
            label="Singer"
            isRequired
            value={singer}
            onChangeText={(singer) => setSinger(singer)}
            asterik
            ref={singerInput}
          />
        </Form>
      </ScrollView>
    </View>
  );
}

styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
  },
});
