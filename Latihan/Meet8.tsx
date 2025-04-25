import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";

const Meet8 = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts/1")
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Failed to load data");
        setLoading(false);
      });
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={{ color: "red" }}>{error}</Text>
      ) : data ? (
        <>
          <Text>User ID: {data.userId}</Text>
          <Text>ID: {data.id}</Text>
          <Text>Title: {data.title}</Text>
          <Text>Body: {data.body}</Text>
        </>
      ) : (
        <Text>No data available</Text>
      )}
    </View>
  );
};

export default Meet8;
