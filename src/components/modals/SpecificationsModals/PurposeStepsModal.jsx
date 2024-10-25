import {
  StyleSheet,
  View,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { BlurView } from "expo-blur";

import CustomText from "../../Shared/CustomText";
import { COLORS } from "../../../utils/constants";
import { useEffect, useState } from "react";
import ScrollPicker from "react-native-wheel-scrollview-picker";

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

const PurposeStepsModal = ({
  visible,
  setVisible,
  purposeSteps,
  setPurposeSteps,
}) => {
  const [itemIndex, setItemIndex] = useState(0);
  const [newPurposeSteps, setNewPurposeSteps] = useState(4000);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (visible) {
      const index = options.findIndex((x) => x.value === purposeSteps);
      if (index !== -1) {
        setNewPurposeSteps(purposeSteps);
        setItemIndex(index);
      } else {
        setNewPurposeSteps(4000);
        setItemIndex(0);
      }
      setReady(true);
    } else setReady(false);
  }, [visible]);

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
    <Modal visible={visible} transparent={true} animationType="slide">
      <BlurView
        intensity={100}
        tint="systemChromeMaterialDark"
        style={styles.centeredView}
      >
        <View style={styles.modalView}>
          <View style={styles.header}>
            <CustomText style={styles.title}>تعداد گام های هدف</CustomText>
          </View>
          {ready == true && (
            <View style={styles.body}>
              <CustomText style={styles.description}>
                تعداد گام های مورد هدف روزانه خود را در هر تمرین انتخاب کنید.
              </CustomText>
              <ScrollView style={styles.scrollPicker}>
                <CustomText style={styles.stepText}>گام</CustomText>
                <ScrollPicker
                  dataSource={options.map((option) => option.label)}
                  selectedIndex={itemIndex}
                  onValueChange={(value, index) => {
                    setItemIndex(index);
                    setNewPurposeSteps(options[index].value);
                  }}
                  itemHeight={70}
                  wrapperHeight={400}
                  highlightColor={COLORS.shade1}
                  highlightBorderWidth={1}
                  wrapperBackground="transparent"
                  renderItem={(data, index, isSelected) =>
                    isSelected ? (
                      <CustomText style={styles.activeItemText}>
                        {data}
                      </CustomText>
                    ) : (
                      <CustomText style={getItemStyle(index)}>
                        {data}
                      </CustomText>
                    )
                  }
                />
              </ScrollView>
            </View>
          )}
          <View style={styles.buttons}>
            <TouchableWithoutFeedback
              onPress={() => {
                setPurposeSteps(newPurposeSteps);
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

export default PurposeStepsModal;

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
