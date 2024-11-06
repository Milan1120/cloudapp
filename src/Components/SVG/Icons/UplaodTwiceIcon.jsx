import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
const UplaodTwiceIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={240}
    height={240}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      stroke="#1C274C"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M8.5 17v-7m0 0 2.5 3m-2.5-3L6 13M15.5 17v-7m0 0 2.5 3m-2.5-3L13 13"
    />
    <Path
      stroke="#1C274C"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M18 7H6"
    />
    <Path
      stroke="#1C274C"
      strokeWidth={1.5}
      d="M2 12c0-4.714 0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464C22 4.93 22 7.286 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12Z"
      opacity={0.5}
    />
  </Svg>
);
export default UplaodTwiceIcon;
