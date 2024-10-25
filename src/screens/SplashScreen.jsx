import { StyleSheet, View } from "react-native";

import CustomText from "../components/Shared/CustomText";
import SplashIcon from "../components/Icons/SplashIcon";
import { useEffect } from "react";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";

const SplashScreen = () => {
  const opacity = useSharedValue(1);
  useEffect(() => {
    const intervalId = setInterval(() => {
      opacity.value =
        opacity.value === 1
          ? withTiming(0, { duration: 1000 })
          : withTiming(1, { duration: 1000 });
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);
  return (
    <View style={styles.container}>
      <View>
        <Animated.View style={{ opacity }}>
          <SplashIcon />
        </Animated.View>
        <CustomText fontStyle="bold" style={styles.text}>
          استِپ
        </CustomText>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7B61FF",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#FFFFFF",
    fontSize: 40,
    marginTop: 4,
  },
});
