import {
  StyleSheet,
  View,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { BlurView } from "expo-blur";
import { useEffect, useState } from "react";

import CustomText from "../../Shared/CustomText";
import { COLORS } from "../../../utils/constants";
import CustomInputWithLabel from "../../Shared/CustomInputWithLabel";

const WeightModal = ({ visible, setVisible, weight, setWeight }) => {
  const [newWeight, setNewWeight] = useState(0);
  useEffect(() => {
    if (visible) setNewWeight(weight);
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
            <CustomText style={styles.title}>وزن</CustomText>
          </View>
          <View style={styles.body}>
            <CustomInputWithLabel
              label={"اندازه وزن"}
              placeholder={"۱۵۰"}
              defaultValue={newWeight.toString()}
              onChangeText={setNewWeight}
              color={COLORS.neutral_40}
              keyboardType="number-pad"
            />
            <CustomText style={styles.subtext}>
              اندازه وزن خود را به کیلوگرم وارد کنید.
            </CustomText>
          </View>
          <View style={styles.buttons}>
            <TouchableWithoutFeedback onPress={() => {
              setWeight(parseInt(newWeight));
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

export default WeightModal;

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
