import {
  StyleSheet,
  View,
  Modal,
  Image,
  TouchableWithoutFeedback,
  Share,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { BlurView } from "expo-blur";
import * as Sharing from "expo-sharing";
import { useSelector } from "react-redux";

import CustomText from "../Shared/CustomText";
import { COLORS } from "../../utils/constants";
import LittleFireIcon from "./../Icons/LittleFireIcon";
import {
  e2p,
  miladiToPersian4,
  secondsToLocaleString,
  twoDigit,
} from "../../utils/convertors";
import LittleTimeIcon from "./../Icons/LittleTimeIcon";
import LittleLocationIcon from "./../Icons/LittleLocationIcon";
import LargeStepsIcon from "./../Icons/LargeStepsIcon";
import TelegramIcon from "./../Icons/ProfileIcons/TelegramIcon";
import FacebookIcon from "./../Icons/ProfileIcons/FacebookIcon";
import InstagramIcon from "./../Icons/ProfileIcons/InstagramIcon";
import LinkedinIcon from "./../Icons/ProfileIcons/LinkedinIcon";
import YoutubeIcon from "./../Icons/ProfileIcons/YoutubeIcon";
import DotIcon from "./../Icons/ProfileIcons/DotIcon";
import DiscardIcon from "./../Icons/ProfileIcons/DiscardIcon";
import SaveIcon from "../Icons/SaveIcon";
import config from "../../services/config.json";
import { captureRef } from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";
import { errorAlert, infoAlert } from "../../utils/alert";
import SuccessAlert from "../alerts/SuccessAlert";
import ErrorAlert from "../alerts/ErrorAlert";

const StepResultModal = ({
  visible,
  setVisible,
  onSubmit,
  steps,
  calory,
  meters,
  time,
  score,
  screenshot,
}) => {
  const user = useSelector((state) => state.user);

  const [now, setNow] = useState("2024-10-17 19:33");
  const [success, setSuccess] = useState(false);
  const [successText, setSuccessText] = useState();
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState();
  const [uri, setUri] = useState();

  const [status, requestPermission] = MediaLibrary.usePermissions();

  const modalRef = useRef(null);

  useEffect(() => {
    if (visible) {
      const date = new Date();
      setNow(
        `${date.getFullYear()}-${twoDigit(date.getMonth())}-${twoDigit(
          date.getDate()
        )} ${twoDigit(date.getHours())}:${twoDigit(date.getMinutes())}`
      );
    }
  }, [visible]);

  const shareMore = async () => {
    const localUri = await takeScreenshot();
    await Sharing.shareAsync(localUri);
  };

  const takeScreenshot = async () => {
    const localUri = await captureRef(modalRef, {
      quality: 1,
    });
    return localUri;
  }

  const saveToGallery = async (localUri) => {
    if (status === null) requestPermission();
    try {
      await MediaLibrary.saveToLibraryAsync(localUri);
      setSuccess(true);
      setSuccessText("با موفقیت در گالری ذخیره شد.");
    } catch (err) {
      console.log(err);
      setError(true);
      setErrorText("مشکلی در ذخیره سازی عکس به وجود آمده است.");
    }
  };

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
    }
  };

  useEffect(() => {
    if (!success) clearAlert("success");
    if (!error) clearAlert("error");
    if (success) {
      setTimeout(() => {
        clearAlert("success");
      }, 3000);
    }
    if (error) {
      setTimeout(() => {
        clearAlert("error");
      }, 3000);
    }
  }, [success, error]);

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <BlurView
        intensity={50}
        tint="systemChromeMaterialDark"
        style={styles.centeredView}
      >
        <SuccessAlert
          visible={success}
          setVisible={setSuccess}
          text={successText}
          style={styles.alert}
        />
        <ErrorAlert
          visible={error}
          setVisible={setError}
          text={errorText}
          style={styles.alert}
        />
        <View ref={modalRef} style={styles.modalView}>
          <View style={styles.modalChild}>
            <View style={styles.profileContainer}>
              <Image
                source={{ uri: `${config.url}${user?.profileImage}` }}
                style={styles.profileImage}
              />
              <View style={styles.profileContainerSub}>
                <CustomText fontStyle="semibold" style={styles.name}>
                  {user?.first_name}
                </CustomText>
                <CustomText fontStyle="semibold" style={styles.date}>
                  {e2p(miladiToPersian4(now))}
                </CustomText>
              </View>
            </View>
            <CustomText style={styles.myStep}>استِپ من</CustomText>
            <View style={styles.items}>
              <View
                style={[styles.item, { backgroundColor: COLORS.error_light2 }]}
              >
                <LittleFireIcon />
                <CustomText fontStyle="semibold" style={styles.itemText}>
                  {e2p(calory / 1000)} کیلو کالری
                </CustomText>
              </View>
              <View
                style={[
                  styles.item,
                  { backgroundColor: COLORS.success_light2 },
                ]}
              >
                <LittleLocationIcon />
                <CustomText fontStyle="semibold" style={styles.itemText}>
                  {e2p((meters.toFixed(0) / 1000).toFixed(2))} کیلومتر
                </CustomText>
              </View>
              <View
                style={[
                  styles.item,
                  { backgroundColor: COLORS.warning_light2 },
                ]}
              >
                <LittleTimeIcon />
                <CustomText fontStyle="semibold" style={styles.itemText}>
                  {secondsToLocaleString(time)}
                </CustomText>
              </View>
            </View>
            <Image
              // source={require("../../../assets/inapp/sleep.png")}
              source={{ uri: screenshot }}
              resizeMode="cover"
              style={styles.mapImage}
            />
          </View>
          <View style={styles.modalChild}>
            <LargeStepsIcon style={styles.stepsIcon} />
            <CustomText fontStyle="extrabold" style={styles.stepsText}>
              {e2p(steps)} قدم
            </CustomText>
            <CustomText fontStyle="semibold" style={styles.scoreText}>
              +{e2p(score)} امتیاز
              {"\n"}
              از این تمرین کسب شده است
            </CustomText>
            <CustomText fontStyle="semibold" style={styles.stepText}>
              استِپ
            </CustomText>
          </View>
        </View>
        <View style={styles.shareContainer}>
          <TouchableWithoutFeedback onPress={() => setVisible(false)}>
            <View style={styles.closeShare}>
              <DiscardIcon />
            </View>
          </TouchableWithoutFeedback>
          <CustomText style={styles.shareTitle}>
            اشتراک گذاری تمرین من
          </CustomText>
          <View style={styles.icons}>
            <TouchableWithoutFeedback onPress={shareMore}>
              <View style={styles.icon}>
                <YoutubeIcon />
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={shareMore}>
              <View style={styles.icon}>
                <LinkedinIcon />
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={shareMore}>
              <View style={styles.icon}>
                <InstagramIcon />
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={shareMore}>
              <View style={styles.icon}>
                <FacebookIcon />
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={shareMore}>
              <View style={styles.icon}>
                <TelegramIcon />
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.moreIcons}>
            <TouchableWithoutFeedback onPress={shareMore}>
              <View style={styles.more}>
                <View style={styles.more_icons}>
                  <DotIcon />
                  <DotIcon />
                  <DotIcon />
                </View>
                <CustomText fontStyle="semibold" style={styles.moreText}>
                  بیشتر
                </CustomText>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={async () => {
              const localUri = await takeScreenshot();
              saveToGallery(localUri);
            }}>
              <View style={styles.more}>
                <SaveIcon />
                <CustomText
                  fontStyle="semibold"
                  style={[styles.moreText, { marginTop: 8 }]}
                >
                  ذخیره عکس
                </CustomText>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </BlurView>
    </Modal>
  );
};

export default StepResultModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: "center",
  },
  modalView: {
    backgroundColor: COLORS.tint1,
    margin: 20,
    width: "90%",
    borderRadius: 8,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: COLORS.shade1,
    paddingLeft: 16,
    paddingVertical: 16,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalChild: {
    width: "50%",
    alignItems: "baseline",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  profileImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 8,
  },
  name: {
    fontSize: 14,
    color: COLORS.neutral_20,
  },
  date: {
    fontSize: 10,
    color: COLORS.neutral_60,
  },
  myStep: {
    fontSize: 14,
    color: COLORS.neutral_40,
    marginBottom: 22,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.neutral_cb,
  },
  items: {
    marginBottom: 8,
    alignItems: "baseline",
  },
  item: {
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  itemText: {
    marginLeft: 8,
    fontSize: 10,
    color: COLORS.neutral_60,
  },
  mapImage: {
    width: 130,
    height: 130,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.tint5,
  },
  stepsIcon: {
    alignSelf: "center",
    marginTop: 24,
  },
  stepsText: {
    fontSize: 20,
    color: COLORS.tint5,
    paddingTop: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.tint5,
    marginTop: 16,
    alignSelf: "center",
  },
  scoreText: {
    fontSize: 10,
    color: COLORS.neutral_60,
    textAlign: "center",
    marginTop: 59,
    padding: 8,
    borderWidth: 1,
    borderTopColor: COLORS.tint3,
    borderBottomColor: COLORS.tint3,
    borderRightColor: COLORS.tint1,
    borderLeftColor: COLORS.tint1,
    // borderRadius: 50,
    alignSelf: "center",
  },
  stepText: {
    fontSize: 14,
    color: COLORS.tint3,
    position: "absolute",
    bottom: 0,
    right: 24,
  },
  shareContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.blackMainP,
    borderWidth: 1,
    borderColor: COLORS.neutral_ed,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  closeShare: {
    position: "absolute",
    right: 16,
    top: 16,
    zIndex: 1,
  },
  shareTitle: {
    fontSize: 14,
    color: COLORS.neutral_40,
    textAlign: "center",
    marginTop: 24,
    marginBottom: 16,
  },
  icons: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.neutral_ed,
    width: "85%",
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 32,
    justifyContent: "space-between",
    alignContent: "center",
  },
  more_icons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  moreText: {
    fontSize: 10,
    color: COLORS.neutral_86,
    marginTop: 16,
  },
  moreIcons: {
    flexDirection: "row",
    alignSelf: "center",
    width: "85%",
    justifyContent: "space-around",
    alignItems: "flex-end",
  },
  more: {
    alignItems: "center",
  },
  alert: {
    width: "90%",
  },
});
