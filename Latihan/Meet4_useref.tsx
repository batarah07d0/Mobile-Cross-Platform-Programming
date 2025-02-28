import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useRef, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Meet4_useref = () => {
  const angka = useRef(0);
  const [nilai, setNilai] = useState(0);

  const tambah = () => {
    angka.current++;
    console.log("Angka Sekarang: " + angka.current);
  };

  const tampilkanAngka = () => {
    setNilai(angka.current);
  };

  return (
    <View style={styles.container}>
      <Text>useRef Example</Text>
      <TouchableOpacity onPress={tambah} style={styles.button}>
        <Ionicons name="add-circle" size={30} color="white" />
        <Text style={{ textAlign: "center" }}>Tambah Angka</Text>
      </TouchableOpacity>
      <Text>Angka: {nilai}</Text>
      <Button title="Munculin Angka useRef" onPress={tampilkanAngka} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    gap: 5,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    borderRadius: 5,
    backgroundColor: "#4994ec",
  },
});
export default Meet4_useref;
