// ResetOperationsButton.js - A button component to reset operation counts
import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity } from "react-native";
import {
  resetCounts,
  showAllNotifications,
} from "./services/supabaseOperationsTracker";

const ResetOperationsButton = ({ operationType = null }) => {
  const handleReset = async () => {
    try {
      if (operationType) {
        // Reset specific operation type
        await resetCounts(operationType);
        Alert.alert(
          "Reset Complete",
          `${operationType} operation counts have been reset.`
        );
      } else {
        // Reset all operation types
        await resetCounts("photos");
        await resetCounts("locations");
        Alert.alert("Reset Complete", "All operation counts have been reset.");
      }

      // Show updated notifications
      await showAllNotifications();
    } catch (error) {
      console.error("Error resetting operation counts:", error);
      Alert.alert("Error", "Failed to reset operation counts.");
    }
  };

  const confirmReset = () => {
    const message = operationType
      ? `Are you sure you want to reset the ${operationType} operation counts?`
      : "Are you sure you want to reset all operation counts?";

    Alert.alert("Confirm Reset", message, [
      { text: "Cancel", style: "cancel" },
      { text: "Reset", onPress: handleReset, style: "destructive" },
    ]);
  };

  return (
    <TouchableOpacity style={styles.button} onPress={confirmReset}>
      <Text style={styles.buttonText}>
        {operationType ? `Reset ${operationType} Counts` : "Reset All Counts"}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#f4511e",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ResetOperationsButton;
