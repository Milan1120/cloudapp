import * as React from "react"
import Svg, { Path } from "react-native-svg"
const DownloadIcon = (props) => (
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
      d="M8.333 10.917a4.167 4.167 0 1 1 8.334 0v1.042h1.041a3.646 3.646 0 1 1 0 7.291h-.104a1.042 1.042 0 0 0 0 2.084h.104a5.73 5.73 0 0 0 .969-11.377 6.251 6.251 0 0 0-12.354 0 5.73 5.73 0 0 0 .969 11.377h.104a1.042 1.042 0 0 0 0-2.084h-.104a3.646 3.646 0 1 1 0-7.291h1.041v-1.042Zm5.209 1.042a1.042 1.042 0 1 0-2.084 0v5.818l-1.346-1.347a1.042 1.042 0 0 0-1.474 1.474l3.125 3.125a1.042 1.042 0 0 0 1.474 0l3.125-3.125a1.042 1.042 0 0 0-1.474-1.474l-1.346 1.347V11.96Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default DownloadIcon