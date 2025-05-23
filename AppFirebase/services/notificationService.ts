import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

// Configure notifications behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

// Request permissions for notifications
export const requestNotificationsPermissions = async () => {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "Default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  const { status } = await Notifications.requestPermissionsAsync();
  return status;
};

// Show success notification with location data
export const showSuccessNotification = async (
  title: string,
  body: string,
  latitude?: number,
  longitude?: number
) => {
  let notificationBody = body;

  // Include location data in notification if available
  if (latitude !== undefined && longitude !== undefined) {
    notificationBody += `\nLatitude: ${latitude.toFixed(
      6
    )}\nLongitude: ${longitude.toFixed(6)}`;
  }

  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body: notificationBody,
      data: { latitude, longitude },
    },
    trigger: null, // Show immediately
  });
};

// Show error notification with location data if available
export const showErrorNotification = async (
  title: string,
  body: string,
  latitude?: number,
  longitude?: number
) => {
  let notificationBody = body;

  // Include location data in notification if available
  if (latitude !== undefined && longitude !== undefined) {
    notificationBody += `\nLatitude: ${latitude.toFixed(
      6
    )}\nLongitude: ${longitude.toFixed(6)}`;
  }

  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body: notificationBody,
      data: { latitude, longitude },
    },
    trigger: null, // Show immediately
  });
};
