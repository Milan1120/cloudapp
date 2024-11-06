import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
const FileIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill={props.color}
      fillRule="evenodd"
      d="M3.879 1.879A3 3 0 0 1 6 1h7a1 1 0 0 1 .707.293l7 7A1 1 0 0 1 21 9v11a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V4a3 3 0 0 1 .879-2.121ZM6 3a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.414L12.586 3H6Z"
      clipRule="evenodd"
    />
    <Path
      fill={props.color}
      fillRule="evenodd"
      d="M13 1a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2h-7a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default FileIcon;
