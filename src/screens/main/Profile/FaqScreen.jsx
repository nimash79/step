import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Constants from "expo-constants";

import { COLORS } from "../../../utils/constants";
import BackIcon from "../../../components/Icons/BackIcon";
import CustomText from "../../../components/Shared/CustomText";
import ArrowDown from "../../../components/Icons/ArrowBottom";
import CustomInput from "../../../components/Shared/CustomInput";
import SearchIcon from "./../../../components/Icons/SearchIcon";
import { useState } from "react";
import ArrowTop from "../../../components/Icons/ArrowTop";

const FaqScreen = ({ navigation }) => {
  const [questions, setQuestions] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [titles, setTitles] = useState([
    "چرا استپ؟",
    "چگونه تعداد قدم های من را محاسبه می کنید؟",
    "چگونه کالری مصرفی من را محاسبه می کنید؟",
    "برنامه چگونه مسافت را محاسبه می کند؟",
    "نحوه کسب امتیازات چگونه است؟",
    "چگونه میتوانیم امتیازات بیشتری کسب کنیم؟",
    "چه آماری پس از هر تمرین ذخیره میشود؟",
    "آیا داده های من امن است؟",
    "چگونه از برنامه هنگام دویدن بر روی تردمیل استفاده کنم؟",
    "آیا اپیلیکیشن از اعلان استفاده می کند؟",
    "آیا استفاده از امکانات برنامه رایگان است؟",
  ]);
  const [search, setSearch] = useState("");
  const toggleQuestion = (index) => {
    setQuestions((q) => {
      const list = [...q];
      list[index] = !list[index];
      return list;
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <View style={styles.backIcon}>
            <BackIcon />
          </View>
        </TouchableWithoutFeedback>
        <CustomText fontStyle="bold" style={styles.headerText}>
          سوالات متداول
        </CustomText>
      </View>
      <CustomInput
        icon={<SearchIcon />}
        placeholder={"جستجو"}
        containerStyle={styles.searchInput}
        onChangeText={setSearch}
      />
      <ScrollView style={styles.questions} showsVerticalScrollIndicator={false}>
        {(search === "" || titles[0].includes(search)) && (
          <TouchableOpacity onPress={() => toggleQuestion(0)}>
            <View style={styles.questionContainer}>
              <View style={styles.question}>
                <Text
                  style={[
                    styles.questionText,
                    {
                      color: questions[0] ? COLORS.shade3 : COLORS.neutral_40,
                    },
                  ]}
                >
                  چرا استپ؟
                </Text>
                {questions[0] ? (
                  <ArrowTop style={styles.questionToggle} />
                ) : (
                  <ArrowDown style={styles.questionToggle} />
                )}
              </View>
              <CustomText
                style={[
                  styles.answer,
                  { display: questions[0] ? "block" : "none" },
                ]}
              >
                ما در تیم استپ برای کمک به برنامه ریزی و بهبود تمرینات ورزشکاران
                و همچنین تشویق همه افراد به ورزش، این اپیلیکیشن را در مدت زمان
                کمی طراحی کردیم و همچنان درحال توسعه آن هستیم، که دارای قابلیت
                های زیادی از جمله:
                {"\n"}
                هدف گذاری برای تمرینات، ارزیابی عملکرد و پیشرفت خود و همچنین
                چالش ها که باعث ایجاد حس رقابت بین دوندگان می شود، یادآوری
                فعالیت های هفتگی، هدف گذاری برای خود که باعث ایجاد انگیزه می
                شود، می باشد.
              </CustomText>
            </View>
          </TouchableOpacity>
        )}
        {(search === "" || titles[1].includes(search)) && (
          <TouchableOpacity onPress={() => toggleQuestion(1)}>
            <View style={styles.questionContainer}>
              <View style={styles.question}>
                <Text
                  style={[
                    styles.questionText,
                    { color: questions[1] ? COLORS.shade3 : COLORS.neutral_40 },
                  ]}
                >
                  چگونه تعداد قدم های من را محاسبه می کنید؟
                </Text>
                {questions[1] ? (
                  <ArrowTop style={styles.questionToggle} />
                ) : (
                  <ArrowDown style={styles.questionToggle} />
                )}
              </View>
              <CustomText
                style={[
                  styles.answer,
                  { display: questions[1] ? "block" : "none" },
                ]}
              >
                با استفاده از سنسور pedometer در تلفن همراه شما، تعداد قدم
                هایتان محاسبه می شود.
              </CustomText>
            </View>
          </TouchableOpacity>
        )}
        {(search === "" || titles[2].includes(search)) && (
          <TouchableOpacity onPress={() => toggleQuestion(2)}>
            <View style={styles.questionContainer}>
              <View style={styles.question}>
                <Text
                  style={[
                    styles.questionText,
                    { color: questions[2] ? COLORS.shade3 : COLORS.neutral_40 },
                  ]}
                >
                  چگونه کالری مصرفی من را محاسبه می کنید؟
                </Text>
                {questions[2] ? (
                  <ArrowTop style={styles.questionToggle} />
                ) : (
                  <ArrowDown style={styles.questionToggle} />
                )}
              </View>
              <CustomText
                style={[
                  styles.answer,
                  { display: questions[2] ? "block" : "none" },
                ]}
              >
                با توجه به یک فرمول استاندارد که وابسته به تعداد قدم ها، زمان،
                قد و وزن می باشد، کالری مصرفی شما محاسبه می شود.
              </CustomText>
            </View>
          </TouchableOpacity>
        )}
        {(search === "" || titles[3].includes(search)) && (
          <TouchableOpacity onPress={() => toggleQuestion(3)}>
            <View style={styles.questionContainer}>
              <View style={styles.question}>
                <Text
                  style={[
                    styles.questionText,
                    { color: questions[3] ? COLORS.shade3 : COLORS.neutral_40 },
                  ]}
                >
                  برنامه چگونه مسافت را محاسبه می کند؟
                </Text>
                {questions[3] ? (
                  <ArrowTop style={styles.questionToggle} />
                ) : (
                  <ArrowDown style={styles.questionToggle} />
                )}
              </View>
              <CustomText
                style={[
                  styles.answer,
                  { display: questions[3] ? "block" : "none" },
                ]}
              >
                با استفاده از gps در تلفن همراه شما، مسافت طی شده شما در هر
                تمرین، محاسبه می شود.
              </CustomText>
            </View>
          </TouchableOpacity>
        )}
        {(search === "" || titles[4].includes(search)) && (
          <TouchableOpacity onPress={() => toggleQuestion(4)}>
            <View style={styles.questionContainer}>
              <View style={styles.question}>
                <Text
                  style={[
                    styles.questionText,
                    { color: questions[4] ? COLORS.shade3 : COLORS.neutral_40 },
                  ]}
                >
                  نحوه کسب امتیازات چگونه است؟
                </Text>
                {questions[4] ? (
                  <ArrowTop style={styles.questionToggle} />
                ) : (
                  <ArrowDown style={styles.questionToggle} />
                )}
              </View>
              <CustomText
                style={[
                  styles.answer,
                  { display: questions[4] ? "block" : "none" },
                ]}
              >
                در استپ، با هر ۱۰۰ قدم شما ۱ امتیاز دریافت می کنید!
                {"\n"}
                در هر سطح با به حد نصاب رسیدن امتیازات، به سطح بعدی ارتقاء پیدا
                می کنید!
                {"\n"}
                برای اطلاع از سطح خود به نوار پیشرفت در صفحه مشخصات مراجعه کنید.
              </CustomText>
            </View>
          </TouchableOpacity>
        )}
        {(search === "" || titles[5].includes(search)) && (
          <TouchableOpacity onPress={() => toggleQuestion(5)}>
            <View style={styles.questionContainer}>
              <View style={styles.question}>
                <Text
                  style={[
                    styles.questionText,
                    { color: questions[5] ? COLORS.shade3 : COLORS.neutral_40 },
                  ]}
                >
                  چگونه میتوانیم امتیازات بیشتری کسب کنیم؟
                </Text>
                {questions[5] ? (
                  <ArrowTop style={styles.questionToggle} />
                ) : (
                  <ArrowDown style={styles.questionToggle} />
                )}
              </View>
              <CustomText
                style={[
                  styles.answer,
                  { display: questions[5] ? "block" : "none" },
                ]}
              >
                هرچه تعداد تمرینات و قدم های شما بیشتر باشد، امتیاز بیشتری کسب
                میکنید. علاوه بر آن، شما می توانید با دعوت از هریک از دوستان
                خود، ۵۰ امتیاز از استپ دریافت کنید.
              </CustomText>
            </View>
          </TouchableOpacity>
        )}
        {(search === "" || titles[6].includes(search)) && (
          <TouchableOpacity onPress={() => toggleQuestion(6)}>
            <View style={styles.questionContainer}>
              <View style={styles.question}>
                <Text
                  style={[
                    styles.questionText,
                    { color: questions[6] ? COLORS.shade3 : COLORS.neutral_40 },
                  ]}
                >
                  چه آماری پس از هر تمرین ذخیره میشود؟
                </Text>
                {questions[6] ? (
                  <ArrowTop style={styles.questionToggle} />
                ) : (
                  <ArrowDown style={styles.questionToggle} />
                )}
              </View>
              <CustomText
                style={[
                  styles.answer,
                  { display: questions[6] ? "block" : "none" },
                ]}
              >
                در پایان هر تمرین، تعداد قدم های شما، کالری مصرفی، مدت زمان
                تمرین و مسافت پیموده شده ذخیره میشود و از قسمت "گزارش" قابل
                مشاهده است.
              </CustomText>
            </View>
          </TouchableOpacity>
        )}
        {(search === "" || titles[7].includes(search)) && (
          <TouchableOpacity onPress={() => toggleQuestion(7)}>
            <View style={styles.questionContainer}>
              <View style={styles.question}>
                <Text
                  style={[
                    styles.questionText,
                    { color: questions[7] ? COLORS.shade3 : COLORS.neutral_40 },
                  ]}
                >
                  آیا داده های من امن است؟
                </Text>
                {questions[7] ? (
                  <ArrowTop style={styles.questionToggle} />
                ) : (
                  <ArrowDown style={styles.questionToggle} />
                )}
              </View>
              <CustomText
                style={[
                  styles.answer,
                  { display: questions[7] ? "block" : "none" },
                ]}
              >
                بله. داده های شما صرفا جهت محاسبات و در برنامه استفاده میشود.
              </CustomText>
            </View>
          </TouchableOpacity>
        )}
        {(search === "" || titles[8].includes(search)) && (
          <TouchableOpacity onPress={() => toggleQuestion(8)}>
            <View style={styles.questionContainer}>
              <View style={styles.question}>
                <Text
                  style={[
                    styles.questionText,
                    { color: questions[8] ? COLORS.shade3 : COLORS.neutral_40 },
                  ]}
                >
                  چگونه از برنامه هنگام دویدن بر روی تردمیل استفاده کنم؟
                </Text>
                {questions[8] ? (
                  <ArrowTop style={styles.questionToggle} />
                ) : (
                  <ArrowDown style={styles.questionToggle} />
                )}
              </View>
              <CustomText
                style={[
                  styles.answer,
                  { display: questions[8] ? "block" : "none" },
                ]}
              >
                فقط کافی است به جای استفاده از صفحه استِپ، به اولین صفحه یعنی
                "خانه" مراجعه کرده و از قسمت "فعالیت های امروز من" تمرین خود را
                آغاز و ثبت کنید.
              </CustomText>
            </View>
          </TouchableOpacity>
        )}
        {(search === "" || titles[10].includes(search)) && (
          <TouchableOpacity onPress={() => toggleQuestion(9)}>
            <View style={styles.questionContainer}>
              <View style={styles.question}>
                <Text
                  style={[
                    styles.questionText,
                    { color: questions[9] ? COLORS.shade3 : COLORS.neutral_40 },
                  ]}
                >
                  آیا اپیلیکیشن از اعلان استفاده می کند؟
                </Text>
                {questions[9] ? (
                  <ArrowTop style={styles.questionToggle} />
                ) : (
                  <ArrowDown style={styles.questionToggle} />
                )}
              </View>
              <CustomText
                style={[
                  styles.answer,
                  { display: questions[9] ? "block" : "none" },
                ]}
              >
                بله،‌ اعلان ها به کاربر اطلاع می دهند که زمان تمرین شما فرا
                رسیده است یا اطلاعات دیگری را به شما نشان می دهند.
              </CustomText>
            </View>
          </TouchableOpacity>
        )}
        {(search === "" || titles[10].includes(search)) && (
          <TouchableOpacity onPress={() => toggleQuestion(10)}>
            <View style={[styles.questionContainer, { marginBottom: 32 }]}>
              <View style={styles.question}>
                <Text
                  style={[
                    styles.questionText,
                    {
                      color: questions[10] ? COLORS.shade3 : COLORS.neutral_40,
                    },
                  ]}
                >
                  آیا استفاده از امکانات برنامه رایگان است؟
                </Text>
                {questions[10] ? (
                  <ArrowTop style={styles.questionToggle} />
                ) : (
                  <ArrowDown style={styles.questionToggle} />
                )}
              </View>
              <CustomText
                style={[
                  styles.answer,
                  { display: questions[10] ? "block" : "none" },
                ]}
              >
                بله، درحال حاضر استفاده از تمامی امکانات برنامه استِپ رایگان می
                باشد.
              </CustomText>
            </View>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

export default FaqScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBF7FF",
    paddingHorizontal: "5%",
    marginTop: Constants.statusBarHeight,
  },
  header: {
    marginTop: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  backIcon: {
    position: "absolute",
    left: 0,
  },
  headerText: {
    fontSize: 20,
    color: COLORS.neutral_40,
  },
  searchInput: {
    marginTop: 32,
    marginBottom: 16,
  },
  questionContainer: {
    backgroundColor: COLORS.backSections,
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
  },
  question: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  questionText: {
    fontFamily: "peyda_semibold",
    fontSize: 14,
  },
  answer: {
    borderTopWidth: 1,
    borderTopColor: COLORS.neutral_ed,
    marginTop: 16,
    paddingTop: 16,
    fontSize: 12,
    color: COLORS.neutral_60,
    lineHeight: 24,
    textAlign: "justify",
  },
});
