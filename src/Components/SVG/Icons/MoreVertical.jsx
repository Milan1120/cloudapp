import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
const MoreVertical = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    fill="none"
    {...props}
  >
    <Path
      fill="#000"
      fillRule="evenodd"
      d="M10 12a2 2 0 1 1 4 0 2 2 0 0 1-4 0ZM10 5a2 2 0 1 1 4 0 2 2 0 0 1-4 0ZM10 19a2 2 0 1 1 4 0 2 2 0 0 1-4 0Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default MoreVertical;
