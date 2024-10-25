import Svg, { Path } from "react-native-svg";

const FlowerIcon = ({color = "#404040"}) => {
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M9 9H6.75a4.5 4.5 0 01-4.5-4.5V3H4.5A4.5 4.5 0 019 7.5V15m0-4.5A4.5 4.5 0 0113.5 6h2.25v.75a4.5 4.5 0 01-4.5 4.5H9"
        stroke={color}
        strokeWidth={1.13}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default FlowerIcon;