import {
  StyleSheet,
  View,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { BlurView } from "expo-blur";

import CustomText from "../../Shared/CustomText";
import { COLORS } from "../../../utils/constants";
import CustomDatePicker from "./../../Shared/CustomDatePicker";
import { useRef, useState } from "react";
import { persianToMiladi } from "../../../utils/convertors";

const BirthdayModal = ({ visible, setVisible, birthDate, setBirthDate }) => {
  const [birthday, setBirthday] = useState();
  const [closeBirthdate, setCloseBirthdate] = useState(false);
  const ref = useRef(null);
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current._children.includes(event.target))
      setCloseBirthdate(true);
  };
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <TouchableWithoutFeedback onPress={handleClickOutside}>
        <BlurView
          intensity={100}
          tint="systemChromeMaterialDark"
          style={styles.centeredView}
        >
          <View style={styles.modalView}>
            <View style={styles.header}>
              <CustomText style={styles.title}>تاریخ تولد</CustomText>
            </View>
            <View style={styles.body}>
              <CustomText style={styles.birthDayTitle}>
                تاریخ تولد (شمسی)
              </CustomText>
              <CustomDatePicker
                setDate={setBirthday}
                backgroundColor={"#F3F6FB"}
                defaultValue={birthDate}
                placeholderColor={COLORS.neutral_86}
                height={40}
                viewRef={ref}
                closeSelectPickers={closeBirthdate}
                setCloseSelectPickers={setCloseBirthdate}
              />
              <CustomText style={styles.subtext}>
                تاریخ تولد خود را وارد کنید.
              </CustomText>
            </View>
            <View style={styles.buttons}>
              <TouchableWithoutFeedback
                onPress={() => {
                  setBirthDate(persianToMiladi(birthday));
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
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default BirthdayModal;

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
    zIndex: 1,
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
  birthDayTitle: {
    fontSize: 16,
    color: COLORS.neutral_86,
    marginTop: 16,
    marginBottom: 4,
  },
});
