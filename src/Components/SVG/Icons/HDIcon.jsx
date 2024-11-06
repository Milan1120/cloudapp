import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */
const HDIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 32 32" 
    {...props}
  >
    <Path d="M28 6H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2ZM4 24V8h24v16Z" />
    <Path d="M22 11h-4v10h4a3 3 0 0 0 3-3v-4a3 3 0 0 0-3-3Zm1 7a1 1 0 0 1-1 1h-2v-6h2a1 1 0 0 1 1 1ZM13 11v4h-3v-4H8v10h2v-4h3v4h2V11h-2z" />
    <Path
      d="M0 0h32v32H0z"
      data-name="&lt;Transparent Rectangle&gt;"
      style={{
        fill: 'none',
      }}
    />
  </Svg>
);
export default HDIcon;
