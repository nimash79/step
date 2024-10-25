import Svg, { Path } from "react-native-svg"

const ArrowDown = () => {
  return (
    <Svg
      width={12}
      height={7}
      viewBox="0 0 12 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M6 6.2c-.467 0-.933-.18-1.287-.533L.367 1.32a.503.503 0 010-.707.503.503 0 01.706 0L5.42 4.96c.32.32.84.32 1.16 0L10.927.613a.503.503 0 01.706 0 .503.503 0 010 .707L7.287 5.667C6.933 6.02 6.467 6.2 6 6.2z"
        fill="#868686"
      />
    </Svg>
  )
}

export default ArrowDown
