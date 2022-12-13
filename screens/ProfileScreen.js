import { Image, View, StyleSheet, Text, TextInput, Button } from "react-native";
import { useState } from "react";
// import FriendsCards from "../components/FriendsCards";
<<<<<<< HEAD
import { login } from "../reducers/user";
=======
//import { login } from "../reducers/users";
>>>>>>> 094cd37850f124b5fd8760165cb1824273d7184a
import { useDispatch, useSelector } from "react-redux";

export default function ProfilScreen() {
  const [input, setInput] = useState("");
  const [user, setUser] = useState({});
  const [tag, setTag] = useState([]);
  //   const [friend, setFriend] = useState([]);

  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.value);

  const handleSubmitProfile = () => {
    fetch(`http://172.17.188.33:3000/users/profile/${input}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          // setUser(users)
          dispatch(login({ username: username }));
        } else {
          console.log("error");
        }
      });
  };

  const tags = tag.map((tags, i) => {
    console.log(tags);
    return (
      <Text style={styles.textUser} key={i}>
        {tags}
      </Text>
    );
  });

  //   const friends = friend.map((friends, i) => {
  //     console.log(friends)
  //     return (
  //         <FriendsCards key={i} props={data}/>
  //         )
  // });

  return (
    <View style={styles.container}>
      <View style={styles.descriptionUser}>
        <TextInput
          placeholder="input"
          value={input}
          onChangeText={(value) => setInput(value)}
        />
        <Button title="add" onPress={() => handleSubmitProfile()}></Button>
        <Image
          style={styles.userPicture}
          source={require("../assets/user.jpg")}
        />
        <Text style={styles.textUser}>{user.username}</Text>
        <Text style={styles.textUser}>{user.firstname}</Text>
        <View>{tags}</View>
        <Text style={styles.textUser}>{user.age}</Text>
        <Text style={styles.textUser}>{user.teacher}</Text>
        <Text style={styles.textUser}>{user.status}</Text>
        <Text style={styles.textUser}>{user.city}</Text>
        {/* <View >{friends}</View> */}
      </View>
      <View>
        <Text>Friends</Text>
      </View>
      <View style={styles.friendsTab}>
        <View style={styles.friendsList}></View>
        <View style={styles.friendsList}></View>
        <View style={styles.friendsList}></View>
        <View style={styles.friendsList}></View>
        <View style={styles.friendsList}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#A8F9DE",
    // alignItems: 'flex-start',
    justifyContent: "space-between",
    width: "100%",
    //  margin: 10,
    //  padding: 30,
    paddingTop: 50,
    paddingBottom: 50,
    padding: 10,
  },
  userPicture: {
    borderRadius: 60,
    width: 70,
    height: 70,
  },
  friendsTab: {
    backgroundColor: "white",
    height: 300,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  friendsList: {
    borderWidth: 1,
    width: 100,
    height: 100,
  },
  // descriptionUser: {
  //   color: ''
  // },
  textUser: {
    color: "red",
    fontSize: 18,
  },
});
