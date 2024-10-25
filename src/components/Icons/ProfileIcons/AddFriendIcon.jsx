import Svg, { Path } from "react-native-svg"

const AddFriendIcon = () => {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        clipRule="evenodd"
        d="M8.23 12.672c-3.203 0-5.939.484-5.939 2.424s2.72 2.442 5.94 2.442c3.204 0 5.939-.485 5.939-2.425 0-1.939-2.719-2.441-5.94-2.441zM8.23 9.905A3.806 3.806 0 104.425 6.1a3.793 3.793 0 003.78 3.806h.025z"
        stroke="#F9F9F9"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16.003 7.225v3.341M17.708 8.895H14.3"
        stroke="#F9F9F9"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default AddFriendIcon;
