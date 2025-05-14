import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";
import { StorageAccessFramework } from "expo-file-system";
import * as Location from "expo-location";
import * as Sharing from "expo-sharing";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { saveLocation } from "../services/mediaService";

// Kunci untuk menyimpan URI direktori yang dipilih
const DOWNLOAD_DIRECTORY_URI_KEY = "download_directory_uri";

// Define the location type to fix TypeScript errors
interface LocationType {
  coords: {
    longitude: number;
    latitude: number;
    accuracy: number | null;
    altitude: number | null;
    altitudeAccuracy?: number | null;
    heading?: number | null;
    speed?: number | null;
  };
  timestamp: number;
}

const Geolocation = () => {
  const [lokasi, setLokasi] = useState<LocationType | null>(null);
  const [downloadDirectoryUri, setDownloadDirectoryUri] = useState<
    string | null
  >(null);
  const [savingToCloud, setSavingToCloud] = useState(false);

  // Load direktori yang tersimpan saat komponen dimount
  useEffect(() => {
    (async () => {
      try {
        const savedUri = await AsyncStorage.getItem(DOWNLOAD_DIRECTORY_URI_KEY);
        if (savedUri) {
          setDownloadDirectoryUri(savedUri);
        }
      } catch (error) {
        console.error("Error loading saved directory:", error);
      }
    })();
  }, []);

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("permission not granted");
        Alert.alert("Permission Denied", "Location permission is required");
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      console.log(loc);
      setLokasi(loc);
    } catch (error) {
      console.log("Error getting location:", error);
      Alert.alert("Error", "Failed to get location");
    }
  };

  // Fungsi untuk meminta izin akses direktori
  const requestDirectoryPermission = async (forceNew = false) => {
    try {
      // Jika sudah ada direktori dan tidak dipaksa memilih baru
      if (downloadDirectoryUri && !forceNew) {
        return downloadDirectoryUri;
      }

      if (forceNew) {
        Alert.alert(
          "Pilih Folder",
          "Silakan pilih folder untuk menyimpan file lokasi Anda.",
          [{ text: "OK" }]
        );
      }

      // Minta izin direktori, defaultnya ke Downloads jika tersedia
      const permissions =
        await StorageAccessFramework.requestDirectoryPermissionsAsync(
          Platform.OS === "android"
            ? StorageAccessFramework.getUriForDirectoryInRoot("Download")
            : undefined
        );

      if (permissions.granted) {
        const uri = permissions.directoryUri;
        // Simpan URI untuk penggunaan berikutnya
        await AsyncStorage.setItem(DOWNLOAD_DIRECTORY_URI_KEY, uri);
        setDownloadDirectoryUri(uri);
        return uri;
      }

      return null;
    } catch (error) {
      console.error("Error requesting directory permission:", error);
      return null;
    }
  };

  // Fungsi untuk menyimpan file ke direktori yang dipilih
  const saveFileToDirectory = async (directoryUri, fileName, content) => {
    try {
      // Buat file di direktori yang dipilih
      const fileUri = await StorageAccessFramework.createFileAsync(
        directoryUri,
        fileName,
        "text/plain"
      );

      // Tulis konten ke file
      await FileSystem.writeAsStringAsync(fileUri, content, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      return true;
    } catch (error) {
      console.error("Error saving file to directory:", error);
      return false;
    }
  };
  const saveLocationToFile = async () => {
    if (!lokasi) {
      Alert.alert("Error", "No location data to save");
      return;
    }

    try {
      // 1. Create content for the file
      const content =
        `Longitude: ${lokasi.coords.longitude}\n` +
        `Latitude: ${lokasi.coords.latitude}\n` +
        `Batara Hotdo Horas Simbolon - 00000078626`;

      // 2. Generate filename with timestamp
      const timestamp = new Date().getTime();
      const fileName = `geolocation_${timestamp}.txt`;

      // 3. Dapatkan direktori untuk penyimpanan
      const directoryUri = await requestDirectoryPermission();

      if (directoryUri) {
        // 4. Simpan file ke direktori yang dipilih
        const saved = await saveFileToDirectory(
          directoryUri,
          fileName,
          content
        );

        if (saved) {
          Alert.alert(
            "Berhasil",
            `File ${fileName} berhasil disimpan ke folder yang dipilih.`
          );
        } else {
          throw new Error("Gagal menyimpan file ke direktori yang dipilih");
        }
      } else {
        // 5. Fallback ke penyimpanan internal + sharing jika izin tidak diberikan
        const filePath = `${FileSystem.documentDirectory}${fileName}`;
        await FileSystem.writeAsStringAsync(filePath, content);

        const isSharingAvailable = await Sharing.isAvailableAsync();
        if (isSharingAvailable) {
          await Sharing.shareAsync(filePath, {
            mimeType: "text/plain",
            dialogTitle: "Save Location Data (.txt)",
            UTI: "public.plain-text",
          });

          Alert.alert(
            "File Created",
            "Use the share option to save the .txt file to your preferred location."
          );
        } else {
          Alert.alert(
            "File Saved",
            `File saved in the app storage as ${fileName}. You can access it using a file manager app.`
          );
        }
      }
    } catch (error) {
      console.error("Failed to save file:", error);
      Alert.alert("Error", "Failed to save location data: " + error.message);
    }
  };
  // Fungsi untuk menyimpan lokasi ke Supabase
  const saveToSupabase = async () => {
    if (!lokasi) {
      Alert.alert("Error", "No location data to save");
      return;
    }

    try {
      setSavingToCloud(true);

      // Save location to Supabase using the imported saveLocation function
      const savedLocation = await saveLocation(lokasi);

      console.log("Saved location to Supabase:", savedLocation);
      Alert.alert(
        "Saved to Cloud",
        "Location data successfully saved to Supabase!"
      );
    } catch (error) {
      console.error("Error saving location to Supabase:", error);
      Alert.alert(
        "Error",
        "Failed to save to cloud: " + (error as Error).message
      );
    } finally {
      setSavingToCloud(false);
    }
  };

  // Fungsi untuk mengubah lokasi penyimpanan
  const changeSaveLocation = async () => {
    const newDirectoryUri = await requestDirectoryPermission(true);
    if (newDirectoryUri) {
      Alert.alert(
        "Lokasi Penyimpanan Diubah",
        "File lokasi akan disimpan ke folder yang baru dipilih."
      );
    } else {
      Alert.alert("Gagal", "Tidak dapat mengubah lokasi penyimpanan.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Batara Hotdo Horas Simbolon - 00000078626
      </Text>
      {lokasi && (
        <View style={styles.locationInfo}>
          <Text style={styles.locationText}>
            Longitude: {lokasi.coords.longitude.toFixed(7)}
          </Text>
          <Text style={styles.locationText}>
            Latitude: {lokasi.coords.latitude.toFixed(7)}
          </Text>
          {savingToCloud && (
            <View style={{ marginTop: 15, alignItems: "center" }}>
              <ActivityIndicator size="small" color="#f4511e" />
              <Text style={{ marginTop: 5, fontSize: 12 }}>
                Saving to Supabase...
              </Text>
            </View>
          )}
        </View>
      )}
      <View style={styles.buttonGroup}>
        <Button title="GET GEO LOCATION" onPress={getLocation} />
        <Button
          title="SAVE GEO LOCATION"
          onPress={saveLocationToFile}
          disabled={!lokasi}
        />
        <Button title="CHANGE SAVE LOCATION" onPress={changeSaveLocation} />
        <Button
          title={savingToCloud ? "SAVING TO SUPABASE..." : "SAVE TO SUPABASE"}
          onPress={saveToSupabase}
          disabled={!lokasi || savingToCloud}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    padding: 20,
  },
  header: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 10,
  },
  buttonGroup: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    gap: 10,
    marginBottom: 20,
  },
  locationInfo: {
    alignItems: "center",
    marginBottom: 10,
  },
  locationText: {
    fontSize: 15,
  },
});

export default Geolocation;
