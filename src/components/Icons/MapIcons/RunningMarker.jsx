import * as React from "react"
import Svg, { Path } from "react-native-svg"

const RunningMarker = () => {
  return (
    <Svg
      width={23}
      height={24}
      viewBox="0 0 23 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M15.748 14.794L14.37 6.17c-.326-2.046-3.084-2.47-4.012-.618l-1.081 2.16c-.3.6-.866 1.023-1.526 1.143l-2.376.43c-2.039.37-2.402 3.133-.534 4.024l7.887 3.746c1.552.737 3.29-.566 3.02-2.262z"
        fill="#F9F9F9"
      />
    </Svg>
  )
}

export default RunningMarker
