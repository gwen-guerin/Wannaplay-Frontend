import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
  TextInput,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

export default function Home() {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const inputsObj = {
    firstName,
    lastName,
    username,
    email,
    password
  }

  dispatch(login(inputsObj))

  const handleSignUp = () => {
    // setModalVisible(!modalVisible)
    return setModalVisible(!modalVisible);
  };
  return (
    <ImageBackground
      source={require('../assets/illu_02.jpg')}
      style={styles.background}
    >
      <View style={styles.header}>
        <Text style={styles.title}>WannaPlay?</Text>
      </View>
      <View style={styles.signInSignUpContainer}>
        <TouchableOpacity style={styles.signBtn} onPress={() => handleSignUp()}>
          <Text>SING'UP</Text>
          <Modal visible={modalVisible} animationType="slide" transparent>
            <View style={{ backgroundColor: '#000000aa', flex: 1 }}>
              <View style={styles.modalContent}>
                <TextInput
                  placeholder="First Name"
                  value={firstName}
                  onChangeText={(value) => setFirstName(value)}
                  style={styles.inputs}
                ></TextInput>
                <TextInput
                  placeholder="Last Name"
                  value={lastName}
                  onChangeText={(value) => setLastName(value)}
                  style={styles.inputs}
                ></TextInput>
                <TextInput
                  placeholder="Username"
                  value={username}
                  onChangeText={(value) => setUsername(value)}
                  style={styles.inputs}
                ></TextInput>
                <TextInput
                  placeholder="E-mail"
                  value={email}
                  onChangeText={(value) => setEmail(value)}
                  style={styles.inputs}
                ></TextInput>
                <TextInput
                  placeholder="Password"
                  value={password}
                  onChangeText={(value) => setPassword(value)}
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
                    onPress={() => setModalVisible(!modalVisible)}
                    style={styles.buttonsSub}
                  >
                    <Text>SUBMIT</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.signBtn}
          onPress={() => alert('Sign in')}
        >
          <Text>SING'IN</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const win = Dimensions.get('window');

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 50,
  },
  home: {
    fontSize: 200,
    // fontFamily: 'Atma-Bold'
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 90,
    marginBottom: 20,
    // fontSize: 200,
  },
  signInSignUpContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signBtn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CE2174',
    width: 200,
    height: 30,
    marginBottom: 20,
    borderRadius: 15,
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
  inputs: {
    backgroundColor: '#D9D9D9',
    borderRadius: 15,
    paddingLeft: 10,
    width: '100%',
    fontSize: 16,
    marginBottom: 10,
  },
  submitContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonsSub: {
    backgroundColor: '#AAA8A8',
    borderRadius: 15,
    width: '45%',
    alignItems: 'center',
  },
});
