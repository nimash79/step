import {
  StyleSheet,
  View,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { BlurView } from "expo-blur";
import { useEffect, useState } from "react";
import * as Notifications from "expo-notifications";

import CustomText from "../../components/Shared/CustomText";
import { COLORS } from "../../utils/constants";
import { e2p, twoDigit } from "../../utils/convertors";
import ScrollPicker from "react-native-wheel-scrollview-picker";

const ReminderModal = ({
  visible,
  setVisible,
  reminderHour,
  reminderMinute,
  setReminderHour,
  setReminderMinute,
  setReminderUpdated,
}) => {
  const [hours, setHours] = useState([]);
  const [minutes, setMinutes] = useState([]);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [hourIndex, setHourIndex] = useState(0);
  const [minuteIndex, setMinuteIndex] = useState(0);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const hoursList = [];
    const minutesList = [];
    for (let i = 0; i <= 23; i++)
      hoursList.push({ key: i, label: e2p(twoDigit(i)), value: i });
    for (let i = 0; i <= 59; i++)
      minutesList.push({ key: i, label: e2p(twoDigit(i)), value: i });
    setHours(hoursList);
    setMinutes(minutesList);
  }, []);

  useEffect(() => {
    if (visible) {
      setHour(reminderHour);
      setMinute(reminderMinute);
      setHourIndex(hours.findIndex((x) => x.value === reminderHour));
      setMinuteIndex(minutes.findIndex((x) => x.value === reminderMinute));
      setReady(true);
    } else setReady(false);
  }, [visible]);

  const submit = async () => {
    try {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        console.log("Permission not granted for notification.");
        setVisible(false);
        return;
      }
      await Notifications.cancelAllScheduledNotificationsAsync();
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "استِپ",
          body: "امروز یادت نره بدویی!",
        },
        trigger: {
          hour,
          minute,
          repeats: true,
        },
      });
      console.log("scheduled reminder notification");
      setReminderHour(hour);
      setReminderMinute(minute);
      setReminderUpdated(true);
      setVisible(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <BlurView
        intensity={100}
        tint="systemChromeMaterialDark"
        style={styles.centeredView}
      >
        <View style={styles.modalView}>
          <View style={styles.header}>
            <CustomText style={styles.title}>زمان یادآوری</CustomText>
          </View>
          {ready === true && (
            <View style={styles.body}>
              <View style={styles.scrollPickers}>
                <CustomText style={styles.minuteText}>دقیقه</CustomText>
                <ScrollView style={styles.scrollPicker}>
                  <ScrollPicker
                    dataSource={minutes.map((option) => option.label)}
                    selectedIndex={minuteIndex}
                    onValueChange={(value, index) => {
                      setMinuteIndex(index);
                      setMinute(minutes[index].value);
                    }}
                    wrapperHeight={130}
                    itemHeight={54}
                    highlightBorderWidth={0}
                    wrapperBackground="transparent"
                    itemTextStyle={styles.inactiveItemText}
                    activeItemTextStyle={styles.activeItemText}
                  />
                </ScrollView>
                <View style={styles.separator}></View>
                <ScrollView style={styles.scrollPicker}>
                  <ScrollPicker
                    dataSource={hours.map((option) => option.label)}
                    selectedIndex={hourIndex}
                    onValueChange={(value, index) => {
                      setHourIndex(index);
                      setHour(hours[index].value);
                    }}
                    wrapperHeight={130}
                    wrapperBackground="transparent"
                    itemHeight={54}
                    highlightBorderWidth={0}
                    itemTextStyle={styles.inactiveItemText}
                    activeItemTextStyle={styles.activeItemText}
                  />
                </ScrollView>
                <CustomText style={styles.hourText}>ساعت</CustomText>
              </View>
            </View>
          )}
          <View style={styles.buttons}>
            <TouchableWithoutFeedback onPress={submit}>
              <View style={styles.submitButton}>
                <CustomText
                  fontStyle="semibold"
                  style={styles.submitButtonText}
                >
                  تایید
                </CustomText>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => setVisible(false)}>
              <View style={styles.cancelButton}>
                <CustomText
                  fontStyle="semibold"
                  style={styles.cancelButtonText}
                >
                  لغو
                </CustomText>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </BlurView>
    </Modal>
  );
};

export default ReminderModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalView: {
    width: "100%",
    paddingHorizontal: "10%",
    backgroundColor: COLORS.backMainP,
    borderWidth: 1,
    borderColor: COLORS.neutral_ed,
    borderTopStartRadius: 24,
    borderTopEndRadius: 24,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.neutral_ed,
    paddingVertical: 16,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
  },
  body: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.neutral_ed,
    marginBottom: 16,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    width: "45%",
    paddingVertical: 12,
  },
  submitButtonText: {
    fontSize: 14,
    color: COLORS.neutral_f9,
  },
  cancelButton: {
    backgroundColor: COLORS.neutral_f9,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    width: "45%",
    paddingVertical: 12,
  },
  cancelButtonText: {
    fontSize: 14,
    color: COLORS.primary,
  },
  description: {
    fontSize: 14,
    color: COLORS.neutral_40,
    marginTop: 16,
  },
  scrollPickers: {
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    marginVertical: 32,
  },
  item: {},
  inactiveItemText: {
    fontFamily: "peyda_semibold",
    fontSize: 20,
    color: COLORS.neutral_ad,
    textAlign: "center",
  },
  activeItemText: {
    fontFamily: "peyda_extrabold",
    fontSize: 24,
    color: COLORS.neutral_60,
    textAlign: "center",
  },
  hourText: {
    color: COLORS.neutral_ad,
    fontSize: 14,
  },
  minuteText: {
    color: COLORS.neutral_ad,
    fontSize: 14,
  },
  separator: {
    width: 1,
    height: "100%",
    backgroundColor: COLORS.neutral_df,
  },
});
