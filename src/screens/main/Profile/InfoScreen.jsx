import {
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Dimensions,
} from "react-native";
import Constants from "expo-constants";

import BackIcon from "./../../../components/Icons/BackIcon";
import LittleStepsVerticalIcon from "./../../../components/Icons/LittleStepsVerticalIcon";
import CustomText from "../../../components/Shared/CustomText";
import { COLORS } from "../../../utils/constants";

const InfoScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
        <View style={styles.backIcon}>
          <BackIcon />
        </View>
      </TouchableWithoutFeedback>
      <Image
        source={require("../../../../assets/inapp/login.png")}
        style={styles.runningImage}
        resizeMode="contain"
      />
      <View style={styles.line}>
        <LittleStepsVerticalIcon />
        <CustomText fontStyle="semibold" style={styles.text}>
          در استِپ، با هر{"  "}
          <CustomText fontStyle="semibold" style={styles.number}>
            ۱۰۰
          </CustomText>
          {"  "}
          قدم شما{"  "}
          <CustomText fontStyle="semibold" style={styles.number}>
            ۱
          </CustomText>
          {"  "}
          امتیاز دریافت می کنید!
        </CustomText>
      </View>
      <View style={styles.line}>
        <LittleStepsVerticalIcon />
        <CustomText fontStyle="semibold" style={styles.text}>
          در هر سطح با به حد نصاب رسیدن امتیازات، به سطح بعدی ارتقا پیدا می
          کنید!
        </CustomText>
      </View>
      <View style={styles.line}>
        <LittleStepsVerticalIcon />
        <CustomText fontStyle="semibold" style={styles.text}>
          برای اطلاع از سطح خود به نوار پیشرفت در صفحه مشخصات مراجعه کنید.
        </CustomText>
      </View>
      <View style={styles.line}>
        <LittleStepsVerticalIcon />
      </View>
    </View>
  );
};

export default InfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backIcon: {
    position: "absolute",
    left: 20,
    top: 48,
    zIndex: 1,
  },
  runningImage: {
    width: "100%",
    height: 0.25 * Dimensions.get("window").height,
    marginTop: Constants.statusBarHeight,
  },
  line: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 24,
    paddingHorizontal: "5%",
  },
  text: {
    fontSize: 16,
    color: COLORS.neutral_60,
    marginTop: 24,
    textAlign: "center",
  },
  number: {
    color: COLORS.primary,
    textDecorationLine: "underline",
  },
});
