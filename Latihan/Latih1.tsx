import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Latih1 = () => {
  return (
    <>
      <View
        style={{
          backgroundColor: "red",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Inline Styling!</Text>
      </View>

      <View
        style={{
          backgroundColor: "blue",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.textSaya}>StyleSheet Objects!</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  textSaya: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Latih1;
