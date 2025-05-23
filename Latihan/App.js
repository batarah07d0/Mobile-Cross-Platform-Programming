import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet } from "react-native";
import { Provider } from "react-redux";
import MainScreen from "./MainScreen";
import Meet5_profile from "./Meet5_profile";
import { store } from "./store";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <StackNavigation />;
    </Provider>
  );
}

const DrawerNavigation = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        {/* <Drawer.Screen name="Home" component={Meet5_home} />
        <Drawer.Screen name="Meet6_latih1" component={Meet6_latih1} />
        <Drawer.Screen name="Meet7_latih1" component={Meet7_latih1} />
        <Drawer.Screen name="Meet8" component={Meet8} /> */}
        <Drawer.Screen name="MainScreen" component={MainScreen} />
        <Drawer.Screen name="Profile" component={Meet5_profile} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const BottomNavigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Meet5_home} />
        <Tab.Screen name="Profile" component={Meet5_profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Drawer.Screen name="MainScreen" component={MainScreen} />
        <Drawer.Screen name="Profile" component={Meet5_profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FFF",
    alignItems: "center",
  },
});
