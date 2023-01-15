import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import SearchTags from "./searchPages/SearchTags";
import SearchUser from "./searchPages/SearchUser";
import SearchTeacher from "./searchPages/SearchTeacher";

import { StyleSheet, View } from "react-native";

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

const SearchNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: "#CE2174",
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
    <View style={styles.tabNavigatorContainer}>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        style={styles.navigator}
      >
        <Stack.Screen name="SearchNavigator" component={SearchNavigator} />
      </Stack.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  navigator: {
    borderBottomColor: "#ec6e5b",
  },
  tabNavigatorContainer: {
    flex: 1,
    marginTop: "5%",
    backgroundColor: "white",
  },
});
