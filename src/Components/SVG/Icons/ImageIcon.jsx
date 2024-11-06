import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
const ImageIcon = (props) => (
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
      d="M3 2.5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-14a1 1 0 0 0-1-1H3Zm-3 1a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v14a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3v-14Z"
      clipRule="evenodd"
    />
    <Path
      fill={props.color}
      fillRule="evenodd"
      d="M6.5 6.5a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1ZM4 7a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0ZM13.293 7.793a1 1 0 0 1 1.414 0l5 5a1 1 0 0 1-1.414 1.414L14 9.914 3.707 20.207a1 1 0 0 1-1.414-1.414l11-11Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default ImageIcon;
