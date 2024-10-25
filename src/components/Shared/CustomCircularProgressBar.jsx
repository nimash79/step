import { StyleSheet } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";

import { COLORS } from "../../utils/constants";
import { e2p } from "../../utils/convertors";

const CustomCircularProgressBar = ({ value, ...props }) => {
  return (
    <CircularProgress
      value={value}
      title={`${e2p(value)} ٪`}
      titleFontSize={13}
      titleStyle={styles.font}
      showProgressValue={false}
      titleColor={COLORS.neutral_86}
      inActiveStrokeColor={COLORS.neutral_ed}
      activeStrokeColor={COLORS.primary}
      activeStrokeWidth={4}
      inActiveStrokeWidth={4}
      valuePrefixStyle={styles.font}
      radius={19}
      {...props}
    />
  );
};

export default CustomCircularProgressBar;

const styles = StyleSheet.create({
  font: {
    fontFamily: "peyda",
  },
});
