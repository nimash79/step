import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import React from "react";
import CloseOutlineIcon from "../Icons/CloseOutlineIcon";
import CustomText from "../Shared/CustomText";
import { COLORS } from "../../utils/constants";
import ErrorAlertIcon from './icons/ErrorAlertIcon';

const ErrorAlert = ({ text = "متن پیغام", visible, setVisible, style }) => {
  if (!visible) return null;
  return (
    <View style={[styles.container, style]}>
      <ErrorAlertIcon />
      <CustomText style={styles.text}>{text}</CustomText>
      <TouchableWithoutFeedback onPress={() => setVisible(false)}>
        <View>
          <CloseOutlineIcon />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default ErrorAlert;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.error_light2,
    borderRadius: 8,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 32,
    paddingHorizontal: 16,
  },
  text: {
    fontSize: 12,
    color: COLORS.error,
    marginLeft: 8,
    flex: 1,
  },
});
