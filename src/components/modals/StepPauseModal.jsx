import { StyleSheet, View, Modal } from "react-native";
import { BlurView } from "expo-blur";

import CustomText from "../Shared/CustomText";
import CustomButton from "../Shared/CustomButton";
import WarningIcon from "../Icons/WarningIcon";
import { COLORS } from "../../utils/constants";
import { e2p } from "../../utils/convertors";

const StepPauseModal = ({ visible, setVisible, onReject, onSubmit, steps }) => {
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <BlurView
        intensity={100}
        tint="systemChromeMaterialDark"
        style={styles.centeredView}
      >
        <View style={styles.modalView}>
          <View style={styles.warning}>
            <WarningIcon />
          </View>
          <CustomText style={styles.modalText}>
            <CustomText fontStyle="extrabold" style={styles.modalTextChild}>
              {e2p(steps)} قدم
            </CustomText>{" "}
            از قدم های مورد هدف امروز شما باقی مانده است!
          </CustomText>
          <CustomText style={styles.modalSubText}>
            دوست داری ادامه بدی؟
          </CustomText>
          <View style={styles.buttons}>
            <CustomButton
              text="ادامه دادن"
              style={styles.submitButton}
              onClick={onReject}
            />
            <CustomButton
              text="اتمام"
              outline
              style={styles.cancelButton}
              onClick={onSubmit}
            />
          </View>
        </View>
      </BlurView>
    </Modal>
  );
};

export default StepPauseModal;

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
    fontSize: 15,
    marginTop: 16,
    color: COLORS.neutral_20,
    width: "80%",
    textAlign: "center",
  },
  modalTextChild: {
    color: COLORS.neutral_40,
  },
  modalSubText: {
    fontSize: 14,
    marginTop: 16,
    color: COLORS.neutral_20,
    width: "80%",
    textAlign: "center",
  },
  warning: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginTop: 40,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    width: "80%",
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
