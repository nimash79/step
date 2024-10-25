import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";

import StepLayout from "../../layouts/StepLayout";
import CustomText from "../../components/Shared/CustomText";
import FemaleIcon from "../../components/Icons/FemaleIcon";
import MaleIcon from "../../components/Icons/MaleIcon";
import CustomInput from "../../components/Shared/CustomInput";
import { useEffect, useRef, useState } from "react";
import CustomDatePicker from "../../components/Shared/CustomDatePicker";

const Step1Screen = ({ navigation, route }) => {
  const [disabled, setDisabled] = useState(true);
  const [gender, setGender] = useState();
  const [birthDate, setBirthDate] = useState();
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const [city, setCity] = useState();
  const [closeBirthDate, setCloseBirthdate] = useState(false);

  const ref = useRef(null);

  useEffect(() => {
    if (gender && birthDate) setDisabled(false);
    else setDisabled(true);
  }, [gender, birthDate]);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current._children.includes(event.target))
      setCloseBirthdate(true);
  };
  return (
    <StepLayout
      navigation={navigation}
      route={route}
      step={1}
      disabled={disabled}
      params={{
        gender,
        birth_date: birthDate,
        height: parseInt(height),
        weight: parseInt(weight),
        city,
      }}
    >
      <TouchableWithoutFeedback onPress={handleClickOutside}>
        <View>
          <CustomText
            style={{ marginBottom: 30, fontSize: 16 }}
            fontStyle="bold"
          >
            اطلاعات خواسته شده را وارد کنید!
          </CustomText>
          <CustomText style={{ textAlign: "center" }}>جنسیت شما :</CustomText>
          <View style={styles.genders}>
            <TouchableWithoutFeedback onPress={() => setGender("زن")}>
              <View
                style={
                  gender === "زن"
                    ? [styles.gender, styles.genderActive]
                    : styles.gender
                }
              >
                <FemaleIcon color={gender === "زن" ? "white" : "#868686"} />
                <CustomText
                  style={
                    gender === "زن"
                      ? [styles.genderText, { color: "white" }]
                      : styles.genderText
                  }
                >
                  زن
                </CustomText>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => setGender("مرد")}>
              <View
                style={
                  gender === "مرد"
                    ? [styles.gender, styles.genderActive]
                    : styles.gender
                }
              >
                <MaleIcon color={gender === "مرد" ? "white" : "#868686"} />
                <CustomText
                  style={
                    gender === "مرد"
                      ? [styles.genderText, { color: "white" }]
                      : styles.genderText
                  }
                >
                  مرد
                </CustomText>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <CustomText style={{ marginBottom: 12 }}>
            تاریخ تولد (شمسی)
          </CustomText>
          <CustomDatePicker
            setDate={setBirthDate}
            nestedScrollEnabled={true}
            viewRef={ref}
            closeSelectPickers={closeBirthDate}
            setCloseSelectPickers={setCloseBirthdate}
          />
          <CustomText style={{ textAlign: "center", marginVertical: 12 }}>
            قد :
          </CustomText>
          <CustomInput
            placeholder="قد خود را به سانتی متر وارد کنید"
            keyboardType="numeric"
            onChangeText={setHeight}
          />
          <CustomText style={{ textAlign: "center", marginBottom: 12 }}>
            وزن :
          </CustomText>
          <CustomInput
            placeholder="وزن خود را به کیلوگرم وارد کنید"
            keyboardType="numeric"
            onChangeText={setWeight}
          />
          <CustomText style={{ textAlign: "center", marginBottom: 12 }}>
            شهر شما :
          </CustomText>
          <CustomInput
            placeholder="شهر محل زندگی خود را وارد کنید"
            onChangeText={setCity}
          />
        </View>
      </TouchableWithoutFeedback>
    </StepLayout>
  );
};

export default Step1Screen;

const styles = StyleSheet.create({
  genders: {
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  gender: {
    marginTop: 12,
    flexDirection: "row",
    backgroundColor: "#EDEDED",
    borderRadius: 8,
    height: 48,
    width: "45%",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
    marginRight: 8,
  },
  genderText: {
    fontSize: 16,
    marginLeft: 6,
  },
  genderActive: {
    backgroundColor: "#7B61FF",
  },
});
