import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
const ListIcon = ({ width = '24', height = '24', color='#000', ...props}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    {...props}
  >
    <Path
      fill={color}
      fillRule="evenodd"
      d="M1.75 8c0-.345.28-.625.625-.625h11.25a.625.625 0 1 1 0 1.25H2.375A.625.625 0 0 1 1.75 8ZM1.75 4.25c0-.345.28-.625.625-.625h11.25a.625.625 0 1 1 0 1.25H2.375a.625.625 0 0 1-.625-.625ZM1.75 11.75c0-.345.28-.625.625-.625h11.25a.625.625 0 1 1 0 1.25H2.375a.625.625 0 0 1-.625-.625Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default ListIcon;
