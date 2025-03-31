import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Avatar, Card } from "react-native-paper";

// Fungsi untuk mengambil gambar lokal berdasarkan nama file
const localImage = (imageName) => {
  const imageMap = {
    "Axel.jpg": require("./assets/profile_image/Axel.jpg"),
    "Batara.jpg": require("./assets/profile_image/Batara.jpg"),
    "Dikes.jpg": require("./assets/profile_image/Dikes.jpg"),
    "Efri.jpg": require("./assets/profile_image/Efri.jpg"),
    "Gepe.jpg": require("./assets/profile_image/Gepe.jpg"),
  };

  return imageMap[imageName] || require("./assets/profile_image/Default.jpg");
};

const Profile = ({ navigation, route }) => {
  // Mengambil parameter data pengguna yang diteruskan dari screen sebelumnya
  const { userName, photo_url, email, bio } = route.params;

  // Memeriksa apakah photo_url adalah URL atau nama file lokal
  const isUrl = photo_url && photo_url.startsWith("http");

  return (
    <View style={profileStyles.container}>
      <Card style={profileStyles.profileCard}>
        <View style={profileStyles.headerContainer}>
          <Text style={profileStyles.profileTitle}>{userName}'s Profile</Text>
        </View>

        <View style={profileStyles.profileContent}>
          <Avatar.Image
            size={100}
            source={isUrl ? { uri: photo_url } : localImage(photo_url)}
            style={profileStyles.avatarImage}
          />

          <View style={profileStyles.infoContainer}>
            <View style={profileStyles.infoRow}>
              <Text style={profileStyles.infoLabel}>Name:</Text>
              <Text style={profileStyles.infoValue}>{userName}</Text>
            </View>

            <View style={profileStyles.infoRow}>
              <Text style={profileStyles.infoLabel}>Email:</Text>
              <Text style={profileStyles.infoValue}>{email}</Text>
            </View>

            <View style={profileStyles.biodataContainer}>
              <Text style={profileStyles.infoLabel}>Biodata:</Text>
              <Text style={profileStyles.biodataText}>"{bio}"</Text>
            </View>
          </View>
        </View>
      </Card>

      <TouchableOpacity
        style={profileStyles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={20} color="white" />
        <Text style={profileStyles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

// Creating a specific style for Profile screen to match the image shown
const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  profileCard: {
    borderRadius: 15,
    padding: 10,
    elevation: 4,
    backgroundColor: "white",
    marginBottom: 20,
  },
  headerContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    paddingBottom: 10,
    marginBottom: 15,
  },
  profileTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  profileContent: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 10,
  },
  avatarImage: {
    marginRight: 20,
    borderWidth: 3,
    borderColor: "#2196F3",
    backgroundColor: "#e1e1e1",
  },
  infoContainer: {
    flex: 1,
  },
  infoRow: {
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: "#333",
  },
  biodataContainer: {
    marginTop: 5,
  },
  biodataText: {
    fontSize: 15,
    fontStyle: "italic",
    color: "#333",
    lineHeight: 22,
  },
  backButton: {
    backgroundColor: "#2196F3",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignSelf: "flex-end",
  },
  backButtonText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 8,
    fontSize: 16,
  },
});

export default Profile;
