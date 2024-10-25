import {
  Image,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Constants from "expo-constants";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

import { COLORS } from "../../../utils/constants";
import BackIcon from "../../../components/Icons/BackIcon";
import CustomText from "../../../components/Shared/CustomText";
import LittleStepsFilledIcon from "../../../components/Icons/ProfileIcons/LittleStepsFilledIcon";
import SmileIcon from "../../../components/Icons/ProfileIcons/SmileIcon";
import VoiceIcon from "../../../components/Icons/ProfileIcons/VoiceIcon";

const ChatScreen = ({ navigation, route }) => {
  const [username, setUsername] = useState("");
  // useEffect(() => {
  //   setUsername(route.params.username);
  // }, [route]);
  return (
    <LinearGradient
      // start={[0.1, 0.1]}
      locations={[
        [0.1, 0.1],
        [0.34, 0.34],
        [0.67, 0.67],
        [0.9, 0.9],
      ]}
      colors={["#E5DDFF", "#F7F4FF", "#E5DDFF", "#F3EFFF"]}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <View style={styles.backIcon}>
              <BackIcon />
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.headerTextContainer}>
            <CustomText fontStyle="bold" style={styles.headerText}>
              چت با استِپ
            </CustomText>
            <View style={styles.headerTextBorder}></View>
          </View>
          <LittleStepsFilledIcon color={COLORS.primary} />
        </View>
        <View style={styles.initialGuide}>
          <CustomText fontStyle="bold" style={styles.hello}>
            سلام {username}
          </CustomText>
          <CustomText style={styles.guide}>
            من ربات پیام رسان استِپ هستم.
          </CustomText>
          <CustomText style={styles.guide}>
            می تونم شبانه روز پاسخگوی پیام های شما باشم.
          </CustomText>
          <CustomText style={styles.guide}>
            هرموقع نیاز به کمک داشتی کافیه صدام بزنی.
          </CustomText>
          <Image
            source={require("../../../../assets/inapp/chat.png")}
            style={styles.chatImage}
            resizeMode="contain"
          />
        </View>
        <View style={styles.footer}>
          <View style={styles.faqs}>
            <CustomText style={styles.questionTitle}>تعدادی سوال متداول:</CustomText>
            <View style={styles.questions}>
              <View style={[styles.question, { marginLeft: 0}]}>
                <CustomText fontStyle="semibold" style={styles.questionText}>
                  چند قدم در روز برای بدن مفید است؟
                </CustomText>
              </View>
              <View style={styles.question}>
                <CustomText fontStyle="semibold" style={styles.questionText}>
                  هر کیلومتر چند قدم است؟
                </CustomText>
              </View>
              <View style={styles.question}>
                <CustomText fontStyle="semibold" style={styles.questionText}>
                  چقدر زمان برای پیاده روی ۱۰۰۰ گام در روز نیاز است؟
                </CustomText>
              </View>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <SmileIcon />
            <TextInput
              style={styles.input}
              placeholder="پیام خود را وارد کنید ..."
              placeholderTextColor={COLORS.neutral_ad}
            />
            <VoiceIcon />
          </View>
        </View>
      </View>
     </LinearGradient>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBF7FF",
    marginTop: Constants.statusBarHeight,
  },
  header: {
    marginTop: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: "5%",
  },
  headerText: {
    fontSize: 20,
    color: COLORS.neutral_40,
  },
  headerTextBorder: {
    position: "absolute",
    bottom: -16,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: COLORS.tint2,
  },
  initialGuide: {
    width: "100%",
    alignItems: "center",
    marginTop: 140,
  },
  hello: {
    fontSize: 14,
    color: COLORS.shade4,
  },
  guide: {
    fontSize: 14,
    color: COLORS.shade4,
  },
  chatImage: {
    width: "50%",
  },
  footer: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 16,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: COLORS.tint5,
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    height: 48,
  },
  input: {
    fontFamily: "peyda",
    fontSize: 14,
    marginHorizontal: 8,
    flex: 1,
    height: "100%",
  },
  questionTitle: {
    fontSize: 12,
    color: COLORS.shade4,
    marginBottom: 16,
  },
  questions: {
    flexDirection: "row",
    marginBottom: 16,
  },
  question: {
    backgroundColor: COLORS.tint1,
    borderRadius: 8,
    padding: 8,
    marginLeft: 8,
  },
  questionText: {
    fontSize: 10,
    color: COLORS.shade3,
  }
});
