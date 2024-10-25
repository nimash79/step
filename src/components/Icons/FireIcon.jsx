import Svg, { Path } from "react-native-svg"

const FireIcon = () => {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        // opacity={0.24}
        d="M11.5 11c2.5-3.7 0-8.75-1.25-10 0 3.798-2.216 5.926-3.75 7.5C4.968 10.075 4 12.55 4 14.75a7.5 7.5 0 0015 0c0-1.915-1.32-4.925-2.5-6.25-2.232 3.75-3.489 3.75-5 2.5z"
        stroke="#C30000"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default FireIcon;