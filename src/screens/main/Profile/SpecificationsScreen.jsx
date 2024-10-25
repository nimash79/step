import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Constants from "expo-constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import SubmitIcon from "./../../../components/Icons/ProfileIcons/SubmitIcon";
import CustomText from "../../../components/Shared/CustomText";
import DiscardIcon from "../../../components/Icons/ProfileIcons/DiscardIcon";
import { COLORS } from "../../../utils/constants";
import ArrowLeftIcon from "../../../components/Icons/ArrowLeftIcon";
import FlowerIcon from "../../../components/Icons/FlowerIcon";
import HomeIcon from "../../../components/Icons/HomeIcon";
import TreeIcon from "../../../components/Icons/TreeIcon";
import BuildingIcon from "../../../components/Icons/BuildingIcon";
import GymIcon from "../../../components/Icons/GymIcon";
import PlusOutlineIcon from "./../../../components/Icons/PlusOutlineIcon";
import GenderModal from "../../../components/modals/SpecificationsModals/GenderModal";
import BirthdayModal from "../../../components/modals/SpecificationsModals/BirthdayModal";
import HeightModal from "../../../components/modals/SpecificationsModals/HeightModal";
import WeightModal from "../../../components/modals/SpecificationsModals/WeightModal";
import SensitivityModal from "../../../components/modals/SpecificationsModals/SensitivityModal";
import WeeklyGoalModal from "../../../components/modals/SpecificationsModals/WeeklyGoalModal";
import UserProblemModal from "../../../components/modals/SpecificationsModals/UserProblemModal";
import PlacesModal from "../../../components/modals/SpecificationsModals/PlacesModal";
import PurposeStepsModal from "../../../components/modals/SpecificationsModals/PurposeStepsModal";
import { getUserInfo, updateUser } from "../../../services/accountService";
import { e2p, miladiToPersian } from "../../../utils/convertors";
import { addUser, removeUser } from "../../../redux/reducers/userReducer";
import WarningAlert from "../../../components/alerts/WarningAlert";
import SuccessAlert from "../../../components/alerts/SuccessAlert";
import ErrorAlert from "../../../components/alerts/ErrorAlert";
import InfoAlert from "../../../components/alerts/InfoAlert";

const SpecificationsScreen = ({ navigation }) => {
  const [gender, setGender] = useState();
  const [birthDate, setBirthDate] = useState();
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const [purposeSteps, setPurposeSteps] = useState();
  const [sensitivity, setSensitivity] = useState();
  const [weeklyGoal, setWeeklyGoal] = useState();
  const [userProblem, setUserProblem] = useState();
  const [sportPlaces, setSportPlaces] = useState([]);
  const [genderModal, setGenderModal] = useState(false);
  const [birthdayModal, setBirthdayModal] = useState(false);
  const [heightModal, setHeightModal] = useState(false);
  const [weightModal, setWeightModal] = useState(false);
  const [sensitivityModal, setSensitivityModal] = useState(false);
  const [weeklyGoalModal, setWeeklyGoalModal] = useState(false);
  const [userProblemModal, setUserProblemModal] = useState(false);
  const [placesModal, setPlacesModal] = useState(false);
  const [puposeStepsModal, setPurposeStepsModal] = useState(false);
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
    setGender(user?.gender);
    setBirthDate(user?.birth_date);
    setHeight(user?.height);
    setWeight(user?.weight);
    setPurposeSteps(user?.purposeSteps);
    setSensitivity(user?.sensitivity);
    setWeeklyGoal(user?.weeklyGoal);
    setUserProblem(user?.userProblem);
    setSportPlaces(user?.sportPlaces);
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
      const { data } = await updateUser({
        user: {},
        gender,
        birth_date: birthDate,
        height,
        weight,
        purposeSteps,
        sensitivity,
        weeklyGoal,
        userProblem,
        sportPlaces,
      });
      console.log(data);
      if (data.status === 200) {
        const res = await getUserInfo();
        dispatch(removeUser());
        dispatch(addUser(res.data.data));
        setSuccessText("عملیات با موفقیت انجام شد.");
        setSuccess(true);
      }
    } catch (err) {
      console.log(err);
      setErrorText("مشکلی از سمت سرور رخ داده است.")
      setError(true);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <GenderModal
        visible={genderModal}
        setVisible={setGenderModal}
        gender={gender}
        setGender={setGender}
      />
      <BirthdayModal
        visible={birthdayModal}
        setVisible={setBirthdayModal}
        birthDate={birthDate}
        setBirthDate={setBirthDate}
      />
      <HeightModal
        visible={heightModal}
        setVisible={setHeightModal}
        height={height}
        setHeight={setHeight}
      />
      <WeightModal
        visible={weightModal}
        setVisible={setWeightModal}
        weight={weight}
        setWeight={setWeight}
      />
      <SensitivityModal
        visible={sensitivityModal}
        setVisible={setSensitivityModal}
        sensitivity={sensitivity}
        setSensitivity={setSensitivity}
      />
      <WeeklyGoalModal
        visible={weeklyGoalModal}
        setVisible={setWeeklyGoalModal}
        goal={weeklyGoal}
        setGoal={setWeeklyGoal}
      />
      <UserProblemModal
        visible={userProblemModal}
        setVisible={setUserProblemModal}
        userProblem={userProblem}
        setUserProblem={setUserProblem}
      />
      <PlacesModal
        visible={placesModal}
        setVisible={setPlacesModal}
        sportPlaces={sportPlaces}
        setSportPlaces={setSportPlaces}
      />
      <PurposeStepsModal
        visible={puposeStepsModal}
        setVisible={setPurposeStepsModal}
        purposeSteps={purposeSteps}
        setPurposeSteps={setPurposeSteps}
      />
      <View style={styles.header}>
        <TouchableWithoutFeedback onPress={submit}>
          <View style={styles.submitIcon}>
            <SubmitIcon />
          </View>
        </TouchableWithoutFeedback>
        <CustomText fontStyle="bold" style={styles.headerText}>
          مشخصات من
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
      <View style={styles.buttons}>
        <TouchableOpacity onPress={() => setGenderModal(true)}>
          <View style={styles.button}>
            <CustomText fontStyle="semibold" style={styles.buttonText}>
              جنسیت
            </CustomText>
            <CustomText style={styles.buttonSubtext}>{gender}</CustomText>
            <ArrowLeftIcon color={COLORS.neutral_86} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setBirthdayModal(true)}>
          <View style={styles.button}>
            <CustomText fontStyle="semibold" style={styles.buttonText}>
              تاریخ تولد
            </CustomText>
            <CustomText style={styles.buttonSubtext}>
              {birthDate && e2p(miladiToPersian(birthDate))}
            </CustomText>
            <ArrowLeftIcon color={COLORS.neutral_86} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setHeightModal(true)}>
          <View style={styles.button}>
            <CustomText fontStyle="semibold" style={styles.buttonText}>
              قد
            </CustomText>
            <CustomText style={styles.buttonSubtext}>
              {e2p(height)} سانتی متر
            </CustomText>
            <ArrowLeftIcon color={COLORS.neutral_86} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setWeightModal(true)}>
          <View style={[styles.button, styles.buttonWithoutBorder]}>
            <CustomText fontStyle="semibold" style={styles.buttonText}>
              وزن
            </CustomText>
            <CustomText style={styles.buttonSubtext}>
              {e2p(weight)} کیلو
            </CustomText>
            <ArrowLeftIcon color={COLORS.neutral_86} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity onPress={() => setPurposeStepsModal(true)}>
          <View style={styles.button}>
            <CustomText fontStyle="semibold" style={styles.buttonText}>
              تعداد گام هدف
            </CustomText>
            <CustomText style={styles.buttonSubtext}>
              {e2p(purposeSteps)}
            </CustomText>
            <ArrowLeftIcon color={COLORS.neutral_86} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSensitivityModal(true)}>
          <View style={styles.button}>
            <CustomText fontStyle="semibold" style={styles.buttonText}>
              میزان حساسیت
            </CustomText>
            <CustomText style={styles.buttonSubtext}>{sensitivity}</CustomText>
            <ArrowLeftIcon color={COLORS.neutral_86} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setWeeklyGoalModal(true)}>
          <View style={styles.button}>
            <CustomText fontStyle="semibold" style={styles.buttonText}>
              هدف تمرین هفتگی
            </CustomText>
            <CustomText style={styles.buttonSubtext}>
              {e2p(weeklyGoal)}
            </CustomText>
            <ArrowLeftIcon color={COLORS.neutral_86} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setUserProblemModal(true)}>
          <View style={styles.button}>
            <CustomText fontStyle="semibold" style={styles.buttonText}>
              مشکلی در سلامتی
            </CustomText>
            <CustomText style={styles.buttonSubtext}>
              {userProblem === "" ? "ندارم" : "دارم"}
            </CustomText>
            <ArrowLeftIcon color={COLORS.neutral_86} />
          </View>
        </TouchableOpacity>
        <View style={styles.placeContainer}>
          <CustomText fontStyle="semibold" style={styles.buttonText}>
            مکان تمرین
          </CustomText>
          <View style={styles.options}>
            {sportPlaces?.map((place) => (
              <View style={styles.option} key={place}>
                <FlowerIcon color={COLORS.tint5} />
                <CustomText style={styles.optionText}>{place}</CustomText>
              </View>
            ))}
            <TouchableWithoutFeedback onPress={() => setPlacesModal(true)}>
              <View style={styles.plusContainer}>
                <PlusOutlineIcon />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default SpecificationsScreen;

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
  buttons: {
    marginTop: 24,
    backgroundColor: COLORS.backSections,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.neutral_ed,
  },
  buttonText: {
    fontSize: 14,
    color: COLORS.neutral_40,
  },
  buttonWithoutBorder: {
    borderBottomWidth: 0,
  },
  buttonSubtext: {
    fontSize: 14,
    color: COLORS.neutral_86,
    marginLeft: 16,
    flex: 1,
    textAlign: "left",
  },
  placeContainer: {
    paddingVertical: 16,
  },
  options: {
    marginTop: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginLeft: -16,
  },
  option: {
    borderWidth: 1,
    borderColor: COLORS.tint2,
    borderRadius: 16,
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 16,
    marginLeft: 8,
    alignItems: "center",
  },
  optionText: {
    color: COLORS.tint5,
    fontSize: 14,
    marginLeft: 4,
  },
  plusContainer: {
    marginLeft: 16,
  },
});
