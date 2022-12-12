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
import { login } from '../reducers/user';

export default function Home() {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalSignInVisible, setModalSignInVisible] = useState(false);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const inputsObj = {
    firstname,
    lastname,
    username,
    email,
    password,
  };

  const handleRegister = () => {
    fetch('http://172.16.190.13:3000/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstname: firstname,
        lastname: lastname,
        username: username,
        password: password,
        email: email,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.result) {
          dispatch(
            login({
              username: data.user.username,
              token: data.user.token,
              firstname: data.user.firstname,
              lastname: data.user.lastname,
              email: data.user.email,
              password: data.user.password,
            })
          );
          setFirstname('');
          setUsername('');
          setPassword('');
          setEmail('');
          setLastname('');
        } else {
          alert('username already existing !');
        }
      });
  };
  const handleSignUp = () => {
    // setModalVisible(!modalVisible)
    return setModalVisible(!modalVisible);
  };
  const handleSignIn = () => {
    return setModalSignInVisible(!modalSignInVisible);
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
                  value={firstname}
                  onChangeText={(value) => setFirstname(value)}
                  style={styles.inputs}
                ></TextInput>
                <TextInput
                  placeholder="Last Name"
                  value={lastname}
                  onChangeText={(value) => setLastname(value)}
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
                    onPress={() => {
                      handleRegister();
                      setModalVisible(!modalVisible),
                        dispatch(login(inputsObj));
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
        <TouchableOpacity style={styles.signBtn} onPress={() => handleSignIn()}>
          <Text>SING'IN</Text>
          <Modal visible={modalSignInVisible} animationType="slide" transparent>
            <View style={{ backgroundColor: '#000000aa', flex: 1 }}>
              <View style={styles.modalContent}>
                <TextInput
                  placeholder="Username"
                  value={firstname}
                  onChangeText={(value) => setUsername(value)}
                  style={styles.inputs}
                ></TextInput>
                <TextInput
                  placeholder="Password"
                  value={lastname}
                  onChangeText={(value) => setPassword(value)}
                  style={styles.inputs}
                ></TextInput>
                <View style={styles.submitContainer}>
                  <TouchableOpacity
                    onPress={() => setModalSignInVisible(!modalSignInVisible)}
                    style={styles.buttonsSub}
                  >
                    <Text>X</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      handleRegister();
                      setModalVisible(!modalVisible),
                        dispatch(login(inputsObj));
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
