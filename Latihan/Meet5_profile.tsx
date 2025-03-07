import { NavigationProp } from "@react-navigation/native";
import React from "react";
import { Button, Text, View } from "react-native";

const Meet5_profile = ({ navigation }: { navigation: NavigationProp<any> }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Ini Adalah Halaman Profile!</Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate("Home")}
      ></Button>
    </View>
  );
};

export default Meet5_profile;
