import { StyleSheet, View } from "react-native";
import Constants from "expo-constants";

import GoalPassed from "../Svgs/GoalPassed";
import CustomText from "../Shared/CustomText";
import CustomButton from "../Shared/CustomButton";
import { COLORS } from "../../utils/constants";
import MainLayout from "../../layouts/MainLayout";
import ActivitiesBottom from "../../screens/main/Home/components/ActivitiesBottom";
import { secondsToTimer2 } from "../../utils/convertors";

const HomeModal = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      <GoalPassed style={styles.goalPassed} />
      <CustomText fontStyle="extrabold" style={styles.goalText}>
        {route?.params?.steps} قدم
      </CustomText>
      <CustomText style={styles.congrats}>تبریک!</CustomText>
      <CustomText style={styles.complete}>
        قدم های مورد هدفت تکمیل شد.
      </CustomText>
      <ActivitiesBottom
        style={styles.activitiesBottom}
        calory={route?.params?.calory}
        meters={route?.params?.meters}
        timer={secondsToTimer2(route?.params?.timer)}
      />
      <View style={styles.buttons}>
        <View style={styles.button}>
          <CustomButton
            text="ادامه دادن"
            style={{ height: 46 }}
            textStyle={{ fontFamily: "peyda_semibold", fontSize: 14 }}
            onClick={() => {
              navigation.goBack();
              route?.params?.onSubmit();
            }}
          />
        </View>
        <View style={styles.button}>
          <CustomButton
            text="توقف"
            style={{ height: 46 }}
            textStyle={{ fontFamily: "peyda_semibold", fontSize: 14 }}
            outline
            onClick={() => navigation.goBack()}
          />
        </View>
      </View>
    </View>
  );
};

export default HomeModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FBF7FF",
    flex: 1,
  },
  goalPassed: {
    marginTop: Constants.statusBarHeight + 8,
  },
  goalText: {
    fontSize: 36,
    color: COLORS.neutral_20,
    marginBottom: 16,
    textAlign: "center",
  },
  congrats: {
    fontSize: 20,
    color: COLORS.neutral_60,
    marginBottom: 10,
    textAlign: "center",
  },
  complete: {
    fontSize: 20,
    color: COLORS.neutral_60,
    textAlign: "center",
    marginBottom: 32,
  },
  activitiesBottom: {
    backgroundColor: "transparent",
    borderWidth: 0,
    marginTop: 0,
  },
  buttons: {
    backgroundColor: COLORS.blackLight,
    borderTopWidth: 1,
    borderTopColor: COLORS.neutral_ed,
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: "12.3%",
  },
  button: {
    width: "45%",
  },
});
