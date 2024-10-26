import { StyleSheet, View, Dimensions, Image } from "react-native";
import { CommonActions } from "@react-navigation/native";

import DefaultLayout from "../../layouts/DefaultLayout";
import CustomHeader from "../../components/Shared/CustomHeader";
import CustomInput from "../../components/Shared/CustomInput";
import UserIcon from "../../components/Icons/UserIcon";
import EmailIcon from "../../components/Icons/EmailIcon";
import UserBorderedIcon from "../../components/Icons/UserBorderedIcon";
import KeyIcon from "../../components/Icons/KeyIcon";
import LockIcon from "../../components/Icons/LockIcon";
import GiftIcon from "../../components/Icons/GiftIcon";
import CustomText from "../../components/Shared/CustomText";
import CustomButton from "../../components/Shared/CustomButton";
import CustomLink from "../../components/Shared/CustomLink";
import { useEffect, useState } from "react";
import { getUserInfo, register } from "../../services/accountService";
import { errorAlert } from "../../utils/alert";
import CustomPasswordInput from "../../components/Shared/CustomPasswordInput";
import LoadingModal from "../../components/modals/LoadingModal";
import ErrorAlert from "../../components/alerts/ErrorAlert";
import { addRefreshToken, addToken } from "../../utils/data_storage";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../../redux/reducers/userReducer";

const RegisterScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [first_name, setFirst_name] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [referrerCode, setReferrerCode] = useState("");
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    let timeout;
    if (error) {
      timeout = setTimeout(() => {
        setError(false);
      }, 3000);
    } else clearTimeout(timeout);
  }, [error]);

  const submit = async () => {
    // form validation
    if (!first_name.length) {
      setErrorText("نام و نام خانوادگی را وارد کنید.");
      setError(true);
      return;
    } else if (!email.length) {
      setErrorText("ایمیل را وارد کنید.");
      setError(true);
      return;
    } else if (!username.length) {
      setErrorText("نام کاربری را وارد کنید.");
      setError(true);
      return;
    } else if (!password.length) {
      setErrorText("رمز عبور را وارد کنید.");
      setError(true);
      return;
    } else if (!confirmPassword.length) {
      setErrorText("تایید رمز عبور را وارد کنید.");
      setError(true);
      return;
    }
    if (password !== confirmPassword) {
      setErrorText("رمز عبور و تکرار رمز عبور با هم مغایرت دارد.");
      setError(true);
      return;
    }
    try {
      setModalVisible(true);
      const response = await register({
        first_name,
        email,
        username: username.toLowerCase(),
        password,
        referrerCode,
      });
      console.log(response.data);
      await addToken(response.data.access);
      await addRefreshToken(response.data.refresh);
      dispatch(removeUser());
      const userRes = await getUserInfo();
      dispatch(addUser(userRes.data.data));
      const action = CommonActions.reset({
        index: 0,
        routes: [{ name: "SuccessfulLogin" }],
      });
      navigation.dispatch(action);
      setModalVisible(false);
    } catch (err) {
      setModalVisible(false);
      console.log(err);
      setErrorText("مشکلی از سمت سرور رخ داده است.");
      setError(true);
    }
  };
  return (
    <DefaultLayout>
      <LoadingModal text="در حال ثبت نام ..." visible={modalVisible} />
      <ErrorAlert
        visible={error}
        setVisible={setError}
        text={errorText}
        style={{ width: "90%", alignSelf: "center" }}
      />
      <Image
        source={require("../../../assets/inapp/register.png")}
        style={styles.registerImage}
        resizeMode="contain"
      />
      <View style={styles.content}>
        <CustomHeader style={styles.header}>ایجاد حساب کاربری</CustomHeader>
        <CustomInput
          placeholder="نام و نام خانوادگی"
          icon={<UserIcon />}
          onChangeText={setFirst_name}
        />
        <CustomInput
          placeholder="ایمیل"
          icon={<EmailIcon />}
          onChangeText={setEmail}
        />
        <CustomInput
          placeholder="نام کاربری"
          icon={<UserBorderedIcon />}
          onChangeText={setUsername}
        />
        <CustomPasswordInput
          placeholder="انتخاب رمز عبور"
          icon={<KeyIcon />}
          onChangeText={setPassword}
          align="right"
        />
        <CustomPasswordInput
          placeholder="تکرار رمز عبور"
          icon={<LockIcon />}
          onChangeText={setConfirmPassword}
          align="right"
        />
        <CustomInput
          placeholder="کد معرف (در صورت داشتن کد معرف اینجا وارد کنید)"
          icon={<GiftIcon />}
          onChangeText={setReferrerCode}
          inputStyle={{ fontSize: 12 }}
        />
        <CustomButton
          text="ایجاد حساب کاربری"
          style={styles.button}
          onClick={submit}
        />
        <View style={styles.guide}>
          <CustomText fontStyle="bold" style={{ fontSize: 10, marginRight: 8 }}>
            قبلا حساب کاربری ساخته بودی؟
          </CustomText>
          <CustomLink
            fontStyle="bold"
            style={{ fontSize: 10 }}
            onClick={() => navigation.replace("Login")}
          >
            وارد شوید
          </CustomLink>
        </View>
      </View>
    </DefaultLayout>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  content: {
    marginTop: 20,
    width: "90%",
    alignSelf: "center",
  },
  registerImage: {
    width: "100%",
    height: 0.25 * Dimensions.get("window").height,
  },
  header: {
    marginBottom: 16,
  },
  checkBoxContainer: {
    flexDirection: "row",
  },
  checkBoxText: {
    color: "#606060",
    fontSize: 10,
    marginLeft: 8,
  },
  button: {
    marginVertical: 8,
  },
  guide: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 8,
  },
});
