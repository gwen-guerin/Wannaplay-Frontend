import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import SearchTags from "./searchPages/SearchTags";
import SearchUser from "./searchPages/SearchUser";
import SearchTeacher from "./searchPages/SearchTeacher";

import { StyleSheet, Dimensions, TextInput, View } from "react-native";

const Stack = createNativeStackNavigator();

const Tab = createMaterialTopTabNavigator();

const SearchNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: "#ec6e5b",
        tabBarInactiveTintColor: "#335561",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Users" component={SearchUser} />
      <Tab.Screen name="Tags" component={SearchTags} />
      <Tab.Screen name="Teachers" component={SearchTeacher} />
    </Tab.Navigator>
  );
};

export default function SearchPage() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      style={styles.navigator}
    >
      <Stack.Screen name="SearchNavigator" component={SearchNavigator} />
    </Stack.Navigator>
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
});
