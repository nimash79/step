import {
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import CustomText from "./CustomText";
import { COLORS } from "../../utils/constants";

const MonthSelectComponent = ({ setMonth, nestedScrollEnabled = false }) => {
  return (
    <ScrollView style={styles.monthPicker} showsVerticalScrollIndicator={false} nestedScrollEnabled={nestedScrollEnabled}>
      <TouchableWithoutFeedback onPress={() => setMonth(1)}>
        <View style={styles.monthPickerItem}>
          <CustomText style={styles.monthPickerItemText}>فروردین</CustomText>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => setMonth(2)}>
        <View style={styles.monthPickerItem}>
          <CustomText style={styles.monthPickerItemText}>اردیبهشت</CustomText>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => setMonth(3)}>
        <View style={styles.monthPickerItem}>
          <CustomText style={styles.monthPickerItemText}>خرداد</CustomText>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => setMonth(4)}>
        <View style={styles.monthPickerItem}>
          <CustomText style={styles.monthPickerItemText}>تیر</CustomText>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => setMonth(5)}>
        <View style={styles.monthPickerItem}>
          <CustomText style={styles.monthPickerItemText}>مرداد</CustomText>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => setMonth(6)}>
        <View style={styles.monthPickerItem}>
          <CustomText style={styles.monthPickerItemText}>شهریور</CustomText>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => setMonth(7)}>
        <View style={styles.monthPickerItem}>
          <CustomText style={styles.monthPickerItemText}>مهر</CustomText>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => setMonth(8)}>
        <View style={styles.monthPickerItem}>
          <CustomText style={styles.monthPickerItemText}>آبان</CustomText>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => setMonth(9)}>
        <View style={styles.monthPickerItem}>
          <CustomText style={styles.monthPickerItemText}>آذر</CustomText>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => setMonth(10)}>
        <View style={styles.monthPickerItem}>
          <CustomText style={styles.monthPickerItemText}>دی</CustomText>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => setMonth(11)}>
        <View style={styles.monthPickerItem}>
          <CustomText style={styles.monthPickerItemText}>بهمن</CustomText>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => setMonth(12)}>
        <View style={styles.monthPickerItem}>
          <CustomText style={styles.monthPickerItemText}>اسفند</CustomText>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

export default MonthSelectComponent;

const styles = StyleSheet.create({
  monthPicker: {
    width: "35%",
    maxWidth: "35%",
    maxHeight: 100,
    backgroundColor: COLORS.neutral_ed,
    borderWidth: 1,
    borderColor: COLORS.neutral_ad,
    borderRadius: 8,
    paddingTop: 4,
  },
  monthPickerItemText: {
    fontSize: 14,
    color: COLORS.neutral_40,
    textAlign: "center",
    marginBottom: 8,
  },
});
