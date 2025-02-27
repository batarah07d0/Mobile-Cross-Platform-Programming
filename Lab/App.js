import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Profile from "./Profile";

export default function App() {
  const [count, setCount] = useState(0); // untuk umur, set awal 20
  const [name, setName] = useState(""); // untuk nama
  const [displayName, setDisplayName] = useState(""); // untuk nama yang ditampilkan
  const [displayAge, setDisplayAge] = useState(0); // untuk umur yang ditampilkan

  const handleIncrement = () => {
    if (displayName && displayAge >= 0) {
      setCount((prevCount) => prevCount + 1); // Increment umur
    }
  };

  const handleDecrement = () => {
    if (displayName && displayAge > 0) {
      setCount((prevCount) => prevCount - 1); // Decrement umur
    }
  };

  const handlePassValue = () => {
    if (name.trim() === "") {
      console.log("Please enter a valid name");
      return; // Prevent passing empty name
    }

    // Setelah tombol Pass Value ditekan, set nilai displayName dan displayAge
    setDisplayName(name);
    setDisplayAge(count);
    console.log("Name and Age Passed:", { name, count });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile and Age Counter!</Text>
      <Profile
        name={name}
        setName={setName}
        count={count}
        displayName={displayName}
        displayAge={displayAge}
        onPassValue={handlePassValue}
        handleIncrement={handleIncrement}
        handleDecrement={handleDecrement}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
});
