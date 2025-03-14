import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
    padding: 20,
  },
  header: {
    marginTop: 40,
    marginBottom: 30,
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
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  resetButton: {
    backgroundColor: "#ff6b6b",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignSelf: "center",
    marginTop: 20,
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
  footer: {
    marginTop: "auto",
    padding: 20,
    alignItems: "center",
  },
  footerText: {
    color: "#aaa",
    fontSize: 12,
  },
});

export default styles;
