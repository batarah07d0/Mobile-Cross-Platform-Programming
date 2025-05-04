import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import "react-native-gesture-handler";

// Import screen components
import { CameraScreen } from "./CameraSetup";
import Geolocation from "./Geolocation";
import Maps from "./Maps";

// Create drawer navigator
const Drawer = createDrawerNavigator();

export default function App() {
  console.log("App rendering, setting up navigator...");

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Camera"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          drawerActiveTintColor: "#f4511e",
          drawerLabelStyle: {
            fontSize: 16,
          },
        }}
      >
        <Drawer.Screen
          name="Camera"
          component={CameraScreen}
          options={{
            title: "Camera",
            drawerLabel: "Camera",
          }}
        />
        <Drawer.Screen
          name="Maps"
          component={Maps}
          options={{
            title: "Maps",
            drawerLabel: "Maps",
          }}
        />
        <Drawer.Screen
          name="Geolocation"
          component={Geolocation}
          options={{
            title: "Geolocation",
            drawerLabel: "Geolocation",
          }}
        />
      </Drawer.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingHorizontal: 20,
  },
});
