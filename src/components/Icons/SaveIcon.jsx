import Svg, { Path } from "react-native-svg"

const SaveIcon = ({style}) => {
  return (
    <Svg
      width={21}
      height={20}
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <Path
        d="M10.622 13.435V1.396M13.538 10.508l-2.916 2.928-2.916-2.928"
        stroke="#868686"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15.255 6.127h.933a3.684 3.684 0 013.684 3.685v4.884a3.675 3.675 0 01-3.675 3.675H5.057a3.685 3.685 0 01-3.685-3.685V9.801a3.675 3.675 0 013.675-3.674h.942"
        stroke="#868686"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default SaveIcon;
