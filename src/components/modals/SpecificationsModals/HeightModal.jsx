import {
  StyleSheet,
  View,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { BlurView } from "expo-blur";

import CustomText from "../../Shared/CustomText";
import { COLORS } from "../../../utils/constants";
import { useEffect, useState } from "react";
import CustomInputWithLabel from "../../Shared/CustomInputWithLabel";

const HeightModal = ({ visible, setVisible, height, setHeight }) => {
  const [newHeight, setNewHeight] = useState(0);
  useEffect(() => {
    if (visible) setNewHeight(height);
  }, [visible])
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <BlurView
        intensity={100}
        tint="systemChromeMaterialDark"
        style={styles.centeredView}
      >
        <View style={styles.modalView}>
          <View style={styles.header}>
            <CustomText style={styles.title}>قد</CustomText>
          </View>
          <View style={styles.body}>
            <CustomInputWithLabel
              label={"اندازه قد"}
              placeholder={"۱۵۰"}
              defaultValue={newHeight.toString()}
              color={COLORS.neutral_40}
              onChangeText={setNewHeight}
              keyboardType="number-pad"
            />
            <CustomText style={styles.subtext}>
              اندازه قد خود را به سانتی متر وارد کنید.
            </CustomText>
          </View>
          <View style={styles.buttons}>
            <TouchableWithoutFeedback onPress={() => {
              setHeight(parseInt(newHeight));
              setVisible(false);
            }}>
              <View style={styles.submitButton}>
                <CustomText
                  fontStyle="semibold"
                  style={styles.submitButtonText}
                >
                  تایید
                </CustomText>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => setVisible(false)}>
              <View style={styles.cancelButton}>
                <CustomText
                  fontStyle="semibold"
                  style={styles.cancelButtonText}
                >
                  لغو
                </CustomText>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </BlurView>
    </Modal>
  );
};

export default HeightModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalView: {
    width: "100%",
    paddingHorizontal: "10%",
    backgroundColor: COLORS.backMainP,
    borderWidth: 1,
    borderColor: COLORS.neutral_ed,
    borderTopStartRadius: 24,
    borderTopEndRadius: 24,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.neutral_ed,
    paddingVertical: 16,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
  },
  body: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.neutral_ed,
    marginBottom: 16,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    width: "45%",
    paddingVertical: 12,
  },
  submitButtonText: {
    fontSize: 14,
    color: COLORS.neutral_f9,
  },
  cancelButton: {
    backgroundColor: COLORS.neutral_f9,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    width: "45%",
    paddingVertical: 12,
  },
  cancelButtonText: {
    fontSize: 14,
    color: COLORS.primary,
  },
  subtext: {
    fontSize: 12,
    color: COLORS.neutral_86,
    marginVertical: 16,
  },
});
