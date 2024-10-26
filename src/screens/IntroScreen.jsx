import { StyleSheet, View, Image } from "react-native";
import { useDispatch } from "react-redux";

import DefaultLayout from "../layouts/DefaultLayout";
import CustomButton from "../components/Shared/CustomButton";
import CustomText from "../components/Shared/CustomText";
import { useEffect, useState } from "react";
import { getUserInfo } from "../services/accountService";
import { addUser } from "../redux/reducers/userReducer";
import { isAuthenticated } from "../utils/authentication";

const sendPushNotification = async () => {
  const expoPushToken = "ExponentPushToken[y9zhVnHS0LEsMQ_yTgJihP]";
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Original Title",
    body: "And here is the body!",
    data: { someData: "goes here" },
  };

  try {
    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  } catch (err) {
    console.log("err:", err);
  }
}


const IntroScreen = ({ navigation }) => {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const canPass = await isAuthenticated();
      if (canPass) {
        try {
          const { data } = await getUserInfo();
          if (data.status === 200) {
            dispatch(addUser(data.data));
            navigation.replace("Main");
          }
        } catch (err) {
          console.error(err);
        }
      }
      setLoaded(true);
    })();
  }, []);
  if (!loaded) return null;
  return (
    <DefaultLayout intro={true}>
      <View style={styles.container}>
        <Image source={require("../../assets/inapp/intro.png")} style={styles.backgroundImage} />
        <View style={styles.content}>
          <View style={styles.desc}>
            <CustomText style={styles.head} fontStyle="bold">
              استپ!
            </CustomText>
            <CustomText style={styles.line1}>
              قدم به قدم به سوی پیشرفت با استپ!
            </CustomText>
            <View
              style={{ width: "90%", alignSelf: "center", marginBottom: 54 }}
            >
              <CustomText style={styles.body}>
                با استپ شما قادر خواهید بود تا فعالیت های خود را ارزیابی کرده و
                بهترین عملکرد خود را داشته باشید.
              </CustomText>
            </View>
          </View>
          <CustomButton
            text={"شروع کنیم!"}
            onClick={() => navigation.replace("Authentication")}
            style={styles.startButton}
          />
        </View>
      </View>
    </DefaultLayout>
  );
};

export default IntroScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  content: {
    height: "45%",
  },
  head: {
    textAlign: "center",
    fontSize: 32,
    marginBottom: 43,
  },
  line1: {
    alignSelf: "center",
    fontSize: 16,
  },
  body: {
    alignSelf: "center",
    fontSize: 16,
  },
  startButton: {
    width: "90%",
  },
});
