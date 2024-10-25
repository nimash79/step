import Svg, { Path } from "react-native-svg";

const DiscardIcon = () => {
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
        d="M19.505 5.65a.816.816 0 00.242-.583.816.816 0 00-.242-.583.83.83 0 00-1.166 0l-6.342 6.377-6.413-6.377a.752.752 0 00-1.1 0 .752.752 0 000 1.1l6.386 6.411-6.386 6.421a.752.752 0 000 1.1.752.752 0 001.1 0l6.414-6.388 6.352 6.377a.816.816 0 00.583.242c.209 0 .418-.077.583-.242a.83.83 0 000-1.166l-6.38-6.345 6.369-6.344z"
        fill="#353535"
      />
    </Svg>
  );
};

export default DiscardIcon;
