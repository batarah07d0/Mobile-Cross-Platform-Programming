import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";
import CameraSetup from "./CameraSetup";

export default function App() {
  const [uri, setUri] = useState("");
  const [showCamera, setShowCamera] = useState(false);
  const [mediaPermission, requestMediaPermission] =
    MediaLibrary.usePermissions();

  useEffect(() => {
    // Request media permissions when component mounts
    if (!mediaPermission) {
      requestMediaPermission();
    }
  }, []);

  const openCamera = () => {
    setShowCamera(true);
  };

  const closeCamera = () => {
    setShowCamera(false);
  };

  const handleCapture = (imageUri) => {
    setUri(imageUri);
    closeCamera();
  };

  if (showCamera) {
    return <CameraSetup onCapture={handleCapture} onClose={closeCamera} />;
  }

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

      if (!result.canceled) {
        // Handle the selected image based on Expo SDK version
        const selectedUri = result.assets ? result.assets[0].uri : result.uri;
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

  return (
    <View style={styles.container}>
      <Text>Batara Hotdo Horas Simbolon - 00000078626</Text>
      <Button title="Open Camera" onPress={openCamera} />
      <Button title="Open Gallery" onPress={openImagePicker} />
      <Button title="Create File" onPress={saveImage} disabled={!uri} />
      {uri ? (
        <Image
          source={{ uri }}
          style={{ width: 200, height: 200, marginTop: 20 }}
          resizeMode="contain"
        />
      ) : (
        <Text style={{ marginTop: 20 }}>No image selected</Text>
      )}

      <StatusBar style="auto" />
    </View>
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
