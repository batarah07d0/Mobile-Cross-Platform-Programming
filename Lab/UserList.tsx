import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Avatar, Card, Paragraph, Title } from "react-native-paper";
import Animated, { FadeInUp } from "react-native-reanimated";
import styles from "./App.styles.js";
import userData from "./data.json";

// Create an animated version of Card
const AnimatedCard = Animated.createAnimatedComponent(Card);

// Fungsi untuk mengambil gambar lokal berdasarkan nama file
const localImage = (imageName: string) => {
  const imageMap = {
    "Axel.jpg": require("./assets/profile_image/Axel.jpg"),
    "Batara.jpg": require("./assets/profile_image/Batara.jpg"),
    "Dikes.jpg": require("./assets/profile_image/Dikes.jpg"),
    "Efri.jpg": require("./assets/profile_image/Efri.jpg"),
    "Gepe.jpg": require("./assets/profile_image/Gepe.jpg"),
  };

  return imageMap[imageName] || require("./assets/profile_image/Default.jpg");
};

const UserList = ({ navigation }: { navigation: any }) => {
  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      {userData.map((users, index) => {
        const isUrl = users.photo_url.startsWith("http");

        // Calculate a delay based on the index
        const delay = 200 + index * 150;

        return (
          <AnimatedCard
            style={styles.card}
            key={users.name}
            entering={FadeInUp.delay(delay).springify()}
          >
            <Card.Content>
              <TouchableOpacity
                style={styles.cardContent}
                onPress={() =>
                  navigation.navigate("Profile", {
                    userName: users.name,
                    photo_url: users.photo_url,
                    email: users.email,
                    bio: users.bio,
                  })
                }
              >
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
              </TouchableOpacity>
            </Card.Content>
          </AnimatedCard>
        );
      })}
    </ScrollView>
  );
};

export default UserList;
