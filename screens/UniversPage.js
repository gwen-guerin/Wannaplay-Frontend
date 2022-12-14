import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import { ImageBackground } from "react-native";
import { BlurView } from "expo-blur";

export default function UniversPage() {
  return (
    <ImageBackground
      source={require("../assets/background.jpg")}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.Title}>Wanna Play?</Text>
      </View>
      <View style={styles.content}>
        <BlurView intensity={100} tint="dark" style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>Wanna Learn?</Text>
          </TouchableOpacity>
        </BlurView>
        <BlurView intensity={100} tint="dark" style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>Wanna Learn?</Text>
          </TouchableOpacity>
        </BlurView>
        <BlurView intensity={100} tint="dark" style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>Wanna Learn?</Text>
          </TouchableOpacity>
        </BlurView>
        <BlurView intensity={100} tint="dark" style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>Wanna Learn?</Text>
          </TouchableOpacity>
        </BlurView>
        <BlurView intensity={100} tint="dark" style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>Wanna Learn?</Text>
          </TouchableOpacity>
        </BlurView>
        <BlurView intensity={100} tint="dark" style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>Wanna Learn?</Text>
          </TouchableOpacity>
        </BlurView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
  },
  header: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    backgroundColor: "black",
    color: "white",
    paddingTop: 55,
  },
  Title: {
    color: "#CE2174",
    fontSize: 20,
  },
  content: {
    flex: 30,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    color: "white",
    flexWrap: "wrap",
    paddingTop: 80,
    padding: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  buttonContainer: {
    width: "40%",
    height: "20%",
    margin: 10,
    borderRadius: 25,
  },
  button: {
    flex: 1,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: 'center'
  },
  text: {
    color: "white",
    textAlign: "center",
  },
  text: {
    color: "white",
    paddingLeft: 15,
    paddingRight: 10,
    fontSize: 20,
    alignItems: "center",
  },
  image: {
    height: "100%",
    width: "100%",
  },
});
