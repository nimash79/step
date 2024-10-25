import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { useEffect, useState } from "react";

import StepLayout from "../../layouts/StepLayout";
import CustomText from "../../components/Shared/CustomText";
import FlowerIcon from "../../components/Icons/FlowerIcon";
import HomeIcon from "../../components/Icons/HomeIcon";
import GymIcon from "../../components/Icons/GymIcon";
import BuildingIcon from "../../components/Icons/BuildingIcon";
import TreeIcon from "../../components/Icons/TreeIcon";

const Step2Screen = ({ navigation, route }) => {
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
  const selected = (value) => options.filter((o) => o === value).length;
  return (
    <StepLayout
      navigation={navigation}
      route={route}
      step={2}
      disabled={disabled}
      params={{ sportPlaces: options }}
    >
      <View>
        <CustomText style={{ marginBottom: 16, fontSize: 16 }} fontStyle="bold">
          بیشتر دوست داری در چه فضایی تمرین کنی؟
        </CustomText>
        <CustomText style={styles.guide}>
          می توانید چند گزینه را انتخاب کنید.
        </CustomText>
        <View style={styles.options}>
          <TouchableWithoutFeedback onPress={() => changeOptions(1)}>
            <View
              style={[
                styles.option,
                {
                  backgroundColor: selected(1)
                    ? "#7B61FF"
                    : "transparent",
                  marginLeft: 0,
                },
              ]}
            >
              <FlowerIcon color={selected(1) ? "white" : "#404040"} />
              <CustomText
                style={[
                  styles.optionText,
                  selected(1) ? { color: "white" } : {},
                ]}
              >
                فضای باز
              </CustomText>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => changeOptions(2)}>
            <View
              style={[
                styles.option,
                {
                  backgroundColor: selected(2) ? "#7B61FF" : "transparent",
                },
              ]}
            >
              <HomeIcon color={selected(2) ? "white" : "#404040"} />
              <CustomText
                style={[
                  styles.optionText,
                  selected(2) ? { color: "white" } : {},
                ]}
              >
                خانه
              </CustomText>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => changeOptions(3)}>
            <View
              style={[
                styles.option,
                {
                  backgroundColor: selected(3)
                    ? "#7B61FF"
                    : "transparent",
                },
              ]}
            >
              <GymIcon color={selected(3) ? "white" : "#404040"} />
              <CustomText
                style={[
                  styles.optionText,
                  selected(3) ? { color: "white" } : {},
                ]}
              >
                باشگاه
              </CustomText>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => changeOptions(4)}>
            <View
              style={[
                styles.option,
                {
                  backgroundColor: selected(4)
                    ? "#7B61FF"
                    : "transparent",
                  marginLeft: 0,
                },
              ]}
            >
              <BuildingIcon
                color={selected(4) ? "white" : "#404040"}
              />
              <CustomText
                style={[
                  styles.optionText,
                  selected(4) ? { color: "white" } : {},
                ]}
              >
                فضای بسته
              </CustomText>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => changeOptions(5)}>
            <View
              style={[
                styles.option,
                {
                  backgroundColor: selected(5) ? "#7B61FF" : "transparent",
                },
              ]}
            >
              <TreeIcon color={selected(5) ? "white" : "#404040"} />
              <CustomText
                style={[
                  styles.optionText,
                  selected(5) ? { color: "white" } : {},
                ]}
              >
                پارک
              </CustomText>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </StepLayout>
  );
};

export default Step2Screen;

const styles = StyleSheet.create({
  guide: {
    fontSize: 12,
    color: "#404040",
  },
  options: {
    marginTop: 16,
    alignSelf: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  option: {
    borderWidth: 1,
    borderColor: "#DFDFDF",
    borderRadius: 8,
    flexDirection: "row",
    padding: 13,
    marginTop: 16,
    marginLeft: 16,
    alignItems: "center",
  },
  optionText: {
    color: "#404040",
    fontSize: 14,
    marginLeft: 8,
  },
});
