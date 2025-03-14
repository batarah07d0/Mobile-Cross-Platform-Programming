import React from "react";
import { Text, TextInput, View } from "react-native";

const NumberInput = ({
  nim,
  onChangeText,
}: {
  nim: string;
  onChangeText: (text: string) => void;
}) => {
  console.log("NIM Changed:", nim);
  return (
    <View>
      <Text>NIM</Text>
      <TextInput
        placeholder="Enter your NIM!"
        style={{
          borderColor: "black",
          borderWidth: 1,
          padding: 10,
          borderRadius: 8,
        }}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default NumberInput;
