import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Dimensions,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { login } from '../reducers/user';
import IPAdress from '../IPAdress';

const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function Home({ navigation }) {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalSignInVisible, setModalSignInVisible] = useState(false);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usernameSignIn, setUsernameSignIn] = useState('');
  const [passwordSignIn, setPasswordSignIn] = useState('');
  const [errorSignin, setErrorSignin] = useState(false);
  const [errorSignup, setErrorSignup] = useState(false);

  const inputsObj = {
    firstname,
    lastname,
    username,
    email,
    password,
  };

  const handleRegister = () => {
    fetch(`http://${IPAdress}:3000/users/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstname: firstname,
        lastname: lastname,
        username: username,
        password: password,
        email: email,
        location: {},
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(
            login({
              username: data.user,
              status: true,
            })
          );
          setFirstname('');
          setUsername('');
          setPassword('');
          setEmail('');
          setLastname('');
          setModalVisible(!modalVisible);
          navigation.navigate('Questions');
        } else {
          alert('username already existing !');
          setErrorSignup(true);
        }
      });
  };

  const handleSignUp = () => {
    return setModalVisible(!modalVisible);
  };

  const handleSignIn = () => {
    setModalSignInVisible(!modalSignInVisible);
  };

  const submitSignIn = () => {
    fetch(`http://${IPAdress}:3000/users/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: usernameSignIn,
        password: passwordSignIn,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          dispatch(
            login({
              username: usernameSignIn,
              status: true,
            })
          );
          setFirstname('');
          setUsername('');
          setPassword('');
          setEmail('');
          setLastname('');
          setModalSignInVisible(!modalSignInVisible),
            navigation.navigate('TabNavigator');
          setErrorSignin(false);
        } else {
          setModalSignInVisible(true);
          setErrorSignin(true);
        }
        fetch('http://172.17.188.35:3000/users/isOnline', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: usernameSignIn,
          }),
        })
          .then((res) => res.json())
          .then((data) => {});
      });
    fetch(`http://${IPAdress}:3000/users/isOnline`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: usernameSignIn,
      }),
    })
      .then((res) => res.json())
      .then((data) => {});
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
          <Text style={styles.singText}>SING'UP</Text>
          <Modal visible={modalVisible} animationType="slide" transparent>
            <View style={{ backgroundColor: '#000000aa', flex: 1 }}>
              <View style={styles.modalContent}>
                {errorSignup && (
                  <Text>Attention, champs manquants ou incorrect !</Text>
                )}
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
                  secureTextEntry={true}
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
          <Text style={styles.singText}>SING'IN</Text>
          <Modal visible={modalSignInVisible} animationType="slide" transparent>
            <View style={{ backgroundColor: '#000000aa', flex: 1 }}>
              <View style={styles.modalContent}>
                {errorSignin && (
                  <Text>Attention, champs manquants ou incorrect !</Text>
                )}
                <TextInput
                  placeholder="Username"
                  value={usernameSignIn}
                  onChangeText={(value) => setUsernameSignIn(value)}
                  style={styles.inputs}
                ></TextInput>
                <TextInput
                  label="Password"
                  value={passwordSignIn}
                  onChangeText={(value) => setPasswordSignIn(value)}
                  style={styles.inputs}
                  secureTextEntry={true}
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
                      // dispatch(login(inputsObj));
                      submitSignIn();
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
    color: 'white',
    textShadowColor: '#CE2174',
    textShadowRadius: 10,
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
  singText: {
    color: '#CE2174'
  },
  signBtn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderColor: '#CE2174',
    borderWidth: 2,
    width: 200,
    height: 40,
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
    borderRadius: 20,
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
