import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Constants from "expo-constants";
import { useCallback, useEffect, useState } from "react";

import BurgerIcon from "../../../components/Icons/BurgersIcon";
import InfoIcon from "../../../components/Icons/InfoIcon";
import UploadPicIcon from "../../../components/Icons/UploadPicIcon";
import { COLORS } from "../../../utils/constants";
import CustomText from "../../../components/Shared/CustomText";
import StepsIcon from "../../../components/Icons/ProfileIcons/StepsIcon";
import LocationIcon from "../../../components/Icons/ProfileIcons/LocationIcon";
import CaloryIcon from "../../../components/Icons/ProfileIcons/CaloryIcon";
import TimeIcon from "../../../components/Icons/ProfileIcons/TimeIcon";
import GiftIcon from "../../../components/Icons/ProfileIcons/GiftIcon";
import RefferrerModal from "../../../components/modals/RefferrerModal";
import { getUserInfo } from "../../../services/accountService";
import { getFriends, getTotal } from "../../../services/ownerService";
import config from "../../../services/config.json";
import { e2p } from "../../../utils/convertors";
import { calcBmi } from "../../../utils/helper";
import { useFocusEffect } from "@react-navigation/native";

const level1 = require("../../../components/Icons/LevelIcons/1.png");
const level2 = require("../../../components/Icons/LevelIcons/2.png");
const level3 = require("../../../components/Icons/LevelIcons/3.png");
const level4 = require("../../../components/Icons/LevelIcons/4.png");
const level5 = require("../../../components/Icons/LevelIcons/5.png");
const level6 = require("../../../components/Icons/LevelIcons/6.png");
const level7 = require("../../../components/Icons/LevelIcons/7.png");
const level8 = require("../../../components/Icons/LevelIcons/8.png");
const level9 = require("../../../components/Icons/LevelIcons/9.png");
const level10 = require("../../../components/Icons/LevelIcons/10.png");

const ProfileScreen = ({ navigation }) => {
  const [refferrerModal, setRefferrerModal] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [steps, setSteps] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [calory, setCalory] = useState(0);
  const [meters, setMeters] = useState(0);
  const [bmi, setBmi] = useState(0);
  const [weightStatus, setWeightStatus] = useState("وزن طبیعی");
  const [friends, setFriends] = useState([]);
  const [pageReady, setPageReady] = useState(false);
  useFocusEffect(
    useCallback(() => {
      (async () => {
        let res = await getUserInfo();
        setUserInfo(res.data.data);
        res = await getTotal();
        setSteps(res.data.data.totalSteps);
        setCalory(res.data.data.totalCalory);
        setMeters((res.data.data.totalDistance / 1000).toFixed(2));
        setHours(res.data.data.traveledTime.split(":")[0]);
        setMinutes(res.data.data.traveledTime.split(":")[1]);
        res = await getFriends();
        setFriends(res.data.data);
        setPageReady(true);
      })();
    }, [])
  );

  useEffect(() => {
    if (userInfo) setBmi(calcBmi(userInfo.weight, userInfo.height / 100));
  }, [userInfo]);
  useEffect(() => {
    if (bmi < 18.5) setWeightStatus("کمبود وزن");
    else if (bmi > 30 && bmi < 35) setWeightStatus("چاقی");
    else if (bmi >= 25 && bmi <= 30) setWeightStatus("اضافه وزن");
    else setWeightStatus("وزن طبیعی");
  }, [bmi]);

  const getColumnSubtitleStyle = () => {
    switch (weightStatus) {
      case "کمبود وزن":
        return {
          color: COLORS.tint5,
          backgroundColor: COLORS.tint0,
        };
      case "اضافه وزن":
        return {
          color: COLORS.warning,
          backgroundColor: COLORS.warning_light2,
        };
      case "چاقی":
        return {
          color: COLORS.error,
          backgroundColor: COLORS.error_light2,
        };
      case "وزن طبیعی":
        return {
          color: COLORS.success,
          backgroundColor: COLORS.success_light2,
        };
    }
  };

  const getLevelImage = (level) => {
    switch (level) {
      case 1:
        return level1;
      case 2:
        return level2;
      case 3:
        return level3;
      case 4:
        return level4;
      case 5:
        return level5;
      case 6:
        return level6;
      case 7:
        return level7;
      case 8:
        return level8;
      case 9:
        return level9;
      case 10:
        return level10;
      default:
        return level1;
    }
  };
  if (!pageReady) return null;
  return (
    <ScrollView style={styles.container}>
      <RefferrerModal
        visible={refferrerModal}
        setVisible={setRefferrerModal}
        refferrerCode={userInfo.referrer_code}
      />
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("Settings", userInfo)}
      >
        <View>
          <BurgerIcon style={styles.burgerButton} />
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => navigation.navigate("Info")}>
        <View>
          <InfoIcon style={styles.infoButton} />
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.profileContainer}>
        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: `${config.url}${userInfo.profileImage}` }}
            style={styles.profileImage}
          />
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("PersonalInformation")}
          >
            <View style={styles.uploadPicContainer}>
              <UploadPicIcon style={styles.uploadPic} />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <CustomText fontStyle="semibold" style={styles.fullname}>
          {userInfo.first_name}
        </CustomText>
        <CustomText style={styles.username}>{userInfo.username}</CustomText>
      </View>
      <View style={styles.levelContainer}>
        <TouchableWithoutFeedback
          onPress={() =>
            navigation.navigate("Achievements", {
              level: userInfo.level,
              score: userInfo.score,
            })
          }
        >
          <Image
            source={getLevelImage(userInfo.level)}
            style={styles.levelImage}
          />
        </TouchableWithoutFeedback>
        <View style={styles.progressContainer}>
          <View style={styles.progressDetails}>
            <CustomText style={styles.levelNumber}>
              سطح {e2p(userInfo.level)}
            </CustomText>
            <View style={styles.percentContanier}>
              <CustomText style={styles.total}>{userInfo.levelXp}</CustomText>
              <CustomText style={styles.total}>/</CustomText>
              <CustomText fontStyle="extrabold" style={styles.xp}>
                {userInfo.score}
              </CustomText>
            </View>
            <CustomText fontStyle="semibold" style={styles.percent}>
              {(userInfo.score / userInfo.levelXp) * 100} ٪
            </CustomText>
          </View>
          <View style={styles.progress}>
            <View
              style={[
                styles.innerProgress,
                {
                  width:
                    ((userInfo.score / userInfo.levelXp) * 100).toString() +
                    "%",
                },
              ]}
            ></View>
          </View>
        </View>
      </View>
      <View style={styles.summary}>
        <View style={styles.activities}>
          <View style={styles.activityContainer}>
            <LocationIcon />
            <CustomText fontStyle="bold" style={styles.activityValue}>
              {e2p(meters)}
            </CustomText>
            <CustomText style={styles.activityLabel}>کیلومتر</CustomText>
          </View>
          <View style={styles.activityContainer}>
            <TimeIcon />
            <CustomText style={styles.activityLabelSM}>
              <CustomText fontStyle="bold" style={styles.activityValue}>
                {e2p(hours)}
              </CustomText>{" "}
              ساعت{" "}
              <CustomText fontStyle="bold" style={styles.activityValue}>
                {e2p(minutes)}
              </CustomText>{" "}
              دقیقه
            </CustomText>
          </View>
          <View style={styles.activityContainer}>
            <CaloryIcon />
            <CustomText fontStyle="bold" style={styles.activityValue}>
              {e2p(calory)}
            </CustomText>
            <CustomText style={styles.activityLabelSM}>کیلوکالری</CustomText>
          </View>
        </View>
        <View style={styles.stepsSummary}>
          <CustomText fontStyle="bold" style={styles.stepsSummaryValue}>
            {e2p(steps.toLocaleString())}
          </CustomText>
          <CustomText fontStyle="semibold" style={styles.stepsSummaryLabel}>
            قدم
          </CustomText>
          <StepsIcon style={styles.stepsIcon} />
        </View>
      </View>
      <View style={styles.specifications}>
        <View style={styles.specifications1}>
          <View style={styles.extraWeightCorner}></View>
          <View style={styles.specificationsTextContainer}>
            <CustomText style={styles.specificationsText}>مشخصات من</CustomText>
          </View>
          <View style={styles.extraWeight}>
            <CustomText fontStyle="semibold" style={styles.extraWeightLabel}>
              میزان {weightStatus}:
            </CustomText>
            <View style={styles.extraWeightValueContainer}>
              <CustomText fontStyle="semibold" style={styles.extraWeightValue}>
                ۷.۶
              </CustomText>
              <CustomText style={styles.extraWeightUnit}>کیلوگرم</CustomText>
            </View>
          </View>
        </View>
        <View style={styles.specifications2}>
          <View style={styles.column}>
            <CustomText fontStyle="semibold" style={styles.columnTitle}>
              BMI
            </CustomText>
            <CustomText fontStyle="semibold" style={styles.columnValue}>
              {e2p(bmi)}
            </CustomText>
            <CustomText
              fontStyle="semibold"
              style={[styles.columnSubtitle, getColumnSubtitleStyle()]}
            >
              {weightStatus}
            </CustomText>
          </View>
          <View style={styles.column}>
            <CustomText fontStyle="semibold" style={styles.columnTitle}>
              وزن
            </CustomText>
            <CustomText fontStyle="semibold" style={styles.columnValue}>
              {e2p(userInfo.weight)}
            </CustomText>
            <CustomText fontStyle="semibold" style={styles.columnUnit}>
              کیلوگرم
            </CustomText>
          </View>
          <View style={styles.column}>
            <CustomText fontStyle="semibold" style={styles.columnTitle}>
              قد
            </CustomText>
            <CustomText fontStyle="semibold" style={styles.columnValue}>
              {e2p(userInfo.height / 100)}
            </CustomText>
            <CustomText fontStyle="semibold" style={styles.columnUnit}>
              متر
            </CustomText>
          </View>
        </View>
      </View>
      <View style={styles.editButtonRow}>
        <View style={styles.editButtonBackgroundHelper}></View>
        <View style={styles.editButtonShade}></View>
        <View style={styles.editButtonContainer}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("Specifications")}
          >
            <View style={styles.editButton}>
              <CustomText fontStyle="semibold" style={styles.editButtonText}>
                ویرایش مشخصات
              </CustomText>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <View style={styles.refferrerCodeContainer}>
        <CustomText fontStyle="semibold" style={styles.refferrerCodeTitle}>
          با دعوتِ هریک از دوستانِ خود '۱۰۰' امتیاز بگیرید!
        </CustomText>
        <TouchableWithoutFeedback onPress={() => setRefferrerModal(true)}>
          <View style={styles.refferrerCodeBtn}>
            <GiftIcon />
            <CustomText
              fontStyle="semibold"
              style={styles.refferrerCodeBtnText}
            >
              کد معرف من
            </CustomText>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.friendsContainer}>
        <CustomText fontStyle="semibold" style={styles.friendsListTitle}>
          لیست دوستان من {`(${friends.length})`}
        </CustomText>
        <View style={styles.friendsList}>
          {friends.map((friend, index) => (
            <View
              key={friend.username}
              style={[
                styles.friend,
                {
                  backgroundColor: index % 2 == 0 ? COLORS.tint0 : COLORS.tint1,
                },
              ]}
            >
              <Image
                source={{ uri: `${config.url}${friend.profileImage}` }}
                style={styles.friendImage}
              />
              <View style={styles.friendInfo}>
                <CustomText style={styles.friendUsername}>
                  {friend.username}
                </CustomText>
                <CustomText style={styles.friendLevel}>
                  سطح {e2p(friend.level)}
                </CustomText>
              </View>
              <View style={styles.friendSeparator}></View>
              <View style={styles.friendScore}>
                <CustomText
                  fontStyle="semibold"
                  style={styles.friendScoreValue}
                >
                  {e2p(friend.score.toLocaleString())}
                </CustomText>
                <CustomText style={styles.friendScoreLabel}>امتیاز</CustomText>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBF7FF",
    paddingHorizontal: "5%",
    marginTop: Constants.statusBarHeight,
  },
  burgerButton: {
    position: "absolute",
    top: 4,
    right: "5%",
  },
  infoButton: {
    position: "absolute",
    top: 4,
    left: "5%",
  },
  profileContainer: {
    alignSelf: "center",
    marginTop: 12,
    alignItems: "center",
  },
  profileImageContainer: {
    width: 64,
    height: 64,
  },
  profileImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  uploadPicContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.neutral_f9,
    borderColor: COLORS.neutral_df,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fullname: {
    fontSize: 16,
    marginTop: 8,
    color: COLORS.neutral_40,
  },
  username: {
    fontSize: 14,
    color: COLORS.neutral_ad,
    marginTop: 4,
  },
  levelContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: 16,
  },
  levelImage: {
    width: 32,
    height: 38,
    position: "absolute",
    left: 0,
    bottom: 0,
    zIndex: 1,
  },
  progressContainer: {
    flex: 1,
  },
  progressDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progress: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.tint2,
    height: 16,
    marginLeft: 10,
  },
  innerProgress: {
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    height: "100%",
  },
  levelNumber: {
    color: COLORS.shade2,
    fontSize: 14,
    left: 8 + 32,
    alignSelf: "center",
  },
  percentContanier: {
    flexDirection: "row",
  },
  xp: {
    color: COLORS.shade2,
    fontSize: 20,
    marginLeft: -2,
  },
  total: {
    color: COLORS.neutral_60,
    fontSize: 12,
    alignSelf: "flex-end",
    marginRight: 4,
  },
  percent: {
    color: COLORS.neutral_60,
    fontSize: 10,
    alignSelf: "flex-end",
    marginRight: 4,
  },
  summary: {
    flexDirection: "row",
    marginTop: 24,
    justifyContent: "space-between",
  },
  stepsSummary: {
    backgroundColor: COLORS.tint1,
    borderRadius: 8,
    alignItems: "flex-end",
    flex: 1,
    marginLeft: 16,
  },
  stepsSummaryValue: {
    fontSize: 30,
    color: COLORS.shade2,
    alignSelf: "center",
    marginTop: 28,
  },
  stepsSummaryLabel: {
    fontSize: 16,
    color: COLORS.tint5,
    alignSelf: "center",
  },
  stepsIcon: {
    position: "absolute",
    bottom: 8,
    right: 8,
  },
  activities: {
    flex: 1,
  },
  activityContainer: {
    flexDirection: "row",
    backgroundColor: COLORS.tint1,
    borderRadius: 8,
    marginBottom: 5,
    justifyContent: "space-around",
    height: 50,
    alignItems: "center",
  },
  activityValue: {
    fontSize: 20,
    color: COLORS.shade2,
  },
  activityLabel: {
    fontSize: 12,
    color: COLORS.tint4,
  },
  activityLabelSM: {
    fontSize: 10,
    color: COLORS.tint4,
  },
  refferrerCodeContainer: {
    marginTop: 20,
    backgroundColor: COLORS.shade2,
    borderRadius: 8,
    paddingHorizontal: "2.5%",
  },
  refferrerCodeTitle: {
    fontSize: 16,
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: 16,
  },
  refferrerCodeBtn: {
    marginVertical: 8,
    flexDirection: "row",
    backgroundColor: COLORS.tint1,
    borderRadius: 8,
    alignSelf: "center",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 14,
  },
  refferrerCodeBtnText: {
    fontSize: 16,
    color: COLORS.primary,
    marginLeft: 6,
  },
  specifications: {
    flexDirection: "row",
    marginTop: 20,
  },
  specifications1: {
    backgroundColor: COLORS.neutral_ed,
    borderTopLeftRadius: 8,
  },
  specificationsTextContainer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 8,
    borderBottomRightRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 6.5,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderColor: "#8871FF",
    borderStyle: "dashed",
  },
  specificationsText: {
    fontSize: 14,
    color: COLORS.shade2,
  },
  extraWeight: {
    alignItems: "center",
    backgroundColor: COLORS.neutral_ed,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  extraWeightLabel: {
    fontSize: 10,
    color: COLORS.neutral_60,
    marginTop: 6,
    marginBottom: 12,
  },
  extraWeightValueContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  extraWeightValue: {
    padding: 4,
    borderRadius: 8,
    fontSize: 10,
    color: COLORS.neutral_60,
    backgroundColor: COLORS.tint0,
  },
  extraWeightUnit: {
    fontSize: 10,
    color: COLORS.neutral_86,
    marginLeft: 4,
  },
  specifications2: {
    flexDirection: "row",
    backgroundColor: COLORS.neutral_ed,
    borderTopLeftRadius: 8,
    flex: 1,
    borderTopRightRadius: 8,
  },
  column: {
    width: "33%",
    alignItems: "center",
  },
  columnTitle: {
    fontSize: 16,
    color: COLORS.shade4,
    marginTop: 8,
  },
  columnValue: {
    fontSize: 16,
    color: COLORS.neutral_60,
    marginTop: 12,
  },
  columnSubtitle: {
    fontSize: 10,
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 8,
    marginTop: 2,
    marginBottom: 8,
  },
  columnUnit: {
    fontSize: 10,
    color: COLORS.tint4,
    marginTop: 4,
    marginBottom: 8,
  },
  extraWeightCorner: {
    backgroundColor: "#FBF7FF",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: 5,
    zIndex: 0,
  },
  editButtonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  editButtonShade: {
    flex: 1,
    borderRadius: 8,
    backgroundColor: "#FBF7FF",
  },
  editButtonBackgroundHelper: {
    backgroundColor: COLORS.neutral_ed,
    position: "absolute",
    top: 0,
    left: 10,
    right: 0,
    height: 5,
  },
  editButtonContainer: {
    backgroundColor: COLORS.neutral_ed,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    padding: 4,
  },
  editButton: {
    backgroundColor: COLORS.neutral_f9,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.primary,
    paddingVertical: 7.5,
    paddingHorizontal: 5,
  },
  editButtonText: {
    fontSize: 11,
    color: COLORS.primary,
  },
  friendsContainer: {
    marginTop: 24,
  },
  friendsListTitle: {
    fontSize: 16,
    color: COLORS.shade4,
    marginBottom: 16,
  },
  friend: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  friendImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  friendInfo: {
    marginLeft: 8,
    flex: 0.8,
  },
  friendUsername: {
    fontSize: 12,
    color: COLORS.neutral_20,
    textAlign: "left",
  },
  friendLevel: {
    fontSize: 10,
    color: COLORS.neutral_60,
  },
  friendScore: {
    alignItems: "center",
    marginVertical: 10,
    flex: 0.2,
  },
  friendScoreValue: {
    fontSize: 14,
    color: COLORS.shade3,
  },
  friendScoreLabel: {
    fontSize: 10,
    color: COLORS.neutral_86,
  },
  friendSeparator: {
    backgroundColor: COLORS.neutral_ed,
    width: 1,
    height: 26,
  },
});
