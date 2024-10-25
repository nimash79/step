import { StyleSheet, View } from "react-native";
import { useState } from "react";
import ScrollPicker from "react-native-wheel-scrollview-picker";

import StepLayout from "../../layouts/StepLayout";
import CustomText from "../../components/Shared/CustomText";
import { COLORS } from "../../utils/constants";

const options = [
  { key: 1, label: "۴۰۰۰", value: 4000 },
  { key: 2, label: "۴۵۰۰", value: 4500 },
  { key: 3, label: "۵۰۰۰", value: 5000 },
  { key: 4, label: "۵۵۰۰", value: 5500 },
  { key: 5, label: "۶۰۰۰", value: 6000 },
  { key: 6, label: "۶۵۰۰", value: 6500 },
  { key: 7, label: "۷۰۰۰", value: 7000 },
  { key: 8, label: "۷۵۰۰", value: 7500 },
  { key: 9, label: "۸۰۰۰", value: 8000 },
];

const Step6Screen = ({ navigation, route }) => {
  const [itemIndex, setItemIndex] = useState(4);
  const [purposeSteps, setPurposeSteps] = useState(6000);

  const getItemStyle = (index) => {
    switch (index) {
      case itemIndex - 1:
        return styles.itemText;
      case itemIndex + 1:
        return styles.itemText;
      case itemIndex - 2:
        return styles.mediumItemText;
      case itemIndex + 2:
        return styles.mediumItemText;
      case itemIndex - 3:
        return styles.smallItemText;
      case itemIndex + 3:
        return styles.smallItemText;
      case itemIndex - 4:
        return styles.tooSmallItemText;
      case itemIndex + 4:
        return styles.tooSmallItemText;
    }
  };

  return (
    <StepLayout
      navigation={navigation}
      route={route}
      step={6}
      params={{ purposeSteps }}
      disabled={false}
      scroll={false}
    >
      <View>
        <CustomText style={{ marginBottom: 16, fontSize: 16 }} fontStyle="bold">
          هدف تعداد گام های خود را تعیین کنید!
        </CustomText>
        <CustomText style={styles.guide}>
          تعداد گام های روزانه خود را در هر تمرین انتخاب کنید تا با انگیزه
          بمانید.
        </CustomText>
        <View style={styles.scrollPicker}>
          <CustomText style={styles.stepText}>گام</CustomText>
          <ScrollPicker
            dataSource={options.map((option) => option.label)}
            selectedIndex={itemIndex}
            onValueChange={(value, index) => {
              setItemIndex(index);
              setPurposeSteps(options[index].value);
            }}
            itemHeight={70}
            wrapperHeight={400}
            highlightColor={COLORS.shade1}
            highlightBorderWidth={1}
            wrapperBackground="transparent"
            renderItem={(data, index, isSelected) =>
              isSelected ? (
                <CustomText style={styles.activeItemText}>{data}</CustomText>
              ) : (
                <CustomText style={getItemStyle(index)}>{data}</CustomText>
              )
            }
          />
        </View>
      </View>
    </StepLayout>
  );
};

export default Step6Screen;

const styles = StyleSheet.create({
  guide: {
    fontSize: 12,
    color: "#404040",
  },
  scrollPicker: {
    width: 170,
    alignSelf: "center",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemText: {
    fontFamily: "peyda_extrabold",
    fontSize: 24,
    color: COLORS.neutral_60,
  },
  activeItemText: {
    fontFamily: "peyda_extrabold",
    fontSize: 32,
    color: COLORS.shade1,
    paddingVertical: 10,
  },
  tooSmallItemText: {
    fontFamily: "peyda_extrabold",
    fontSize: 14,
    color: COLORS.neutral_cb,
  },
  smallItemText: {
    fontFamily: "peyda_extrabold",
    fontSize: 16,
    color: COLORS.neutral_ad,
  },
  mediumItemText: {
    fontFamily: "peyda_extrabold",
    fontSize: 20,
    color: COLORS.neutral_86,
  },
  stepText: {
    color: COLORS.neutral_60,
    fontSize: 16,
    fontFamily: "peyda_semibold",
    position: "absolute",
    left: -16,
    top: 190,
    width: 50,
    textAlign: "right",
  },
});
