import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Switch } from "react-native-switch";

import BackIcon from "../../../components/Icons/BackIcon";
import Constants from "expo-constants";
import CustomText from "../../../components/Shared/CustomText";
import { COLORS } from "../../../utils/constants";
import ArrowLeftIcon from "./../../../components/Icons/ArrowLeftIcon";
import PersonalInformationIcon from "./../../../components/Icons/ProfileIcons/PersonalInformationIcon";
import MySpecificationsIcon from "./../../../components/Icons/ProfileIcons/MySpecificationsIcon";
import CalendarIcon from "./../../../components/Icons/ProfileIcons/CalendarIcon";
import ClockIcon from "./../../../components/Icons/ProfileIcons/ClockIcon";
import LittleStepsVerticalIcon from "../../../components/Icons/LittleStepsVerticalIcon";
import LittleStepsFilledIcon from "./../../../components/Icons/ProfileIcons/LittleStepsFilledIcon";
import { useEffect, useState } from "react";
import FaqIcon from "./../../../components/Icons/ProfileIcons/FaqIcon";
import AboutUsIcon from "./../../../components/Icons/ProfileIcons/AboutUsIcon";
import ContactUsIcon from "./../../../components/Icons/ProfileIcons/ContactUsIcon";
import LogoutIcon from "./../../../components/Icons/ProfileIcons/LogoutIcon";
import LogoutModal from "../../../components/modals/LogoutModal";
import ReminderModal from "../../../components/modals/ReminderModal";
import { e2p, twoDigit } from "../../../utils/convertors";
import { updateUser } from "../../../services/accountService";

const level1 = require("../../../components/Icons/LevelIcons/1.png");
const level2 = require("../../../components/Icons/LevelIcons/2.png");
const level3 = require("../../../components/Icons/LevelIcons/3.png");
const level4 = require("../../../components/Icons/LevelIcons/4.png");
const level5 = require("../../../components/Icons/LevelIcons/5.png");
const level6 = require("../../../components/Icons/LevelIcons/6.png");
const level7 = require("../../../components/Icons/LevelIcons/7.png");
const level8 = require("../../../components/Icons/LevelIcons/8.png");
const level9 = require("../../../components/Icons/LevelIcons/9.png");
const level10 = require("../../../components/Icons/LevelIcons/10.png");

const SettingsScreen = ({ navigation, route }) => {
  const [reminder, setReminder] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const [reminderModal, setReminderModal] = useState(false);
  const [reminderHour, setReminderHour] = useState(0);
  const [reminderMinute, setReminderMinute] = useState(0);
  const [reminderUpdated, setReminderUpdated] = useState(false);

  useEffect(() => {
    setReminder(route.params.reminder);
    setReminderHour(route.params.reminderHour);
    setReminderMinute(route.params.reminderMinute);
    delete route.params.profileImage;
    delete route.params.user;
    console.log(route.params);
  }, [route.params]);

  useEffect(() => {
    if (reminderUpdated) updateReminder();
  }, [reminderUpdated]);

  const updateReminder = async () => {
    try {
      const res = await updateUser({
        user: {},
        ...route.params,
        reminder: true,
        reminderHour,
        reminderMinute,
      });
      console.log(res.data);
      setReminderUpdated(false);
    } catch (err) {
      console.log(err);
    }
  };

  const getLevelImage = (level) => {
    switch (level) {
      case 1:
        return level1;
      case 2:
        return level2;
      case 3:
        return level3;
      case 4:
        return level4;
      case 5:
        return level5;
      case 6:
        return level6;
      case 7:
        return level7;
      case 8:
        return level8;
      case 9:
        return level9;
      case 10:
        return level10;
      default:
        return level1;
    }
  };
  return (
    <ScrollView style={styles.container}>
      <ReminderModal
        visible={reminderModal}
        setVisible={setReminderModal}
        reminderHour={reminderHour}
        reminderMinute={reminderMinute}
        setReminderHour={setReminderHour}
        setReminderMinute={setReminderMinute}
        setReminderUpdated={setReminderUpdated}
      />
      <LogoutModal
        visible={logoutModal}
        setVisible={setLogoutModal}
        navigation={navigation}
      />
      <View style={styles.header}>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <View style={styles.backIcon}>
            <BackIcon />
          </View>
        </TouchableWithoutFeedback>
        <CustomText fontStyle="bold" style={styles.headerText}>
          تنظیمات و فعالیت ها
        </CustomText>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity
          onPress={() => navigation.navigate("PersonalInformation")}
        >
          <View style={[styles.button, styles.buttonBorder]}>
            <PersonalInformationIcon />
            <CustomText fontStyle="semibold" style={styles.buttonText}>
              اطلاعات شخصی
            </CustomText>
            <ArrowLeftIcon color={COLORS.neutral_86} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Specifications")}>
          <View style={styles.button}>
            <MySpecificationsIcon />
            <CustomText fontStyle="semibold" style={styles.buttonText}>
              مشخصات من
            </CustomText>
            <ArrowLeftIcon color={COLORS.neutral_86} />
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Achievements", {
            level: route.params.level,
            score: route.params.score,
          })
        }
      >
        <View style={styles.levelContainer}>
          <Image
            source={getLevelImage(route.params.level)}
            style={styles.levelImage}
          />
          <View style={styles.levelText}>
            <CustomText fontStyle="semibold" style={styles.levelTitle}>
              سطح {e2p(route.params.level)}
            </CustomText>
            <CustomText fontStyle="semibold" style={styles.levelSubtitle}>
              درحال پیشرفتی! ادامه بده!
            </CustomText>
          </View>
          <ArrowLeftIcon color={COLORS.neutral_86} />
        </View>
      </TouchableOpacity>
      <View style={styles.buttons}>
        <View style={styles.button}>
          <CalendarIcon />
          <CustomText fontStyle="semibold" style={styles.buttonText}>
            یادآور روزانه
          </CustomText>
          <Switch
            value={reminder}
            onValueChange={(val) => {
              setReminderUpdated(!val);
              setReminder(val);
            }}
            renderInsideCircle={() => (
              <LittleStepsFilledIcon
                color={reminder ? COLORS.tint1 : COLORS.neutral_ad}
              />
            )}
            circleActiveColor={COLORS.primary}
            circleInActiveColor={COLORS.tint0}
            circleBorderWidth={0}
            circleSize={24}
            renderActiveText={false}
            renderInActiveText={false}
            backgroundActive={COLORS.tint1}
            backgroundInactive={COLORS.neutral_ad}
            containerStyle={
              reminder ? { borderWidth: 1, borderColor: COLORS.primary } : {}
            }
            barHeight={32}
            switchWidthMultiplier={2.4}
          />
        </View>
        <TouchableOpacity
          onPress={() => setReminderModal(true)}
          disabled={!reminder}
        >
          <View style={styles.button}>
            <ClockIcon />
            <CustomText
              fontStyle="semibold"
              style={[styles.buttonText, { flex: 0 }]}
            >
              زمان یادآوری
            </CustomText>
            <CustomText style={styles.reminderTime}>
              {e2p(twoDigit(reminderHour))}:{e2p(twoDigit(reminderMinute))}
            </CustomText>
            <ArrowLeftIcon color={COLORS.neutral_86} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity onPress={() => navigation.navigate("Faq")}>
          <View style={[styles.button, styles.buttonBorder]}>
            <FaqIcon />
            <CustomText fontStyle="semibold" style={styles.buttonText}>
              سوالات متداول
            </CustomText>
            <ArrowLeftIcon color={COLORS.neutral_86} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("AboutUs")}>
          <View style={[styles.button, styles.buttonBorder]}>
            <AboutUsIcon />
            <CustomText fontStyle="semibold" style={styles.buttonText}>
              درباره ما
            </CustomText>
            <ArrowLeftIcon color={COLORS.neutral_86} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ContactUs", {
              username: route.params.username,
            })
          }
        >
          <View style={[styles.button, styles.buttonBorder]}>
            <ContactUsIcon />
            <CustomText fontStyle="semibold" style={styles.buttonText}>
              ارتباط با ما
            </CustomText>
            <ArrowLeftIcon color={COLORS.neutral_86} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setLogoutModal(true)}>
          <View style={styles.button}>
            <LogoutIcon />
            <CustomText
              fontStyle="semibold"
              style={[styles.buttonText, { color: COLORS.error }]}
            >
              خروج از حساب
            </CustomText>
            <ArrowLeftIcon color={COLORS.neutral_86} />
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBF7FF",
    paddingHorizontal: "5%",
    marginTop: Constants.statusBarHeight,
  },
  header: {
    marginTop: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  backIcon: {
    position: "absolute",
    left: 0,
  },
  headerText: {
    fontSize: 20,
    color: COLORS.neutral_40,
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
  },
  buttonText: {
    fontSize: 14,
    color: COLORS.neutral_40,
    marginLeft: 8,
    flex: 1,
  },
  buttonBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.neutral_ed,
  },
  levelContainer: {
    marginTop: 16,
    backgroundColor: COLORS.backSections,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    padding: 16,
  },
  levelImage: {
    width: 32,
    height: 38,
  },
  levelText: {
    marginLeft: 16,
    flex: 1,
  },
  levelTitle: {
    fontSize: 14,
    color: COLORS.shade2,
  },
  levelSubtitle: {
    fontSize: 10,
    color: COLORS.neutral_60,
    marginTop: 8,
  },
  reminderTime: {
    fontSize: 14,
    color: COLORS.neutral_86,
    marginLeft: 16,
    flex: 1,
    textAlign: "left",
  },
});
