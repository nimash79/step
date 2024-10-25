import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import { useEffect, useState } from "react";

import StepLayout from "../../layouts/StepLayout";
import CustomText from "../../components/Shared/CustomText";

const Step4Screen = ({ navigation, route }) => {
  const [option, setOption] = useState(0);
  const [text, setText] = useState(null);
  const [inputLength, setInputLength] = useState(0);
  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    if (option === 1 || (option === 2 && text)) setDisabled(false);
    else setDisabled(true);
  }, [option, text]);
  return (
    <StepLayout
      navigation={navigation}
      route={route}
      params={{userProblem: text}}
      step={4}
      disabled={disabled}
    >
      <View>
        <CustomText style={{ marginBottom: 16, fontSize: 16 }} fontStyle="bold">
          آیا مشکلی در سلامتی خود دارید که بر تمرینات شما تاثیر بگذارد؟
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
                نه ، ندارم
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
                بله ، مشکلی دارم
              </CustomText>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={[styles.details, { opacity: option === 2 ? 1 : 0 }]}>
          <CustomText style={styles.guide}>
            با اطلاع از مشکلات شما، میتوانیم مناسب ترین برنامه تمرینی را به شما
            ارائه دهیم.
          </CustomText>
          <View>
            <TextInput
              multiline={true}
              onChangeText={(val) => {
                setText(val);
                setInputLength(val.length);
              }}
              value={text}
              maxLength={250}
              textAlignVertical="top"
              style={styles.input}
              placeholder="درمورد وضعیت خود برای ما توضیح دهید"
            />
            <CustomText style={styles.inputLength}>
              {inputLength} / 250
            </CustomText>
          </View>
        </View>
      </View>
    </StepLayout>
  );
};

export default Step4Screen;

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
  input: {
    backgroundColor: "#F9F9F9",
    borderColor: "#CBCBCB",
    borderWidth: 1,
    borderRadius: 8,
    fontFamily: "peyda",
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 11,
    height: 80,
  },
  inputLength: {
    position: "absolute",
    bottom: 5,
    right: 10,
    color: "#404040",
    fontSize: 10,
    fontFamily: "peyda",
  },
});
