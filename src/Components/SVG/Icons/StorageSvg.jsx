import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */
const StorageSvg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 36 36"
    {...props}
  >
    <Path
      d="M17.91 18.28c8.08 0 14.66-1.74 15.09-3.94V8.59c-.43 2.2-7 3.94-15.09 3.94A39.4 39.4 0 0 1 6.25 11V9a39.4 39.4 0 0 0 11.66 1.51C26 10.53 32.52 8.79 33 6.61c-.2-3.41-9.48-4.33-15-4.33S3 3.21 3 6.71v22.58c0 3.49 9.43 4.43 15 4.43s15-.93 15-4.43v-5.2C32.57 26.28 26 28 17.91 28a39.4 39.4 0 0 1-11.66-1.48v-2A39.4 39.4 0 0 0 17.91 26C26 26 32.57 24.28 33 22.09v-5.75c-.43 2.2-7 3.94-15.09 3.94a39.4 39.4 0 0 1-11.66-1.51v-2a39.4 39.4 0 0 0 11.66 1.51Z"
      className="clr-i-solid clr-i-solid-path-1"
    />
    <Path fill="none" d="M0 0h36v36H0z" />
  </Svg>
);
export default StorageSvg;
