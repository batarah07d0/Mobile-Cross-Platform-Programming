import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Meet4_1 = () => {
  return (
    <View style={styles.background}>
      <TouchableOpacity>
        <Text style={styles.backBtn}>{"< Home"}</Text>
      </TouchableOpacity>
      <Text style={styles.headerName}>Profile</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: "lightgreen",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    padding: 20,
  },
  headerName: {
    color: "black",
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
  },
  backBtn: {
    color: "black",
    fontWeight: "bold",
  },
});

export default Meet4_1;
