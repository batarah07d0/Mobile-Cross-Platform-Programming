import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

const Maps = () => {
  const [lokasi, setLokasi] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        // Request location permission
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          setError("Permission to access location was denied");
          Alert.alert(
            "Location Permission Denied",
            "Please enable location services to use the map features"
          );
          setLoading(false);
          return;
        }

        // Get current position
        const loc = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Highest,
        });

        console.log("Location obtained:", loc);

        // Update location state with proper format
        setLokasi({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });

        setLoading(false);
      } catch (err) {
        console.error("Error getting location:", err);
        setError("Failed to get location");
        setLoading(false);
        Alert.alert("Error", "Failed to get your location");
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading map...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <MapView
          style={styles.map}
          initialRegion={lokasi}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
          <Marker
            coordinate={{
              latitude: lokasi.latitude,
              longitude: lokasi.longitude,
            }}
            title={"Lokasi Saya"}
            description={"Ini adalah lokasi Anda saat ini"}
          />
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    color: "#555",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
});

export default Maps;
