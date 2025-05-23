import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import "react-native-gesture-handler";

// Import screen components
import { CameraScreen } from "./screen/CameraSetup"; // Changed to import the named export
import Geolocation from "./screen/Geolocation";
import Maps from "./screen/Maps";

// Import notifications setup
import { requestNotificationsPermissions } from "./services/notificationService";
import { showAllNotifications } from "./services/supabaseOperationsTracker";

// Import SupabaseOperationsContext provider
import { SupabaseOperationsProvider } from "./context/SupabaseOperationsContext";

// Create drawer navigator
const Drawer = createDrawerNavigator();

export default function App() {
  console.log("App rendering, setting up navigator...");

  // Setup notifications
  useEffect(() => {
    const setupNotifications = async () => {
      // Request permissions
      const status = await requestNotificationsPermissions();
      console.log("Notification permission status:", status);

      if (status === "granted") {
        // Show initial notifications
        await showAllNotifications();
      }
    };

    setupNotifications();
  }, []);

  return (
    <SupabaseOperationsProvider>
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
            component={CameraScreen} // Changed to use CameraScreen
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
    </SupabaseOperationsProvider>
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
