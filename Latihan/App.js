import { StyleSheet, View } from "react-native";
import Meet4_1 from "./Meet4_1";
import Meet4_card from "./Meet4_card";
import Meet4_useref from "./Meet4_useref";

export default function App() {
  return (
    <View style={styles.container}>
      <Meet4_1 />
      <Meet4_card
        textJudul="Card 1"
        textIsi="INI ISI TEXT CARD 1. Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, pariatur! Similique assumenda sint velit rerum fugiat delectus eius atque, error ea voluptatibus consequatur aut perspiciatis quo. Quasi maxime sint nemo!"
        warnaBg="red"
      />
      <Meet4_card
        textJudul="Card 2"
        textIsi="INI ISI TEXT CARD 2. Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, pariatur! Similique assumenda sint velit rerum fugiat delectus eius atque, error ea voluptatibus consequatur aut perspiciatis quo. Quasi maxime sint nemo!"
      />
      <Meet4_useref />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
  },
});
