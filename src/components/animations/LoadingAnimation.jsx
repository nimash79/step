import LoadingIcon from "../../components/Icons/LoadingIcon";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";

const LoadingAnimation = () => {
  const rotate = useSharedValue("0deg");
  useEffect(() => {
    rotate.value = withRepeat(withTiming("-360deg", { duration: 1000 }), -1);
    return () => rotate.value = "0deg";
  }, []);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: rotate.value }],
    };
  });
  return (
    <Animated.View style={animatedStyle}>
      <LoadingIcon />
    </Animated.View>
  );
};

export default LoadingAnimation;
