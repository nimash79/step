import { Fragment, useCallback, useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Constants from "expo-constants";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";

import NoActivity from "../../components/Svgs/NoActivity";
import CustomText from "../../components/Shared/CustomText";
import { COLORS } from "../../utils/constants";
import CustomButton from "../../components/Shared/CustomButton";
import LittleStepsVerticalIcon from "../../components/Icons/LittleStepsVerticalIcon";
import TimeIcon from "../../components/Icons/TimeIcon";
import FireIcon from "../../components/Icons/FireIcon";
import LocationIcon from "../../components/Icons/LocationIcon";
import DeleteIcon from "../../components/Icons/DeleteIcon";
import {
  convertTimeSpan,
  e2p,
  miladiToPersian2,
  secondsToTimer,
} from "../../utils/convertors";
import {
  deleteReport,
  getHistory,
  getTotal,
} from "../../services/ownerService";
import { groupByArray } from "./../../utils/helper";
import { useFocusEffect } from "@react-navigation/native";
import LittleStepsIconProfile from "../../components/Icons/LittleStepsIconProfile";

const deleteComponent = () => {
  return (
    <View style={styles.deleteContainer}>
      <View style={styles.delete}>
        <DeleteIcon />
      </View>
    </View>
  );
};

const ReportScreen = ({ navigation }) => {
  const [hasActivity, setHasActivity] = useState(true);
  const [steps, setSteps] = useState(0);
  const [timer, setTimer] = useState(0);
  const [calory, setCalory] = useState(0);
  const [meters, setMeters] = useState(0);
  const [historyCache, setHistoryCache] = useState();
  const [history, setHistory] = useState();
  const [deleted, setDeleted] = useState(false);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        let res = await getHistory();
        setHistory(Object.values(groupByArray(res.data.data, "dayDate")));
        setHistoryCache(Object.values(groupByArray(res.data.data, "dayDate")));
        res = await getTotal();
        setSteps(res.data.data.totalSteps);
        setCalory(res.data.data.totalCalory);
        setMeters((res.data.data.totalDistance / 1000).toFixed(2));
        setTimer(res.data.data.traveledTime);
      })();
    }, [])
  );

  const deleteActivity = async (activity) => {
    setHistory((h) =>
      [...h].map((x) =>
        x.filter((dailyActivity) => dailyActivity.id != activity.id)
      )
    );
    setDeleted(true);
    setTimeout(async () => {
      setDeleted(false);
      const res = await deleteReport(activity.id);
      console.log(res.data);
    }, 3000);
  };
  const undoDelete = () => {
    const interval_id = window.setTimeout(() => {}, Number.MAX_SAFE_INTEGER);
    for (let i = 1; i < interval_id; i++) clearTimeout(i);
    setDeleted(false);
    setHistory(historyCache);
  };
  return (
    <GestureHandlerRootView>
      <ScrollView style={styles.container}>
        {hasActivity ? (
          <View style={styles.nonEmptyView}>
            <View style={styles.summary}>
              <View style={styles.stepsSummary}>
                <View style={styles.stepsSummary1}>
                  <CustomText
                    style={{ color: COLORS.shade5, marginRight: 16 }}
                    fontStyle="bold"
                  >
                    {e2p(steps.toLocaleString())}
                  </CustomText>
                  <LittleStepsVerticalIcon />
                </View>
                <CustomText style={styles.stepsSummaryText}>
                  کل قدم ها تا الان
                </CustomText>
              </View>
              <View style={styles.activities}>
                <View style={styles.item}>
                  <TimeIcon />
                  <CustomText style={styles.itemValue} fontStyle="semibold">
                    {e2p(timer)}
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
                    {e2p(meters)}
                  </CustomText>
                  <CustomText style={styles.itemName}>کیلومتر</CustomText>
                </View>
              </View>
            </View>
            <View style={styles.historyList}>
              {history?.map(
                (dailyActivities, index) =>
                  dailyActivities.length == true && (
                    <View style={styles.historyItem} key={index}>
                      <View style={styles.historyItemHeader}>
                        <CustomText style={styles.historyDateText}>
                          {e2p(miladiToPersian2(dailyActivities[0].dayDate))}
                        </CustomText>
                        <View style={styles.historySeparator}></View>
                      </View>
                      <View style={styles.historyItemList}>
                        {dailyActivities?.map((dailyActivity, index) => (
                          <Fragment key={index}>
                            <Swipeable
                              renderRightActions={deleteComponent}
                              onSwipeableOpen={() =>
                                deleteActivity(dailyActivity)
                              }
                              friction={2}
                            >
                              <View style={styles.historyItemItem}>
                                <View style={styles.historyItemColumn}>
                                  <LittleStepsIconProfile
                                    style={{ marginRight: 4 }}
                                  />
                                  <CustomText style={styles.historyItemValue}>
                                    {e2p(dailyActivity.completeStep)}
                                  </CustomText>
                                </View>
                                <View style={styles.historyItemColumn}>
                                  <TimeIcon />
                                  <CustomText style={styles.historyItemValue}>
                                    {convertTimeSpan(
                                      dailyActivity.traveledTime,
                                      false
                                    )}
                                  </CustomText>
                                </View>
                                <View style={styles.historyItemColumn}>
                                  <FireIcon />
                                  <CustomText style={styles.historyItemValue}>
                                    {e2p(dailyActivity.calory)}
                                  </CustomText>
                                </View>
                                <View style={styles.historyItemColumn}>
                                  <LocationIcon />
                                  <CustomText style={styles.historyItemValue}>
                                    {e2p(dailyActivity.traveledDistance)}
                                  </CustomText>
                                </View>
                              </View>
                            </Swipeable>
                            {index != dailyActivities.length - 1 && (
                              <View style={styles.historyItemSeparator}></View>
                            )}
                          </Fragment>
                        ))}
                      </View>
                    </View>
                  )
              )}
            </View>
          </View>
        ) : (
          <View style={styles.emptyView}>
            <NoActivity style={styles.banner} />
            <CustomText fontStyle="semibold" style={styles.emptyText}>
              هنوز فعالیتی انجام ندادی.
            </CustomText>
            <CustomText
              fontStyle="semibold"
              style={[styles.emptyText, { marginTop: 12 }]}
            >
              همین الان شروع کن!
            </CustomText>
            <CustomButton
              text="شروع"
              style={styles.startButton}
              onClick={() => navigation.navigate("Step")}
            />
          </View>
        )}
      </ScrollView>
      {deleted && (
        <View style={styles.deleted}>
          <DeleteIcon />
          <CustomText style={styles.deletedText}>فعالیت حذف شد!</CustomText>
          <CustomButton
            style={styles.undoButton}
            textStyle={styles.undoButtonText}
            text="بازگشت"
            onClick={undoDelete}
          />
        </View>
      )}
    </GestureHandlerRootView>
  );
};

export default ReportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#FBF7FF",
  },
  banner: {
    alignSelf: "center",
    marginTop: 59,
  },
  emptyText: {
    alignSelf: "center",
    marginTop: 16,
    color: COLORS.shade3,
    fontSize: 16,
  },
  startButton: {
    width: "auto",
    paddingVertical: 13,
    paddingHorizontal: 51,
    marginTop: 18,
  },
  summary: {
    backgroundColor: COLORS.tint0,
    borderWidth: 1,
    borderColor: COLORS.tint1,
    borderRadius: 8,
    marginTop: Constants.statusBarHeight + 8,
  },
  stepsSummary: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.neutral_df,
    width: "90%",
    alignSelf: "center",
  },
  stepsSummary1: {
    flexDirection: "row",
    alignSelf: "center",
    marginVertical: 16,
  },
  stepsSummaryText: {
    color: COLORS.neutral_40,
    alignSelf: "center",
    marginBottom: 16,
  },
  activities: {
    width: "95%",
    alignSelf: "center",
    flexDirection: "row",
    paddingTop: 18,
    marginBottom: 16,
  },
  item: {
    alignItems: "center",
    borderRightColor: COLORS.neutral_df,
    borderRightWidth: 1,
    width: "33%",
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
  historyItem: {
    marginTop: 16,
  },
  historyItemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  historySeparator: {
    height: 1,
    backgroundColor: COLORS.neutral_df,
    width: "100%",
  },
  historyDateText: {
    color: COLORS.neutral_40,
    marginRight: 20,
    bottom: 3,
  },
  historyItemList: {
    // backgroundColor: COLORS.backSections,
    backgroundColor: COLORS.error_light2,
    borderRadius: 8,
    marginTop: 8,
  },
  historyItemItem: {
    backgroundColor: COLORS.backSections,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 16,
    zIndex: 1,
  },
  historyItemColumn: {
    flexDirection: "row",
  },
  historyItemValue: {
    fontSize: 14,
    marginLeft: 4,
  },
  historyItemSeparator: {
    height: 1,
    width: "90%",
    alignSelf: "center",
    backgroundColor: COLORS.neutral_ed,
  },
  deleteContainer: {
    backgroundColor: COLORS.error_light2,
    width: "18%",
  },
  delete: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  deleted: {
    position: "absolute",
    left: 0,
    bottom: 24,
    right: 0,
    flexDirection: "row",
    backgroundColor: COLORS.error_light2,
    marginHorizontal: 20,
    alignItems: "center",
    borderRadius: 8,
    justifyContent: "space-around",
    paddingVertical: 10,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 4,
  },
  deletedText: {
    fontSize: 14,
    color: COLORS.neutral_60,
  },
  undoButton: {
    width: "auto",
    height: "auto",
    paddingHorizontal: 12,
    paddingVertical: 5.5,
    borderRadius: 8,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 4,
  },
  undoButtonText: {
    fontFamily: "peyda_semibold",
    fontSize: 12,
    color: COLORS.neutral_f9,
  },
});
