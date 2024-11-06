import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
const PencilIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20.94 8.653 8.917 20.672c-1.197 1.196-4.75 1.75-5.544.957-.794-.794-.252-4.347.945-5.543L16.353 4.054a3.25 3.25 0 1 1 4.586 4.599Z"
    />
  </Svg>
);
export default PencilIcon;
