import React from "react";
import { Button, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./authSlice";

const MainScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const datauser = useSelector((state) => state.auth.user);

  const klikBtnLogin = () => {
    dispatch(login({ userId: "123", email: "test@email.com", role: "admin" }));
  };
  const klikBtnLogout = () => {
    dispatch(logout());
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {datauser ? (
        <Text>User Id: {datauser.email}</Text>
      ) : (
        <Text>Belum Login</Text>
      )}

      <Button title="Login" onPress={klikBtnLogin} />
      <Button title="Logout" onPress={klikBtnLogout} />
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate("Profile")}
      />
    </View>
  );
};

export default MainScreen;
