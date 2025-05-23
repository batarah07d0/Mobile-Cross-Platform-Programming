// supabaseOperationsTracker.js - Module to track Supabase operations
import * as Notifications from "expo-notifications";

// Store for operation counts
const operationCounts = {
  photos: { successful: 0, unsuccessful: 0 },
  locations: { successful: 0, unsuccessful: 0 },
};

// Store active notification IDs
const activeNotifications = {
  photos: null,
  locations: null,
};

// Record an operation result
export const recordOperation = async (operationType, isSuccessful) => {
  // Update counts
  if (isSuccessful) {
    operationCounts[operationType].successful += 1;
  } else {
    operationCounts[operationType].unsuccessful += 1;
  }

  // Show notification with updated counts
  await showOperationNotification(operationType);

  return operationCounts[operationType];
};

// Reset counts for a specific operation type
export const resetCounts = async (operationType) => {
  operationCounts[operationType] = { successful: 0, unsuccessful: 0 };

  // Dismiss notification if it exists
  if (activeNotifications[operationType]) {
    try {
      await Notifications.dismissNotificationAsync(
        activeNotifications[operationType]
      );
    } catch (error) {
      console.log("Error dismissing notification:", error);
    }
    activeNotifications[operationType] = null;
  }
};

// Show operation notification with current counts
const showOperationNotification = async (operationType) => {
  try {
    const counts = operationCounts[operationType];

    // Dismiss previous notification if exists
    if (activeNotifications[operationType]) {
      try {
        await Notifications.dismissNotificationAsync(
          activeNotifications[operationType]
        );
      } catch (error) {
        // Ignore errors for non-existent notifications
      }
    }

    // Format operation type for display (capitalize first letter)
    const formattedType =
      operationType.charAt(0).toUpperCase() + operationType.slice(1);

    // Schedule new notification
    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: `Supabase ${formattedType} Operations`,
        body: `${counts.successful} successful, ${counts.unsuccessful} unsuccessful`,
        data: { operationType, counts },
      },
      trigger: null, // Show immediately
    });

    // Save notification ID
    activeNotifications[operationType] = notificationId;
  } catch (error) {
    console.error("Error showing operation notification:", error);
  }
};

// Get current counts
export const getCounts = (operationType) => {
  return { ...operationCounts[operationType] };
};

// Show notifications for all operation types
export const showAllNotifications = async () => {
  for (const operationType of Object.keys(operationCounts)) {
    await showOperationNotification(operationType);
  }
};

// Manually display a notification for a specific operation type
export const showNotification = async (operationType) => {
  if (operationType in operationCounts) {
    await showOperationNotification(operationType);
    return true;
  }
  return false;
};
