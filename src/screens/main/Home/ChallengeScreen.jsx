import {
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import Constants from "expo-constants";

import { COLORS } from "../../../utils/constants";
import BackIcon from "../../../components/Icons/BackIcon";
import Platform from "../../../components/Svgs/Platform";
import CustomText from "../../../components/Shared/CustomText";
import Gold from "../../../components/Icons/MedalIcons/Gold";
import Silver from "../../../components/Icons/MedalIcons/Silver";
import Bronze from "../../../components/Icons/MedalIcons/Bronze";
import { challenge } from "../../../services/ownerService";
import { e2p } from "../../../utils/convertors";
import config from "../../../services/config.json";

const defaultImage = require("../../../../assets/inapp/profile.png");

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const ChallengeScreen = ({ navigation }) => {
  const [leaderboardType, setLeaderboardType] = useState("weekly");
  const [topUsers, setTopUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [mySelf, setMySelf] = useState();
  useEffect(() => {
    (async () => {
      const { data } = await challenge(leaderboardType);
      console.log(data.data);
      if (data.data.values.length) {
        setTopUsers(data.data.values.splice(0, 3));
        setUsers(data.data.values);
        setMySelf(data.data.mySelfInformation);
      } else {
        setTopUsers([]);
        setUsers([]);
        setMySelf();
      }
    })();
  }, [leaderboardType]);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <View>
            <BackIcon />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.platform}>
          <Platform />
        </View>
        <View style={styles.head}>
          <CustomText style={styles.best} fontStyle="bold">
            برترین های استِپ
          </CustomText>
          <View style={styles.buttons}>
            <TouchableWithoutFeedback
              onPress={() => setLeaderboardType("overall")}
            >
              <View
                style={
                  leaderboardType === "overall"
                    ? [styles.buttonContainer, styles.activeButtonContainer]
                    : styles.buttonContainer
                }
              >
                <CustomText
                  style={
                    leaderboardType === "overall"
                      ? [styles.button, styles.activeButton]
                      : styles.button
                  }
                >
                  کلی
                </CustomText>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => setLeaderboardType("weekly")}
            >
              <View
                style={
                  leaderboardType === "weekly"
                    ? [styles.buttonContainer, styles.activeButtonContainer]
                    : styles.buttonContainer
                }
              >
                <CustomText
                  style={
                    leaderboardType === "weekly"
                      ? [styles.button, styles.activeButton]
                      : styles.button
                  }
                >
                  هفتگی
                </CustomText>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
        <View style={styles.leaderboard}>
          <View style={[styles.item, styles.goldItem]}>
            <View style={styles.medal}>
              <Gold />
            </View>
            <View style={styles.line}></View>
            <View style={styles.user}>
              <Image
                source={
                  topUsers[0]
                    ? `${config.url}${topUsers[0].profileImage}`
                    : defaultImage
                }
                style={styles.profile}
                placeholder={blurhash}
                transition={1000}
              />
              <CustomText style={styles.username}>
                {topUsers[0] ? topUsers[0].username : "خالی"}
              </CustomText>
            </View>
            <View style={styles.line}></View>
            <View style={styles.score}>
              <CustomText style={styles.scoreValue}>
                {topUsers[0] ? topUsers[0].score : 0}
              </CustomText>
              <CustomText style={styles.scoreLabel}>امتیاز</CustomText>
            </View>
          </View>
          <View style={[styles.item, styles.silverItem]}>
            <View style={styles.medal}>
              <Silver />
            </View>
            <View style={styles.line}></View>
            <View style={styles.user}>
              <Image
                source={
                  topUsers[1]
                    ? `${config.url}${topUsers[1].profileImage}`
                    : defaultImage
                }
                style={styles.profile}
                placeholder={blurhash}
                transition={1000}
              />
              <CustomText style={styles.username}>
                {topUsers[1] ? topUsers[1].username : "خالی"}
              </CustomText>
            </View>
            <View style={styles.line}></View>
            <View style={styles.score}>
              <CustomText style={styles.scoreValue}>
                {topUsers[1] ? topUsers[1].score : 0}
              </CustomText>
              <CustomText style={styles.scoreLabel}>امتیاز</CustomText>
            </View>
          </View>
          <View style={[styles.item, styles.bronzeItem]}>
            <View style={styles.medal}>
              <Bronze />
            </View>
            <View style={styles.line}></View>
            <View style={styles.user}>
              <Image
                source={
                  topUsers[2]
                    ? `${config.url}${topUsers[2].profileImage}`
                    : defaultImage
                }
                style={styles.profile}
                placeholder={blurhash}
                transition={1000}
              />
              <CustomText style={styles.username}>
                {topUsers[2] ? topUsers[2].username : "خالی"}
              </CustomText>
            </View>
            <View style={styles.line}></View>
            <View style={styles.score}>
              <CustomText style={styles.scoreValue}>
                {topUsers[2] ? topUsers[2].score : 0}
              </CustomText>
              <CustomText style={styles.scoreLabel}>امتیاز</CustomText>
            </View>
          </View>
          <View style={styles.restLeaderboard}>
            {users.map((user) => (
              <View style={styles.item} key={user.rank}>
                <View style={styles.badge}>
                  <CustomText style={styles.rank}>{e2p(user.rank)}</CustomText>
                </View>
                <View style={styles.line}></View>
                <View style={styles.user}>
                  <Image
                    source={{ uri: `${config.url}${user.profileImage}` }}
                    style={styles.profile}
                    placeholder={blurhash}
                    transition={1000}
                  />
                  <CustomText style={styles.username}>
                    {user.username}
                  </CustomText>
                </View>
                <View style={styles.line}></View>
                <View style={styles.score}>
                  <CustomText style={styles.scoreValue}>
                    {e2p(user.score)}
                  </CustomText>
                  <CustomText style={styles.scoreLabel}>امتیاز</CustomText>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <View style={[styles.item, styles.myItem]}>
        <View style={styles.badge}>
          <CustomText style={styles.myRank}>
            {mySelf && e2p(mySelf.rank)}
          </CustomText>
        </View>
        <View style={styles.line}></View>
        <View style={styles.user}>
          {mySelf ? (
            <Image
              source={`${config.url}${mySelf.profileImage}`}
              style={styles.profile}
              placeholder={blurhash}
              transition={1000}
            />
          ) : (
            <Image
              source={defaultImage}
              style={styles.profile}
              placeholder={blurhash}
              transition={1000}
            />
          )}
          <CustomText style={styles.username}>رتبه فعلی شما</CustomText>
        </View>
        <View style={styles.line}></View>
        <View style={styles.score}>
          <CustomText style={styles.scoreValue}>
            {mySelf && e2p(mySelf.score)}
          </CustomText>
          <CustomText style={[styles.scoreLabel, styles.myScoreLabel]}>
            امتیاز
          </CustomText>
        </View>
      </View>
    </View>
  );
};

export default ChallengeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBF7FF",
    paddingHorizontal: "5%",
  },
  header: {
    marginTop: Constants.statusBarHeight + 4,
  },
  platform: {
    alignSelf: "center",
    marginBottom: 8,
  },
  head: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  best: {
    fontSize: 20,
    color: COLORS.shade5,
  },
  buttons: {
    flexDirection: "row",
    backgroundColor: COLORS.tint2,
    borderRadius: 21,
    height: "100%",
  },
  buttonContainer: {
    borderRadius: 21,
    justifyContent: "center",
  },
  activeButtonContainer: {
    backgroundColor: COLORS.shade1,
  },
  button: {
    fontSize: 13,
    color: COLORS.tint5,
    width: 55,
    textAlign: "center",
  },
  activeButton: {
    color: COLORS.neutral_ed,
    fontFamily: "peyda_bold",
  },
  item: {
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 8,
    alignItems: "center",
  },
  goldItem: {
    backgroundColor: COLORS.gold,
    borderWidth: 1,
    borderColor: COLORS.neutral_ed,
    marginBottom: 8,
  },
  silverItem: {
    backgroundColor: COLORS.silver,
    borderWidth: 1,
    borderColor: COLORS.neutral_ed,
    marginBottom: 8,
  },
  bronzeItem: {
    backgroundColor: COLORS.bronze,
    borderWidth: 1,
    borderColor: COLORS.neutral_ed,
    marginBottom: 8,
  },
  medal: {
    height: "100%",
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  line: {
    height: 28,
    backgroundColor: COLORS.neutral_ed,
    width: 1,
    // marginTop: 11
  },
  score: {
    width: 70,
    alignItems: "center",
    justifyContent: "center",
  },
  scoreValue: {
    fontFamily: "iransans_num_bold",
    fontSize: 14,
    color: COLORS.shade3,
  },
  scoreLabel: {
    fontSize: 10,
    color: COLORS.neutral_ad,
  },
  user: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  profile: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 8,
  },
  username: {
    marginLeft: 16,
  },
  restLeaderboard: {
    borderRadius: 8,
    borderColor: COLORS.neutral_ed,
    borderWidth: 1,
    marginBottom: 88,
  },
  badge: {
    width: 50,
    alignItems: "center",
  },
  rank: {
    backgroundColor: COLORS.neutral_ed,
    width: 28,
    height: 28,
    borderRadius: 25,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 13,
    color: COLORS.neutral_20,
  },
  myItem: {
    backgroundColor: COLORS.tint2,
    borderWidth: 1,
    borderColor: COLORS.tint3,
    borderRadius: 10,
    position: "absolute",
    bottom: 4,
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
  myRank: {
    fontFamily: "peyda_semibold",
    fontSize: 13,
  },
  myScoreLabel: {
    color: COLORS.neutral_86,
  },
});
