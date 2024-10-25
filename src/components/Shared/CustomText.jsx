import { Text } from "react-native";

const CustomText = ({ children, fontStyle = "medium", style = null }) => {
  const getFont = () => {
    switch (fontStyle) {
      case "medium":
        return "peyda";
      case "bold":
        return "peyda_bold";
      case "semibold":
        return "peyda_semibold";
      case "extrabold":
        return "peyda_extrabold";
    }
  };
  return <Text style={[{ fontFamily: getFont() }, style]}>{children}</Text>;
};

export default CustomText;
