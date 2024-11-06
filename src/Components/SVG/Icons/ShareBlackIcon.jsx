import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */
const ShareBlackIcon = () => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="-1 0 26 26"
  >
    <Path
      fill="#000"
      fillRule="evenodd"
      d="M19 16c-1.77 0-3.315.925-4.204 2.312l-5.355-3.06c.346-.68.559-1.438.559-2.252 0-.503-.097-.979-.235-1.437l5.571-3.183A4.97 4.97 0 0 0 19 10a5 5 0 0 0 5-5 5 5 0 0 0-5-5 5 5 0 0 0-5 5c0 .503.097.979.235 1.438L8.664 9.62A4.973 4.973 0 0 0 5 8a5 5 0 0 0-5 5 5 5 0 0 0 5 5c1.14 0 2.179-.396 3.02-1.038l6.035 3.498c-.02.18-.055.354-.055.54a5 5 0 0 0 5 5 5 5 0 0 0 5-5 5 5 0 0 0-5-5"
    />
  </Svg>
);
export default ShareBlackIcon;