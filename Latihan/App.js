import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import Meet5_home from "./Meet5_home";
import Meet5_profile from "./Meet5_profile";
import Meet6_latih1 from "./Meet6_latih1";
import Meet7_latih1 from "./Meet7_latih1";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  // return <DefaultNavigation />;
  // return <BottomNavigation />;
  return <DrawerNavigation />;
}

const DrawerNavigation = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={Meet5_home} />
        <Drawer.Screen name="Profile" component={Meet5_profile} />
        <Drawer.Screen name="Meet6_latih1" component={Meet6_latih1} />
        <Drawer.Screen name="Meet7_latih1" component={Meet7_latih1} />
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

const DefaultNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Meet5_home} />
        <Stack.Screen name="Profile" component={Meet5_profile} />
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
