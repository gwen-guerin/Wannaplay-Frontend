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
import { BlurView } from "expo-blur";
import { ImageBackground } from "react-native";

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
        <TouchableOpacity style={styles.button1}>
          <Text style={styles.text}>Wanna Learn?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button2}>
          <Text style={styles.text}>Wanna Play with a buddy?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button3}>
          <Text style={styles.text}>Wanna see what's around?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button4}>
          <Text style={styles.text}>Wanna play in a band?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button5}>
          <Text style={styles.text}>Wanna buy something?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button6}>
          <Text style={styles.text}>Wanna singer?</Text>
        </TouchableOpacity>
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
    paddingTop: 20,

    paddingRight: 20,
  },
  button1: {
    backgroundColor: "#404ECD",
    width: "40%",
    height: "20%",
    marginLeft: 20,
    borderRadius: 25,
    justifyContent: "center",
    marginTop: 70,
    opacity: 0.9,
  },
  text: {
    color: "white",
    textAlign: "center",
  },
  button2: {
    backgroundColor: "#CD4040",
    width: "40%",
    height: "20%",
    marginLeft: 20,
    borderRadius: 25,
    justifyContent: "center",
    marginTop: 70,
    paddingLeft: 10,
    paddingRight: 10,
    opacity: 0.9,
  },
  button3: {
    backgroundColor: "#CD40AE",
    width: "40%",
    height: "20%",
    marginLeft: 20,
    borderRadius: 25,
    justifyContent: "center",
    marginTop: 70,
    opacity: 0.9,
  },
  button4: {
    backgroundColor: "#76CD40",
    width: "40%",
    height: "20%",
    marginLeft: 20,
    borderRadius: 25,
    justifyContent: "center",
    marginTop: 70,
    paddingLeft: 10,
    paddingRight: 10,
    opacity: 0.9,
  },
  button5: {
    backgroundColor: "#CACD40",
    width: "40%",
    height: "20%",
    marginLeft: 20,
    borderRadius: 25,
    justifyContent: "center",
    marginTop: 70,
    opacity: 0.9,
  },
  button6: {
    backgroundColor: "#40CDC5",
    width: "40%",
    height: "20%",
    marginLeft: 20,
    borderRadius: 25,
    justifyContent: "center",
    marginTop: 70,
    opacity: 0.9,
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
