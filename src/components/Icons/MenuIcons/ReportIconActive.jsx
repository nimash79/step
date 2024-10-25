import Svg, { Path, Mask, G } from "react-native-svg"

const ReportIconActive = () => {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.217 16.003a.75.75 0 01-.594-1.207l2.993-3.89a.75.75 0 011.058-.132l2.82 2.215 2.466-3.183a.75.75 0 111.186.918l-2.93 3.78a.746.746 0 01-.5.285.741.741 0 01-.555-.154l-2.819-2.214-2.53 3.289a.75.75 0 01-.595.293z"
        fill="#868686"
      />
      <Mask
        id="a"
        style={{
          maskType: "luminance"
        }}
        maskUnits="userSpaceOnUse"
        x={17}
        y={2}
        width={6}
        height={6}
      >
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17.295 2h5.344v5.345h-5.344V2z"
          fill="#fff"
        />
      </Mask>
      <G mask="url(#a)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M19.967 3.5a1.173 1.173 0 000 2.345 1.173 1.173 0 000-2.345zm0 3.845a2.676 2.676 0 01-2.672-2.673A2.675 2.675 0 0119.967 2a2.674 2.674 0 012.672 2.672 2.675 2.675 0 01-2.672 2.673z"
          fill="#868686"
        />
      </G>
      <Mask
        id="b"
        style={{
          maskType: "luminance"
        }}
        maskUnits="userSpaceOnUse"
        x={2}
        y={2}
        width={20}
        height={21}
      >
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2 2.842h19.862v19.861H2V2.843z"
          fill="#fff"
        />
      </Mask>
      <G mask="url(#b)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.233 22.703H7.629C4.262 22.703 2 20.338 2 16.818V8.736c0-3.525 2.262-5.894 5.629-5.894h7.268a.75.75 0 010 1.5H7.629C5.121 4.342 3.5 6.066 3.5 8.736v8.082c0 2.705 1.582 4.385 4.129 4.385h8.604c2.508 0 4.129-1.72 4.129-4.385V9.78a.75.75 0 011.5 0v7.04c0 3.52-2.262 5.884-5.629 5.884z"
          fill="#868686"
        />
      </G>
    </Svg>
  )
}

export default ReportIconActive;
