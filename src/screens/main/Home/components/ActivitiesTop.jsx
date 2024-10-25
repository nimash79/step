import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { Pedometer } from "expo-sensors";

import { COLORS } from "../../../../utils/constants";
import LittleStepsIcon from "../../../../components/Icons/LittleStepsIcon";
import PlayIcon from "../../../../components/Icons/MediaIcons/PlayIcon";
import PauseIcon from "../../../../components/Icons/MediaIcons/PauseIcon";
import { e2p } from "../../../../utils/convertors";
import CustomText from "../../../../components/Shared/CustomText";

const ActivitiesTop = ({
  steps,
  currentSteps,
  completedSteps,
  counterActive,
  setRunning,
  setLocationModal,
  setActivityModal,
}) => {
  const [percent, setPercent] = useState(0);
  useEffect(() => {
    setPercent((currentSteps / steps) * 100);
  }, [currentSteps, steps]);
  return (
    <View style={styles.top}>
      <CustomText style={styles.headText} fontStyle="bold">
        فعالیت های امروز من
      </CustomText>
      <View style={styles.steps}>
        <LittleStepsIcon color={percent >= 10 && COLORS.primary} />
        <LittleStepsIcon color={percent >= 20 && COLORS.primary} />
        <LittleStepsIcon color={percent >= 30 && COLORS.primary} />
        <LittleStepsIcon color={percent >= 40 && COLORS.primary} />
        <LittleStepsIcon color={percent >= 50 && COLORS.primary} />
        <LittleStepsIcon color={percent >= 60 && COLORS.primary} />
        <LittleStepsIcon color={percent >= 70 && COLORS.primary} />
        <LittleStepsIcon color={percent >= 80 && COLORS.primary} />
        <LittleStepsIcon color={percent >= 90 && COLORS.primary} />
        <LittleStepsIcon color={percent >= 100 && COLORS.primary} />
      </View>
      {completedSteps == 0 && (
        <CustomText fontStyle="semibold" style={styles.startText}>
          شروع استِپ های امروز
        </CustomText>
      )}
      {counterActive && (
        <View style={styles.stepsTextContainer}>
          <CustomText fontStyle="bold" style={styles.stepsText}>
            {e2p(currentSteps)}
          </CustomText>
          <CustomText style={styles.stepsLabel} fontStyle="semibold">
            قدم ها
          </CustomText>
        </View>
      )}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "baseline",
        }}
      >
        <CustomText fontStyle="semibold" style={styles.goalText}>
          /{e2p(steps)}
        </CustomText>
        <CustomText fontStyle="extrabold" style={styles.completedStepText}>
          {e2p(currentSteps)}
        </CustomText>
      </View>
      <TouchableWithoutFeedback
        onPress={async () => setRunning((r) => !r)}
      >
        <View style={styles.play}>
          {counterActive ? <PauseIcon /> : <PlayIcon />}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default ActivitiesTop;

const styles = StyleSheet.create({
  top: {
    backgroundColor: COLORS.backSections,
    marginTop: 8,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: COLORS.tint2,
    borderTopStartRadius: 8,
    borderTopEndRadius: 8,
    marginBottom: 8,
  },
  headText: {
    fontSize: 20,
    color: COLORS.shade4,
    textAlign: "center",
    marginBottom: 16,
  },
  steps: {
    backgroundColor: COLORS.neutral_df,
    borderRadius: 9.6,
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
    padding: 10,
    justifyContent: "center",
    marginBottom: 16,
  },
  startText: {
    fontSize: 14,
    color: COLORS.shade1,
    textAlign: "center",
    marginBottom: 18,
  },
  stepsTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  stepsText: {
    fontSize: 36,
    color: COLORS.neutral_20,
    marginBottom: 8,
    marginRight: 16,
    flex: 0.7,
    textAlign: "right",
  },
  stepsLabel: {
    fontSize: 16,
    color: COLORS.neutral_40,
    bottom: 4,
  },
  completedStepText: {
    fontSize: 16,
    color: COLORS.neutral_20,
    textAlign: "center",
    marginBottom: 8,
    marginTop: -10,
    marginLeft: 4,
  },
  goalText: {
    fontSize: 14,
    color: COLORS.neutral_60,
    textAlign: "center",
    marginBottom: 8,
    marginTop: -10,
  },
  play: {
    alignSelf: "center",
    marginBottom: 8,
  },
});
