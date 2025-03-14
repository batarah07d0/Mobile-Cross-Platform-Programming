import React, { useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Input from "./Input";

export default function App() {
  const [name, setName] = useState("");
  const [nim, setNim] = useState("");
  const [students, setStudents] = useState([]);

  const handleChangeName = (value) => {
    setName(value);
  };

  const handleChangeNim = (value) => {
    // Additional safety check at the App level
    const numericValue = value.replace(/[^0-9]/g, "");
    setNim(numericValue);
  };

  const handleReset = () => {
    setName("");
    setNim("");
  };

  const handleAddStudent = () => {
    if (name.trim() && nim.trim()) {
      // Add new student to the list
      setStudents([...students, { name, nim, id: Date.now().toString() }]);

      // Clear input fields
      setName("");
      setNim("");
    }
  };

  const handleDeleteStudent = (id) => {
    // Filter out the student with the matching id
    setStudents(students.filter((student) => student.id !== id));
  };

  return (
    <View style={appStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f7fa" />

      <View style={appStyles.header}>
        <Text style={appStyles.headerTitle}>Student Registration</Text>
      </View>

      <Input
        name={name}
        nim={nim}
        onChangeName={handleChangeName}
        onChangeNim={handleChangeNim}
      />

      <View style={appStyles.buttonContainer}>
        <TouchableOpacity
          style={appStyles.addButton}
          onPress={handleAddStudent}
          activeOpacity={0.8}
          disabled={!name.trim() || !nim.trim()}
        >
          <Text style={appStyles.addButtonText}>Add Student</Text>
        </TouchableOpacity>
      </View>

      {students.length > 0 && (
        <View style={appStyles.listContainer}>
          <Text style={appStyles.listTitle}>Registered Students</Text>
          <ScrollView style={appStyles.scrollView}>
            {students.map((student) => (
              <View key={student.id} style={appStyles.studentCard}>
                <View style={appStyles.studentInfo}>
                  <Text style={appStyles.studentName}>
                    {student.name} - {student.nim}
                  </Text>
                </View>
                <TouchableOpacity
                  style={appStyles.deleteButton}
                  onPress={() => handleDeleteStudent(student.id)}
                >
                  <Text style={appStyles.deleteButtonText}>✕</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const appStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
    padding: 20,
  },
  header: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  headerLine: {
    width: 50,
    height: 4,
    backgroundColor: "#4a90e2",
    borderRadius: 2,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  addButton: {
    backgroundColor: "#4a90e2",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginHorizontal: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  resetButton: {
    backgroundColor: "#ff6b6b",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginHorizontal: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  resetButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  listContainer: {
    marginTop: 30,
    flex: 1,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  scrollView: {
    flex: 1,
  },
  studentCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  studentNim: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  deleteButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#ff6b6b",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});
