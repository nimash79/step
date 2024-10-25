import {
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { useEffect, useState } from "react";

import StepLayout from "../../layouts/StepLayout";
import CustomText from "../../components/Shared/CustomText";
import CustomCheckbox from "../../components/Shared/CustomCheckbox";

const Step3Screen = ({ navigation, route }) => {
  const [options, setOptions] = useState([]);
  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    if (options.length) setDisabled(false);
    else setDisabled(true);
  }, [options]);
  const changeOptions = (value) => {
    const list = [...options];
    const index = list.findIndex((o) => o === value);
    if (index !== -1) list.splice(index, 1);
    else list.push(value);
    setOptions(list);
  };
  const selected = (value) =>
    Boolean(options.filter((o) => o === value).length);
  return (
    <StepLayout
      navigation={navigation}
      route={route}
      step={3}
      disabled={disabled}
      params={{ boostUser: options }}
    >
      <View>
        <CustomText style={{ marginBottom: 16, fontSize: 16 }} fontStyle="bold">
          چه چیزی را میخواهی در خودت تقویت کنی؟
        </CustomText>
        <CustomText style={styles.guide}>
          می توانید چند گزینه را انتخاب کنید.
        </CustomText>
        <View style={styles.options}>
          <TouchableWithoutFeedback onPress={() => changeOptions(1)}>
            <View style={styles.option}>
              <View style={styles.optionInner}>
                <View style={styles.right}>
                  <Image
                    source={require("../../../assets/inapp/physical_strength.png")}
                    style={styles.optionImage}
                  />
                </View>
                <View style={styles.left}>
                  <CustomText fontStyle="bold">افزایش قدرت بدنی</CustomText>
                  <CustomText style={styles.optionText}>
                    ورزش از طریق تمرینات هوشمندانه و مداوم به افزایش قدرت بدنی
                    شما کمک میکند.
                  </CustomText>
                </View>
              </View>
              <View style={styles.checkbox}>
                <CustomCheckbox
                  value={selected(1)}
                  onValueChange={() => changeOptions(1)}
                  customHandler={true}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => changeOptions(2)}>
            <View style={styles.option}>
              <View style={styles.optionInner}>
                <View style={styles.right}>
                  <Image
                    source={require("../../../assets/inapp/stress.png")}
                    style={styles.optionImage}
                  />
                </View>
                <View style={styles.left}>
                  <CustomText fontStyle="bold">کاهش استرس</CustomText>
                  <CustomText style={styles.optionText}>
                    ورزش منظم به شما کمک میکند تا استرس خود را مدیریت کنید.
                  </CustomText>
                </View>
              </View>
              <View style={styles.checkbox}>
                <CustomCheckbox
                  value={selected(2)}
                  onValueChange={() => changeOptions(2)}
                  customHandler={true}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => changeOptions(3)}>
            <View style={styles.option}>
              <View style={styles.optionInner}>
                <View style={styles.right}>
                  <Image
                    source={require("../../../assets/inapp/sleep.png")}
                    style={styles.optionImage}
                  />
                </View>
                <View style={styles.left}>
                  <CustomText fontStyle="bold">خواب بهتر</CustomText>
                  <CustomText style={styles.optionText}>
                    ورزش میتواند کیفیت خواب بزرگسالان را افزایش دهد.
                  </CustomText>
                </View>
              </View>
              <View style={styles.checkbox}>
                <CustomCheckbox
                  value={selected(3)}
                  onValueChange={() => changeOptions(3)}
                  customHandler={true}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </StepLayout>
  );
};

export default Step3Screen;

const styles = StyleSheet.create({
  guide: {
    fontSize: 12,
    color: "#404040",
  },
  options: {
    marginTop: 32,
  },
  option: {
    flexDirection: "row",
    borderColor: "#DFDFDF",
    borderWidth: 1,
    borderRadius: 44,
    height: 80,
    justifyContent: "space-between",
    marginBottom: 16,
  },
  checkbox: {
    position: "absolute",
  },
  optionInner: {
    width: "90%",
    flexDirection: "row",
  },
  optionImage: {
    width: 80,
    height: 80,
  },
  optionText: {
    fontSize: 10,
  },
  left: {
    marginLeft: 8,
    flex: 1,
  },
});
