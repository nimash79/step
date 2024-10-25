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

const WeeklyGoalModal = ({ visible, setVisible, goal, setGoal }) => {
  const [newGoal, setNewGoal] = useState("۲ بار در هفته");
  useEffect(() => {
    if (visible) setNewGoal(goal);
  }, [visible]);
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <BlurView
        intensity={100}
        tint="systemChromeMaterialDark"
        style={styles.centeredView}
      >
        <View style={styles.modalView}>
          <View style={styles.header}>
            <CustomText style={styles.title}>هدف تمرین هفتگی</CustomText>
          </View>
          <View style={styles.body}>
            <CustomText style={styles.description}>
              هدف هفتگی تمرینات خود را تعیین کنید.
            </CustomText>
            <View style={styles.radioContainer}>
              <TouchableWithoutFeedback
                onPress={() => setNewGoal("۱ بار در هفته")}
              >
                <View style={styles.radioButtonContainer}>
                  <View
                    style={
                      newGoal === "۱ بار در هفته"
                        ? [styles.radioButton, { borderColor: COLORS.primary }]
                        : styles.radioButton
                    }
                  >
                    {newGoal === "۱ بار در هفته" && (
                      <View style={styles.innerRadioButton}></View>
                    )}
                  </View>
                  <CustomText
                    style={
                      newGoal === "۱ بار در هفته"
                        ? [styles.radioButtonLabel, { color: COLORS.primary }]
                        : styles.radioButtonLabel
                    }
                  >
                    ۱ بار در هفته
                  </CustomText>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => setNewGoal("۲ بار در هفته")}
              >
                <View style={styles.radioButtonContainer}>
                  <View
                    style={
                      newGoal === "۲ بار در هفته"
                        ? [styles.radioButton, { borderColor: COLORS.primary }]
                        : styles.radioButton
                    }
                  >
                    {newGoal === "۲ بار در هفته" && (
                      <View style={styles.innerRadioButton}></View>
                    )}
                  </View>
                  <CustomText
                    style={
                      newGoal === "۲ بار در هفته"
                        ? [styles.radioButtonLabel, { color: COLORS.primary }]
                        : styles.radioButtonLabel
                    }
                  >
                    ۲ بار در هفته
                  </CustomText>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => setNewGoal("۳ بار در هفته")}
              >
                <View style={styles.radioButtonContainer}>
                  <View
                    style={
                      newGoal === "۳ بار در هفته"
                        ? [styles.radioButton, { borderColor: COLORS.primary }]
                        : styles.radioButton
                    }
                  >
                    {newGoal === "۳ بار در هفته" && (
                      <View style={styles.innerRadioButton}></View>
                    )}
                  </View>
                  <CustomText
                    style={
                      newGoal === "۳ بار در هفته"
                        ? [styles.radioButtonLabel, { color: COLORS.primary }]
                        : styles.radioButtonLabel
                    }
                  >
                    ۳ بار در هفته
                  </CustomText>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => setNewGoal("بیش از ۳ بار در هفته")}
              >
                <View style={styles.radioButtonContainer}>
                  <View
                    style={
                      newGoal === "بیش از ۳ بار در هفته"
                        ? [styles.radioButton, { borderColor: COLORS.primary }]
                        : styles.radioButton
                    }
                  >
                    {newGoal === "بیش از ۳ بار در هفته" && (
                      <View style={styles.innerRadioButton}></View>
                    )}
                  </View>
                  <CustomText
                    style={
                      newGoal === "بیش از ۳ بار در هفته"
                        ? [styles.radioButtonLabel, { color: COLORS.primary }]
                        : styles.radioButtonLabel
                    }
                  >
                    بیش از ۳ بار در هفته
                  </CustomText>
                </View>
              </TouchableWithoutFeedback>
            </View>
            <View style={{ marginTop: 16 }}></View>
          </View>
          <View style={styles.buttons}>
            <TouchableWithoutFeedback onPress={null}>
              <View style={styles.submitButton}>
                <CustomText
                  fontStyle="semibold"
                  style={styles.submitButtonText}
                >
                  تایید
                </CustomText>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                setGoal(newGoal);
                setVisible(false);
              }}
            >
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

export default WeeklyGoalModal;

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
  description: {
    fontSize: 12,
    color: COLORS.neutral_40,
    marginTop: 16,
  },
  radioContainer: {
    marginTop: 16,
  },
  radioButtonTitle: {
    fontSize: 14,
    color: COLORS.neutral_86,
    marginLeft: 16,
  },
  radioButtonContainer: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 16,
  },
  radioButtonLabel: {
    fontFamily: "peyda_semibold",
    fontSize: 14,
    color: COLORS.neutral_86,
    marginLeft: 8,
  },
  radioButton: {
    width: 16,
    height: 16,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: COLORS.neutral_86,
    justifyContent: "center",
    alignItems: "center",
  },
  innerRadioButton: {
    width: 12,
    height: 12,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
  },
});
