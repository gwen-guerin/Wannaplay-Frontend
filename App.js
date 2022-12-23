import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Home from "./screens/Home";
import ProfileScreen from "./screens/ProfileScreen";
import user from "./reducers/user";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { NativeBaseProvider } from "native-base";
import Chats from "./screens/Chats";
import ChatScreen from "./screens/ChatScreen";
import SearchPage from "./screens/SearchPage";
import Questions from "./screens/Questions";
import UpdateProfile from "./screens/UpdateProfile";
import ConcertScreen from "./screens/ConcertScreen";
import FriendProfile from "./screens/FriendProfile";
import { LogBox } from "react-native";

LogBox.ignoreAllLogs();

const store = configureStore({
  reducer: { user },
});

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "";
          if (route.name === "Profil") {
            iconName = "user";
          } else if (route.name === "Concert") {
            iconName = "home";
          } else if (route.name === "Chats") {
            iconName = "wechat";
          } else if (route.name === "Search") {
            iconName = "compass";
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: "#CE2174",
        tabBarInactiveTintColor: "#335561",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Profil" component={ProfileScreen} />
      <Tab.Screen name="Concert" component={ConcertScreen} />
      <Tab.Screen name="Chats" component={Chats} />
      <Tab.Screen name="Search" component={SearchPage} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NativeBaseProvider>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen name="Questions" component={Questions} />
            <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
            <Stack.Screen
              name="FriendProfile"
              component={FriendProfile}
              getId={({ params }) => params.username}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </NativeBaseProvider>
  );
}
