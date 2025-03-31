import React from "react";
import { Button, Text, View } from "react-native";
import styles from "./App.styles";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: "bold", fontSize: 20, marginBottom: 10 }}>
        List of Users
      </Text>
      <Button
        title="User List"
        onPress={() => navigation.navigate("UserList")}
      />
    </View>
  );
};

export default HomeScreen;
