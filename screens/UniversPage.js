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
import { useSelector, useDispatch } from "react-redux";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import { ImageBackground } from "react-native";
import { BlurView } from "expo-blur";
import * as Location from "expo-location";
import { useState, useEffect } from "react";

const API_KEY = "AIzaSyANG7Yh1Az3Q0okg4x2yfgmVupwYQkRdDo";

export default function UniversPage() {
  const [currentPosition, setCurrentPosition] = useState([]);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.value);
  // console.log('chcek',user);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      let latitude = 0;
      let longitude = 0;
      let url = "";

      if (status === "granted") {
        // console.log(status);
        Location.watchPositionAsync({ distanceInterval: 10 }, (location) => {
          latitude = location.coords.latitude;
          longitude = location.coords.longitude;
          fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          )
            .then((response) => response.json())
            .then((data) => {
              fetch("http://172.16.190.134:3000/users/geoloc", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  username: user.username,
                  location: {
                    city: data.address.city,
                    latitude: latitude,
                    longitude: longitude,
                  },
                }),
              })
                .then((response) => response.json())
                .then((user) => console.log(user));
            });
        });
      }
    })();
  }, []);

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
            <Image
              style={styles.logo1}
              source={require("../assets/pngegg.png")}
            />
            <Text style={styles.text}>Wanna Learn?</Text>
          </TouchableOpacity>
        </BlurView>
        <BlurView intensity={100} tint="dark" style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Image style={styles.logo2} source={require("../assets/mic.png")} />
            <Text style={styles.text}>Wanna Learn?</Text>
          </TouchableOpacity>
        </BlurView>
        <BlurView intensity={100} tint="dark" style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Image
              style={styles.logo3}
              source={require("../assets/music.png")}
            />
            <Text style={styles.text}>Wanna Learn?</Text>
          </TouchableOpacity>
        </BlurView>
        <BlurView intensity={100} tint="dark" style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Image
              style={styles.logo4}
              source={require("../assets/shopping.png")}
            />
            <Text style={styles.text}>Wanna Learn?</Text>
          </TouchableOpacity>
        </BlurView>
        <BlurView intensity={100} tint="dark" style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Image
              style={styles.logo5}
              source={require("../assets/learning.png")}
            />
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
    alignItems: "center",
  },
  text: {
    color: "white",
    paddingLeft: 15,
    paddingRight: 10,
    fontSize: 15,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  logo1: {
    height: "60%",
    width: "60%",
  },
  logo2: {
    height: "60%",
    width: "60%",
  },
  logo3: {
    height: "50%",
    width: "50%",
  },
  logo4: {
    height: "60%",
    width: "60%",
  },
  logo5: {
    height: "60%",
    width: "50%",
  },
});
