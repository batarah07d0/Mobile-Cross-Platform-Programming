// SupabaseOperationsContext.js - Tracks success and failure counts of Supabase operations
import * as Notifications from "expo-notifications";
import React, { createContext, useContext, useState } from "react";

// Create context
const SupabaseOperationsContext = createContext();

// Custom hook to use the context
export const useSupabaseOperations = () => {
  const context = useContext(SupabaseOperationsContext);
  if (!context) {
    throw new Error(
      "useSupabaseOperations must be used within a SupabaseOperationsProvider"
    );
  }
  return context;
};

// Provider component
export const SupabaseOperationsProvider = ({ children }) => {
  // Track operations by operation type
  const [operations, setOperations] = useState({
    photos: { successful: 0, unsuccessful: 0, lastUpdated: null },
    locations: { successful: 0, unsuccessful: 0, lastUpdated: null },
  });

  // Track active notification IDs
  const [activeNotifications, setActiveNotifications] = useState({
    photos: null,
    locations: null,
  });

  // Function to record operation result
  const recordOperation = (operationType, isSuccessful) => {
    setOperations((prev) => {
      const updated = {
        ...prev,
        [operationType]: {
          successful: isSuccessful
            ? prev[operationType].successful + 1
            : prev[operationType].successful,
          unsuccessful: isSuccessful
            ? prev[operationType].unsuccessful
            : prev[operationType].unsuccessful + 1,
          lastUpdated: new Date(),
        },
      };

      // Show notification with updated counts
      showOperationNotification(operationType, updated[operationType]);

      return updated;
    });
  };

  // Function to reset counts for an operation type
  const resetCounts = (operationType) => {
    setOperations((prev) => ({
      ...prev,
      [operationType]: {
        successful: 0,
        unsuccessful: 0,
        lastUpdated: new Date(),
      },
    }));

    // Dismiss notification if exists
    if (activeNotifications[operationType]) {
      Notifications.dismissNotificationAsync(
        activeNotifications[operationType]
      ).catch((error) => console.log("Error dismissing notification:", error));

      setActiveNotifications((prev) => ({
        ...prev,
        [operationType]: null,
      }));
    }
  };

  // Function to show operation notification
  const showOperationNotification = async (operationType, counts) => {
    try {
      // Dismiss previous notification if exists
      if (activeNotifications[operationType]) {
        await Notifications.dismissNotificationAsync(
          activeNotifications[operationType]
        ).catch(() => {
          /* Ignore errors for non-existent notifications */
        });
      }

      // Schedule new notification
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: `Supabase ${operationType} operations`,
          body: `${counts.successful} successful, ${counts.unsuccessful} unsuccessful`,
          data: { operationType, counts },
          autoDismiss: false,
        },
        trigger: null, // Show immediately
      });

      // Save notification ID
      setActiveNotifications((prev) => ({
        ...prev,
        [operationType]: notificationId,
      }));
    } catch (error) {
      console.error("Error showing operation notification:", error);
    }
  };

  // Value provided by the context
  const value = {
    operations,
    recordOperation,
    resetCounts,
  };

  return (
    <SupabaseOperationsContext.Provider value={value}>
      {children}
    </SupabaseOperationsContext.Provider>
  );
};

export default SupabaseOperationsContext;
