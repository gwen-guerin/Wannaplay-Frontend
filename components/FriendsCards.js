import { Image, View, StyleSheet, Text } from "react-native";



export default function FriendsCards(props) {



    return (
        <View style={styles.container}>
            <Image style={styles.userPicture} source={require('../assets/user.jpg')} />
            <View style={styles.descriptionUser}>
                <Text style={styles.textUser}>{props.username}</Text>
                <View >{props.tags}</View>
                <View >{props.friends}</View>
            </View>
        </View>

    )

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    userPicture: {
      borderRadius: 60,
      width: 70,
      height: 70,
    },
    textUser: {
      color: "red",
      fontSize: 18,
    },
  
  });