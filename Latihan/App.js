import { StyleSheet, Text, View } from "react-native";
import Latih1 from "./Latih1";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.expenseItem} key="1">
        <Text style={styles.title}>Alfamart</Text>
        <Text style={styles.details}>Amount: Rp 30.000,00</Text>
        <Text style={styles.details}>Category: Food</Text>
        <Text style={styles.details}>Date: 2 January 2024</Text>
      </View>
      <Latih1 />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#ffff",
  },
  expenseItem: {
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    paddingBottom: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  details: {
    color: "gray",
  },
});
