import { forwardRef } from "react";
import Svg, { Mask, Path, Defs, RadialGradient, Stop, LinearGradient } from "react-native-svg";

const LoadingIcon = () => {
  return (
    <Svg
      width={61}
      height={61}
      viewBox="0 0 61 61"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Mask id="a" fill="#fff">
        <Path d="M17.265 10.422c-1.794-2.728-5.513-3.52-7.837-1.227A30 30 0 1027.943.658c-3.253.278-5.065 3.621-4.155 6.757.91 3.135 4.229 4.834 7.49 4.974a18.175 18.175 0 0116.028 25.084 18.177 18.177 0 11-31.122-18.124c2.011-2.571 2.875-6.199 1.081-8.927z" />
      </Mask>
      <Path
        d="M17.265 10.422c-1.794-2.728-5.513-3.52-7.837-1.227A30 30 0 1027.943.658c-3.253.278-5.065 3.621-4.155 6.757.91 3.135 4.229 4.834 7.49 4.974a18.175 18.175 0 0116.028 25.084 18.177 18.177 0 11-31.122-18.124c2.011-2.571 2.875-6.199 1.081-8.927z"
        stroke="url(#paint0_angular_501_2989)"
        strokeWidth={12}
        mask="url(#a)"
      />
      <Defs>
        <RadialGradient
          id="paint0_angular_501_2989"
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="rotate(-106.629 26.63 3.914) scale(31.3209)"
        >
          <Stop offset={0} stopColor="#FFFFFF" />
          <Stop offset={1} stopColor="#482ECC" />
        </RadialGradient>
      </Defs>
    </Svg>
  );
};

export default forwardRef(LoadingIcon);
