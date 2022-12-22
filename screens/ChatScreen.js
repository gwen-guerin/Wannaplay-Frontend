import { useEffect, useState } from "react";
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

const pusher = new Pusher('2ea678f34e1d48f32f22', { cluster: 'eu' });

export default function ChatScreen({ navigation, route: { params } }) {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const user = useSelector((state) => state.user.value);

  // const isFocused = useIsFocused
  let subscription;
  useEffect(() => {
    (() => {
      fetch(`http://${IPAdress}:3000/chats/joinChat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chatName: params.chatData.chatName,
          username: user.username,
        }),
      });
      fetch(`http://${IPAdress}:3000/chats/allMessages/${params.chatData.chatName}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.result)
            setMessages(data.messages)
        });
      subscription = pusher.subscribe(params.chatData.chatName);
      subscription.bind("pusher:subscription_succeeded", () => {
        console.log("binded");
        subscription.bind("message", handleReceiveMessage);
      });
    })();

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
  }, []);

  const handleReceiveMessage = (data) => {
    console.log("yes", data);
    // setMessages([data])
    setMessages((messages) => [...messages, data]);
  };

  const handleSendMessage = () => {
    if (!messageText) {
      return;
    }

    const payload = {
      text: messageText,
      username: user.username,
      createdAt: new Date(),
      id: Math.floor(Math.random() * 100000),
    };

    fetch(`http://${IPAdress}:3000/chats/message`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chatName: params.chatData.chatName,
        payload: payload,
      }),
    });

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
        <Text style={styles.greetingText}> {params.chatData.friend} 👋</Text>
      </View>

      <View style={styles.inset}>
        <ScrollView style={styles.scroller}>
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
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: "#ffffff",
    width: "100%",
    paddingTop: 20,
    position: "relative",
    borderTopColor: "#ffe099",
    borderLeftColor: "#ffe099",
    borderRightColor: "#ffe099",
    borderTopWidth: 4,
    borderRightWidth: 0.1,
    borderLeftWidth: 0.1,
  },
  banner: {
    width: "100%",
    height: "15%",
    paddingTop: 20,
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
  },
  messageRecievedBg: {
    backgroundColor: "#d6fff9",
  },
  messageText: {
    color: "#506568",
    fontWeight: "400",
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
  recordButton: {
    borderRadius: 50,
    padding: 16,
    backgroundColor: "#ff5c5c",
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
  sendButton: {
    borderRadius: 50,
    padding: 16,
    backgroundColor: "#ffe099",
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
