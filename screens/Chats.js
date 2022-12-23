import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import { View } from "react-native";
import { StyleSheet } from "react-native";

import ChatsFriends from "./chatPages/ChatsFriends";
import ChatsList from "./chatPages/ChatsList";

const Stack = createNativeStackNavigator();

const Tab = createMaterialTopTabNavigator();

const ChatsNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: "#ec6e5b",
        tabBarInactiveTintColor: "#335561",
        headerShown: false,
      })}
    >
      <Tab.Screen name="All" component={ChatsList} />
      <Tab.Screen name="Friends" component={ChatsFriends} />
    </Tab.Navigator>
  );
};

export default function Chats() {
  return (
    <View style={styles.tabNavigatorContainer}>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        style={styles.navigator}
      >
        <Stack.Screen name="ChatsNavigator" component={ChatsNavigator} />
      </Stack.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  navigator: {
    borderBottomColor: "#ec6e5b",
  },
  tabNavigatorContainer: {
    flex: 1,
    marginTop: "10%",
    backgroundColor: "white",
  },
});
