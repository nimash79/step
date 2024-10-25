import Svg, { Path } from "react-native-svg";

const FemaleIcon = ({color = "#868686"}) => {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M8.333 18.333V15H6.667l1.666-5a.833.833 0 01.834-.833h1.666a.833.833 0 01.834.833l1.666 5h-1.666v3.333m0-14.166a1.667 1.667 0 11-3.334 0 1.667 1.667 0 013.334 0z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default FemaleIcon;