import {
  StyleSheet,
  View,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { BlurView } from "expo-blur";
import { useDispatch } from "react-redux";

import CustomText from "../../components/Shared/CustomText";
import { COLORS } from "../../utils/constants";
import { CommonActions } from "@react-navigation/native";
import { removeToken } from "../../utils/data_storage";
import { removeUser } from "../../redux/reducers/userReducer";

const LogoutModal = ({ navigation, visible, setVisible }) => {
  const dispatch = useDispatch();
  const submit = async () => {
    await removeToken();
    dispatch(removeUser());
    setVisible(false);
    const action = CommonActions.reset({
      index: 0,
      routes: [{ name: "Authentication" }],
    });
    navigation.dispatch(action);
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
            <CustomText style={[styles.title, {color: COLORS.error}]}>خروج از حساب کاربری</CustomText>
          </View>
          <View style={styles.body}>
            <CustomText style={styles.description}>
              آیا مطمئن هستید که می خواهید از حساب کاربری خود خارج شوید؟
            </CustomText>
          </View>
          <View style={styles.buttons}>
            <TouchableWithoutFeedback onPress={submit}>
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

export default LogoutModal;

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
    fontSize: 14,
    color: COLORS.neutral_40,
    marginVertical: 24,
  },
});
