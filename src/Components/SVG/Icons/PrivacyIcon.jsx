import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
const PrivacyIcon = () => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 192 192"
  >
    <G fill="none" stroke="#000" strokeWidth={12}>
      <Path
        strokeLinecap="round"
        d="M151.8 144.5a74 74 0 0 1-85.59 19.21A74 74 0 0 1 22.42 87.7a74 74 0 0 1 59.55-64.42m28.03.06a74 74 0 0 1 50.06 35.61 74 74 0 0 1 5.915 61.15"
      />
      <Path d="M76 92h40c4.432 0 8 3.568 8 8v22c0 4.432-3.568 8-8 8H76c-4.432 0-8-3.568-8-8v-22c0-4.432 3.568-8 8-8zm4 0V77.7C80 69.029 87.163 62 96 62s16 7.029 16 15.7V92" />
    </G>
  </Svg>
);
export default PrivacyIcon;
