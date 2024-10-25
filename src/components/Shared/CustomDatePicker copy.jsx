import {
  StyleSheet,
  TextInput,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { Picker } from "@react-native-picker/picker";

import CustomText from "./CustomText";
import DropdownIcon from "../Icons/DropdownIcon";
import { e2p, miladiToPersian3 } from "../../utils/convertors";

const CustomDatePicker = ({
  backgroundColor,
  placeholderColor = "black",
  defaultValue,
  height,
  setDate,
}) => {
  const [day, setDay] = useState("روز");
  const [month, setMonth] = useState("ماه");
  const [year, setYear] = useState();
  const dayPicker = useRef();
  const monthPicker = useRef();
  useEffect(() => {
    if (defaultValue) {
      const splits = miladiToPersian3(defaultValue).split("-");
      setYear(splits[0]);
      setMonth(splits[1]);
      setDay(splits[2]);
    }
  }, []);
  useEffect(() => {
    if (day !== "روز" && month !== "ماه" && year)
      setDate(`${year}-${month}-${day}`);
    else setDate(null);
  }, [day, month, year]);
  return (
    <View style={[styles.container, { height }]}>
      <TouchableWithoutFeedback onPress={() => dayPicker.current.focus()}>
        <View style={[styles.dayCover, { backgroundColor }]}>
          <CustomText
            style={{ fontSize: 14, marginTop: -4, color: placeholderColor }}
          >
            {e2p(day)}
          </CustomText>
          <DropdownIcon />
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => monthPicker.current.focus()}>
        <View style={[styles.monthCover, { backgroundColor }]}>
          <CustomText
            style={{ fontSize: 14, marginTop: -4, color: placeholderColor }}
          >
            {e2p(month)}
          </CustomText>
          <DropdownIcon />
        </View>
      </TouchableWithoutFeedback>
      <Picker
        ref={dayPicker}
        selectedValue={day}
        onValueChange={(value) => setDay(value)}
        style={styles.dayPicker}
      >
        <Picker.Item label="۰۱" value="01" />
        <Picker.Item label="۰۲" value="02" />
        <Picker.Item label="۰۳" value="03" />
        <Picker.Item label="۰۴" value="04" />
        <Picker.Item label="۰۵" value="05" />
        <Picker.Item label="۰۶" value="06" />
        <Picker.Item label="۰۷" value="07" />
        <Picker.Item label="۰۸" value="08" />
        <Picker.Item label="۰۹" value="09" />
        <Picker.Item label="۱۰" value="10" />
        <Picker.Item label="۱۱" value="11" />
        <Picker.Item label="۱۲" value="12" />
        <Picker.Item label="۱۳" value="13" />
        <Picker.Item label="۱۴" value="14" />
        <Picker.Item label="۱۵" value="15" />
        <Picker.Item label="۱۶" value="16" />
        <Picker.Item label="۱۷" value="17" />
        <Picker.Item label="۱۸" value="18" />
        <Picker.Item label="۱۹" value="19" />
        <Picker.Item label="۲۰" value="20" />
        <Picker.Item label="۲۱" value="21" />
        <Picker.Item label="۲۲" value="22" />
        <Picker.Item label="۲۳" value="23" />
        <Picker.Item label="۲۴" value="24" />
        <Picker.Item label="۲۵" value="25" />
        <Picker.Item label="۲۶" value="26" />
        <Picker.Item label="۲۷" value="27" />
        <Picker.Item label="۲۸" value="28" />
        <Picker.Item label="۲۹" value="29" />
        <Picker.Item label="۳۰" value="30" />
        <Picker.Item label="۳۱" value="31" />
      </Picker>
      <Picker
        ref={monthPicker}
        selectedValue={month}
        onValueChange={(value) => setMonth(value)}
        style={styles.monthPicker}
      >
        <Picker.Item label="01" value="01" />
        <Picker.Item label="02" value="02" />
        <Picker.Item label="03" value="03" />
        <Picker.Item label="04" value="04" />
        <Picker.Item label="05" value="05" />
        <Picker.Item label="06" value="06" />
        <Picker.Item label="07" value="07" />
        <Picker.Item label="08" value="08" />
        <Picker.Item label="09" value="09" />
        <Picker.Item label="10" value="10" />
        <Picker.Item label="11" value="11" />
        <Picker.Item label="12" value="12" />
      </Picker>
      <TextInput
        style={[styles.yearInput, { backgroundColor }]}
        placeholder="سال"
        onChangeText={setYear}
        placeholderTextColor="#ADADAD"
        defaultValue={year ? year : ""}
        keyboardType="numeric"
      />
    </View>
  );
};

export default CustomDatePicker;

const styles = StyleSheet.create({
  container: {
    borderColor: "#ADADAD",
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: "row",
    height: 48,
  },
  dayPicker: {
    width: "35%",
    fontFamily: "peyda",
    fontSize: 14,
    color: "#868686",
    borderRightWidth: 1,
    borderRightColor: "",
    opacity: 0,
  },
  monthPicker: {
    width: "35%",
    fontFamily: "peyda",
    fontSize: 14,
    color: "#868686",
    opacity: 0,
  },
  yearInput: {
    width: "30%",
    fontFamily: "peyda",
    fontSize: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  dayCover: {
    position: "absolute",
    width: "35%",
    height: "100%",
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
    position: "absolute",
    left: "35%",
    width: "35%",
    height: "100%",
    borderRightWidth: 1,
    borderRightColor: "#868686",
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
});
