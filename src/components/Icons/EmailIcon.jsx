import Svg, { Path, Mask, G } from "react-native-svg";

const EmailIcon = () => {
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
        d="M11.777 13.465a3.042 3.042 0 01-1.894-.663L5.398 9.186a.751.751 0 01.94-1.168l4.482 3.612a1.544 1.544 0 001.923-.004l4.436-3.606a.75.75 0 11.947 1.164l-4.444 3.612a3.059 3.059 0 01-1.905.669z"
        fill="#868686"
      />
      <Mask
        id="a"
        style={{
          maskType: "luminance",
        }}
        maskUnits="userSpaceOnUse"
        x={1}
        y={2}
        width={22}
        height={20}
      >
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1 2h21.5v19.5H1V2z"
          fill="#fff"
        />
      </Mask>
      <G mask="url(#a)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.839 20h9.82c.002-.002.01 0 .016 0 1.14 0 2.153-.408 2.929-1.183.9-.897 1.396-2.186 1.396-3.629V8.32c0-2.793-1.826-4.82-4.341-4.82H6.84C4.326 3.5 2.5 5.527 2.5 8.32v6.868c0 1.443.496 2.732 1.396 3.629C4.672 19.592 5.685 20 6.825 20h.014zm-.017 1.5c-1.543 0-2.921-.56-3.985-1.62C1.652 18.698 1 17.032 1 15.188V8.32C1 4.717 3.51 2 6.84 2h9.819c3.33 0 5.84 2.717 5.84 6.32v6.868c0 1.844-.651 3.51-1.836 4.692-1.063 1.059-2.442 1.62-3.988 1.62H6.82z"
          fill="#868686"
        />
      </G>
    </Svg>
  );
};

export default EmailIcon;
