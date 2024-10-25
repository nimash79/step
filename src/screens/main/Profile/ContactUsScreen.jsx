import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Constants from "expo-constants";

import { COLORS } from "../../../utils/constants";
import BackIcon from "../../../components/Icons/BackIcon";
import CustomText from "../../../components/Shared/CustomText";
import PhoneIcon from "../../../components/Icons/PhoneIconl";
import EmailSmallIcon from "./../../../components/Icons/EmailSmallIcon";

const ContactUsScreen = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <View style={styles.backIcon}>
            <BackIcon />
          </View>
        </TouchableWithoutFeedback>
        <CustomText fontStyle="bold" style={styles.headerText}>
          ارتباط با ما
        </CustomText>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <CustomText style={[styles.description, { marginTop: 32 }]}>
          ما در مجموعه استِپ همواره آماده ایم تا به شما کمک کنیم. درصورت داشتن
          هرگونه سوال، انتقاد یا پیشنهاد، می توانید با تیم پشتیبانی ما تماس
          بگیرید.
        </CustomText>
        <CustomText fontStyle="semibold" style={styles.title}>
          اطلاعات تماس با ما
        </CustomText>
        <View style={styles.contactDetails}>
          <View style={styles.contactDetail}>
            <PhoneIcon />
            <CustomText style={styles.contactDetailLabel}>
              شماره تماس:
            </CustomText>
            <CustomText style={styles.contactDetailValue}>
              +۹۸ ۹۲۲۴۸۵۰۱۹۶
            </CustomText>
          </View>
          <View style={styles.contactDetail}>
            <EmailSmallIcon />
            <CustomText style={styles.contactDetailLabel}>ایمیل:</CustomText>
            <CustomText style={styles.contactDetailValue}>
              step.run.app@gmail.com
            </CustomText>
          </View>
        </View>
        <CustomText fontStyle="semibold" style={styles.title}>
          پیشنهاد ما
        </CustomText>
        <CustomText style={styles.description}>
          همچنین ربات پیام رسان استِپ هر لحظه از شبانه روز، پاسخگوی شما خواهد
          بود !
        </CustomText>
        {/* <TextInput
          style={styles.textArea}
          multiline={true}
          numberOfLines={6}
          placeholder="پیام"
          placeholderTextColor={COLORS.neutral_86}
        /> */}
        <TouchableWithoutFeedback onPress={() => navigation.navigate("Chat", route.params)}>
          <View style={styles.sendButton}>
            <CustomText fontStyle="semibold" style={styles.sendButtonText}>
              چت با استِپ
            </CustomText>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </View>
  );
};

export default ContactUsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBF7FF",
    paddingHorizontal: "5%",
    marginTop: Constants.statusBarHeight,
  },
  header: {
    marginTop: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  backIcon: {
    position: "absolute",
    left: 0,
  },
  headerText: {
    fontSize: 20,
    color: COLORS.neutral_40,
  },
  title: {
    fontSize: 16,
    color: COLORS.neutral_60,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.neutral_ed,
    width: 129,
    marginBottom: 16,
  },
  description: {
    fontSize: 12,
    color: COLORS.neutral_60,
    textAlign: "justify",
    lineHeight: 24,
    marginBottom: 24,
  },
  contactDetails: {
    marginBottom: 16,
  },
  contactDetail: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  contactDetailLabel: {
    fontSize: 12,
    color: COLORS.neutral_40,
    marginLeft: 8,
  },
  contactDetailValue: {
    fontSize: 12,
    color: COLORS.neutral_86,
    marginLeft: 4,
  },
  textArea: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.neutral_df,
    fontFamily: "peyda_semibold",
    fontSize: 16,
    padding: 16,
    textAlignVertical: "top",
  },
  sendButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    padding: 14,
    marginBottom: 32,
  },
  sendButtonText: {
    fontSize: 14,
    color: COLORS.neutral_f9,
  },
});
