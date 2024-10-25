import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";

import DefaultLayout from "../../layouts/DefaultLayout";
import CustomHeader from "../../components/Shared/CustomHeader";
import { SPACES } from "../../utils/constants";
import CustomText from "../../components/Shared/CustomText";
import CustomButton from "../../components/Shared/CustomButton";
import GoalPassed from "../../components/Svgs/GoalPassed";

const SuccessfulLoginScreen = ({ navigation }) => {
  return (
    <DefaultLayout>
      <GoalPassed style={{ marginTop: "28.5%" }} />
      <View style={styles.content}>
        <CustomHeader
          style={{
            marginTop: SPACES.vertical * 2,
            marginBottom: SPACES.vertical * 2,
          }}
        >
          ورود شما با موفقیت انجام شد!
        </CustomHeader>
        <CustomText style={{ fontSize: 16, marginBottom: SPACES.vertical * 2 }}>
          حالا برای اینکه استپ بازدهی بهتری برای شما داشته باشه، ما دوست داریم
          که تو رو بهتر بشناسیم و اهداف ورزشیت رو بدونیم! پس به چندتا سوالی که
          برات آماده کردیم پاسخ بده.
        </CustomText>
        <CustomButton
          text="بزن بریم"
          onClick={() => navigation.navigate("Steps")}
        />
        <TouchableWithoutFeedback onPress={() => navigation.replace("Main")}>
          <View>
            <CustomText
              style={{ marginTop: 8, color: "#ADADAD", fontSize: 16 }}
            >
              رد کردن
            </CustomText>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </DefaultLayout>
  );
};

export default SuccessfulLoginScreen;

const styles = StyleSheet.create({
  content: {
    width: "90%",
    alignSelf: "center",
    alignItems: "center",
  },
});
