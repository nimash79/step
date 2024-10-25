import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import SuccessfulLoginScreen from "./SuccessfulLoginScreen";
import ForgotPasswordScreen from "./ForgotPasswordScreen";
import ResendCodeScreen from "./ResendCodeScreen";
import ResetPasswordScreen from "./ResetPasswordScreen";
import PaswordChangedScreen from "./PaswordChangedScreen";


const Stack = createNativeStackNavigator();

const Authentication = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="SuccessfulLogin" component={SuccessfulLoginScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="ResendCode" component={ResendCodeScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      <Stack.Screen name="PasswordChanged" component={PaswordChangedScreen} />
    </Stack.Navigator>
  );
};

export default Authentication;
