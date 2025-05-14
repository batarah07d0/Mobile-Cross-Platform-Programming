import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { getLocations, getPhotos } from "../services/mediaService";

const Maps = () => {
  const [locations, setLocations] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);

      // Get locations and photos with coordinates
      const [locationsData, photosData] = await Promise.all([
        getLocations(),
        getPhotos(),
      ]);

      // Filter photos to only include those with coordinates
      const photosWithLocation = photosData.filter(
        (photo) =>
          photo.latitude !== null &&
          photo.longitude !== null &&
          !isNaN(photo.latitude) &&
          !isNaN(photo.longitude)
      );

      // Filter locations to only include those with valid coordinates
      const validLocations = locationsData.filter(
        (loc) =>
          loc.latitude !== null &&
          loc.longitude !== null &&
          !isNaN(loc.latitude) &&
          !isNaN(loc.longitude)
      );

      setLocations(validLocations);
      setPhotos(photosWithLocation);
      setError(null);
    } catch (err) {
      console.error("Error loading map data:", err);
      setError("Failed to load location data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Calculate initial region based on all markers
  const getInitialRegion = () => {
    // Create arrays of valid coordinates
    const allMarkers = [
      ...locations.map((loc) => ({ lat: loc.latitude, lng: loc.longitude })),
      ...photos.map((photo) => ({ lat: photo.latitude, lng: photo.longitude })),
    ].filter(
      (marker) =>
        marker.lat !== null &&
        marker.lng !== null &&
        !isNaN(marker.lat) &&
        !isNaN(marker.lng)
    );

    if (allMarkers.length === 0) {
      // Default to Jakarta, Indonesia if no markers
      return {
        latitude: -6.2,
        longitude: 106.816666,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
    }

    // Calculate the bounding box for all markers
    const lats = allMarkers.map((marker) => marker.lat);
    const lngs = allMarkers.map((marker) => marker.lng);

    // Handle potential edge cases
    if (lats.length === 0 || lngs.length === 0) {
      return {
        latitude: -6.2,
        longitude: 106.816666,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
    }

    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);

    // Calculate center point
    const centerLat = (minLat + maxLat) / 2;
    const centerLng = (minLng + maxLng) / 2; // Fixed: was using minLat instead of minLng

    // Calculate appropriate deltas
    const latDelta = (maxLat - minLat) * 1.5 || 0.0922;
    const lngDelta = (maxLng - minLng) * 1.5 || 0.0421;

    return {
      latitude: centerLat,
      longitude: centerLng,
      latitudeDelta: latDelta,
      longitudeDelta: lngDelta,
    };
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#f4511e" />
        <Text style={styles.loadingText}>Loading map data...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={getInitialRegion()}>
        {/* Render location markers */}
        {locations.map((location, index) => (
          <Marker
            key={`loc_${location.id || index}`}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            pinColor="blue"
            title={`Location recorded`}
            description={`${new Date(location.timestamp).toLocaleString()}`}
          />
        ))}

        {/* Render photo markers */}
        {photos.map((photo, index) => (
          <Marker
            key={`photo_${photo.id || index}`}
            coordinate={{
              latitude: photo.latitude,
              longitude: photo.longitude,
            }}
            pinColor="red"
            title={`Photo taken`}
            description={`${new Date(photo.created_at).toLocaleString()}`}
          />
        ))}
      </MapView>

      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendMarker, { backgroundColor: "blue" }]} />
          <Text>Location</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendMarker, { backgroundColor: "red" }]} />
          <Text>Photo</Text>
        </View>
      </View>

      <View style={styles.header}>
        <Text style={styles.headerText}>
          Batara Hotdo Horas Simbolon - 00000078626
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
  header: {
    position: "absolute",
    top: 10,
    alignSelf: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  headerText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  legend: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  legendMarker: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
});

export default Maps;
