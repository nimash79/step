import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import Constants from "expo-constants";

import { COLORS } from "../../../utils/constants";
import BackIcon from "../../../components/Icons/BackIcon";
import CustomText from "../../../components/Shared/CustomText";

const AboutUsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <View style={styles.backIcon}>
            <BackIcon />
          </View>
        </TouchableWithoutFeedback>
        <CustomText fontStyle="bold" style={styles.headerText}>
          درباره ما
        </CustomText>
      </View>
      <CustomText style={[styles.description, { marginTop: 32 }]}>
        ما در تیم استِپ برای کمک به برنامه ریزی و بهبود تمرینات شما ورزشکاران
        عزیز و همچنین تشویق همه افراد به ورزش، این اپلیکیشن را در مدت زمان
        کوتاهی طراحی کردیم و همچنان در حال توسعه آن هستیم.
      </CustomText>
      <CustomText fontStyle="semibold" style={[styles.title, { marginTop: 0 }]}>
        اهداف ما
      </CustomText>
      <CustomText style={styles.description}>
        ما در تیم استِپ، به ارتقاء سلامتی و فعالیت های ورزشی کاربران علاقه مند
        هستیم. هدف اصلی ما، تشویق به فعالیت های روزانه و بهبود کیفیت زندگی از
        طریق دوندگی است.
      </CustomText>
      <CustomText fontStyle="semibold" style={styles.title}>
        خدمات ما
      </CustomText>
      <CustomText style={styles.description}>
        در استِپ، ما تعداد قدم ها، فاصله طی شده، کالری مصرفی و زمان دوندگی شما
        را با دقت بالا اندازه گیری می کنیم. کاربران می توانند گزارش های جامعی از
        فعالیت های خود را دریافت کنند و تغییرات خود را پیگیری کنند. همچنین
        اپلیکیشن ما با اعلان ها و چالش های روزانه، کاربران را به فعالیت های
        ورزشی ترغیب می کند.
      </CustomText>
      <CustomText style={[styles.description, { marginTop: 8 }]}>
        ما به ارتقاء سلامتی شما اعتقاد داریم و امیدواریم که اپلیکیشن ما به شما
        در رسیدن به اهداف ورزشی کمک کند
      </CustomText>
    </View>
  );
};

export default AboutUsScreen;

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
    fontSize: 14,
    color: COLORS.neutral_60,
    marginTop: 16,
    marginBottom: 8,
  },
  description: {
    fontSize: 12,
    color: COLORS.neutral_60,
    textAlign: "justify",
    lineHeight: 24,
  },
});
