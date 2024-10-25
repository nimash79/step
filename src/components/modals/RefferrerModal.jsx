import {
  StyleSheet,
  View,
  Modal,
  TouchableWithoutFeedback,
  Linking,
  Share,
} from "react-native";
import { BlurView } from "expo-blur";
import { useEffect, useState } from "react";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";
import * as Sharing from "expo-sharing";

import CustomText from "../Shared/CustomText";
import CloseIcon from "./../Icons/CloseIcon";
import AddFriendIcon from "./../Icons/ProfileIcons/AddFriendIcon";
import CopyIcon from "./../Icons/ProfileIcons/CopyIcon";
import { COLORS } from "../../utils/constants";
import { e2p } from "../../utils/convertors";
import TelegramIcon from "./../Icons/ProfileIcons/TelegramIcon";
import FacebookIcon from "./../Icons/ProfileIcons/FacebookIcon";
import InstagramIcon from "./../Icons/ProfileIcons/InstagramIcon";
import LinkedinIcon from "./../Icons/ProfileIcons/LinkedinIcon";
import YoutubeIcon from "./../Icons/ProfileIcons/YoutubeIcon";
import DotIcon from "./../Icons/ProfileIcons/DotIcon";
import DiscardIcon from "./../Icons/ProfileIcons/DiscardIcon";

const RefferrerModal = ({ refferrerCode = 0, visible, setVisible }) => {
  const [copied, setCopied] = useState(false);
  const [share, setShare] = useState(false);
  const [shareHeight, setShareHeight] = useState(164);
  const animatedHeight = useSharedValue(0);
  useEffect(() => {
    if (copied) setTimeout(() => setCopied(false), 3000);
  }, [copied]);
  useEffect(() => {
    if (visible) {
      setShare(false);
      setShareHeight(164);
      animatedHeight.value = 0;
    }
  }, [visible]);
  const shareToggle = () => {
    setShare((a) => !a);
    animatedHeight.value =
      animatedHeight.value === 0 ? withTiming(shareHeight) : withTiming(0);
  };

  const shareMore = async () => {
    const message = `برنامه استِپ را نصب کن تا ۱۰۰ امتیاز بگیری.\nکد معرفی من: ${refferrerCode}`;
    const url = "https://step.liara.run";
    try {
      const result = await Share.share({
        message,
        url,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("Shared with activity type:", result.activityType);
        } else {
          console.log("Shared successfully");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("Share dismissed");
      }
    } catch (error) {
      console.log("Error sharing", error.message);
    }
  };

  const shareForTelegram = async () => {
    const message = `برنامه استِپ را نصب کن تا ۱۰۰ امتیاز بگیری.\nکد معرفی من: ${refferrerCode}`;
    const url = `tg://msg?text=${message}`;
    try {
      await Linking.openURL(url);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <BlurView
        intensity={100}
        tint="systemChromeMaterialDark"
        style={styles.centeredView}
      >
        <View style={styles.modalView}>
          <TouchableWithoutFeedback onPress={() => setVisible(false)}>
            <CloseIcon width={24} height={24} style={styles.closeIcon} />
          </TouchableWithoutFeedback>
          <View style={styles.refferrerContainer}>
            <CustomText fontStyle="semibold" style={styles.refferrerLabel}>
              کد معرف من
            </CustomText>
            <CustomText fontStyle="semibold" style={styles.refferrerValue}>
              {e2p(refferrerCode)}
            </CustomText>
          </View>
          <View style={styles.refferrerFooter}>
            <TouchableWithoutFeedback onPress={shareToggle}>
              <View style={styles.invitationContainer}>
                <AddFriendIcon />
                <CustomText fontStyle="semibold" style={styles.invitationText}>
                  دعوت از دوستانم
                </CustomText>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => setCopied(true)}>
              <View style={styles.copyButton}>
                <CopyIcon copied={copied} />
              </View>
            </TouchableWithoutFeedback>
          </View>
          <CustomText style={styles.refferrerSubtitle}>
            با دعوتِ هریک از دوستانِ خود '۱۰۰' امتیاز بگیرید!
          </CustomText>
          {copied && (
            <View style={styles.copyContainer}>
              <CopyIcon color={COLORS.success} style={styles.copyIcon} />
              <CustomText style={styles.copyAlert}>کد معرف کپی شد!</CustomText>
            </View>
          )}
        </View>
        <Animated.View
          style={[styles.shareContainer, { height: animatedHeight }]}
        >
          <TouchableWithoutFeedback onPress={shareToggle}>
            <View style={styles.closeShare}>
              <DiscardIcon />
            </View>
          </TouchableWithoutFeedback>
          <CustomText style={styles.shareTitle}>
            اشتراک گذاری کد معرف
          </CustomText>
          <View style={styles.icons}>
            <TouchableWithoutFeedback onPress={shareMore}>
              <View style={styles.more}>
                <View style={styles.more_icons}>
                  <DotIcon />
                  <DotIcon />
                  <DotIcon />
                </View>
                <CustomText fontStyle="semibold" style={styles.moreText}>
                  بیشتر
                </CustomText>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={shareMore}>
              <View style={styles.icon}>
                <YoutubeIcon />
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={shareMore}>
              <View style={styles.icon}>
                <LinkedinIcon />
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={shareMore}>
              <View style={styles.icon}>
                <InstagramIcon />
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={shareMore}>
              <View style={styles.icon}>
                <FacebookIcon />
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={shareForTelegram}>
              <View style={styles.icon}>
                <TelegramIcon />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </Animated.View>
      </BlurView>
    </Modal>
  );
};

export default RefferrerModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    width: "80%",
    margin: 20,
    borderRadius: 8,
    paddingVertical: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeIcon: {
    position: "absolute",
    top: 8,
    left: 8,
  },
  refferrerContainer: {
    borderWidth: 1,
    borderColor: COLORS.shade2,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    alignSelf: "center",
  },
  refferrerLabel: {
    fontSize: 16,
    color: COLORS.neutral_60,
    marginRight: 16,
  },
  refferrerValue: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: COLORS.tint5,
    borderRadius: 8,
    color: COLORS.tint0,
  },
  refferrerFooter: {
    marginTop: 8,
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
  },
  invitationContainer: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
  },
  invitationText: {
    fontSize: 16,
    color: COLORS.neutral_f9,
    marginLeft: 6,
  },
  copyButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  refferrerSubtitle: {
    fontSize: 12,
    color: COLORS.neutral_40,
    alignSelf: "center",
    marginTop: 24,
  },
  copyContainer: {
    position: "absolute",
    bottom: -64,
    left: 0,
    right: 0,
    height: 40,
    backgroundColor: COLORS.success_light2,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  copyAlert: {
    fontSize: 14,
    color: COLORS.success,
  },
  copyIcon: {
    marginHorizontal: 16,
  },
  shareContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.blackMainP,
    borderWidth: 1,
    borderColor: COLORS.neutral_ed,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  closeShare: {
    position: "absolute",
    right: 16,
    top: 16,
  },
  shareTitle: {
    fontSize: 14,
    color: COLORS.neutral_40,
    textAlign: "center",
    marginTop: 24,
    marginBottom: 16,
  },
  icons: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.neutral_ed,
    width: "85%",
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 64,
    justifyContent: "space-between",
    alignContent: "center",
  },
  more_icons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  moreText: {
    fontSize: 10,
    color: COLORS.neutral_86,
  },
});
