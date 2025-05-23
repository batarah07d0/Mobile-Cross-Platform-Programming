import { NavigationProp } from "@react-navigation/native";
import React from "react";
import { Button, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./authSlice";

const Meet5_profile = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const datauser = useSelector((state: any) => state.auth.user);
  const dispatch = useDispatch();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {datauser ? (
        <>
          <Text>User Email: {datauser.email}</Text>
          <Text>User Id: {datauser.userId}</Text>
          <Text>User Role: {datauser.role}</Text>
          <Button title="Logout" onPress={() => dispatch(logout())} />
        </>
      ) : (
        <Text>No user data available</Text>
      )}
    </View>
  );
};

export default Meet5_profile;
