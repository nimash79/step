import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";

import { COLORS } from "../../../../utils/constants";
import CustomText from "../../../../components/Shared/CustomText";
import CustomCircularProgressBar from "../../../../components/Shared/CustomCircularProgressBar";
import { useEffect, useState } from "react";
import { getProgress } from "../../../../services/ownerService";
import { e2p } from "../../../../utils/convertors";

const Progress = ({navigation}) => {
  const [progress, setProgress] = useState();
  useEffect(() => {
    (async () => {
      const { data } = await getProgress();
      setProgress(data.data);
    })();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <CustomText fontStyle="bold" style={styles.headText}>
          پیشرفت من
        </CustomText>
        <TouchableWithoutFeedback onPress={() => navigation.navigate("Report")}>
          <View>
            <CustomText fontStyle="semibold" style={styles.viewAll}>
              مشاهده همه
            </CustomText>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.items}>
        <View style={styles.item}>
          <CustomCircularProgressBar
            value={progress ? progress[0].percent : 0}
          />
          <CustomText style={styles.weekday} fontStyle="semibold">
            ش
          </CustomText>
          <CustomText style={styles.monthDay} fontStyle="semibold">
            {progress && e2p(progress[0].day)}
          </CustomText>
        </View>
        <View style={styles.item}>
          <CustomCircularProgressBar
            value={progress ? progress[1].percent : 0}
          />
          <CustomText style={styles.weekday} fontStyle="semibold">
            ی
          </CustomText>
          <CustomText style={styles.monthDay} fontStyle="semibold">
            {progress && e2p(progress[1].day)}
          </CustomText>
        </View>
        <View style={styles.item}>
          <CustomCircularProgressBar
            value={progress ? progress[2].percent : 0}
          />
          <CustomText style={styles.weekday} fontStyle="semibold">
            د
          </CustomText>
          <CustomText style={styles.monthDay} fontStyle="semibold">
            {progress && e2p(progress[2].day)}
          </CustomText>
        </View>
        <View style={styles.item}>
          <CustomCircularProgressBar
            value={progress ? progress[3].percent : 0}
          />
          <CustomText style={styles.weekday} fontStyle="semibold">
            س
          </CustomText>
          <CustomText style={styles.monthDay} fontStyle="semibold">
            {progress && e2p(progress[3].day)}
          </CustomText>
        </View>
        <View style={styles.item}>
          <CustomCircularProgressBar
            value={progress ? progress[4].percent : 0}
          />
          <CustomText style={styles.weekday} fontStyle="semibold">
            چ
          </CustomText>
          <CustomText style={styles.monthDay} fontStyle="semibold">
            {progress && e2p(progress[4].day)}
          </CustomText>
        </View>
        <View style={styles.item}>
          <CustomCircularProgressBar
            value={progress ? progress[5].percent : 0}
          />
          <CustomText style={styles.weekday} fontStyle="semibold">
            پ
          </CustomText>
          <CustomText style={styles.monthDay} fontStyle="semibold">
            {progress && e2p(progress[5].day)}
          </CustomText>
        </View>
        <View style={[styles.item, { marginRight: 0 }]}>
          <CustomCircularProgressBar
            value={progress ? progress[6].percent : 0}
          />
          <CustomText style={styles.weekday} fontStyle="semibold">
            ج
          </CustomText>
          <CustomText style={styles.monthDay} fontStyle="semibold">
            {progress && e2p(progress[6].day)}
          </CustomText>
        </View>
      </View>
    </View>
  );
};

export default Progress;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.backSections,
    borderRadius: 8,
  },
  head: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 8,
    marginTop: 8,
    marginBottom: 21,
  },
  headText: {
    fontSize: 16,
    color: COLORS.shade3,
    marginLeft: 8,
  },
  viewAll: {
    fontSize: 10,
    color: COLORS.neutral_60,
    marginTop: 5,
  },
  items: {
    flexDirection: "row",
    justifyContent: "center",
  },
  item: {
    alignItems: "center",
    marginRight: 8,
  },
  weekday: {
    fontSize: 14,
    color: COLORS.neutral_86,
    // marginTop: 8,
    marginBottom: 2,
  },
  monthDay: {
    fontSize: 14,
    color: COLORS.neutral_40,
  },
});
