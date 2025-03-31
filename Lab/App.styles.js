import { StyleSheet } from "react-native";

// Definisikan warna sendiri untuk menggantikan Colors dari React Native Paper
const Colors = {
  white: "#FFFFFF",
  black: "#000000",
  grey100: "#f2f2f2", // Warna latar belakang lembut
  grey200: "#e0e0e0", // Warna border
  grey700: "#616161", // Warna teks abu-abu
  blue500: "#2196F3", // Warna biru untuk tombol dan border
  textPrimary: "#333333", // Warna teks utama
  textSecondary: "#555555", // Warna teks sekunder
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.grey100,
    padding: 20,
  },
  safeArea: {
    flex: 1,
    backgroundColor: Colors.grey100,
    paddingTop: 10,
  },
  scrollView: {
    paddingHorizontal: 15,
    paddingVertical: 15,
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
    padding: 8,
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
    marginStart: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.textPrimary,
    marginBottom: 10,
    textAlign: "left",
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
    alignSelf: "flex-end", // Letakkan tombol di kanan
    elevation: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: Colors.white,
    fontWeight: "bold",
    textAlign: "center",
    marginLeft: 8,
  },
  // Tambahan untuk profil
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  text: {
    fontSize: 16,
    color: Colors.textPrimary,
    marginBottom: 10,
  },
  profileHeader: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey200,
    paddingBottom: 10,
    marginBottom: 15,
    width: "100%",
  },
});

export default styles;
