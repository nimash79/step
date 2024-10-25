import Svg, {Path} from "react-native-svg"

const GymIcon = ({color}) => {
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M1.5 9h.75M4.5 6H3a.75.75 0 00-.75.75v4.5A.75.75 0 003 12h1.5m2.25-3h4.5m2.25-3H15a.75.75 0 01.75.75v4.5A.75.75 0 0115 12h-1.5m3-3h-.75M4.5 5.25v7.5a.75.75 0 00.75.75H6a.75.75 0 00.75-.75v-7.5A.75.75 0 006 4.5h-.75a.75.75 0 00-.75.75zm6.75 0v7.5a.75.75 0 00.75.75h.75a.75.75 0 00.75-.75v-7.5a.75.75 0 00-.75-.75H12a.75.75 0 00-.75.75z"
        stroke={color}
        strokeWidth={1.13}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default GymIcon