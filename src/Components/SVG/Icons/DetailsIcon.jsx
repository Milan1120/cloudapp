import * as React from "react"
import Svg, { Path } from "react-native-svg"
const DetailsIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="#000"
      fillRule="evenodd"
      d="M21.875 6.75v15.625H6.25V6.75h15.625Zm-2.083 2.083H8.333v11.459h11.459V8.833ZM18.75 3.625v2.083H5.208V19.25H3.125V3.625H18.75Zm-1.042 11.458v2.084h-7.291v-2.084h7.291Zm0-4.166V13h-7.291v-2.083h7.291Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default DetailsIcon
