import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "./Home/HomeScreen";
import StepScreen from "./StepScreen";
import ReportScreen from "./ReportScreen";
import HomeIcon from "../../components/Icons/MenuIcons/HomeIcon";
import HomeIconActive from "../../components/Icons/MenuIcons/HomeIconActive";
import FootPrintIcon from "../../components/Icons/MenuIcons/FootPrintIcon";
import FootPrintIconActive from "../../components/Icons/MenuIcons/FootPrintIconActive";
import ReportIcon from "../../components/Icons/MenuIcons/ReportIcon";
import ReportIconActive from "../../components/Icons/MenuIcons/ReportIconActive";
import ProfileIcon from "../../components/Icons/MenuIcons/ProfileIcon";
import ProfileIconActive from "../../components/Icons/MenuIcons/ProfileIconActive";
import ProfileScreen from "./Profile/ProfileScreen";

const Tab = createBottomTabNavigator();

const MainScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          fontFamily: "peyda_bold",
          fontSize: 12,
        },
        tabBarStyle: {
          backgroundColor: "#F3F6FB",
          height: 73,
          paddingTop: 12,
          paddingBottom: 16,
          borderTopWidth: 0
        },
        tabBarActiveTintColor: "#7B61FF",
        tabBarInactiveTintColor: "#868686",
        // tabBarItemStyle: {
        //     marginTop: 12,
        //     marginBottom: 16
        // }
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? <HomeIcon /> : <HomeIconActive />,
          tabBarLabel: "خانه",
        }}
      />
      <Tab.Screen name="Step" component={StepScreen} options={{
          tabBarIcon: ({ focused }) =>
            focused ? <FootPrintIcon /> : <FootPrintIconActive />,
          tabBarLabel: "استِپ",
        }} />
      <Tab.Screen name="Report" component={ReportScreen} options={{
          tabBarIcon: ({ focused }) =>
            focused ? <ReportIcon /> : <ReportIconActive />,
          tabBarLabel: "گزارش",
        }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{
          tabBarIcon: ({ focused }) =>
            focused ? <ProfileIcon /> : <ProfileIconActive />,
          tabBarLabel: "مشخصات",
        }} />
    </Tab.Navigator>
  );
};

export default MainScreen;
