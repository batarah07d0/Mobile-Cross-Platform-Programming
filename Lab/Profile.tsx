import React from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

interface IProfile {
  name: string;
  displayName: string;
  displayAge: number;
  count: number;
  setName: (name: string) => void;
  handleIncrement: () => void;
  handleDecrement: () => void;
  onPassValue: () => void;
}

const Profile: React.FC<IProfile> = ({
  name,
  displayName,
  displayAge,
  count,
  setName,
  onPassValue,
  handleIncrement,
  handleDecrement,
}) => {
  return (
    <View style={styles.profileContainer}>
      <Text style={styles.greeting}>
        Hallo, nama ku adalah {displayName || "Guest"}!
      </Text>
      <Text style={styles.age}>Umur ku adalah {displayAge} tahun!</Text>

      <TextInput
        value={name}
        style={styles.input}
        placeholder="Masukkan Nama Anda"
        onChangeText={setName}
      />

      <Text style={styles.counterText}>Counter: {count}</Text>

      <View style={styles.buttonContainer}>
        <Button title="Pass Value" onPress={onPassValue} />
        <View style={styles.marginTop}>
          <Button title="Increment" onPress={handleIncrement} />
        </View>
        <View style={styles.marginTop}>
          <Button title="Decrement" onPress={handleDecrement} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  greeting: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  age: {
    fontSize: 16,
    color: "#555",
    marginVertical: 5,
  },
  input: {
    height: 40,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  counterText: {
    fontSize: 18,
    color: "#333",
    marginVertical: 10,
  },
  buttonContainer: {
    width: "80%",
  },
  marginTop: {
    marginTop: 10,
  },
});

export default Profile;
