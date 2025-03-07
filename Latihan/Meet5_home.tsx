import { NavigationProp } from "@react-navigation/native";
import React from "react";
import { Button, Text, View } from "react-native";

const Meet5_home = ({ navigation }: { navigation: NavigationProp<any> }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Ini Adalah Halaman Home!</Text>
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate("Profile")}
      ></Button>
    </View>
  );
};

export default Meet5_home;
