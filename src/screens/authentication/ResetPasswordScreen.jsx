import { StyleSheet } from "react-native";
import { useEffect, useState } from "react";

import ForgotLayout from "../../layouts/ForgotLayout";
import CustomButton from "../../components/Shared/CustomButton";
import CustomText from "../../components/Shared/CustomText";
import CustomPasswordInput from "../../components/Shared/CustomPasswordInput";
import { changePassword } from "../../services/accountService";
import { errorAlert } from "../../utils/alert";
import LoadingModal from "../../components/modals/LoadingModal";

const ResetPasswordScreen = ({ navigation }) => {
  const [visible, setVisible] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (password.length && confirmPassword.length) setDisabled(false);
    else setDisabled(true);
  }, [password, confirmPassword])

  const submit = async () => {
    try {
      setVisible(true);
      const {data} = await changePassword({new_password: password, confirm_password: confirmPassword});
      console.log(data);
      if (data.status == 200) navigation.navigate("PasswordChanged");
    } catch (err) {
      console.error(err);
      errorAlert();
    }
    setVisible(false);
  };
  return (
    <ForgotLayout navigation={navigation}>
      <LoadingModal text="درحال ذخیره ..." visible={visible} />
      <CustomText style={{ marginBottom: 30, fontSize: 20 }} fontStyle="bold">
        رمز عبور جدید
      </CustomText>
      <CustomText style={styles.guide}>
        رمز عبور جدیدی برای اکانت استپ خود انتخاب کنید. دقت کنید که رمز جدید شما
        امن باشد.
      </CustomText>
      <CustomPasswordInput
        containerStyle={{ marginBottom: 24 }}
        placeholder="رمز عبور جدید"
        onChangeText={setPassword}
      />
      <CustomPasswordInput
        containerStyle={{ marginBottom: 24 }}
        placeholder="تکرار رمز عبور"
        onChangeText={setConfirmPassword}
      />
      <CustomButton
        text="ذخیره رمز جدید"
        style={disabled ? styles.disabled : {}}
        onClick={submit}
        disabled={disabled}
      />
    </ForgotLayout>
  );
};

export default ResetPasswordScreen;

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
