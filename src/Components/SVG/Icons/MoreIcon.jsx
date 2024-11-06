import * as React from 'react';
import Svg, { G, Path, Circle, Defs, ClipPath } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: filter */
const MoreIcon = () => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
  >
    <G clipPath="url(#a)">
      <Path fill="#fff" d="M0 0h24v24H0z" />
      <G filter="url(#b)">
        <Circle cx={6} cy={12} r={2} stroke="#000" strokeLinejoin="round" />
      </G>
      <G filter="url(#c)">
        <Circle cx={12} cy={12} r={2} stroke="#000" strokeLinejoin="round" />
      </G>
      <G filter="url(#d)">
        <Circle cx={18} cy={12} r={2} stroke="#000" strokeLinejoin="round" />
      </G>
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default MoreIcon;
