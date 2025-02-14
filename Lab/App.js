import { StatusBar, StyleSheet, View } from "react-native";
import LabW02 from "./LabW02";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <LabW02 />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#ffff",
    // alignItems: "center",
    // justifyContent: "center",
  },
});
