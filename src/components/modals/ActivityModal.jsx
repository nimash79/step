import { StyleSheet, View, Modal } from "react-native";
import { BlurView } from "expo-blur";

import CustomText from "../Shared/CustomText";
import CustomButton from "../Shared/CustomButton";
import FootPrintIcon from "../Icons/MenuIcons/FootPrintIcon";
import { COLORS } from "../../utils/constants";

const ActivityModal = ({ visible, setVisible, onReject, onSubmit }) => {
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <BlurView
        intensity={100}
        tint="systemChromeMaterialDark"
        style={styles.centeredView}
      >
        <View style={styles.modalView}>
          <View style={styles.iconContainer}>
            <FootPrintIcon color={COLORS.neutral_f9} width={40} height={40} />
          </View>
          <CustomText
            fontStyle="extrabold"
            style={[styles.modalHead, { marginTop: 16 }]}
          >
            درخواست مجوز
          </CustomText>
          <CustomText
            fontStyle="extrabold"
            style={[styles.modalHead, { marginTop: 8 }]}
          >
            فعالیت بدنی
          </CustomText>
          <CustomText style={styles.modalText}>
            استِپ برای دسترسی به داده های فعالیت بدنی شما ،
            برای شمارش دقیق قدم ها و نظارت بر پیشرفت شما ،
            به مجوز نیاز دارد.
          </CustomText>
          <View style={styles.buttons}>
            <CustomButton text="اجازه دادن" style={styles.submitButton} onClick={onSubmit} />
            <CustomButton
              text="لغو"
              outline
              style={styles.cancelButton}
              onClick={onReject}
            />
          </View>
        </View>
      </BlurView>
    </Modal>
  );
};

export default ActivityModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    margin: 20,
    width: "90%",
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 14,
    marginTop: 16,
    color: COLORS.neutral_20,
    width: "84%",
    textAlign: "center",
  },
  iconContainer: {
    backgroundColor: COLORS.primary,
    width: 80,
    height: 80,
    borderRadius: 40,
    marginTop: 40,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  modalHead: {
    fontSize: 20,
    color: COLORS.neutral_black,
  },
  buttons: {
    width: "84%",
    marginTop: 40,
  },
  submitButton: {
    height: 46,
  },
  cancelButton: {
    marginTop: 8,
    marginBottom: 40,
    height: 46,
  },
});
