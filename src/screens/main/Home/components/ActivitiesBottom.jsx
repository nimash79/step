import { StyleSheet, View } from "react-native";

import { COLORS } from "../../../../utils/constants";
import CustomText from "../../../../components/Shared/CustomText";
import TimeIcon from "../../../../components/Icons/TimeIcon";
import FireIcon from "../../../../components/Icons/FireIcon";
import LocationIcon from "../../../../components/Icons/LocationIcon";
import { convertTimeSpan, e2p } from "../../../../utils/convertors";

const ActivitiesBottom = ({
  style,
  calory = 0,
  meters = 0,
  timer = "00:00:00",
}) => {
  return (
    <View style={[styles.bottom, style]}>
      <View style={styles.item}>
        <TimeIcon />
        <CustomText style={styles.itemValue} fontStyle="semibold">
          {convertTimeSpan(timer)}
        </CustomText>
        <CustomText style={styles.itemName}>زمان</CustomText>
      </View>
      <View style={styles.item}>
        <FireIcon />
        <CustomText style={styles.itemValue} fontStyle="semibold">
          {e2p(calory)}
        </CustomText>
        <CustomText style={styles.itemName}>کالری</CustomText>
      </View>
      <View style={[styles.item, { borderRightWidth: 0 }]}>
        <LocationIcon />
        <CustomText style={styles.itemValue} fontStyle="semibold">
          {e2p((meters / 1000).toFixed(2))}
        </CustomText>
        <CustomText style={styles.itemName}>کیلومتر</CustomText>
      </View>
    </View>
  );
};

export default ActivitiesBottom;

const styles = StyleSheet.create({
  bottom: {
    backgroundColor: COLORS.backSections,
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: COLORS.tint2,
    borderBottomStartRadius: 8,
    borderBottomEndRadius: 8,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
  },
  item: {
    alignItems: "center",
    borderRightColor: COLORS.neutral_df,
    borderRightWidth: 1,
    width: "33.33%",
  },
  itemValue: {
    fontSize: 16,
    color: COLORS.neutral_20,
    marginTop: 16,
    marginBottom: 8,
  },
  itemName: {
    fontSize: 14,
    color: COLORS.neutral_60,
  },
});
