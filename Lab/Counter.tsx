import React from "react";
import { Button, View } from "react-native";

interface ICounter {
  value: number;
  handleIncrement: () => void;
  handleDecrement: () => void;
}

const Counter: React.FC<ICounter> = ({
  value,
  handleIncrement,
  handleDecrement,
}) => {
  return (
    <View>
      <Button title="Increment" onPress={handleIncrement} />
      <Button title="Decrement" onPress={handleDecrement} />
    </View>
  );
};

export default Counter;
