import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

interface InputProps {
  name: string;
  nim: string;
  onChangeName: (text: string) => void;
  onChangeNim: (text: string) => void;
}

const Input = ({ name, nim, onChangeName, onChangeNim }: InputProps) => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.card}>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Name</Text>
          <View style={styles.inputRow}>
            <TextInput
              placeholder="Enter your name!"
              value={name}
              style={styles.input}
              onChangeText={onChangeName}
            />
          </View>
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.label}>NIM</Text>
          <View style={styles.inputRow}>
            <TextInput
              placeholder="Enter your NIM!"
              value={nim}
              style={styles.input}
              onChangeText={onChangeNim}
              keyboardType="numeric"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 10,
  },
  inputWrapper: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
    letterSpacing: 0.5,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    height: 46,
    width: 46,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  icon: {
    fontSize: 20,
  },
  input: {
    flex: 1,
    borderColor: "#e0e0e0",
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    fontSize: 14,
    backgroundColor: "#fafafa",
    color: "#333",
  },
  divider: {
    height: 1,
    backgroundColor: "#f0f0f0",
    marginVertical: 15,
  },
});

export default Input;
