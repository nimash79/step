import { Image, ScrollView, TouchableWithoutFeedback } from "react-native";
import Constants from "expo-constants";
import { StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";

import BackIcon from "../../../components/Icons/BackIcon";
import CustomText from "../../../components/Shared/CustomText";
import { COLORS } from "../../../utils/constants";
import { e2p } from "../../../utils/convertors";

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
const level_locked = require("../../../components/Icons/LevelIcons/locked.png");

const AchievementsScreen = ({ navigation, route }) => {
  const [levels, setLevels] = useState([]);
  useEffect(() => {
    const levelsList = [];
    for (let i = 1; i <= 10; i++) {
      const level = (
        <View style={styles.level} key={i}>
          <Image
            source={i <= route.params.level ? getLevelImage(i) : level_locked}
            style={styles.levelImage}
          />
          <CustomText fontStyle="semibold" style={styles.levelText}>
            سطح {e2p(i)}
          </CustomText>
          <CustomText fontStyle="semibold" style={styles.scoreText}>
            {e2p(calcLevelXP(i))} امتیاز
          </CustomText>
        </View>
      );
      levelsList.push(level);
    }
    setLevels(levelsList);
  }, [route]);
  const calcLevelXP = (level) => {
    switch (level) {
      case 1:
        return 100;
      case 2:
        return 200;
      case 3:
        return 500;
      case 4:
        return 1000;
      case 5:
        return 2000;
      case 6:
        return 10000;
      case 7:
        return 50000;
      case 8:
        return 100000;
      case 9:
        return 500000;
      case 10:
        return 1000000;
      default:
        return 100;
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
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../../assets/inapp/levels_background.png")}
        style={styles.backgroundImage}
        resizeMode="stretch"
      />
      <View style={styles.header}>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <View style={styles.backIcon}>
            <BackIcon />
          </View>
        </TouchableWithoutFeedback>
        <CustomText fontStyle="bold" style={styles.headerText}>
          دستاورد های من
        </CustomText>
      </View>
      <ScrollView style={styles.subContainer}>
        <View style={styles.levelContainer}>
          <Image source={getLevelImage(route.params.level)} />
          <CustomText fontStyle="semibold" style={styles.myLevel}>
            سطح {e2p(route.params.level)}
          </CustomText>
          <CustomText style={styles.myScore}>
            {e2p(route.params.score)} امتیاز
          </CustomText>
        </View>
        <View style={styles.levels}>{levels}</View>
      </ScrollView>
    </View>
  );
};

export default AchievementsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBF7FF",
    marginTop: Constants.statusBarHeight,
  },
  subContainer: {
    paddingHorizontal: "5%",
    flex: 1,
  },
  header: {
    marginTop: 4,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: "5%",
  },
  backIcon: {
    position: "absolute",
    left: 0,
  },
  headerText: {
    fontSize: 20,
    color: COLORS.neutral_40,
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "40%",
  },
  levelContainer: {
    alignSelf: "center",
    alignContent: "center",
    justifyContent: "center",
    marginTop: 24,
  },
  myLevel: {
    fontSize: 16,
    color: COLORS.shade4,
    textAlign: "center",
    marginTop: 16,
  },
  myScore: {
    fontSize: 14,
    color: COLORS.shade1,
    textAlign: "center",
    marginTop: 8,
  },
  levels: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: COLORS.backSections,
    borderRadius: 8,
    justifyContent: "space-around",
    marginTop: 16,
    paddingVertical: 24,
    marginBottom: 44,
  },
  levelRow: {
    flexDirection: "row",
  },
  level: {
    width: "35%",
    marginTop: 16,
  },
  levelImage: {
    alignSelf: "center",
    maxWidth: 70,
    maxHeight: 75,
  },
  levelText: {
    fontSize: 14,
    color: COLORS.shade2,
    marginTop: 12,
    textAlign: "center",
  },
  scoreText: {
    fontSize: 10,
    color: COLORS.neutral_ad,
    marginTop: 4,
    textAlign: "center",
  },
});
