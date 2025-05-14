import { StatusBar } from "expo-status-bar";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { useEffect } from "react"; // Import useEffect from React
import { Button, StyleSheet, Text, View } from "react-native";
import app, { analytics, storage } from "./firebaseConfig"; // Import the Firebase app instance

export default function App() {
  const db = getFirestore(app);

  useEffect(() => {
    // Check Firebase
    console.log("Initializing Firebase", app.name);
    console.log("Firebase Analytics initialized", analytics);
    console.log("Firebase Firestore initialized", db);
    console.log("Firebase Storage initialized", storage);
  }, []);

  const addData = async () => {
    try {
      const docRef = await addDoc;
      collection(db, "users"),
        {
          firstName: "Batara",
          lastName: "Hotdo Horas Simbolon",
          born: "2004",
          timestamp: new Date(),
        };

      if (Platform.OS === "android") {
        console.log("Document written from phone with ID: ", docRef.id);
      } else {
        console.log("Document written with ID: ", docRef.id);
      }

      alert("Data berhasil ditambahkan!");
    } catch (error) {
      console.error("Error occured: ", error);
      alert("Gagal menambahkan data!");
    }
  };

  return (
    <View style={[styles.container, { gap: 5 }]}>
      <Text>
        Firebase {app.name} Status: {app ? "Berhasil inisialisasi" : "Gagal"}
      </Text>
      <Text>Isi Database {db.type}</Text>
      <Text>Storage {storage.maxOperationRetryTime}</Text>

      <Button title="Menambahkan data ke Firestore" onPress={addData} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
