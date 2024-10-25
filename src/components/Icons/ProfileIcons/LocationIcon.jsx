import Svg, { Path } from "react-native-svg"

const LocationIcon = ({style}) => {
  return (
    <Svg
      width={30}
      height={36}
      viewBox="0 0 30 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <Path
        d="M29.367 12.084C27.617 4.384 20.9.917 15 .917h-.017C9.1.917 2.367 4.367.617 12.067c-1.95 8.6 3.316 15.883 8.083 20.467a9.06 9.06 0 006.3 2.55c2.267 0 4.533-.85 6.283-2.55 4.767-4.584 10.034-11.85 8.084-20.45zM15 20.434a5.25 5.25 0 110-10.5 5.25 5.25 0 110 10.5z"
        fill="#BDB0FF"
      />
    </Svg>
  )
}

export default LocationIcon;
