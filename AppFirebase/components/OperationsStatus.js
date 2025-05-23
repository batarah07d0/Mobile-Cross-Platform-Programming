// OperationsStatus.js - A component to display current operation counts
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  getCounts,
  showAllNotifications,
} from "../services/supabaseOperationsTracker";

const OperationsStatus = () => {
  const [photoStats, setPhotoStats] = useState({
    successful: 0,
    unsuccessful: 0,
  });
  const [locationStats, setLocationStats] = useState({
    successful: 0,
    unsuccessful: 0,
  });

  // Update the stats every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setPhotoStats(getCounts("photos"));
      setLocationStats(getCounts("locations"));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const refreshNotifications = async () => {
    await showAllNotifications();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Supabase Operations Status</Text>

      <View style={styles.statsRow}>
        <Text style={styles.label}>Photos:</Text>
        <Text style={styles.stat}>✅ {photoStats.successful}</Text>
        <Text style={styles.stat}>❌ {photoStats.unsuccessful}</Text>
      </View>

      <View style={styles.statsRow}>
        <Text style={styles.label}>Locations:</Text>
        <Text style={styles.stat}>✅ {locationStats.successful}</Text>
        <Text style={styles.stat}>❌ {locationStats.unsuccessful}</Text>
      </View>

      <TouchableOpacity
        style={styles.refreshButton}
        onPress={refreshNotifications}
      >
        <Text style={styles.refreshButtonText}>Refresh Notifications</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  label: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: "#555",
  },
  stat: {
    flex: 1,
    fontSize: 16,
  },
  refreshButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  refreshButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default OperationsStatus;
