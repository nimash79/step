import Svg, {Path} from "react-native-svg";

const BackIcon = ({style}) => {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <Path
        d="M4 11.726a.75.75 0 01.648-.744l.102-.006h15a.75.75 0 01.102 1.493l-.102.007h-15a.75.75 0 01-.75-.75z"
        fill="#868686"
      />
      <Path
        d="M13.171 6.233a.75.75 0 01.974-1.136l.084.073 6.05 6.024a.75.75 0 01.073.978l-.073.085-6.05 6.025a.75.75 0 01-1.13-.98l.072-.083 5.516-5.494-5.516-5.492z"
        fill="#868686"
      />
    </Svg>
  );
};

export default BackIcon;