import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import FormPage from "./screens/FormPage";
import PostPage from "./screens/PostPage";
import { getPosts } from "./services/axios";

const Stack = createNativeStackNavigator();

export default function App() {
  const getAllPosts = () => {
    getPosts()
      .then((res) => {
        if (res.status === 200) {
          console.log("Posts loaded successfully!");
        }
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PostPage">
        <Stack.Screen
          name="PostPage"
          component={PostPage}
          options={{ title: "Posts" }}
        />
        <Stack.Screen
          name="FormPage"
          component={FormPage}
          options={{ title: "Edit Post" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
