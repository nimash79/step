import { StyleSheet, TextInput, View } from "react-native";

import ErrorIcon from "../Icons/ErrorIcon";
import CustomText from "./CustomText";

const CustomInput = ({
  placeholder,
  icon,
  height = 48,
  containerStyle,
  onChangeText,
  inputStyle,
  error = false,
  ...props
}) => {
  return (
    <View style={{ marginBottom: 12 }}>
      <View
        style={[
          styles.container,
          {
            height,
            justifyContent: icon ? "flex-end" : "center",
            borderColor: error ? "#C30000" : "#DFDFDF",
          },
          containerStyle,
        ]}
      >
        <View style={styles.icon}>{icon}</View>
        <TextInput
          placeholder={placeholder}
          style={
            icon
              ? [styles.input, inputStyle]
              : [styles.inputWithoutIcon, inputStyle]
          }
          onChangeText={onChangeText}
          {...props}
        />
      </View>
      {/* <View style={[styles.error, { opacity: error ? 1 : 0 }]}>
        <ErrorIcon />
        <CustomText style={styles.errorText} fontStyle="bold">
          پر کردن این فیلد الزامی است!
        </CustomText>
      </View> */}
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    borderColor: "#DFDFDF",
    borderWidth: 1,
    borderRadius: 8,
  },
  input: {
    width: "74%",
    height: "100%",
    alignSelf: "flex-end",
    fontFamily: "peyda",
    marginRight: "8%",
  },
  inputWithoutIcon: {
    fontFamily: "peyda",
    marginLeft: "8%",
  },
  icon: {
    position: "absolute",
    top: "26.7%",
    left: "8%",
  },
  error: {
    flexDirection: "row",
    marginTop: 4,
  },
  errorText: {
    color: "#C30000",
    fontSize: 10,
    marginLeft: 4,
    bottom: 2,
  },
});
