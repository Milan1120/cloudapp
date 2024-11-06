import * as React from "react"
import Svg, { Path } from "react-native-svg"
const CopyIcon = (props) => (
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
      d="M21.875 19.25V3.625H6.25V1H24.5v18.25h-2.625ZM1 8h17v16H1V8Zm2.125 1.875v12.5h12.5v-12.5h-12.5Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default CopyIcon
