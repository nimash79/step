import {
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
  View,
  ScrollView,
  StatusBar,
} from "react-native";

import CustomText from "../components/Shared/CustomText";
import BackIcon from "../components/Icons/BackIcon";
import CloseIcon from "../components/Icons/CloseIcon";
import { useState } from "react";

const ForgotLayout = ({
  navigation,
  children,
  sendEmail = false,
  setSendEmail,
}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.header}>
        {sendEmail && (
          <View style={styles.snackBar}>
            <TouchableWithoutFeedback onPress={() => setSendEmail(false)}>
              <View style={styles.close}>
                <CloseIcon />
              </View>
            </TouchableWithoutFeedback>
            <CustomText style={styles.snackBarText}>
              کد تأیید جدید برای شما ارسال شد!
            </CustomText>
          </View>
        )}
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <View>
            <BackIcon />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: 30 }}>{children}</View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ForgotLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    alignSelf: "center",
  },
  header: {
    marginTop: StatusBar.currentHeight + 48,
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 16,
    marginLeft: 20,
  },
  skip: {
    position: "absolute",
    right: 0,
  },
  skipText: {
    fontSize: 12,
    color: "#606060",
  },
  headerLine: {
    width: "100%",
    height: 5,
    backgroundColor: "#DFDFDF",
    marginTop: 16,
    borderRadius: 5,
  },
  progress: {
    backgroundColor: "#8871FF",
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    borderRadius: 5,
  },
  disabled: {
    backgroundColor: "#D7D0FF",
  },
  snackBar: {
    backgroundColor: "#E5DFFF",
    height: 33,
    borderRadius: 8,
    position: "absolute",
    top: 0,
    right: "20%",
    left: "20%",
    alignItems: "center",
    justifyContent: "center",
  },
  snackBarText: {
    fontSize: 12,
    color: "#482ECC",
  },
  close: {
    position: "absolute",
    top: 4,
    left: 4,
  },
});
