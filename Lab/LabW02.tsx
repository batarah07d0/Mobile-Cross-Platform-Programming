import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

const LabW02 = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          source={require("./assets/IMG_20230506_020823.jpg")}
          style={styles.image}
        />
        <Text style={styles.textName}>Batara Hotdo Horas Simbolon</Text>
        <Text>00000078626</Text>
      </View>

      <View style={styles.container}>
        <Image
          source={require("./assets/IMG-20231117-WA0007.jpg")}
          style={styles.image}
        />
        <Text style={styles.textName}>Efri Ramadhan</Text>
        <Text>00000071242</Text>
      </View>

      <View style={styles.container}>
        <Image
          source={require("./assets/IMG_20221110_151240_onFire(Abhi).jpg")}
          style={styles.image}
        />
        <Text style={styles.textName}>Raphael Dikstra Satya Prameswara</Text>
        <Text>00000074566</Text>
      </View>

      <View style={styles.container}>
        <Image
          source={require("./assets/IMG_20221110_153028_onFire(Abhi).jpg")}
          style={styles.image}
        />
        <Text style={styles.textName}>Axel Reginald Wiranto</Text>
        <Text>00000077565</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#ffff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  textName: {
    fontWeight: "bold",
  },
  image: {
    width: 120,
    height: 150,
  },
});

export default LabW02;
