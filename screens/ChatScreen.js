import { useEffect, useState, useRef } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Pusher from "pusher-js/react-native";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import IPAdress from "../IPAdress";

//declaration de la variable pusher en dehors de la fonction 
const pusher = new Pusher("2ea678f34e1d48f32f22", { cluster: "eu" });
//Pusher sert à envoyé des messages en temps réel. c'est un webservice.une API.
//spécifie le compte pusher pour WannaPlay

export default function ChatScreen({ navigation, route: { params } }) {
  const [messages, setMessages] = useState([]);//etat qui stocke les messages. tableau d'objet. l'objet sera le payload : id du chat , username, message, date.
  const [messageText, setMessageText] = useState("");//état qui stocke le msg tapé par l'utilisateur
  const user = useSelector((state) => state.user.value);

  const scrollViewRef = useRef();//point de départ du scroll en bas (au lieu d'en haut)

  const isFocused = useIsFocused;
  let subscription;
  useEffect(() => {
    //on fetch pour rejoindre un chat
    (() => {
      fetch(`http://${IPAdress}:3000/chats/joinChat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chatName: params.chatData.chatName,
          username: user.username,
        }),
      });
      //ensuite on fetch la route allMessages qui récupère ts les msgs précédents
      fetch(
        `http://${IPAdress}:3000/chats/allMessages/${params.chatData.chatName}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.result) setMessages(data.messages);
        });

    //pour recevoir les msg en temps réel on va placer une écoute. Pour ça on va )-s'abonner à un évènement qui est le nom du chat
  subscription = pusher.subscribe(params.chatData.chatName);
  //en 2)si on a bien souscrit au nom du chat, alors on "grant" la souscription et une fonction de callback est lancé pour récupérer les nouveaux flux de msgs
  subscription.bind("pusher:subscription_succeeded", () => {
    subscription.bind("message", handleReceiveMessage);
  });
})();

//ce useEffect contient un return qui s'exécute lors de la desctruction du composant
return () => {
  subscription.unsubscribe(params.chatData.chatName);
  fetch(`http://${IPAdress}:3000/chats/leaveChat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chatName: params.chatData.chatName,
      username: user.username,
    }),
  });
};
  }, [isFocused]);

  //ici data = payload du msg
  const handleReceiveMessage = (data) => {
    setMessages((messages) => [...messages, data]);
  };
//envoi d'un message
  const handleSendMessage = () => {
    if (!messageText) {
      return;
    }
//payload envoyé au backend = msg envoyé au backend
    const payload = {
      text: messageText,//iput saisi par l'utilisateur 
      username: user.username,
      createdAt: new Date(),
      id: Math.floor(Math.random() * 100000),//id de chaque message généré car pusher demande un id par message (à voir pokoi ??)
    };
//on post le message en DB et à pusher
    fetch(`http://${IPAdress}:3000/chats/message`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chatName: params.chatData.chatName,
        payload: payload,
      }),
    });
//puis on vide l'état MessageText
    setMessageText("");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.banner}>
        <MaterialIcons
          name="keyboard-backspace"
          color="#ffffff"
          size={24}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.greetingText}> {params.chatData.friend} :wave:</Text>
      </View>

  <View style={styles.inset}>
    <ScrollView
      style={styles.scroller}
      ref={scrollViewRef}
      onContentSizeChange={() =>
        scrollViewRef.current.scrollToEnd({ animated: true })
      }
    >
      {messages.map((message, i) => (
        <View
          key={i}
          style={[
            styles.messageWrapper,
            {
              ...(message.username === params.chatData.friend
                ? styles.messageSent
                : styles.messageRecieved),
            },
          ]}
        >
          <View
            style={[
              styles.message,
              {
                ...(message.username === user.username
                  ? styles.messageSentBg
                  : styles.messageRecievedBg),
              },
            ]}
          >
            <Text style={styles.messageText}>{message.text}</Text>
          </View>
          <Text style={styles.timeText}>
            {new Date(message.createdAt).getHours()}:
            {String(new Date(message.createdAt).getMinutes()).padStart(
              2,
              "0"
            )}
          </Text>
        </View>
      ))}
    </ScrollView>

    <View style={styles.inputContainer}>
      <TextInput
        onChangeText={(value) => setMessageText(value)}
        value={messageText}
        style={styles.input}
        autoFocus
      />
      <TouchableOpacity
        onPress={() => handleSendMessage()}
        style={styles.sendButton}
      >
        <MaterialIcons name="send" color="#ffffff" size={24} />
      </TouchableOpacity>
    </View>
  </View>
</KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#000",
  },
  inset: {
    flex: 1,
    backgroundColor: "#ffffff",
    width: "100%",
    paddingTop: 20,
    position: "relative",
    borderTopColor: "#CE2174",
    borderTopWidth: 4,
  },
  banner: {
    width: "100%",
    height: "10%",
    paddingLeft: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  greetingText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 15,
  },
  message: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingRight: 20,
    paddingLeft: 20,
    borderRadius: 24,
    alignItems: "flex-end",
    justifyContent: "center",
    maxWidth: "65%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6.41,
    elevation: 1.2,
  },
  messageWrapper: {
    alignItems: "flex-end",
    marginBottom: 20,
  },
  messageRecieved: {
    alignSelf: "flex-end",
    alignItems: "flex-end",
  },
  messageSent: {
    alignSelf: "flex-start",
    alignItems: "flex-start",
  },
  messageSentBg: {
    backgroundColor: "#ffad99",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6.41,
    elevation: 5,
  },
  messageRecievedBg: {
    backgroundColor: "#d6fff9",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6.41,
    elevation: 2,
  },
  messageText: {
    color: "#506568",
    fontWeight: "400",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6.41,
  },
  timeText: {
    color: "#506568",
    opacity: 0.5,
    fontSize: 10,
    marginTop: 2,
  },
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    justifySelf: "flex-end",
    alignContent: "flex-start",
    marginBottom: 30,
    marginTop: "auto",
    background: "transparent",
    paddingLeft: 20,
    paddingRight: 20,
  },
  input: {
    backgroundColor: "#f0f0f0",
    width: "60%",
    padding: 14,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6.41,
    elevation: 1.2,
  },
  sendButton: {
    borderRadius: 50,
    padding: 16,
    backgroundColor: "#CE2174",
    marginLeft: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6.41,
    elevation: 1.2,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "800",
    textTransform: "uppercase",
  },
  scroller: {
    paddingLeft: 20,
    paddingRight: 20,
  },
});