import { StyleSheet, TextInput, View } from "react-native";
import { useRef, useState } from "react";

import ForgotLayout from "../../layouts/ForgotLayout";
import CustomButton from "../../components/Shared/CustomButton";
import CustomText from "../../components/Shared/CustomText";
import CustomLink from "../../components/Shared/CustomLink";
import { errorAlert } from "../../utils/alert";
import { checkPasswordRecovery, passwordRecovery } from "../../services/accountService";
import LoadingModal from "../../components/modals/LoadingModal";

const ResendCodeScreen = ({ navigation, route }) => {
  const [disabled, setDisabled] = useState(true);
  const [visible, setVisible] = useState(false);
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [input4, setInput4] = useState("");
  const [sendEmail, setSendEmail] = useState(false);
  const [focusInput, setFocusInput] = useState();

  const {email} = route.params;

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);

  const resend = async () => {
    try {
      const {data} = await passwordRecovery({ email });
      console.log(data);
      if (data.status == 200) setSendEmail(true);
      else if (data.status === 404) errorAlert("پیدا نشد!", "ایمیل وارد شده وجود ندارد.")
    } catch (err) {
      console.log(err);
      errorAlert();
    }
  }

  const submit = async () => {
    try {
      setVisible(true);
      const {data} = await checkPasswordRecovery({digit: `${input1}${input2}${input3}${input4}`});
      if (data.status == 200) navigation.navigate("ResetPassword");
      else if (data.status == 404) errorAlert("نامعتبر!", "کد وارد شده معتبر نمی باشد.");
    } catch (err) {
      console.log(err);
      errorAlert();
    }
    setVisible(false);
  };
  return (
    <ForgotLayout
      navigation={navigation}
      sendEmail={sendEmail}
      setSendEmail={setSendEmail}
    >
      <LoadingModal text="در حال تایید ..." visible={visible} /> 
      <CustomText style={{ marginBottom: 30, fontSize: 20 }} fontStyle="bold">
        کد تأیید را وارد کنید!
      </CustomText>
      <CustomText style={styles.guide}>
        لطفا کد تأیید ۴ رقمی را که ما به تازگی به ایمیل شما ارسال کرده ایم را
        وارد کنید.
      </CustomText>
      <View style={styles.inputs}>
        <TextInput
          ref={ref1}
          style={
            focusInput === 1 ? [styles.input, styles.activeInput] : styles.input
          }
          keyboardType="numeric"
          maxLength={1}
          cursorColor="#7B61FF"
          onChangeText={(value) => {
            setInput1(value);
            if (value.length === 1) ref2.current.focus();
          }}
          onFocus={() => setFocusInput(1)}
        />
        <TextInput
          ref={ref2}
          style={
            focusInput === 2 ? [styles.input, styles.activeInput] : styles.input
          }
          keyboardType="numeric"
          maxLength={1}
          cursorColor="#7B61FF"
          onChangeText={(value) => {
            setInput2(value);
            if (value.length === 1) ref3.current.focus();
            else ref1.current.focus();
          }}
          onFocus={() => setFocusInput(2)}
        />
        <TextInput
          ref={ref3}
          style={
            focusInput === 3 ? [styles.input, styles.activeInput] : styles.input
          }
          keyboardType="numeric"
          cursorColor="#7B61FF"
          maxLength={1}
          onChangeText={(value) => {
            setInput3(value);
            if (value.length === 1) ref4.current.focus();
            else ref2.current.focus();
          }}
          onFocus={() => setFocusInput(3)}
        />
        <TextInput
          ref={ref4}
          style={
            focusInput === 4 ? [styles.input, styles.activeInput] : styles.input
          }
          keyboardType="numeric"
          cursorColor="#7B61FF"
          maxLength={1}
          onChangeText={(value) => {
            setInput4(value);
            if (value.length === 1) setDisabled(false);
            else {
              setDisabled(true);
              ref3.current.focus();
            }
          }}
          onFocus={() => setFocusInput(4)}
        />
      </View>
      <CustomButton
        text="تایید"
        style={disabled ? styles.disabled : {}}
        onClick={submit}
        disabled={disabled}
      />
      <View style={styles.guideLink}>
        <CustomText style={{ fontSize: 12, marginRight: 8 }}>
          کد را دریافت کردید؟
        </CustomText>
        <CustomLink
          fontStyle="semibold"
          style={{ fontSize: 12 }}
          withoutUnderlay
          onClick={resend}
        >
          ارسال مجدد کد
        </CustomLink>
      </View>
    </ForgotLayout>
  );
};

export default ResendCodeScreen;

const styles = StyleSheet.create({
  guide: {
    fontSize: 14,
    color: "#404040",
    marginBottom: 32,
  },
  disabled: {
    backgroundColor: "#D7D0FF",
  },
  guideLink: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "center",
  },
  inputs: {
    flexDirection: "row-reverse",
    justifyContent: "space-around",
    marginBottom: 32,
    width: "90%",
    alignSelf: "center",
  },
  input: {
    width: 48,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#CBCBCB",
    textAlign: "center",
    fontSize: 16,
  },
  activeInput: {
    borderColor: "#7B61FF",
  },
});
