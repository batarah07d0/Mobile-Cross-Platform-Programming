import React, { useEffect, useState } from "react";
import { Dimensions, Platform, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const Meet7_latih1 = () => {
  const { width: widthScreen, height: heightScreen } = Dimensions.get("window");
  const [orientationInfo, setOrientationInfo] = useState("Portrait");
  const posXtiming = useSharedValue(-200);
  const posXspring = useSharedValue(200);

  const AnimasiStyle2 = useAnimatedStyle(() => ({
    transform: [{ translateX: posXspring.value }],
  }));

  const AnimasiStyle1 = useAnimatedStyle(() => ({
    transform: [{ translateX: posXtiming.value }],
  }));

  useEffect(() => {
    const orientationChanged = ({ window: { width, height } }) => {
      setOrientationInfo(width < height ? "Portrait" : "Landscape");
    };

    // Store the subscription returned by addEventListener.
    const subscription = Dimensions.addEventListener(
      "change",
      orientationChanged
    );

    // Start your animations.
    posXtiming.value = withTiming(0, { duration: 1000 });
    posXspring.value = withSpring(0, { damping: 10, stiffness: 100 });

    // Cleanup the subscription on unmount.
    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Testing Meet 7</Text>
      <Text>Width: {widthScreen}</Text>
      <Text>Height: {heightScreen}</Text>
      <Text>Orientation: {orientationInfo}</Text>
      <Animated.Text style={AnimasiStyle1}>
        Your OS: {Platform.OS}
      </Animated.Text>
      <Animated.Text style={AnimasiStyle2}>
        Android Version {Platform.Version}
      </Animated.Text>
    </View>
  );
};

export default Meet7_latih1;
