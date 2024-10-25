import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import { useEffect, useState } from "react";

import StepLayout from "../../layouts/StepLayout";
import CustomText from "../../components/Shared/CustomText";

const Step5Screen = ({ navigation, route }) => {
  const [option, setOption] = useState(0);
  const [weeklyGoal, setWeeklyGoal] = useState("");
  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    if (option !== 0) setDisabled(false);
    else setDisabled(true);
    switch (option) {
      case 1:
        setWeeklyGoal("1 بار در هفته");
        break;
      case 2:
        setWeeklyGoal("2 بار در هفته");
        break;
      case 3:
        setWeeklyGoal("3 بار در هفته");
        break;
      case 4:
        setWeeklyGoal("بیش از 3 بار در هفته");
        break;
    }
  }, [option]);
  return (
    <StepLayout
      navigation={navigation}
      route={route}
      params={{ weeklyGoal }}
      step={5}
      disabled={disabled}
    >
      <View>
        <CustomText style={{ marginBottom: 16, fontSize: 16 }} fontStyle="bold">
          هدف تمرین هفتگی شما چیست؟
        </CustomText>
        <View style={styles.options}>
          <TouchableWithoutFeedback onPress={() => setOption(1)}>
            <View
              style={
                option == 1
                  ? [styles.option, styles.activeOption]
                  : styles.option
              }
            >
              <CustomText
                style={
                  option == 1
                    ? [styles.optionText, styles.activeOptionText]
                    : styles.optionText
                }
              >
                ۱ بار در هفته
              </CustomText>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => setOption(2)}>
            <View
              style={
                option == 2
                  ? [styles.option, styles.activeOption]
                  : styles.option
              }
            >
              <CustomText
                style={
                  option == 2
                    ? [styles.optionText, styles.activeOptionText]
                    : styles.optionText
                }
              >
                ۲ بار در هفته
              </CustomText>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => setOption(3)}>
            <View
              style={
                option == 3
                  ? [styles.option, styles.activeOption]
                  : styles.option
              }
            >
              <CustomText
                style={
                  option == 3
                    ? [styles.optionText, styles.activeOptionText]
                    : styles.optionText
                }
              >
                ۳ بار در هفته
              </CustomText>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => setOption(4)}>
            <View
              style={
                option == 4
                  ? [styles.option, styles.activeOption]
                  : styles.option
              }
            >
              <CustomText
                style={
                  option == 4
                    ? [styles.optionText, styles.activeOptionText]
                    : styles.optionText
                }
              >
                بیش از ۳ بار در هفته
              </CustomText>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </StepLayout>
  );
};

export default Step5Screen;

const styles = StyleSheet.create({
  guide: {
    fontSize: 12,
    color: "#404040",
    marginTop: 48,
    marginBottom: 16,
  },
  options: {
    marginTop: 40,
  },
  option: {
    backgroundColor: "#F9F9F9",
    borderColor: "#CBCBCB",
    borderWidth: 1,
    borderRadius: 8,
    height: 38,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },
  optionText: {
    fontSize: 14,
    color: "#868686",
  },
  activeOption: {
    backgroundColor: "#8871FF",
  },
  activeOptionText: {
    color: "#FFFFFF",
  },
});
