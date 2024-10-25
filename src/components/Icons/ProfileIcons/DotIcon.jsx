import Svg, { Path } from "react-native-svg";

const DotIcon = () => {
  return (
    <Svg
      width={7}
      height={6}
      viewBox="0 0 7 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M3.5 5.75C1.98 5.75.75 4.52.75 3S1.98.25 3.5.25 6.25 1.48 6.25 3 5.02 5.75 3.5 5.75zm0-4a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z"
        fill="#868686"
      />
    </Svg>
  );
};

export default DotIcon;
