import Toast, {
  BaseToast,
  ErrorToast,
  InfoToast,
} from "react-native-toast-message";
import { RFPercentage } from "react-native-responsive-fontsize";

export const toastConfig = {
  /*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
  error: (props) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontFamily: "peyda",
        fontSize: RFPercentage(2),
      }}
      text2Style={{
        fontFamily: "peyda",
        fontSize: RFPercentage(1.7),
      }}
    />
  ),
  info: (props) => (
    <InfoToast
      {...props}
      style={{ borderLeftColor: "#7B61FF" }}
      text1Style={{ fontFamily: "peyda", fontSize: RFPercentage(2) }}
      text2Style={{ fontFamily: "peyda", fontSize: RFPercentage(1.7) }}
    />
  ),
};

export const errorAlert = (title = "خطا", message = "مشکلی پیش آمده است!") => {
  Toast.show({
    position: "top",
    type: "error",
    text1: title,
    text2: message,
  });
};

export const infoAlert = (title, message) => {
  Toast.show({
    position: "top",
    type: "info",
    text1: title,
    text2: message,
  });
};
