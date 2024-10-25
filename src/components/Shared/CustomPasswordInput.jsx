import {
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { SPACES } from "../../utils/constants";
import ClosedEyeIcon from "../Icons/ClosedEyeIcon";
import OpenedEyeIcon from "../Icons/OpenedEyeIcon";
import { useState } from "react";

const CustomPasswordInput = ({ placeholder, icon, containerStyle, onChangeText, align = "center" }) => {
  const [show, setShow] = useState(false);
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.icon}>{icon}</View>
      <TextInput
        placeholder={placeholder}
        style={icon ? [styles.input, align === "right" ? {marginLeft: "18%"} : {}] : [styles.inputWithoutIcon, align === "right" ? {marginLeft: "18%"} : {}]}
        secureTextEntry={show ? false : true}
        onChangeText={onChangeText}
      />
      <TouchableWithoutFeedback onPress={() => setShow((s) => !s)}>
        <View style={styles.eye}>
          {show ? <OpenedEyeIcon /> : <ClosedEyeIcon />}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default CustomPasswordInput;

const styles = StyleSheet.create({
  container: {
    borderColor: "#DFDFDF",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: SPACES.vertical,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 48,
  },
  input: {
    marginLeft: "24%",
    width: "60%",
    height: "100%",
    fontFamily: "peyda",
  },
  inputWithoutIcon: {
    marginLeft: "8%",
    width: "76%",
    height: "100%",
    fontFamily: "peyda",
  },
  icon: {
    position: "absolute",
    left: "8%",
  },
  eye: {
    position: "absolute",
    right: "8%",
  },
});
