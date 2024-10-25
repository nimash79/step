import {
  StyleSheet,
  View,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { BlurView } from "expo-blur";

import CustomText from "../../Shared/CustomText";
import { COLORS } from "../../../utils/constants";
import { useState, useEffect } from "react";
import FlowerIcon from "../../Icons/FlowerIcon";
import HomeIcon from "../../Icons/HomeIcon";
import GymIcon from "../../Icons/GymIcon";
import BuildingIcon from "../../Icons/BuildingIcon";
import TreeIcon from "../../Icons/TreeIcon";

const PlacesModal = ({ visible, setVisible, sportPlaces, setSportPlaces }) => {
  const [options, setOptions] = useState([]);
  const [allOptions, setAllOptions] = useState([]);
  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    if (visible) {
      setAllOptions(["فضای باز", "خانه", "باشگاه", "فضای بسته", "پارک"]);
      setOptions(sportPlaces);
    }
  }, [visible]);
  useEffect(() => {
    if (options.length) setDisabled(false);
    else setDisabled(true);
  }, [options]);
  const changeOptions = (value) => {
    const list = [...options];
    const index = list.findIndex((o) => o === value);
    if (index !== -1) list.splice(index, 1);
    else list.push(value);
    setOptions(list);
  };
  const selected = (value) => options.filter((o) => o === value).length;
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <BlurView
        intensity={100}
        tint="systemChromeMaterialDark"
        style={styles.centeredView}
      >
        <View style={styles.modalView}>
          <View style={styles.header}>
            <CustomText style={styles.title}>مکان تمرین</CustomText>
          </View>
          <View style={styles.body}>
            <CustomText style={styles.description}>
              فضاهای تمرینی مورد علاقه خود را انتخاب کنید.
            </CustomText>
            <View style={styles.options}>
              {options.map((place) => (
                <TouchableWithoutFeedback
                  key={place}
                  onPress={() => changeOptions(place)}
                >
                  <View
                    style={[
                      styles.option,
                      {
                        backgroundColor: COLORS.tint5,
                      },
                    ]}
                  >
                    <FlowerIcon color={"white"} />
                    <CustomText style={[styles.optionText, { color: "white" }]}>
                      {place}
                    </CustomText>
                  </View>
                </TouchableWithoutFeedback>
              ))}
              {allOptions
                .filter((o) => !options.includes(o))
                .map((place) => (
                  <TouchableWithoutFeedback
                    key={place}
                    onPress={() => changeOptions(place)}
                  >
                    <View
                      style={[
                        styles.option,
                        {
                          backgroundColor: COLORS.backLight,
                        },
                      ]}
                    >
                      <FlowerIcon color={COLORS.neutral_40} />
                      <CustomText style={styles.optionText}>{place}</CustomText>
                    </View>
                  </TouchableWithoutFeedback>
                ))}
              {/* <TouchableWithoutFeedback onPress={() => changeOptions("فضای باز")}>
                <View
                  style={[
                    styles.option,
                    {
                      backgroundColor: selected("فضای باز")
                        ? COLORS.tint5
                        : COLORS.backLight,
                    },
                  ]}
                >
                  <FlowerIcon
                    color={selected("فضای باز") ? "white" : COLORS.neutral_40}
                  />
                  <CustomText
                    style={[
                      styles.optionText,
                      selected("فضای باز") ? { color: "white" } : {},
                    ]}
                  >
                    فضای باز
                  </CustomText>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => changeOptions("خانه")}>
                <View
                  style={[
                    styles.option,
                    {
                      backgroundColor: selected("خانه")
                        ? COLORS.tint5
                        : COLORS.backLight,
                    },
                  ]}
                >
                  <HomeIcon color={selected("خانه") ? "white" : COLORS.neutral_40} />
                  <CustomText
                    style={[
                      styles.optionText,
                      selected("خانه") ? { color: "white" } : {},
                    ]}
                  >
                    خانه
                  </CustomText>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => changeOptions("باشگاه")}>
                <View
                  style={[
                    styles.option,
                    {
                      backgroundColor: selected("باشگاه")
                        ? COLORS.tint5
                        : COLORS.backLight,
                    },
                  ]}
                >
                  <GymIcon color={selected("باشگاه") ? "white" : COLORS.neutral_40} />
                  <CustomText
                    style={[
                      styles.optionText,
                      selected("باشگاه") ? { color: "white" } : {},
                    ]}
                  >
                    باشگاه
                  </CustomText>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => changeOptions("فضای بسته")}>
                <View
                  style={[
                    styles.option,
                    {
                      backgroundColor: selected("فضای بسته")
                        ? COLORS.tint5
                        : COLORS.backLight,
                    },
                  ]}
                >
                  <BuildingIcon
                    color={selected("فضای بسته") ? "white" : COLORS.neutral_40}
                  />
                  <CustomText
                    style={[
                      styles.optionText,
                      selected("فضای بسته") ? { color: "white" } : {},
                    ]}
                  >
                    فضای بسته
                  </CustomText>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => changeOptions("پارک")}>
                <View
                  style={[
                    styles.option,
                    {
                      backgroundColor: selected("پارک")
                        ? COLORS.tint5
                        : COLORS.backLight,
                    },
                  ]}
                >
                  <TreeIcon color={selected("پارک") ? "white" : COLORS.neutral_40} />
                  <CustomText
                    style={[
                      styles.optionText,
                      selected("پارک") ? { color: "white" } : {},
                    ]}
                  >
                    پارک
                  </CustomText>
                </View>
              </TouchableWithoutFeedback> */}
            </View>
            <View style={{ marginTop: 32 }}></View>
          </View>
          <View style={styles.buttons}>
            <TouchableWithoutFeedback
              onPress={() => {
                setSportPlaces(options);
                setVisible(false);
              }}
            >
              <View style={styles.submitButton}>
                <CustomText
                  fontStyle="semibold"
                  style={styles.submitButtonText}
                >
                  تایید
                </CustomText>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => setVisible(false)}>
              <View style={styles.cancelButton}>
                <CustomText
                  fontStyle="semibold"
                  style={styles.cancelButtonText}
                >
                  لغو
                </CustomText>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </BlurView>
    </Modal>
  );
};

export default PlacesModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalView: {
    width: "100%",
    paddingHorizontal: "10%",
    backgroundColor: COLORS.backMainP,
    borderWidth: 1,
    borderColor: COLORS.neutral_ed,
    borderTopStartRadius: 24,
    borderTopEndRadius: 24,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.neutral_ed,
    paddingVertical: 16,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
  },
  body: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.neutral_ed,
    marginBottom: 16,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    width: "45%",
    paddingVertical: 12,
  },
  submitButtonText: {
    fontSize: 14,
    color: COLORS.neutral_f9,
  },
  cancelButton: {
    backgroundColor: COLORS.neutral_f9,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    width: "45%",
    paddingVertical: 12,
  },
  cancelButtonText: {
    fontSize: 14,
    color: COLORS.primary,
  },
  description: {
    fontSize: 12,
    color: COLORS.neutral_20,
    marginTop: 16,
  },
  options: {
    marginTop: 16,
    alignSelf: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    marginLeft: -16,
  },
  option: {
    borderWidth: 1,
    borderColor: COLORS.neutral_df,
    borderRadius: 16,
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 16,
    marginLeft: 16,
    alignItems: "center",
  },
  optionText: {
    color: COLORS.neutral_40,
    fontSize: 14,
    marginLeft: 4,
  },
});
