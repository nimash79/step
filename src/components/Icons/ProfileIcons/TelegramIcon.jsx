import Svg, { Rect, Path, Defs, LinearGradient, Stop } from "react-native-svg";

const TelegramIcon = () => {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Rect
        width={24}
        height={24}
        rx={12}
        fill="url(#paint0_linear_2494_18949)"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.432 11.873c3.498-1.524 5.831-2.529 6.998-3.014 3.333-1.387 4.025-1.627 4.477-1.635.099-.002.32.023.465.14a.505.505 0 01.17.324c.016.094.036.306.02.473-.18 1.897-.962 6.502-1.36 8.627-.167.9-.499 1.2-.82 1.23-.696.064-1.225-.46-1.9-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.213-.07-.062-.174-.04-.248-.024-.106.024-1.794 1.14-5.062 3.346-.48.329-.913.49-1.302.48-.428-.009-1.252-.242-1.865-.44-.751-.245-1.349-.374-1.297-.79.027-.215.325-.436.893-.662z"
        fill="#fff"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_2494_18949"
          x1={12}
          y1={0}
          x2={12}
          y2={23.822}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#2AABEE" />
          <Stop offset={1} stopColor="#229ED9" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default TelegramIcon;
