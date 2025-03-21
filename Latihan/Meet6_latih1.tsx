import { Picker } from "@react-native-picker/picker";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { StyleSheet, Switch, Text, TextInput, View } from "react-native";

const Meet6_latih1 = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(
    "Pilih Bahasa Pemograman Kamu!"
  );
  const [isEnabled, setIsEnabled] = useState(false);
  const [show, setShow] = useState(false);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const TampilData = ({ nama, umur }) => {
    return (
      <View>
        <Text>Nama : {nama}</Text>
        <Text>Umur : {umur}</Text>
      </View>
    );
  };

  TampilData.propTypes = {
    nama: PropTypes.string,
    umur: PropTypes.number,
  };

  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <Text>Ini Page Meet 6 Latihan 1!!</Text>
      <TampilData nama="Budi" umur={10} />
      <TextInput
        style={Meet6_styles.input}
        placeholder="Nama Kamu"
        keyboardType="default"
        returnKeyType="send"
      />
      <TextInput
        style={Meet6_styles.input}
        placeholder="Umur Kamu"
        keyboardType="numeric"
      />
      <TextInput
        style={Meet6_styles.input}
        placeholder="Email Kamu"
        keyboardType="email-address"
      />
      <TextInput
        style={Meet6_styles.input}
        placeholder="Phone"
        keyboardType="phone-pad"
      />
      <TextInput
        style={Meet6_styles.input}
        placeholder="Url"
        keyboardType="url"
      />
      <TextInput
        style={Meet6_styles.input}
        placeholder="Password"
        keyboardType="visible-password"
      />
      <Picker
        style={{ width: 150, marginTop: 10 }}
        selectedValue={selectedLanguage}
        onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
      >
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
        <Picker.Item label="Python" value="python" />
        <Picker.Item label="C++" value="cpp" />
        <Picker.Item label="C#" value="csharp" />
      </Picker>

      <Switch
        style={{ width: 150, marginTop: 10 }}
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={true ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor={"#3e3e3e"}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />

      {/* <View style={{ marginTop: 10 }}>
        <Button title="Show Date Picker" onPress={() => setShow(true)} />
      </View> */}
      {/* <RNDateTimePicker mode="date" value={new Date()} display="spinner" /> */}
    </View>
  );
};

const Meet6_styles = StyleSheet.create({
  input: {
    borderColor: "black",
    borderWidth: 2,
    width: 200,
    // height: 30,
    marginTop: 10,
    textAlign: "center",
  },
});

export default Meet6_latih1;
