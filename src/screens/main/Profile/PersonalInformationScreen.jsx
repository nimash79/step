import {
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import CircularProgress from "react-native-circular-progress-indicator";

import { useDispatch, useSelector } from "react-redux";
import Constants from "expo-constants";
import CustomText from "../../../components/Shared/CustomText";
import { COLORS } from "../../../utils/constants";
import DiscardIcon from "./../../../components/Icons/ProfileIcons/DiscardIcon";
import SubmitIcon from "./../../../components/Icons/ProfileIcons/SubmitIcon";
import EditProfileModal from "../../../components/modals/EditProfileModal";
import config from "../../../services/config.json";
import CustomInputWithLabel from "./../../../components/Shared/CustomInputWithLabel";
import {
  getUserInfo,
  updateUserWithForm,
} from "./../../../services/accountService";
import { addUser } from "../../../redux/reducers/userReducer";
import WarningAlert from "../../../components/alerts/WarningAlert";
import SuccessAlert from "../../../components/alerts/SuccessAlert";
import ErrorAlert from "../../../components/alerts/ErrorAlert";
import InfoAlert from './../../../components/alerts/InfoAlert';

const PersonalInformationScreen = ({ navigation }) => {
  const [image, setImage] = useState();
  const [firstName, setFirstName] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState(gender);
  const [city, setCity] = useState();
  const [editProfileModal, setEditProfileModal] = useState(false);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState();
  const [warning, setWarning] = useState(false);
  const [warningText, setWarningText] = useState();
  const [success, setSuccess] = useState(false);
  const [successText, setSuccessText] = useState();
  const [info, setInfo] = useState(false);
  const [infoText, setInfoText] = useState();

  const user = useSelector(state => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    setFirstName(user.first_name);
    setUsername(user.username);
    setEmail(user.email);
    setCity(user.city);
    setGender(user.gender);
  }, [user]);

  const clearAlert = (type) => {
    switch (type) {
      case "success":
        setSuccess(false);
      setSuccessText();
      break;
      case "error":
        setError(false);
      setErrorText();
      break;
      case "warning":
        setWarning(false);
      setWarningText();
      break;
      case "info":
        setInfo(false);
      setInfoText();
      break;
    }
  }

  useEffect(() => {
    if (!success) clearAlert("success");
    if (!error) clearAlert("error");
    if (!warning) clearAlert("warning");
    if (!info) clearAlert("info");
    if (success) {
      setTimeout(() => {
        clearAlert("success");
      }, 3000)
    }
    if (error) {
      setTimeout(() => {
        clearAlert("error");
      }, 3000)
    }
    if (warning) {
      setTimeout(() => {
        clearAlert("warning");
      }, 3000)
    }
    if (info) {
      setTimeout(() => {
        clearAlert("info");
      }, 3000)
    }
  }, [success, error, warning, info]);

  const submit = async () => {
    try {
      const formData = new FormData();
      if (image) {
        formData.append("profileImage", {
          uri: image,
          name: image.split("/").pop(),
          type: `$image/${image.split(".").pop()}`,
        });
      }
      formData.append("first_name", firstName);
      formData.append("email", email);
      formData.append("gender", gender);
      formData.append("city", city);
      console.log(formData);
      const { data } = await updateUserWithForm(formData);
      console.log(data);
      if (data.status === 200) {
        const res = await getUserInfo();
        dispatch(addUser(res.data.data));
        setSuccess(true);
        setSuccessText("عملیات با موفقیت انجام شد.");
      } else if (Object.hasOwn(data.error, "email")) {
        if (data.error.email == "This field may not be blank.") setErrorText("وارد کردن ایمیل اجباری می باشد!");
        else if (data.error.email == "Enter a valid email address.") setErrorText("ایمیل معتبر وارد کنید!");
        setError(true);
      }
    } catch (err) {
      console.log(err);
      setErrorText("مشکلی از سمت سرور رخ داده است.");
    }
  };
  return (
    <ScrollView style={styles.container}>
      <EditProfileModal
        visible={editProfileModal}
        setVisible={setEditProfileModal}
        setImage={setImage}
      />
      <View style={styles.header}>
        <TouchableWithoutFeedback onPress={submit}>
          <View style={styles.submitIcon}>
            <SubmitIcon />
          </View>
        </TouchableWithoutFeedback>
        <CustomText fontStyle="bold" style={styles.headerText}>
          اطلاعات شخصی
        </CustomText>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <View style={styles.closeIcon}>
            <DiscardIcon />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <WarningAlert visible={warning} setVisible={setWarning} text={warningText} />
      <SuccessAlert visible={success} setVisible={setSuccess} text={successText} />
      <ErrorAlert visible={error} setVisible={setError} text={errorText} />
      <InfoAlert visible={info} setVisible={setInfo} text={infoText} />
      <View style={styles.profileContainer}>
        <View style={styles.profileOuter}>
          <View style={styles.profileProgress}>
            <CircularProgress
              value={0}
              showProgressValue={false}
              inActiveStrokeColor="transparent"
              activeStrokeColor={COLORS.shade3}
              activeStrokeWidth={4}
              radius={36}
            />
          </View>
          <Image
            source={{
              uri: image || `${config.url}${user.profileImage}`,
            }}
            style={styles.profileImage}
          />
        </View>
        <TouchableWithoutFeedback onPress={() => setEditProfileModal(true)}>
          <View>
            <CustomText fontStyle="semibold" style={styles.addProfileButton}>
              ویرایش عکس
            </CustomText>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.inputs}>
        <CustomInputWithLabel
          label="نام"
          defaultValue={firstName}
          onChangeText={setFirstName}
        />
        <CustomInputWithLabel
          label="نام کاربری"
          defaultValue={username}
          onChangeText={setUsername}
          disable
        />
        <CustomInputWithLabel
          label="ایمیل"
          defaultValue={email}
          onChangeText={setEmail}
        />
        <View style={[styles.inputContainer, styles.radioContainer]}>
          <CustomText style={styles.radioButtonTitle}>جنسیت</CustomText>
          <TouchableWithoutFeedback onPress={() => setGender("زن")}>
            <View style={styles.radioButtonContainer}>
              <View
                style={
                  gender === "زن"
                    ? [styles.radioButton, { borderColor: COLORS.primary }]
                    : styles.radioButton
                }
              >
                {gender === "زن" && (
                  <View style={styles.innerRadioButton}></View>
                )}
              </View>
              <CustomText
                style={
                  gender === "زن"
                    ? [styles.radioButtonLabel, { color: COLORS.primary }]
                    : styles.radioButtonLabel
                }
              >
                زن
              </CustomText>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => setGender("مرد")}>
            <View style={styles.radioButtonContainer}>
              <View
                style={
                  gender === "مرد"
                    ? [styles.radioButton, { borderColor: COLORS.primary }]
                    : styles.radioButton
                }
              >
                {gender === "مرد" && (
                  <View style={styles.innerRadioButton}></View>
                )}
              </View>
              <CustomText
                style={
                  gender === "مرد"
                    ? [styles.radioButtonLabel, { color: COLORS.primary }]
                    : styles.radioButtonLabel
                }
              >
                مرد
              </CustomText>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <CustomInputWithLabel
          label="شهر"
          defaultValue={city}
          onChangeText={setCity}
        />
      </View>
    </ScrollView>
  );
};

export default PersonalInformationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBF7FF",
    paddingHorizontal: "5%",
    marginTop: Constants.statusBarHeight,
  },
  header: {
    marginTop: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    color: COLORS.neutral_40,
    flex: 1,
    textAlign: "center",
  },
  profileContainer: {
    alignSelf: "center",
    marginTop: 24,
    alignItems: "center",
  },
  profileOuter: {
    width: 64,
    height: 64,
  },
  profileProgress: {
    position: "absolute",
    top: -4,
    right: -4,
    // zIndex: 1,
  },
  profileImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  addProfileButton: {
    marginTop: 8,
    fontSize: 10,
    color: COLORS.tint5,
  },
  inputContainer: {
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.neutral_ad,
    marginTop: 24,
  },
  label: {
    position: "absolute",
    backgroundColor: "#FBF7FF",
    paddingHorizontal: 4,
    top: -16,
    left: 20,
    color: COLORS.neutral_86,
    fontSize: 14,
  },
  input: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 24,
    fontFamily: "peyda",
    fontSize: 14,
    textAlign: "right",
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioButtonTitle: {
    fontSize: 14,
    color: COLORS.neutral_86,
    marginLeft: 16,
  },
  radioButtonContainer: {
    marginLeft: 32,
    flexDirection: "row",
    alignItems: "center",
  },
  radioButtonLabel: {
    fontFamily: "peyda_semibold",
    fontSize: 14,
    color: COLORS.neutral_86,
    marginLeft: 8,
  },
  radioButton: {
    width: 16,
    height: 16,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: COLORS.neutral_86,
    justifyContent: "center",
    alignItems: "center",
  },
  innerRadioButton: {
    width: 12,
    height: 12,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
  },
});
