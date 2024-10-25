import {
  Image,
  StyleSheet,
  View,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import { useEffect, useState } from "react";
import { CommonActions } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import DefaultLayout from "../../layouts/DefaultLayout";
import CustomHeader from "../../components/Shared/CustomHeader";
import CustomInput from "../../components/Shared/CustomInput";
import UserIcon from "../../components/Icons/UserIcon";
import LockIcon from "../../components/Icons/LockIcon";
import CustomText from "../../components/Shared/CustomText";
import CustomButton from "../../components/Shared/CustomButton";
import CustomLink from "../../components/Shared/CustomLink";
import { loginUser } from "../../utils/authentication";
import CustomPasswordInput from "../../components/Shared/CustomPasswordInput";
import { errorAlert } from "../../utils/alert";
import LoadingModal from "../../components/modals/LoadingModal";
import { addToken, removeToken } from "../../utils/data_storage";
import { getUserInfo, login } from "../../services/accountService";
import { addUser, removeUser } from "../../redux/reducers/userReducer";
import ErrorAlert from "./../../components/alerts/ErrorAlert";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await removeToken();
    })();
  }, []);

  useEffect(() => {
    let timeout;
    if (error) {
      timeout = setTimeout(() => {
        setError(false);
      }, 3000);
    } else clearTimeout(timeout);
  }, [error])

  const submit = async () => {
    try {
      setModalVisible(true);
      const loginRes = await login({
        username: username.toLowerCase(),
        password,
      });
      await addToken(loginRes.data.access);
      const { data } = await getUserInfo();
      console.log(data);
      if (data.status !== 200) throw new Error("login failed from server!");
      dispatch(removeUser());
      dispatch(addUser(data.data));
      const action = CommonActions.reset({
        index: 0,
        routes: [{ name: data.data.userProfile ? "Main" : "SuccessfulLogin" }],
      });
      navigation.dispatch(action);
      setModalVisible(false);
    } catch (err) {
      setModalVisible(false);
      console.log(err);
      if (err.status === 401) {
        setErrorText("نام کاربری و رمز عبور اشتباه می باشد.");
        setError(true);
      } else {
        setErrorText("مشکلی از سمت سرور رخ داده است.");
        setError(true);
      }
    }
  };
  return (
    <DefaultLayout>
      <LoadingModal text="در حال ورود ..." visible={modalVisible} />
      <ErrorAlert
        visible={error}
        setVisible={setError}
        text={errorText}
        style={{ width: "90%", alignSelf: "center" }}
      />
      <Image
        source={require("../../../assets/inapp/login.png")}
        style={styles.loginImage}
        resizeMode="contain"
      />
      <View style={styles.content}>
        <CustomHeader style={styles.header}>ورود به حساب کاربری</CustomHeader>
        <CustomInput
          placeholder="نام کاربری"
          icon={<UserIcon />}
          onChangeText={setUsername}
        />
        <CustomPasswordInput
          placeholder="رمز عبور"
          icon={<LockIcon />}
          onChangeText={setPassword}
          align="right"
        />
        {/* <View style={styles.checkBoxContainer}>
          <CustomCheckbox value={rememberMe} onValueChange={setRememberMe} />
          <CustomText style={styles.checkBoxText}>
            من را به خاطر بسپار
          </CustomText>
        </View> */}
        <CustomLink
          style={{ fontSize: 10 }}
          withoutUnderlay={true}
          onClick={() => navigation.navigate("ForgotPassword")}
        >
          فراموشی رمز عبور
        </CustomLink>
        <CustomButton text="ورود" style={styles.button} onClick={submit} />
        <View style={styles.guide}>
          <CustomText fontStyle="bold" style={{ fontSize: 10, marginRight: 8 }}>
            هنوز ثبت نام نکردی؟
          </CustomText>
          <CustomLink
            fontStyle="bold"
            style={{ fontSize: 10 }}
            onClick={() => navigation.replace("Register")}
          >
            ثبت نام
          </CustomLink>
        </View>
      </View>
    </DefaultLayout>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  content: {
    marginTop: 32,
    width: "90%",
    alignSelf: "center",
  },
  loginImage: {
    width: "100%",
    height: 0.25 * Dimensions.get("window").height,
  },
  header: {
    marginBottom: 30,
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
    marginTop: 16,
    marginBottom: 16,
  },
  guide: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
