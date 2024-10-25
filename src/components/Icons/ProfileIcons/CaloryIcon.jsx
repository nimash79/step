import Svg, { Path } from "react-native-svg";

const CaloryIcon = ({ style }) => {
  return (
    <Svg
      width={29}
      height={40}
      viewBox="0 0 29 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <Path
        d="M14.5 18.823c4.833-6.964 0-16.47-2.417-18.823 0 7.148-4.284 11.155-7.25 14.118C1.87 17.082 0 21.74 0 25.882c0 3.745 1.528 7.335 4.247 9.983C6.967 38.513 10.654 40 14.5 40s7.534-1.487 10.253-4.135C27.473 33.217 29 29.627 29 25.882c0-3.604-2.552-9.27-4.833-11.764-4.317 7.059-6.745 7.059-9.667 4.705z"
        fill="#BDB0FF"
      />
    </Svg>
  );
};

export default CaloryIcon;
