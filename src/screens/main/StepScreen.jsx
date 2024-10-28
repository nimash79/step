import {
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  PermissionsAndroid,
} from "react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import Constants from "expo-constants";
import * as Location from "expo-location";
import { Pedometer } from "expo-sensors";
import { captureRef } from "react-native-view-shot";

import CustomText from "../../components/Shared/CustomText";
import CustomButton from "../../components/Shared/CustomButton";
import { COLORS } from "../../utils/constants";
import MyLocation from "../../components/Icons/MapIcons/MyLocation";
import MyLocationActive from "../../components/Icons/MapIcons/MyLocationActive";
import LocationModal from "../../components/modals/LocationModal";
import { useFocusEffect } from "@react-navigation/native";
import UserMarker from "../../components/Icons/MapIcons/UserMarker";
import TimeIcon from "../../components/Icons/TimeIcon";
import FireIcon from "../../components/Icons/FireIcon";
import LocationIcon from "../../components/Icons/LocationIcon";
import LittleStepsVerticalIcon from "../../components/Icons/LittleStepsVerticalIcon";
import ArrowBottom from "../../components/Icons/ArrowBottom";
import ArrowTop from "../../components/Icons/ArrowTop";
import StepPauseModal from "../../components/modals/StepPauseModal";
import StepEndModal from "../../components/modals/StepEndModal";
import {
  e2p,
  secondsToTimer,
  secondsToTimer2,
  timerToSeconds,
} from "../../utils/convertors";
import { getDailyInfo, addDailyInfo } from "../../services/ownerService";
import config from "../../services/config.json";
import LocationMarker from "./../../components/Icons/MapIcons/LocationMarker";
import RunningMarker from "../../components/Icons/MapIcons/RunningMarker";
import PauseMarker from "./../../components/Icons/MapIcons/PauseMarker";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";
import ActivityModal from "../../components/modals/ActivityModal";
import StepResultModal from "../../components/modals/StepResultModal";

let stepLength = 0;

const StepScreen = ({ navigation }) => {
  const [myRegion, setMyRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [initialRegion, setInitialRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
  });
  const [initialLocationSubscription, setInitialLocationSubscription] =
    useState(null);
  const [paths, setPaths] = useState([]);
  // const [paths, setPaths] = useState([
  //   myRegion,
  //   { latitude: 29.763986, longitude: 52.420757 },
  //   { latitude: 29.764988, longitude: 52.424077 },
  // ]);
  const [locationModal, setLocationModal] = useState(false);
  const [activityModal, setActivityModal] = useState(false);
  const [pageReady, setPageReady] = useState(false);
  const [myLocationActive, setMyLocationActive] = useState(false);
  // runStatus
  // 0 -> not started (default)
  // 1 -> running
  // 2 -> paused
  // 3 -> finished
  const [runStatus, setRunStatus] = useState(0);
  const [pauseModal, setPauseModal] = useState(false);
  const [endModal, setEndModal] = useState(false);
  const [visibleActivities, setVisibleActivities] = useState(true);
  const [activitiesHeight, setActivitiesHeight] = useState(0);
  const [totallyFinished, setTotallyFinished] = useState(true);
  const [stepSubscription, setStepSubscription] = useState(null);
  const [steps, setSteps] = useState(0);
  const [timer, setTimer] = useState(0);
  const [timerSubscription, setTimerSubscription] = useState(null);
  const [meters, setMeters] = useState(0);
  const [locationSubscription, setLocationSubscription] = useState(null);
  const [calory, setCalory] = useState(0);
  const [resultModal, setResultModal] = useState(false);
  const [score, setScore] = useState(0);
  const [screenshot, setScreenshot] = useState();

  const user = useSelector((state) => state.user);

  const mapView = useRef(null);

  const animatedHeight = useSharedValue("auto");

  useFocusEffect(
    useCallback(() => {
      stepLength = (user.height / 100) * 0.413;
      (async () => {
        const granted = await getLocationPermission();
        if (granted) {
          const isLocationOn = await Location.hasServicesEnabledAsync();
          const isActivityOn = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION
          );
          if (!isLocationOn) setLocationModal(true);
          else if (isActivityOn !== PermissionsAndroid.RESULTS.GRANTED)
            setActivityModal(true);
          else {
            await updateRegion();
            setMyRegion((r) => {
              setPaths([r]);
              return r;
            });
          }
        } else navigation.navigate("Summary");
        setRunStatus(0);
        setPageReady(true);
        const res = await getDailyInfo();
        if (res.data.status === 200) {
          if (res.data.data.dailyExercise) setTotallyFinished(true);
          else setTotallyFinished(false);
          setRunStatus(3);
          setCalory(res.data.data.calory);
          setMeters(res.data.data.traveledDistance);
          setSteps(res.data.data.completeStep);
          setTimer(timerToSeconds(res.data.data.traveledTime));
        } else {
          setCalory(0);
          setMeters(0);
          setSteps(0);
          setTimer(0);
        }
      })();
    }, [])
  );
  useEffect(() => {
    if (!pageReady) return;
    (async () => {
      if (runStatus == 0) {
        const lSubscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
          },
          (location) => {
            console.log(location);
            const { latitude, longitude } = location.coords;
            const region = {
              latitude,
              longitude,
              latitudeDelta: 0.009,
              longitudeDelta: 0.009,
            };
            setMyRegion(region);
            setInitialRegion(region);
            setPaths([region]);
          }
        );
        setInitialLocationSubscription(lSubscription);
      } else {
        setInitialLocationSubscription((s) => {
          if (s) s.remove();
          return null;
        });
      }
    })();
  }, [runStatus, pageReady]);
  const getLocationPermission = async () => {
    let res = await Location.getForegroundPermissionsAsync();
    if (!res.granted) res = await Location.requestForegroundPermissionsAsync();
    return res.granted;
  };
  const updateRegion = async () => {
    try {
      const { coords } = await Location.getCurrentPositionAsync();
      const { latitude, longitude } = coords;
      const region = {
        latitude,
        longitude,
        latitudeDelta: 0.009,
        longitudeDelta: 0.0009,
      };
      setMyRegion(region);
      setInitialRegion((ir) => {
        if (ir.latitude == 0) return region;
        else return ir;
      });
      setLocationModal(false);
    } catch (err) {
      console.log(err);
    }
  };
  const findMe = () => {
    setMyRegion((r) => {
      mapView.current.animateToRegion(r);
      return r;
    });
  };

  const handleActivitiesVisible = () => {
    setVisibleActivities((a) => !a);
    animatedHeight.value =
      animatedHeight.value === 0 ? withTiming(activitiesHeight) : withTiming(0);
  };
  const startRunning = async () => {
    console.log("start running");
    // step
    const subscription = Pedometer.watchStepCount((result) => {
      setSteps(result.steps);
      setMeters(stepLength * result.steps);
    });
    setStepSubscription(subscription);
    // time
    const interval = setInterval(() => {
      setTimer((t) => t + 1);
    }, 1000);
    setTimerSubscription(interval);
    // distance
    const lSubscription = await Location.watchPositionAsync(
      {
        accuracy: Location.LocationAccuracy.High,
        distanceInterval: 10,
      },
      (location) => {
        setMyRegion({
          ...location.coords,
          latitudeDelta: 0.009,
          longitudeDelta: 0.009,
        });
        setPaths((p) => [...p, location.coords]);
      }
    );
    setLocationSubscription(lSubscription);
    setRunStatus(1);
  };
  const stopRunning = async () => {
    console.log("stop running");
    setStepSubscription((s) => {
      if (s) s.remove();
      return null;
    });
    setTimerSubscription((t) => {
      if (t) clearInterval(t);
      return null;
    });
    setLocationSubscription((l) => {
      if (l) l.remove();
      return null;
    });
    setRunStatus(2);
  };
  const resumeRunning = async () => {
    console.log("resume running");
    // step
    const pastSteps = steps;
    const subscription = Pedometer.watchStepCount((result) => {
      setSteps(pastSteps + result.steps);
      setMeters(stepLength * (pastSteps + result.steps));
    });
    setStepSubscription(subscription);
    // time
    const interval = setInterval(() => {
      setTimer((t) => t + 1);
    }, 1000);
    // distance
    const lSubscription = await Location.watchPositionAsync(
      {
        accuracy: Location.LocationAccuracy.High,
        distanceInterval: 10,
      },
      (location) => {
        setMyRegion({
          ...location.coords,
          latitudeDelta: 0.009,
          longitudeDelta: 0.009,
        });
        setPaths((p) => [...p, location.coords]);
      }
    );
    setLocationSubscription(lSubscription);
    setTimerSubscription(interval);
    setRunStatus(1);
  };
  const finishRunning = async () => {
    console.log("finish running");
    try {
      const res = await addDailyInfo({
        calory,
        traveledDistance: meters.toFixed(0),
        traveledTime: secondsToTimer2(timer),
        completeStep: steps,
      });
      setScore(res.data.data.score);

      takeScreenshot();
      await stopRunning();
      setRunStatus(3);
      setTotallyFinished(steps >= user.purposeSteps);
      setPauseModal(false);
      setResultModal(true);
    } catch (err) {
      console.log(err);
    }
  };
  const rejectPauseModal = () => {
    resumeRunning();
    setPauseModal(false);
  };
  const startRunningOver = () => {
    setCalory(0);
    setMeters(0);
    setTimer(0);
    setSteps(0);
    startRunning();
  };
  const openPauseModal = () => {
    if (user.purposeSteps > steps) {
      setPauseModal(true);
      stopRunning();
    } else finishRunning();
  };
  const locationModalSubmit = async () => {
    await updateRegion();
    setMyRegion((r) => {
      setPaths([r]);
      return r;
    });
    const activityPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION
    );
    if (activityPermission !== PermissionsAndroid.RESULTS.GRANTED)
      setActivityModal(true);
  };
  const activityModalSubmit = async () => {
    try {
      const permission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION
      );
      console.log(permission);
      // const permission = await Pedometer.isAvailableAsync();
      setActivityModal(false);
      if (permission !== PermissionsAndroid.RESULTS.GRANTED)
        navigation.navigate("Summary");
    } catch (err) {
      console.log(err);
    }
  };

  const takeScreenshot = async () => {
    try {
      const localUri = await captureRef(mapView, {
        quality: 1,
        height: 130,
      });
      console.log(localUri);
      setScreenshot(localUri);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapView}
        style={styles.map}
        region={myRegion}
        provider={PROVIDER_GOOGLE}
      >
        <Marker coordinate={initialRegion}>
          {runStatus === 0 ? (
            <View>
              <UserMarker />
              <Image
                source={{ uri: `${config.url}${user.profileImage}` }}
                style={styles.userImage}
              />
            </View>
          ) : (
            <View style={styles.markerContainer}>
              <LocationMarker />
            </View>
          )}
        </Marker>
        {runStatus !== 0 && (
          <Marker coordinate={myRegion}>
            {runStatus === 1 ? (
              <View style={styles.markerContainer}>
                <RunningMarker />
              </View>
            ) : (
              <View style={styles.markerContainer}>
                <PauseMarker />
              </View>
            )}
          </Marker>
        )}
        <Polyline
          coordinates={paths}
          strokeColor={COLORS.primary}
          strokeWidth={1}
        />
      </MapView>
      <LocationModal
        visible={locationModal}
        setVisible={setLocationModal}
        onReject={() => {
          setLocationModal(false);
          navigation.navigate("Summary");
        }}
        onSubmit={locationModalSubmit}
      />
      <ActivityModal
        visible={activityModal}
        setVisible={setActivityModal}
        onReject={() => {
          setActivityModal(false);
          navigation.navigate("Summary");
        }}
        onSubmit={activityModalSubmit}
      />
      <StepPauseModal
        visible={pauseModal}
        setVisible={setPauseModal}
        onReject={rejectPauseModal}
        onSubmit={finishRunning}
        steps={user.purposeSteps - steps}
      />
      <StepEndModal visible={endModal} setVisible={setEndModal} />
      <StepResultModal
        visible={resultModal}
        setVisible={setResultModal}
        steps={steps}
        meters={meters}
        calory={calory}
        time={timer}
        score={score}
        screenshot={screenshot}
      />
      {runStatus === 0 && (
        <>
          {/* <View style={styles.header}>
            <CustomText fontStyle="semibold" style={styles.headerTitle}>
              شیراز
            </CustomText>
            <CustomText style={styles.headerSubtitle}>
              خیابان ارم ، کوچه ۲۴
            </CustomText>
          </View> */}
          <TouchableWithoutFeedback onPress={findMe}>
            <View style={styles.myLocationButton}>
              {myLocationActive ? <MyLocationActive /> : <MyLocation />}
            </View>
          </TouchableWithoutFeedback>
          <CustomButton
            text="شروع !"
            onClick={startRunning}
            style={styles.startButton}
            textStyle={styles.startButtonText}
          />
        </>
      )}
      {runStatus === 3 && (
        <>
          <View style={styles.header}>
            <CustomText fontStyle="semibold" style={styles.headerTitle}>
              مسیر پیموده شده
            </CustomText>
            {totallyFinished ? (
              <CustomText
                style={[styles.headerSubtitle, { color: COLORS.shade3 }]}
              >
                تبریک! قدم های مورد هدفت تکمیل شد!
              </CustomText>
            ) : (
              <CustomText style={styles.headerSubtitle}>
                {e2p(user.purposeSteps - steps)} قدم از قدم های مورد هدف امروز
                شما باقی مانده است.
              </CustomText>
            )}
          </View>
        </>
      )}
      {runStatus !== 0 && (
        <View style={styles.footer}>
          {runStatus === 3 && (
            <View style={styles.footerHeader}>
              <CustomText style={styles.yourActivity}>عملکرد شما</CustomText>
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate("Report")}
              >
                <View>
                  <CustomText
                    style={styles.allMyActivities}
                    fontStyle="semibold"
                  >
                    همه فعالیت های من
                  </CustomText>
                </View>
              </TouchableWithoutFeedback>
            </View>
          )}
          <Animated.View
            style={[styles.activities, { height: animatedHeight }]}
            onLayout={(event) => {
              const height = event.nativeEvent.layout.height;
              setActivitiesHeight((h) => {
                if (h === 0) {
                  animatedHeight.value = height;
                  return height;
                } else return h;
              });
            }}
          >
            <View style={styles.item}>
              <LittleStepsVerticalIcon />
              <CustomText style={styles.itemValue} fontStyle="semibold">
                {e2p(steps)}
              </CustomText>
              <CustomText style={styles.itemName}>قدم</CustomText>
            </View>
            <View style={styles.item}>
              <TimeIcon />
              <CustomText style={styles.itemValue} fontStyle="semibold">
                {secondsToTimer(timer)}
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
                {e2p(parseFloat(meters / 1000).toFixed(2))}
              </CustomText>
              <CustomText style={styles.itemName}>کیلومتر</CustomText>
            </View>
          </Animated.View>

          <View style={styles.buttons}>
            {runStatus === 1 && (
              <TouchableWithoutFeedback onPress={stopRunning}>
                <View style={[styles.button, styles.stopButton]}>
                  <CustomText fontStyle="bold" style={styles.buttonText}>
                    توقف
                  </CustomText>
                </View>
              </TouchableWithoutFeedback>
            )}
            {runStatus === 2 && (
              <TouchableWithoutFeedback onPress={resumeRunning}>
                <View style={[styles.button, styles.resumeButton]}>
                  <CustomText fontStyle="bold" style={styles.resumeButtonText}>
                    ادامه
                  </CustomText>
                </View>
              </TouchableWithoutFeedback>
            )}
            {runStatus === 3 && (
              <TouchableWithoutFeedback onPress={startRunningOver}>
                <View style={[styles.button, styles.resumeButton]}>
                  <CustomText fontStyle="bold" style={styles.resumeButtonText}>
                    شروع مجدد
                  </CustomText>
                </View>
              </TouchableWithoutFeedback>
            )}
            <TouchableWithoutFeedback
              onPress={
                runStatus === 3
                  ? () => navigation.navigate("Summary")
                  : openPauseModal
              }
            >
              <View style={styles.button}>
                <CustomText fontStyle="bold" style={styles.buttonText}>
                  {runStatus === 3 ? "صفحه اصلی" : "اتمام"}
                </CustomText>
              </View>
            </TouchableWithoutFeedback>
          </View>
          {runStatus !== 3 && (
            <View style={styles.toggleButtonContainer}>
              <TouchableWithoutFeedback onPress={handleActivitiesVisible}>
                <View style={styles.toggleButton}>
                  {visibleActivities ? <ArrowBottom /> : <ArrowTop />}
                </View>
              </TouchableWithoutFeedback>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default StepScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
  },
  header: {
    backgroundColor: COLORS.blackLight,
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    marginTop: Constants.statusBarHeight,
    paddingVertical: 8,
  },
  headerTitle: {
    fontSize: 16,
    color: COLORS.neutral_20,
    textAlign: "center",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 12,
    color: COLORS.neutral_40,
    textAlign: "center",
  },
  startButton: {
    position: "absolute",
    bottom: 16,
    width: "90%",
    right: "5%",
    left: "5%",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 4,
  },
  startButtonText: {
    fontFamily: "peyda_bold",
    color: COLORS.neutral_f9,
  },
  myLocationButton: {
    position: "absolute",
    backgroundColor: COLORS.primary,
    bottom: 16 + 56 + 16,
    left: "5%",
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  userImage: {
    width: 34,
    height: 34,
    borderRadius: 17,
    position: "absolute",
    alignSelf: "center",
    bottom: 14,
  },
  footer: {
    backgroundColor: "#FBF7FF",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderColor: COLORS.neutral_ed,
    borderWidth: 1,
    borderTopStartRadius: 24,
    borderTopEndRadius: 24,
  },
  activities: {
    backgroundColor: "#FBF7FF",
    width: "95%",
    alignSelf: "center",
    flexDirection: "row",
    paddingTop: 18,
  },
  item: {
    alignItems: "center",
    borderRightColor: COLORS.neutral_df,
    borderRightWidth: 1,
    width: "25%",
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
  buttons: {
    backgroundColor: "#FBF7FF",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 16,
  },
  button: {
    backgroundColor: COLORS.neutral_f9,
    borderWidth: 1,
    borderColor: COLORS.tint1,
    borderRadius: 8,
    width: "45%",
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    color: COLORS.primary,
  },
  stopButton: {
    borderStyle: "dashed",
    borderWidth: 3,
  },
  resumeButton: {
    backgroundColor: COLORS.primary,
    borderWidth: 0,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 6,
  },
  resumeButtonText: {
    fontSize: 16,
    color: COLORS.neutral_f9,
  },
  toggleButtonContainer: {
    position: "absolute",
    top: -14,
    flexDirection: "column",
    width: "100%",
  },
  toggleButton: {
    backgroundColor: "#FBF7FF",
    borderWidth: 1,
    borderColor: COLORS.neutral_ed,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  footerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
    marginVertical: 16,
  },
  yourActivity: {
    fontSize: 20,
    color: COLORS.neutral_20,
    borderBottomColor: COLORS.neutral_df,
    borderBottomWidth: 1,
  },
  allMyActivities: {
    fontSize: 10,
    color: COLORS.neutral_60,
  },
  markerContainer: {
    backgroundColor: COLORS.tint5,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
});
