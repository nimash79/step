import { StyleSheet, TextInput, View } from "react-native";

import CustomText from "./CustomText";
import { COLORS } from "../../utils/constants";
import { useState } from "react";

const CustomInputWithLabel = ({
  label,
  placeholder,
  defaultValue,
  value,
  disable,
  color,
  style,
  onChangeText,
  keyboardType = "default"
}) => {
  const [focused, setFocused] = useState(false);
  return (
    <View
      style={[
        styles.inputContainer,
        { borderColor: focused ? COLORS.primary : COLORS.neutral_ad },
        style,
      ]}
    >
      <CustomText
        style={[
          styles.label,
          { color: focused ? COLORS.primary : COLORS.neutral_86 },
        ]}
      >
        {label}
      </CustomText>
      <TextInput
        style={[styles.input, { color }]}
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        cursorColor={COLORS.primary}
        onFocus={() => setFocused(true)}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        onBlur={() => setFocused(false)}
        editable={!disable}
      />
    </View>
  );
};

export default CustomInputWithLabel;

const styles = StyleSheet.create({
  inputContainer: {
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.neutral_ad,
    marginTop: 24,
  },
  label: {
    position: "absolute",
    backgroundColor: "#FBF7FF",
    paddingHorizontal: 4,
    top: -16,
    left: 20,
    color: COLORS.neutral_86,
    fontSize: 14,
  },
  input: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 24,
    fontFamily: "peyda",
    fontSize: 14,
    textAlign: "right",
  },
});
