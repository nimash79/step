import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import CustomText from "./CustomText";

const CustomLink = ({
  children,
  style,
  onClick,
  fontStyle = "medium",
  withoutUnderlay = false,
  ...props
}) => {
  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <View>
        <CustomText
          style={withoutUnderlay ? [styles.text, {textDecorationLine: "none"}, style] : [styles.text, style]}
          fontStyle={fontStyle}
          {...props}
        >
          {children}
        </CustomText>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CustomLink;

const styles = StyleSheet.create({
  text: {
    color: "#482ECC",
    textDecorationLine: "underline"
  },
});
