import React from "react";
import { ScrollView, View } from "react-native";
import { Avatar, Card, Paragraph, Title } from "react-native-paper"; // Mengimpor komponen React Native Paper
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./App.styles.js";
import userData from "./data.json"; // Mengimpor data pengguna

// Fungsi untuk mengambil gambar lokal berdasarkan nama file
const localImage = (imageName) => {
  const imageMap = {
    "Axel.jpg": require("./assets/profile_image/Axel.jpg"),
    "Batara.jpg": require("./assets/profile_image/Batara.jpg"),
    "Dikes.jpg": require("./assets/profile_image/Dikes.jpg"),
    "Efri.jpg": require("./assets/profile_image/Efri.jpg"),
    "Gepe.jpg": require("./assets/profile_image/Gepe.jpg"),
  };

  return imageMap[imageName] || require("./assets/profile_image/Default.jpg"); // Gambar default jika tidak ditemukan
};

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {userData.map((users) => {
          const isUrl = users.photo_url.startsWith("http");

          return (
            <Card style={styles.card} key={users.name}>
              <Card.Content style={styles.cardContent}>
                <Avatar.Image
                  size={80}
                  source={
                    isUrl
                      ? { uri: users.photo_url }
                      : localImage(users.photo_url)
                  }
                  style={styles.avatar}
                />
                <View style={styles.textContainer}>
                  <Title style={styles.title}>{users.name}</Title>
                  <Paragraph style={styles.paragraph}>{users.email}</Paragraph>
                </View>
              </Card.Content>
            </Card>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
