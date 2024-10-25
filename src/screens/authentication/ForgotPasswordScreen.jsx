import { StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";

import ForgotLayout from "../../layouts/ForgotLayout";
import CustomButton from "../../components/Shared/CustomButton";
import CustomText from "../../components/Shared/CustomText";
import CustomInput from "../../components/Shared/CustomInput";
import { errorAlert } from "../../utils/alert";
import { passwordRecovery } from "../../services/accountService";
import LoadingModal from "../../components/modals/LoadingModal";

const ForgotPasswordScreen = ({ navigation }) => {
  const [disabled, setDisabled] = useState(true);
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  useEffect(() => {
    if (email.length) setDisabled(false);
    else setDisabled(true);
  }, [email]);
  const submit = async () => {
    try {
      setVisible(true);
      const {data} = await passwordRecovery({ email });
      console.log(data);
      if (data.status == 200) navigation.navigate("ResendCode", {email});
      else if (data.status === 404) errorAlert("پیدا نشد!", "ایمیل وارد شده وجود ندارد.")
    } catch (err) {
      console.log(err);
      errorAlert();
    }
    setVisible(false);
  };
  return (
    <ForgotLayout navigation={navigation}>
      <LoadingModal text="در حال ارسال ..." visible={visible} />
      <CustomText style={{ marginBottom: 30, fontSize: 20 }} fontStyle="bold">
        رمز عبور خود را فراموش کردید؟
      </CustomText>
      <CustomText style={styles.guide}>
        نگران نباش اتفاق می افتد. لطفا آدرس ایمیل مرتبط با حساب کاربری خود را
        وارد کنید. ما کد تأیید ۴ رقمی را برای شما ارسال می کنیم تا به شما کمک
        کنیم رمز عبور خود را بازیابی کنید.
      </CustomText>
      <CustomInput
        placeholder="ایمیل خود را وارد کنید"
        containerStyle={{ marginBottom: 32 }}
        onChangeText={setEmail}
      />
      <CustomButton
        text="ارسال کد"
        style={disabled ? styles.disabled : {}}
        disabled={disabled}
        onClick={submit}
      />
    </ForgotLayout>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  guide: {
    fontSize: 14,
    color: "#404040",
    marginBottom: 32,
  },
  disabled: {
    backgroundColor: "#D7D0FF",
  },
});
