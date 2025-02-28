import { StyleSheet } from "react-native";

// Definisikan warna sendiri untuk menggantikan Colors dari React Native Paper
const Colors = {
  white: "#FFFFFF",
  black: "#000000",
  grey100: "#f2f2f2", // Warna latar belakang lembut
  grey700: "#616161", // Warna teks abu-abu
  blue500: "#2196F3", // Warna biru untuk tombol dan border
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.grey100, // Latar belakang lebih lembut
    paddingTop: 10,
  },
  scrollView: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  card: {
    marginBottom: 15,
    borderRadius: 16,
    backgroundColor: Colors.white,
    elevation: 6, // Efek bayangan lebih kuat
    shadowColor: "#000", // Warna bayangan
    shadowOffset: { width: 0, height: 2 }, // Posisi bayangan
    shadowOpacity: 0.1, // Transparansi bayangan
    shadowRadius: 10, // Ukuran bayangan
    overflow: "hidden", // Untuk menutupi elemen di luar radius
  },
  cardContent: {
    flexDirection: "row", // Avatar dan teks disusun secara horizontal
    alignItems: "center", // Vertikal tengah
    padding: 16,
  },
  avatar: {
    marginRight: 16,
    borderWidth: 3,
    borderColor: Colors.blue500, // Menambahkan border pada avatar
    borderRadius: 50,
    transform: [{ scale: 1.1 }], // Sedikit pembesaran pada avatar untuk efek hover
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.black,
  },
  paragraph: {
    fontSize: 14,
    color: Colors.grey700,
  },
  button: {
    marginTop: 10,
    backgroundColor: Colors.blue500, // Tombol dengan warna biru
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignSelf: "flex-start", // Letakkan tombol di kiri
    elevation: 2,
  },
  buttonText: {
    color: Colors.white,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default styles;
