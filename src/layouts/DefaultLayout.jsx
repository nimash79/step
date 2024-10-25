import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import Constants from "expo-constants";

const DefaultLayout = ({ children, intro = false }) => {
  if (intro) return <View style={styles.container}>{children}</View>;
  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <View style={styles.container}>{children}</View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default DefaultLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight
  },
});
