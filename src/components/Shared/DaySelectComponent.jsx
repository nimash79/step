import {
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import CustomText from "./CustomText";
import { COLORS } from "../../utils/constants";

const DaySelectComponent = ({ setDay, nestedScrollEnabled = false, hide = false }) => {
  return (
    <ScrollView
      style={hide ? [styles.dayPicker, { opacity: 0 }] : [styles.dayPicker]}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={nestedScrollEnabled}
    >
      {/* <View style={styles.scrollbar}>
                <View
                  style={[
                    styles.scrollbarIndicator,
                    {
                      height: 50,
                      transform: [{ translateY: scrollIndicatorPosition }],
                    },
                  ]}
                ></View>
              </View> */}
      <TouchableWithoutFeedback onPress={() => setDay("01")} disabled={hide}>
        <View style={styles.dayPickerItem}>
          <CustomText style={styles.dayPickerItemText}>۰۱</CustomText>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => setDay("02")} disabled={hide}>
        <View style={styles.dayPickerItem}>
          <CustomText style={styles.dayPickerItemText}>۰۲</CustomText>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => setDay("03")} disabled={hide}>
        <View style={styles.dayPickerItem}>
          <CustomText style={styles.dayPickerItemText}>۰۳</CustomText>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => setDay("04")} disabled={hide}>
        <View style={styles.dayPickerItem}>
          <CustomText style={styles.dayPickerItemText}>۰۴</CustomText>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => setDay("05")} disabled={hide}>
        <View style={styles.dayPickerItem}>
          <CustomText style={styles.dayPickerItemText}>۰۵</CustomText>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => setDay("06")} disabled={hide}>
        <View style={styles.dayPickerItem}>
          <CustomText style={styles.dayPickerItemText}>۰۶</CustomText>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => setDay("07")} disabled={hide}>
        <View style={styles.dayPickerItem}>
          <CustomText style={styles.dayPickerItemText}>۰۷</CustomText>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => setDay("08")} disabled={hide}>
        <View style={styles.dayPickerItem}>
          <CustomText style={styles.dayPickerItemText}>۰۸</CustomText>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => setDay("09")} disabled={hide}>
        <View style={styles.dayPickerItem}>
          <CustomText style={styles.dayPickerItemText}>۰۹</CustomText>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => setDay("10")} disabled={hide}>
        <View style={styles.dayPickerItem}>
          <CustomText style={styles.dayPickerItemText}>۱۰</CustomText>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => setDay("11")} disabled={hide}>
        <View style={styles.dayPickerItem}>
          <CustomText style={styles.dayPickerItemText}>۱۱</CustomText>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => setDay("12")} disabled={hide}>
        <View style={styles.dayPickerItem}>
          <CustomText style={styles.dayPickerItemText}>۱۲</CustomText>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => setDay("13")} disabled={hide}>
        <View style={styles.dayPickerItem}>
          <CustomText style={styles.dayPickerItemText}>۱۳</CustomText>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => setDay("14")} disabled={hide}>
        <View style={styles.dayPickerItem}>
          <CustomText style={styles.dayPickerItemText}>۱۴</CustomText>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => setDay("15")} disabled={hide}>
        <View style={styles.dayPickerItem}>
          <CustomText style={styles.dayPickerItemText}>۱۵</CustomText>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => setDay("16")} disabled={hide}>
        <View style={styles.dayPickerItem}>
          <CustomText style={styles.dayPickerItemText}>۱۶</CustomText>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => setDay("17")} disabled={hide}>
        <View style={styles.dayPickerItem}>
          <CustomText style={styles.dayPickerItemText}>۱۷</CustomText>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => setDay("18")} disabled={hide}>
        <View style={styles.dayPickerItem}>
          <CustomText style={styles.dayPickerItemText}>۱۸</CustomText>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => setDay("19")} disabled={hide}>
        <View style={styles.dayPickerItem}>
          <CustomText style={styles.dayPickerItemText}>۱۹</CustomText>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => setDay("20")} disabled={hide}>
        <View style={styles.dayPickerItem}>
          <CustomText style={styles.dayPickerItemText}>۲۰</CustomText>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => setDay("21")} disabled={hide}>
        <View style={styles.dayPickerItem}>
          <CustomText style={styles.dayPickerItemText}>۲۱</CustomText>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => setDay("22")} disabled={hide}>
        <View style={styles.dayPickerItem}>
          <CustomText style={styles.dayPickerItemText}>۲۲</CustomText>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => setDay("23")} disabled={hide}>
        <View style={styles.dayPickerItem}>
          <CustomText style={styles.dayPickerItemText}>۲۳</CustomText>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => setDay("24")} disabled={hide}>
        <View style={styles.dayPickerItem}>
          <CustomText style={styles.dayPickerItemText}>۲۴</CustomText>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => setDay("25")} disabled={hide}>
        <View style={styles.dayPickerItem}>
          <CustomText style={styles.dayPickerItemText}>۲۵</CustomText>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => setDay("26")} disabled={hide}>
        <View style={styles.dayPickerItem}>
          <CustomText style={styles.dayPickerItemText}>۲۶</CustomText>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => setDay("27")} disabled={hide}>
        <View style={styles.dayPickerItem}>
          <CustomText style={styles.dayPickerItemText}>۲۷</CustomText>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => setDay("28")} disabled={hide}>
        <View style={styles.dayPickerItem}>
          <CustomText style={styles.dayPickerItemText}>۲۸</CustomText>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => setDay("29")} disabled={hide}>
        <View style={styles.dayPickerItem}>
          <CustomText style={styles.dayPickerItemText}>۲۹</CustomText>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => setDay("30")} disabled={hide}>
        <View style={styles.dayPickerItem}>
          <CustomText style={styles.dayPickerItemText}>۳۰</CustomText>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => setDay("31")} disabled={hide}>
        <View style={styles.dayPickerItem}>
          <CustomText style={styles.dayPickerItemText}>۳۱</CustomText>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

export default DaySelectComponent;

const styles = StyleSheet.create({
  dayPicker: {
    width: "35%",
    maxWidth: "35%",
    maxHeight: 100,
    backgroundColor: COLORS.neutral_ed,
    borderWidth: 1,
    borderColor: COLORS.neutral_ad,
    borderRadius: 8,
    paddingTop: 4,
  },
  dayPickerItemText: {
    fontSize: 14,
    color: COLORS.neutral_40,
    textAlign: "center",
    marginBottom: 8,
  },
});
