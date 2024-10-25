import Svg, { Rect, Path } from "react-native-svg";

const FacebookIcon = () => {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Rect width={24} height={24} rx={12} fill="#1877F2" />
      <Path
        d="M16.671 15.469L17.203 12h-3.328V9.75c0-.95.464-1.875 1.955-1.875h1.514V4.922s-1.374-.234-2.686-.234c-2.742 0-4.533 1.661-4.533 4.668V12H7.078v3.469h3.047v8.386a12.071 12.071 0 003.75 0v-8.386h2.796z"
        fill="#fff"
      />
    </Svg>
  );
};

export default FacebookIcon;
