import { StyleSheet, View, PermissionsAndroid } from "react-native";
import { useCallback, useState, useEffect } from "react";
import * as Location from "expo-location";
import { Pedometer } from "expo-sensors";
import { useSelector } from "react-redux";

import ActivitiesTop from "./ActivitiesTop";
import ActivitiesBottom from "./ActivitiesBottom";
import { addDailyInfo, getDailyInfo } from "../../../../services/ownerService";
import { useFocusEffect } from "@react-navigation/native";
import LocationModal from "../../../../components/modals/LocationModal";
import ActivityModal from "../../../../components/modals/ActivityModal";
import { secondsToTimer2, timerToSeconds } from "../../../../utils/convertors";

let stepLength = 0;

const Activities = ({ navigation, setDailyInfo }) => {
  const user = useSelector((state) => state.user);

  const [steps, setSteps] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(0);
  const [timer, setTimer] = useState(0);
  const [calory, setCalory] = useState(0);
  const [meters, setMeters] = useState(0);

  const [running, setRunning] = useState(false);
  const [counterActive, setCounterActive] = useState(false);
  const [hasRan, setHasRan] = useState(false);
  const [currentSteps, setCurrentSteps] = useState(0);
  const [stepSubscripition, setStepSubscription] = useState(null);
  const [timerSubscription, setTimerSubscription] = useState(null);
  const [locationSubscription, setLocationSubscription] = useState(null);
  const [locationModal, setLocationModal] = useState(false);
  const [activityModal, setActivityModal] = useState(false);
  const [modalShown, setModalShown] = useState(false);
  const [ready, setReady] = useState(false);

  useFocusEffect(
    useCallback(() => {
      if (user.height) stepLength = (user.height / 100) * 0.413;
      (async () => {
        const res = await getDailyInfo();
        if (res.data.status === 200) {
          setSteps(res.data.data.totalStep);
          setCompletedSteps(res.data.data.completeStep);
          setCurrentSteps(res.data.data.completeStep);
          if (res.data.data.completeStep >= res.data.data.totalStep)
            setModalShown(true);
          setCalory(res.data.data.totalCalory);
          setMeters(res.data.data.traveledDistance);
          setTimer(timerToSeconds(res.data.data.traveledTime));
          setDailyInfo(res.data.data);
        } else {
          setCompletedSteps(0);
          setCurrentSteps(0);
          setCalory(0);
          setTimer(0);
          setMeters(0);
          setModalShown(false);
        }
      })();
      setReady(true);
    }, [])
  );

  useEffect(() => {
    if (user) setSteps(user.purposeSteps);
  }, [user]);

  useEffect(() => {
    if (running) {
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
            setCounterActive(true);
            startRunning();
            setHasRan(true);
          }
        } else setRunning(false);
      })();
    } else if (hasRan) {
      finishRunning();
    }
  }, [running]);

  useEffect(() => {
    if (modalShown) return;
    if (timer === 0) return;
    if (currentSteps > 0 && currentSteps >= steps) {
      stopRunning();
      navigation.navigate("HomeModal", {
        steps,
        calory,
        timer,
        meters,
        onSubmit: () => {
          setModalShown(true);
          setRunning(true);
        },
      });
    }
  }, [modalShown, currentSteps]);

  const getLocationPermission = async () => {
    const res = await Location.requestForegroundPermissionsAsync();
    return res.granted;
  };

  const startRunning = async () => {
    console.log("start running");
    setCounterActive(true);
    // step
    const subscription = Pedometer.watchStepCount((result) => {
      setCurrentSteps(completedSteps + result.steps);
      setMeters(stepLength * (completedSteps + result.steps));
    });
    setStepSubscription(subscription);
    // time
    const interval = setInterval(() => {
      setTimer((t) => t + 1);
    }, 1000);
    setTimerSubscription(interval);
  };
  const stopRunning = async () => {
    console.log("stop running");
    setRunning(false);
    setCounterActive(false);
    setStepSubscription((s) => {
      if (s) s.remove();
      return null;
    });
    setTimerSubscription((t) => {
      if (t) clearInterval(t);
      return null;
    });
    setCurrentSteps((s) => {
      setCompletedSteps(s);
      return s;
    });
  };

  const finishRunning = async () => {
    console.log("finish running");
    stopRunning();
    try {
      const res = await addDailyInfo({
        calory,
        traveledDistance: meters.toFixed(0),
        traveledTime: secondsToTimer2(timer),
        completeStep: currentSteps,
        new: true,
      });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const locationModalSubmit = async () => {
    const isLocationOn = await Location.hasServicesEnabledAsync();
    if (isLocationOn) {
      const activityPermission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION
      );
      if (activityPermission !== PermissionsAndroid.RESULTS.GRANTED)
        setActivityModal(true);
      else {
        setRunning(true);
        setCounterActive(true);
      }
    } else {
      await Location.getCurrentPositionAsync();
      setRunning(false);
      locationModalSubmit();
    }
    setLocationModal(false);
  };
  const activityModalSubmit = async () => {
    const permission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION
    );
    if (permission === PermissionsAndroid.RESULTS.GRANTED) {
      setActivityModal(false);
      setCounterActive(true);
    } else console.log("pedometer is not available");
  };

  if (!user) return null;
  return (
    <View style={styles.container}>
      <LocationModal
        visible={locationModal}
        setVisible={setLocationModal}
        onReject={() => {
          setLocationModal(false);
          setRunning(false);
        }}
        onSubmit={locationModalSubmit}
      />
      <ActivityModal
        visible={activityModal}
        setVisible={setActivityModal}
        onReject={() => {
          setActivityModal(false);
          setRunning(false);
        }}
        onSubmit={activityModalSubmit}
      />
      <ActivitiesTop
        steps={steps}
        currentSteps={currentSteps}
        completedSteps={completedSteps}
        counterActive={counterActive}
        setRunning={setRunning}
        setLocationModal={setLocationModal}
        setActivityModal={setActivityModal}
      />
      <ActivitiesBottom
        calory={calory}
        meters={meters}
        timer={secondsToTimer2(timer)}
      />
    </View>
  );
};

export default Activities;

const styles = StyleSheet.create({});
