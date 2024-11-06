import * as React from 'react';
import Svg, { G, Path, Defs, ClipPath } from 'react-native-svg';
const HomeIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <G fill={props.color} clipPath="url(#a)">
      <Path d="M9 11.5a1 1 0 0 0-1 1v9h2v-8h4v8h2v-9a1 1 0 0 0-1-1H9Z" />
      <Path d="M12.614 1.71a1 1 0 0 0-1.228 0l-9 7A1 1 0 0 0 2 9.5v11a3 3 0 0 0 3 3h4a1 1 0 0 1-1-1v-1H5a1 1 0 0 1-1-1V9.99l8-6.223 8 6.222V20.5a1 1 0 0 1-1 1h-3v1a1 1 0 0 1-1 1h4a3 3 0 0 0 3-3v-11a1 1 0 0 0-.386-.79l-9-7Z" />
      <Path d="M9 23.5a1 1 0 0 0 1-1v-1H8v1a1 1 0 0 0 1 1ZM15 23.5a1 1 0 0 0 1-1v-1h-2v1a1 1 0 0 0 1 1Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill={props.color} d="M0 .5h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default HomeIcon;
