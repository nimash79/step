import Svg, { Path } from "react-native-svg";

const PlusOutlineIcon = () => {
  return (
    <Svg
      width={22}
      height={22}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M11 7.327v7.326M14.667 10.99H7.333"
        stroke="#8871FF"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        clipRule="evenodd"
        d="M15.686 1H6.314C3.048 1 1 3.312 1 6.585v8.83C1 18.688 3.038 21 6.314 21h9.372C18.962 21 21 18.688 21 15.415v-8.83C21 3.312 18.962 1 15.686 1z"
        stroke="#8871FF"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default PlusOutlineIcon;
