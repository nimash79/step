import React, { useEffect, useState, useRef } from "react";
import { I18nManager, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import "react-native-reanimated";
import "react-native-gesture-handler";
import * as Splash from "expo-splash-screen";
import { Provider } from "react-redux";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

import store from "./src/redux/store";
import { toastConfig } from "./src/utils/alert";
import IntroScreen from "./src/screens/IntroScreen";
import Authentication from "./src/screens/authentication/Authentication";
import Steps from "./src/screens/steps/StepsScreen";
import Toast from "react-native-toast-message";
import MainScreen from "./src/screens/main/MainScreen";
import SplashScreen from "./src/screens/SplashScreen";
import HomeModal from "./src/components/modals/HomeModal";
import SettingsScreen from "./src/screens/main/Profile/SettingsScreen";
import InfoScreen from "./src/screens/main/Profile/InfoScreen";
import PersonalInformationScreen from "./src/screens/main/Profile/PersonalInformationScreen";
import SpecificationsScreen from "./src/screens/main/Profile/SpecificationsScreen";
import FaqScreen from "./src/screens/main/Profile/FaqScreen";
import AboutUsScreen from "./src/screens/main/Profile/AboutUsScreen";
import ContactUsScreen from "./src/screens/main/Profile/ContactUsScreen";
import AchievementsScreen from "./src/screens/main/Profile/AchievementsScreen";
import ChatScreen from "./src/screens/main/Profile/ChatScreen";

const Stack = createNativeStackNavigator();

I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

Splash.preventAutoHideAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});



function handleRegistrationError(errorMessage) {
  throw new Error(errorMessage);
}

async function registerForPushNotificationsAsync() {
  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      handleRegistrationError(
        "Permission not granted to get push token for push notification!"
      );
      return;
    }
    // const projectId =
    //   Constants?.expoConfig?.extra?.eas?.projectId ??
    //   Constants?.easConfig?.projectId;
    // if (!projectId) {
    //   handleRegistrationError("Project ID not found");
    // }
    // try {
    //   const pushTokenString = (
    //     await Notifications.getExpoPushTokenAsync({
    //       projectId,
    //     })
    //   ).data;
    //   console.log(pushTokenString);
    //   return pushTokenString;
    // } catch (e) {
    //   handleRegistrationError(`getExpoPushToken: ${e}`);
    // }
  } else {
    handleRegistrationError("Must use physical device for push notifications");
  }
}

export default function App() {
  const [appIsReady, setAppIsReady] = useState();
  const [loaded] = useFonts({
    peyda: require("./assets/fonts/peyda/Peyda-Medium.ttf"),
    peyda_bold: require("./assets/fonts/peyda/Peyda-Bold.ttf"),
    peyda_semibold: require("./assets/fonts/peyda/Peyda-SemiBold.ttf"),
    peyda_extrabold: require("./assets/fonts/peyda/Peyda-ExtraBold.ttf"),
    iransans_num_bold: require("./assets/fonts/iransans/IRANSansDN_FaNum-Bold.ttf"),
  });

  // const [expoPushToken, setExpoPushToken] = useState("");
  // const [notification, setNotification] = useState(undefined);
  // const notificationListener = useRef();
  // const responseListener = useRef();

  // useEffect(() => {
  //   registerForPushNotificationsAsync()
  //     .then((token) => setExpoPushToken(token ?? ""))
  //     .catch((error) => setExpoPushToken(`${error}`));

  //   notificationListener.current =
  //     Notifications.addNotificationReceivedListener((notification) => {
  //       setNotification(notification);
  //     });

  //   responseListener.current =
  //     Notifications.addNotificationResponseReceivedListener((response) => {
  //       console.log(response);
  //     });

  //   return () => {
  //     notificationListener.current &&
  //       Notifications.removeNotificationSubscription(
  //         notificationListener.current
  //       );
  //     responseListener.current &&
  //       Notifications.removeNotificationSubscription(responseListener.current);
  //   };
  // }, []);

  useEffect(() => {
    (async () => {
      if (loaded) {
        await Splash.hideAsync();
        setTimeout(() => setAppIsReady(true), 3000);
      }
    })();
  }, [loaded]);
  if (!loaded) return null;
  if (!appIsReady) return <SplashScreen />;
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Intro" component={IntroScreen} />
          <Stack.Screen name="Authentication" component={Authentication} />
          <Stack.Screen name="Steps" component={Steps} />
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen
            name="HomeModal"
            component={HomeModal}
            options={{ animation: "slide_from_bottom" }}
          />
          {/* Profile Container */}
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="Info" component={InfoScreen} />
          <Stack.Screen
            name="PersonalInformation"
            component={PersonalInformationScreen}
          />
          <Stack.Screen
            name="Specifications"
            component={SpecificationsScreen}
          />
          <Stack.Screen name="Faq" component={FaqScreen} />
          <Stack.Screen name="AboutUs" component={AboutUsScreen} />
          <Stack.Screen name="ContactUs" component={ContactUsScreen} />
          <Stack.Screen name="Achievements" component={AchievementsScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
          {/* End Profile Container */}
        </Stack.Navigator>
      </NavigationContainer>
      <Toast config={toastConfig} />
      <StatusBar style={{ color: "black" }} backgroundColor="#FBF7FF" />
    </Provider>
  );
}
