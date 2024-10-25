import { StyleSheet, View, Modal } from "react-native";
import { BlurView } from "expo-blur";

import CustomText from "../Shared/CustomText";
import LoadingAnimation from "../animations/LoadingAnimation";

const LoadingModal = ({text, visible}) => {
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <BlurView
        intensity={100}
        tint="systemChromeMaterialDark"
        style={styles.centeredView}
      >
        <View style={styles.modalView}>
          <LoadingAnimation />
          <CustomText fontStyle="bold" style={styles.modalText}>
            {text}
          </CustomText>
        </View>
      </BlurView>
    </Modal>
  );
};

export default LoadingModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    width: "80%",
    height: "25%",
    margin: 20,
    borderRadius: 8,
    padding: 35,
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
    fontSize: 20,
    marginTop: 8,
  },
});
