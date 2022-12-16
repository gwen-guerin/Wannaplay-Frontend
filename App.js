<<<<<<< HEAD
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Home from "./screens/Home";
import UniversPage from "./screens/UniversPage";
import ProfileScreen from "./screens/ProfileScreen";
import user from "./reducers/user";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import Questions2 from "./screens/Questions2";
import { NativeBaseProvider } from "native-base";
import ChatsList from "./screens/ChatsList";
import ChatScreen from "./screens/ChatScreen";
import SearchPage from "./screens/SearchPage";
=======
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Home from './screens/Home';
import ProfileScreen from './screens/ProfileScreen';
import UniversPage from './screens/UniversPage'
import user from './reducers/user';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import Questions from './screens/Questions';
import { NativeBaseProvider } from 'native-base';
import ChatsList from './screens/ChatsList';
import ChatScreen from './screens/ChatScreen';

>>>>>>> 1b507ab12810d1043b46732c61df78257894b740
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
          } else if (route.name === "Univers") {
            iconName = "home";
          } else if (route.name === "Chats") {
            iconName = "wechat";
          } else if (route.name === "Search") {
            iconName = "compass";
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: "#ec6e5b",
        tabBarInactiveTintColor: "#335561",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Univers" component={UniversPage} />
      <Tab.Screen name="Profil" component={ProfileScreen} />
      <Tab.Screen name="Chats" component={ChatsList} />
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
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </NativeBaseProvider>
  );
}
