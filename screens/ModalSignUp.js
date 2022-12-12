import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import { useState } from 'react';

export default function ModalSignUp() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
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
  );
}

const styles = StyleSheet.create({
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
