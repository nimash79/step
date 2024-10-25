import Svg, { Path } from "react-native-svg";

const MaleIcon = ({color = "#868686"}) => {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M8.333 18.333v-4.166l-.833-.834V10a.833.833 0 01.833-.833h3.334A.833.833 0 0112.5 10v3.333l-.833.834v4.166m0-14.166a1.667 1.667 0 11-3.334 0 1.667 1.667 0 013.334 0z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default MaleIcon;
