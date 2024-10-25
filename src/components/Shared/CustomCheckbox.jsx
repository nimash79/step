import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import Svg, { Path } from "react-native-svg";

const CustomCheckbox = ({
  style,
  value,
  onValueChange,
  customHandler = false,
  ...props
}) => {
  return (
    <TouchableWithoutFeedback
      onPress={customHandler ? onValueChange : () => onValueChange((v) => !v)}
    >
      <View
        style={
          !value
            ? styles.container
            : [styles.container, { backgroundColor: "#8871FF" }]
        }
      >
        {value && (
          <Svg
            width={8}
            height={6}
            viewBox="0 0 8 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ alignSelf: "center" }}
          >
            <Path
              d="M1.627 3l1.582 1.582 3.164-3.164"
              stroke="#F9F9F9"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CustomCheckbox;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderColor: "#CBCBCB",
    borderWidth: 1,
    width: 16,
    height: 16,
    borderRadius: 5,
    justifyContent: "center",
  },
});
