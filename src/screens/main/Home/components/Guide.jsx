import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { useSelector } from "react-redux";

import CustomText from "../../../../components/Shared/CustomText";
import ArrowLeftIcon from "../../../../components/Icons/ArrowLeftIcon";
import { COLORS } from "../../../../utils/constants";

const Guide = ({ navigation, dailyInfo, style }) => {
  const user = useSelector((state) => state.user);
  const getText = () => {
    if (!user?.userProfile)
      return (
        <>
          <CustomText style={styles.text}>
            ما میتونیم فعالیت های روزانه ات رو بهت یادآوری کنیم!
          </CustomText>
          <CustomText style={styles.text}>
            برای این کار باید قسمت استِپ ها رو تکمیل کنی!
          </CustomText>
        </>
      );
    if (!dailyInfo?.dailyExercise)
      return (
        <>
          <CustomText style={styles.text}>
            تمرین هفتگی خودت رو تکمیل کن!
          </CustomText>
        </>
      );
    else
      return (
        <>
          <CustomText style={styles.text}>
            تبریک! تمرینات هفتگی خودت رو تکمیل کردی!
          </CustomText>
          <CustomText style={styles.text}>
            اگر تمایل به تمرینات بیشتری داری ، الان شروع کن!
          </CustomText>
        </>
      );
  };
  return (
    <View style={[styles.guide, style]}>
      {getText()}
      {!user?.userProfile ? (
        <TouchableWithoutFeedback onPress={() => navigation.navigate("Steps")}>
          <View style={styles.button}>
            <CustomText style={styles.buttonText} fontStyle="semibold">
              تکمیل استِپ ها
            </CustomText>
            <ArrowLeftIcon />
          </View>
        </TouchableWithoutFeedback>
      ) : (
        <TouchableWithoutFeedback onPress={() => navigation.navigate("Step")}>
          <View style={[styles.button, { paddingHorizontal: 40 }]}>
            <CustomText
              style={[styles.buttonText, { marginRight: 0 }]}
              fontStyle="semibold"
            >
              شروع
            </CustomText>
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

export default Guide;

const styles = StyleSheet.create({
  guide: {
    marginTop: 16,
    alignItems: "center",
    backgroundColor: COLORS.backSections,
    borderRadius: 8,
  },
  text: {
    fontSize: 14,
  },
  button: {
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    borderRadius: 8,
    paddingVertical: 9,
    paddingHorizontal: 23.5,
    marginBottom: 8,
  },
  buttonText: {
    color: COLORS.neutral_f9,
    fontSize: 14,
    marginRight: 6,
  },
});
