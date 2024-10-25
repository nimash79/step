import {
  StyleSheet,
  View,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { BlurView } from "expo-blur";
import * as ImagePicker from "expo-image-picker";

import CustomText from "../Shared/CustomText";
import { COLORS } from "../../utils/constants";

const EditProfileModal = ({ visible, setVisible, setImage }) => {
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setVisible(false);
    }
  };
  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setVisible(false);
    }
  }
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <BlurView
        intensity={100}
        tint="systemChromeMaterialDark"
        style={styles.centeredView}
      >
        <View style={styles.modalView}>
          <View
            style={[
              styles.buttons,
              { borderWidth: 1, borderColor: COLORS.primary },
            ]}
          >
            <TouchableWithoutFeedback onPress={takePhoto}>
              <View style={[styles.button, styles.buttonBorder]}>
                <CustomText fontStyle="semibold" style={styles.buttonText}>
                  عکس گرفتن
                </CustomText>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={pickImage}>
              <View style={styles.button}>
                <CustomText fontStyle="semibold" style={styles.buttonText}>
                  انتخاب عکس
                </CustomText>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={[styles.buttons, styles.cancelButton]}>
            <TouchableWithoutFeedback onPress={() => setVisible(false)}>
              <View style={styles.button}>
                <CustomText fontStyle="semibold" style={styles.buttonText}>
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

export default EditProfileModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalView: {
    width: "80%",
    margin: 20,
  },
  buttons: {
    backgroundColor: COLORS.neutral_f9,
    borderRadius: 8,
    borderWidth: 1,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 16,
    height: 46,
  },
  buttonBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.neutral_ed,
  },
  buttonText: {
    fontSize: 16,
    color: COLORS.primary,
  },
  cancelButton: {
    marginTop: 8,
    borderColor: COLORS.tint1,
  },
});
