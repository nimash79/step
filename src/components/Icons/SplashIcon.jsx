import { forwardRef, useEffect, useState } from "react";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg"

const SplashIcon = () => {
  const [left, setLeft] = useState(true);
  useEffect(() => {
    const intervalId = setInterval(() => setLeft((l) => !l), 2000);
    return () => clearInterval(intervalId);
  }, [])
  return (
    <Svg
      width={105}
      height={130}
      viewBox="0 0 105 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M38.572 56.432c1.345-.362 2.752.347 3.175 1.674 2.702 8.458 4.421 22.012-3.996 25.046C22.23 88.86 16.32 72.455 14.533 65.76c-.391-1.467.56-3.004 2.026-3.399l22.013-5.929zm-28.35-.411c.62 1.216 2.053 1.883 3.378 1.556l23.506-5.802c1.393-.344 2.267-1.712 2.153-3.143-.48-6.028.981-12.174.981-19.273C40.24 18.39 31.527-3.087 17.64.373 1.785 4.29-.508 21.85.08 30.338c.645 6.96 7.458 20.417 10.142 25.683zm79.343 51.61c1.42.342 2.31 1.733 1.906 3.136-1.92 6.684-8.483 23.799-24.174 18.084-8.379-3.102-6.042-16.504-3.228-24.921.433-1.294 1.796-2.004 3.123-1.685l22.373 5.386zm15.336-31.595c.655-8.487-1.573-26.113-17.492-30.03-13.823-3.59-22.536 18.018-22.536 29.051 0 7.06 1.418 13.211 1.003 19.253-.096 1.411.774 2.749 2.147 3.09l23.531 5.834a2.886 2.886 0 003.239-1.471c2.663-5.186 9.513-18.773 10.108-25.727z"
        fill="url(#paint0_linear_1079_7595)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_1079_7595"
          x1={43.5}
          y1={76.2331}
          x2={60.5}
          y2={76.2331}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0} stopColor="#fff" stopOpacity={left ? 1 : 0} />
          <Stop offset={1} stopColor="#fff" stopOpacity={left ? 0 : 1} />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

export default forwardRef(SplashIcon)