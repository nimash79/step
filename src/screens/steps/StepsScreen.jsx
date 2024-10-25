import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Step1Screen from "./Step1Screen";
import Step2Screen from "./Step2Screen";
import Step3Screen from "./Step3Screen";
import Step4Screen from "./Step4Screen";
import Step5Screen from "./Step5Screen";
import Step6Screen from "./Step6Screen";

const Stack = createNativeStackNavigator();

const Steps = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Step1" component={Step1Screen} />
      <Stack.Screen name="Step2" component={Step2Screen} />
      <Stack.Screen name="Step3" component={Step3Screen} />
      <Stack.Screen name="Step4" component={Step4Screen} />
      <Stack.Screen name="Step5" component={Step5Screen} />
      <Stack.Screen name="Step6" component={Step6Screen} />
    </Stack.Navigator>
  );
};

export default Steps;
