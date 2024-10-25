import Svg, { Rect, Path } from "react-native-svg";

const YoutubeIcon = () => {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Rect width={24} height={24} rx={12} fill="red" />
      <Path
        d="M18.988 8.565a1.79 1.79 0 00-1.259-1.26C16.612 7 12.141 7 12.141 7s-4.47 0-5.588.294c-.6.165-1.094.659-1.259 1.27C5 9.683 5 12 5 12s0 2.33.294 3.435a1.79 1.79 0 001.259 1.26C7.683 17 12.14 17 12.14 17s4.47 0 5.588-.294a1.79 1.79 0 001.26-1.259c.293-1.118.293-3.435.293-3.435s.012-2.33-.294-3.447z"
        fill="#fff"
      />
      <Path d="M10.717 14.14L14.435 12l-3.718-2.142v4.283z" fill="red" />
    </Svg>
  );
};

export default YoutubeIcon;
