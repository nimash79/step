import { Image, StyleSheet, View } from "react-native";
import CustomText from "../../components/Shared/CustomText";
import CustomButton from "../../components/Shared/CustomButton";

const PaswordChangedScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.gif}>
        <Image source={require("../../../assets/inapp/password-changed.gif")} />
      </View>
      <View style={styles.textWrapper}>
        <CustomText style={styles.text} fontStyle="bold">
          رمز عبور شما با موفقیت تغییر یافت.
        </CustomText>
      </View>
      <CustomButton
        text="بازگشت به صفحه ورود"
        onClick={() => navigation.popToTop()}
        style={styles.button}
      />
    </View>
  );
};

export default PaswordChangedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textWrapper: {
    marginTop: 16,
    marginBottom: 40,
  },
  text: {
    fontSize: 20,
  },
  button: {
    width: "90%",
  },
});
