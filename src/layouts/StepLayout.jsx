import {
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
  View,
  ScrollView,
  Dimensions,
} from "react-native";
import { useState } from "react";
import { CommonActions } from "@react-navigation/native";

import CustomText from "../components/Shared/CustomText";
import BackIcon from "../components/Icons/BackIcon";
import CustomButton from "../components/Shared/CustomButton";
import { saveStep } from "../services/accountService";
import { errorAlert } from "../utils/alert";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../redux/reducers/userReducer";

const StepLayout = ({
  navigation,
  route,
  step,
  children,
  params,
  disabled = true,
}) => {
  const [viewHeight, setViewHeight] = useState(0);

  const dispatch = useDispatch();

  const goHome = () => {
    const action = CommonActions.reset({
      index: 0,
      routes: [{ name: "Main" }],
    });
    navigation.dispatch(action);
  };

  const handleLayout = (event) => {
    const { y, height } = event.nativeEvent.layout;
    setViewHeight((h) => h + y + height);
  };
  const submit = async () => {
    console.log(params);
    switch (step) {
      case 1:
        navigation.navigate("Step2", params);
        break;
      case 2:
        navigation.navigate("Step3", { ...route.params, ...params });
        break;
      case 3:
        navigation.navigate("Step4", { ...route.params, ...params });
        break;
      case 4:
        navigation.navigate("Step5", { ...route.params, ...params });
        break;
      case 5:
        navigation.navigate("Step6", { ...route.params, ...params });
        break;
      case 6:
        try {
          const res = await saveStep({ ...route.params, ...params });
          console.log(res.data);
          if (res.data.status === 200) {
            dispatch(removeUser());
            dispatch(addUser(res.data.data));
            goHome();
          }
        } catch (err) {
          console.log(err);
          errorAlert();
        }
        console.log({ ...route.params, ...params });
        break;
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={10}
      style={styles.container}
    >
      <View style={styles.header} onLayout={handleLayout}>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <View>
            <BackIcon />
          </View>
        </TouchableWithoutFeedback>
        <CustomText fontStyle="semibold" style={styles.headerTitle}>
          {`استپ ${step}`}
        </CustomText>
        <TouchableWithoutFeedback onPress={goHome}>
          <View style={styles.skip}>
            <CustomText style={styles.skipText}>رد کردن سوالات</CustomText>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.headerLine} onLayout={handleLayout}>
        <View
          style={[styles.progress, { width: `${(step / 6) * 100}%` }]}
        ></View>
      </View>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginTop: 30 }} onLayout={handleLayout}>
          {children}
        </View>
        <View
          style={{
            marginTop: 8,
            height: Dimensions.get("screen").height - viewHeight,
            justifyContent: "flex-end",
          }}
        >
          <CustomButton
            text={step == 6 ? "ثبت" : "ادامه"}
            style={[styles.submitButton, disabled ? styles.disabled : {}]}
            onClick={submit}
            // disabled={disabled}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default StepLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    alignSelf: "center",
  },
  header: {
    marginTop: 48,
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 16,
    marginLeft: 20,
  },
  skip: {
    position: "absolute",
    right: 0,
  },
  skipText: {
    fontSize: 12,
    color: "#606060",
  },
  headerLine: {
    width: "100%",
    height: 5,
    backgroundColor: "#DFDFDF",
    marginTop: 16,
    borderRadius: 5,
  },
  progress: {
    backgroundColor: "#8871FF",
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    borderRadius: 5,
  },
  disabled: {
    backgroundColor: "#D7D0FF",
  },
});
