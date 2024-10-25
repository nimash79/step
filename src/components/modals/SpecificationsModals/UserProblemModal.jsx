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

const UserProblemModal = ({
  visible,
  setVisible,
  userProblem,
  setUserProblem,
}) => {
  const [hasProblem, setHasProblem] = useState(false);
  const [problem, setProblem] = useState("");
  useEffect(() => {
    if (visible) {
      setProblem(userProblem);
      setHasProblem(userProblem !== "");
    }
  }, [visible]);
  useEffect(() => {
    console.log(problem);
  }, [problem])
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <BlurView
        intensity={100}
        tint="systemChromeMaterialDark"
        style={styles.centeredView}
      >
        <View style={styles.modalView}>
          <View style={styles.header}>
            <CustomText style={styles.title}>مشکلی در سلامتی</CustomText>
          </View>
          <View style={styles.body}>
            <CustomText style={styles.description}>
              آیا مشکلی در سلامتی خود دارید که بر تمرینات شما تأثیر بگذارد؟
            </CustomText>
            <View style={styles.radioContainer}>
              <TouchableWithoutFeedback
                onPress={() => {
                  setHasProblem(false);
                  setProblem("");
                }}
              >
                <View style={styles.radioButtonContainer}>
                  <View
                    style={
                      !hasProblem
                        ? [styles.radioButton, { borderColor: COLORS.primary }]
                        : styles.radioButton
                    }
                  >
                    {!hasProblem && (
                      <View style={styles.innerRadioButton}></View>
                    )}
                  </View>
                  <CustomText
                    style={
                      !hasProblem
                        ? [styles.radioButtonLabel, { color: COLORS.primary }]
                        : styles.radioButtonLabel
                    }
                  >
                    نه، مشکلی ندارم
                  </CustomText>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => setHasProblem(true)}>
                <View style={styles.radioButtonContainer}>
                  <View
                    style={
                      hasProblem
                        ? [styles.radioButton, { borderColor: COLORS.primary }]
                        : styles.radioButton
                    }
                  >
                    {hasProblem && (
                      <View style={styles.innerRadioButton}></View>
                    )}
                  </View>
                  <CustomText
                    style={
                      hasProblem
                        ? [styles.radioButtonLabel, { color: COLORS.primary }]
                        : styles.radioButtonLabel
                    }
                  >
                    بله، مشکلی دارم
                  </CustomText>
                </View>
              </TouchableWithoutFeedback>
            </View>
            {hasProblem && (
              <CustomInputWithLabel
                label={"شرح مشکل"}
                style={{ marginBottom: 32 }}
                onChangeText={setProblem}
                value={problem}
              />
            )}
          </View>
          <View style={styles.buttons}>
            <TouchableWithoutFeedback
              onPress={() => {
                setUserProblem(problem);
                setVisible(false);
              }}
            >
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

export default UserProblemModal;

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
    fontSize: 11,
    color: COLORS.neutral_40,
    marginTop: 16,
  },
});
