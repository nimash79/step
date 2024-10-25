import {
  StyleSheet,
  TextInput,
  View,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { Picker } from "@react-native-picker/picker";

import CustomText from "./CustomText";
import DropdownIcon from "../Icons/DropdownIcon";
import { e2p, miladiToPersian3 } from "../../utils/convertors";
import { COLORS } from "../../utils/constants";
import Animated from "react-native-reanimated";
import DaySelectComponent from "./DaySelectComponent";
import MonthSelectComponent from "./MonthSelectComponent";

const CustomDatePicker = ({
  backgroundColor,
  placeholderColor = "black",
  defaultValue,
  height,
  setDate,
  viewRef,
  nestedScrollEnabled = false,
  closeSelectPickers = false,
  setCloseSelectPickers,
}) => {
  const [day, setDay] = useState("روز");
  const [month, setMonth] = useState("ماه");
  const [year, setYear] = useState();
  const [daySelect, setDaySelect] = useState(false);
  const [monthSelect, setMonthSelect] = useState(false);
  const [scrollIndicatorPosition, setScrollIndicatorPosition] = useState(0);

  useEffect(() => {
    if (defaultValue) {
      const splits = miladiToPersian3(defaultValue).split("-");
      setYear(splits[0]);
      setMonth(splits[1]);
      setDay(splits[2]);
    }
  }, []);
  useEffect(() => {
    setDaySelect(false);
    setMonthSelect(false);
    if (day !== "روز" && month !== "ماه" && year)
      setDate(`${year}-${month}-${day}`);
    else setDate(null);
  }, [day, month, year]);

  useEffect(() => {
    if (closeSelectPickers) {
      setDaySelect(false);
      setMonthSelect(false);
    }
  }, [closeSelectPickers]);

  useEffect(() => {
    if (daySelect || monthSelect) setCloseSelectPickers(false);
  }, [daySelect, monthSelect]);

  const getMonthName = (monthNumber) => {
    switch (parseInt(monthNumber)) {
      case 1:
        return "فروردین";
      case 2:
        return "اردیبهشت";
      case 3:
        return "خرداد";
      case 4:
        return "تیر";
      case 5:
        return "مرداد";
      case 6:
        return "شهریور";
      case 7:
        return "مهر";
      case 8:
        return "آبان";
      case 9:
        return "آذر";
      case 10:
        return "دی";
      case 11:
        return "بهمن";
      case 12:
        return "اسفند";
      default:
        return "ماه";
    }
  };
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setDaySelect(false);
        setMonthSelect(false);
      }}
    >
      <View style={styles.container} ref={viewRef}>
        <View style={[styles.inputs, { height }]}>
          <TouchableWithoutFeedback
            onPress={() => {
              setMonthSelect(false);
              setDaySelect(true);
            }}
          >
            <View style={[styles.dayCover, { backgroundColor }]}>
              <CustomText
                style={{ fontSize: 14, marginTop: -4, color: placeholderColor }}
              >
                {e2p(day)}
              </CustomText>
              <DropdownIcon />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              setDaySelect(false);
              setMonthSelect(true);
            }}
          >
            <View style={[styles.monthCover, { backgroundColor }]}>
              <CustomText
                style={{ fontSize: 14, marginTop: -4, color: placeholderColor }}
              >
                {getMonthName(month)}
              </CustomText>
              <DropdownIcon />
            </View>
          </TouchableWithoutFeedback>
          <TextInput
            style={[styles.yearInput, { backgroundColor }]}
            placeholder="سال"
            onChangeText={setYear}
            placeholderTextColor="#ADADAD"
            defaultValue={year ? year : ""}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.pickers}>
          {daySelect && (
            <DaySelectComponent
              setDay={setDay}
              nestedScrollEnabled={nestedScrollEnabled}
            />
          )}
          {monthSelect && (
            <>
              <DaySelectComponent
                setDay={setDay}
                hide={true}
                nestedScrollEnabled={nestedScrollEnabled}
              />
              <MonthSelectComponent
                setMonth={setMonth}
                nestedScrollEnabled={nestedScrollEnabled}
              />
            </>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CustomDatePicker;

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
  },
  inputs: {
    borderColor: "#ADADAD",
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: "row",
    height: 48,
  },
  pickers: {
    flexDirection: "row",
  },
  yearInput: {
    width: "30%",
    fontFamily: "peyda",
    fontSize: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  dayCover: {
    width: "35%",
    borderRightWidth: 1,
    borderRightColor: "#868686",
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  monthCover: {
    width: "35%",
    borderRightWidth: 1,
    borderRightColor: "#868686",
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  scrollbar: {
    position: "absolute",
    width: 6,
    left: 2,
    top: 0,
    height: "99%",
    borderRadius: 8,
  },
  scrollbarIndicator: {
    width: 6,
    borderRadius: 8,
    backgroundColor: COLORS.neutral_ad,
  },
});
