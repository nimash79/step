import Svg, { Path } from "react-native-svg"

const VoiceIcon = () => {
  return (
    <Svg
      width={18}
      height={22}
      viewBox="0 0 18 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M9 21v-3.161"
        stroke="#606060"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        clipRule="evenodd"
        d="M9 13.848v0c-2.243 0-4.062-1.826-4.062-4.08V5.081C4.938 2.827 6.757 1 9 1c2.244 0 4.062 1.827 4.062 4.08v4.688A4.07 4.07 0 019 13.848z"
        stroke="#606060"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M17 9.8c0 4.44-3.581 8.038-8 8.038-4.419 0-8-3.598-8-8.037"
        stroke="#606060"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default VoiceIcon;
