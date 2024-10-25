import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ChallengeScreen from "./ChallengeScreen";
import SummaryScreen from "./SummaryScreen";

const Stack = createNativeStackNavigator();

const HomeScreen = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Summary" component={SummaryScreen} />
      <Stack.Screen name="Challenge" component={ChallengeScreen} />
    </Stack.Navigator>
  );
};

export default HomeScreen;
