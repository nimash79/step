import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import { COLORS } from "../../utils/constants";

const CustomButton = ({ text, onClick, outline, style, textStyle, disabled }) => {
  return (
    <TouchableWithoutFeedback onPress={onClick} disabled={disabled}>
      <View
        style={[!outline ? styles.container : styles.transparent, style]}
      >
        <Text style={[(outline ? styles.transparentText : styles.text), textStyle]}>
          {text}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 56,
  },
  transparent: {
    backgroundColor: COLORS.neutral_f9,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 14,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 56,
  },
  text: {
    color: "#fff",
    fontFamily: "peyda",
    fontSize: 16,
  },
  transparentText: {
    color: COLORS.primary,
    fontFamily: "peyda",
    fontSize: 16,
  },
});
