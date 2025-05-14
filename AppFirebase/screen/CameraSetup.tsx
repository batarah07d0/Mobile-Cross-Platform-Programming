import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import * as MediaLibrary from "expo-media-library";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
// Import mediaService at the top
import { savePhoto } from "../services/mediaService";

// Interface untuk props CameraSetup
interface CameraSetupProps {
  onCapture: (uri: string) => void;
  onClose: () => void;
}

// Komponen CameraSetup yang asli
export default function CameraSetup({ onCapture, onClose }: CameraSetupProps) {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        if (typeof onCapture === "function") {
          onCapture(photo.uri);
          onClose();
        } else {
          console.error("onCapture is not a function", onCapture);
          Alert.alert("Error", "Failed to capture image: handler not defined");
        }
      } catch (error) {
        console.error("Error taking picture:", error);
      }
    }
  };

  return (
    <View style={styles.CameraContainer}>
      <CameraView ref={cameraRef} style={styles.camera} facing={facing} />
      <View style={[styles.topControls, { position: "absolute" }]}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.text}>✕</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.buttonContainer, { position: "absolute" }]}>
        <TouchableOpacity
          style={styles.flipButton}
          onPress={toggleCameraFacing}
        >
          <Text style={styles.text}>Flip</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
          <View style={styles.captureCircle}></View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Interface for navigation prop
interface NavigationProps {
  navigation: any; // Ideally should be typed more specifically
}

// Komponen CameraScreen untuk digunakan dalam navigasi
export function CameraScreen({ navigation }: NavigationProps) {
  const [uri, setUri] = useState("");
  const [showCamera, setShowCamera] = useState(false);
  const [mediaPermission, requestMediaPermission] =
    MediaLibrary.usePermissions();
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [savingToCloud, setSavingToCloud] = useState(false);
  // Request permissions when component mounts
  useEffect(() => {
    const setupPermissions = async () => {
      // Request media library permissions if not already granted
      if (!mediaPermission) {
        await requestMediaPermission();
      }

      // Request location permissions
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Location permission not granted");
      }
    };

    setupPermissions();
  }, []);

  // Get current location when needed
  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return null;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
      return loc;
    } catch (error) {
      console.error("Error getting location:", error);
      return null;
    }
  };

  const openCamera = () => {
    console.log("Opening camera...");
    setShowCamera(true);
  };

  const closeCamera = () => {
    setShowCamera(false);
  };

  const handleCapture = (imageUri) => {
    console.log("Image captured:", imageUri);
    setUri(imageUri);
    closeCamera();
  };

  // Tambahkan fungsi openImagePicker yang dipindahkan dari HomeScreen
  const openImagePicker = async () => {
    console.log("Opening image picker...");

    try {
      // Request media library permissions
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert(
          "Permission Required",
          "You need to grant gallery permissions to select images"
        );
        return;
      }

      // Launch the image library
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log("Image picker result:", result);

      if (!result.canceled && result.assets && result.assets.length > 0) {
        // Handle the selected image based on Expo SDK version
        const selectedUri = result.assets[0].uri;
        console.log("Selected image URI:", selectedUri);
        setUri(selectedUri);
      } else {
        console.log("Image selection cancelled");
      }
    } catch (error) {
      console.error("Error opening image picker:", error);
      Alert.alert("Error", "Failed to open gallery: " + error.message);
    }
  };

  const saveImage = async () => {
    if (!uri) {
      Alert.alert("Error", "No image to save");
      return;
    }

    // Check for media library permissions
    if (!mediaPermission || !mediaPermission.granted) {
      const permission = await requestMediaPermission();
      if (!permission.granted) {
        Alert.alert(
          "Permission Required",
          "Storage permission is needed to save images"
        );
        return;
      }
    }

    try {
      // Step 1: Simpan gambar ke Media Library
      const asset = await MediaLibrary.createAssetAsync(uri);

      // Step 2: Buat atau gunakan album "Pictures"
      // Ambil daftar album yang ada
      const albums = await MediaLibrary.getAlbumsAsync();
      const picturesAlbum = albums.find((album) => album.title === "Pictures");

      if (picturesAlbum) {
        // Jika album Pictures sudah ada, tambahkan asset ke sana
        await MediaLibrary.addAssetsToAlbumAsync([asset], picturesAlbum, false);
        console.log("Added to existing Pictures album");
      } else {
        // Jika tidak ada, buat album baru bernama "Pictures"
        await MediaLibrary.createAlbumAsync("Pictures", asset, false);
        console.log("Created new Pictures album");
      }

      Alert.alert("Success", "Image saved to Pictures folder!");
    } catch (error) {
      console.error("Error saving image:", error);
      Alert.alert("Error", "Failed to save image: " + error.message);
    }
  };

  // New function to save to Supabase
  const saveToSupabase = async () => {
    if (!uri) {
      Alert.alert("Error", "No image to save");
      return;
    }

    try {
      setSavingToCloud(true);

      // Get current location if we don't have it yet
      const currentLocation = location || (await getCurrentLocation());

      // Save photo and location to Supabase
      const savedPhoto = await savePhoto(uri, currentLocation);

      console.log("Saved to Supabase:", savedPhoto);
      Alert.alert(
        "Saved to Cloud",
        "Image and location data successfully saved to Supabase!"
      );
    } catch (error) {
      console.error("Error saving to Supabase:", error);
      Alert.alert("Error", "Failed to save to cloud: " + error.message);
    } finally {
      setSavingToCloud(false);
    }
  };

  // Render camera jika showCamera adalah true
  if (showCamera) {
    return <CameraSetup onCapture={handleCapture} onClose={closeCamera} />;
  }
  // Tampilan utama CameraScreen dengan tambahan tombol Gallery
  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Batara Hotdo Horas Simbolon - 00000078626
      </Text>
      <View style={styles.buttonGroup}>
        <Button title="Open Camera" onPress={openCamera} />
        <Button title="Open Gallery" onPress={openImagePicker} />
        <Button title="Save Image" onPress={saveImage} disabled={!uri} />
        <Button
          title={savingToCloud ? "Saving to Supabase..." : "Save to Supabase"}
          onPress={saveToSupabase}
          disabled={!uri || savingToCloud}
        />
      </View>

      {uri ? (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri }}
            style={styles.previewImage}
            resizeMode="contain"
          />
          {savingToCloud && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color="#f4511e" />
              <Text style={styles.loadingText}>Uploading to Supabase...</Text>
            </View>
          )}
        </View>
      ) : (
        <Text style={styles.noImageText}>No image captured/selected yet!</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  CameraContainer: {
    flex: 1,
    width: "100%",
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  buttonContainer: {
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    backgroundColor: "transparent",
    padding: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  topControls: {
    top: 40,
    left: 20,
    zIndex: 10,
  },
  closeButton: {
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  flipButton: {
    alignItems: "center",
    padding: 10,
  },
  captureButton: {
    borderWidth: 3,
    borderColor: "white",
    borderRadius: 35,
    padding: 3,
  },
  captureCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "white",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
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
  imageContainer: {
    marginTop: 20,
    width: "100%",
    height: 350,
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ddd",
    position: "relative",
  },
  previewImage: {
    width: "100%",
    height: "100%",
  },
  noImageText: {
    marginTop: 30,
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "white",
    marginTop: 10,
    fontSize: 16,
  },
});
