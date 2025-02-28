import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Meet4_card = ({ textJudul, textIsi, warnaBg }) => {
  return (
    <View style={[styles.background, { backgroundColor: warnaBg }]}>
      <Text style={styles.judul}>{textJudul}</Text>
      <Text style={styles.text}>{textIsi}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: "gray",
    width: "90%",
    padding: 20,
    margin: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  judul: {
    color: "white",
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    color: "white",
    textAlign: "justify",
  },
});

export default Meet4_card;
