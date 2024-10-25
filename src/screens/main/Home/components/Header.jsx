import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Image,
} from "react-native";
import Constants from "expo-constants";

import CustomText from "../../../../components/Shared/CustomText";
import CupIcon from "../../../../components/Icons/CupIcon";
import { COLORS } from "../../../../utils/constants";
import config from "../../../../services/config.json";
import { useSelector } from "react-redux";

const Header = ({ navigation }) => {
  const user = useSelector((state) => state.user);
  return (
    <View style={styles.header}>
      <View style={styles.profile}>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("Profile")}
        >
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{ uri: `${config.url}${user?.profileImage}` }}
            />
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.profileTexts}>
          <CustomText style={{ fontSize: 14, color: "#606060" }}>
            سلام !{" "}
          </CustomText>
          <CustomText
            style={{ fontSize: 16, color: "#202020" }}
            fontStyle="bold"
          >
            {user?.first_name}
          </CustomText>
        </View>
      </View>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("Challenge")}
      >
        <View style={styles.challengeButton}>
          <CustomText style={styles.challengButtonText} fontStyle="semibold">
            چالش
          </CustomText>
          <CupIcon />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    marginTop: Constants.statusBarHeight,
    paddingVertical: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  profileTexts: {
    marginLeft: 8,
  },
  challengeButton: {
    backgroundColor: COLORS.shade1,
    flexDirection: "row",
    borderRadius: 8,
    padding: 8,
  },
  challengButtonText: {
    color: COLORS.warning_light2,
    marginRight: 8,
    fontSize: 16,
  },
});
