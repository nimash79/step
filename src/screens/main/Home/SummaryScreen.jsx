import { ScrollView, StyleSheet } from "react-native";
import { useState } from "react";

import MainLayout from "../../../layouts/MainLayout";
import Header from "./components/Header";
import Guide from "./components/Guide";
import Activities from "./components/Activities";
import Progress from "./components/Progress";

const SummaryScreen = ({ navigation }) => {
  const [dailyInfo, setDailyInfo] = useState();
  return (
    <MainLayout>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Header navigation={navigation} />
        <Guide navigation={navigation} dailyInfo={dailyInfo} />
        <Activities navigation={navigation} setDailyInfo={setDailyInfo} />
        <Progress navigation={navigation} />
      </ScrollView>
    </MainLayout>
  );
};

export default SummaryScreen;

const styles = StyleSheet.create({});
