import Svg, { Path } from "react-native-svg"

const ArrowLeftIcon = ({color = "#F9F9F9"}) => {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M12.5 16.725a.123.123 0 01-.046-.009.123.123 0 01-.042-.028l-5.433-5.433a1.784 1.784 0 010-2.51l5.433-5.433a.123.123 0 01.088-.035c.036 0 .067.013.088.035a.123.123 0 01.035.088.123.123 0 01-.035.088L7.155 8.92a1.526 1.526 0 000 2.157l5.433 5.434a.122.122 0 01.035.088.124.124 0 01-.03.082.154.154 0 01-.093.043z"
        stroke={color}
      />
    </Svg>
  )
}

export default ArrowLeftIcon;
