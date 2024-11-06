import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
const GridIcon = ({ width=24,height=24,color='#000', ...props}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={width}
    fill="none"
    {...props}
  >
    <Path
      fill={color}
      d="M0 .576v13.848A.576.576 0 0 0 .576 15h13.848a.576.576 0 0 0 .576-.576V.576A.575.575 0 0 0 14.424 0H.576A.576.576 0 0 0 0 .576Zm10.384.575h3.464v3.465h-3.464V1.151Zm0 4.616h3.464v3.465h-3.464V5.767Zm0 4.617h3.464v3.464h-3.464v-3.464ZM5.767 1.15h3.465v3.465H5.767V1.151Zm0 4.616h3.465v3.465H5.767V5.767Zm0 4.617h3.465v3.464H5.767v-3.464ZM1.151 1.15h3.465v3.465H1.151V1.151Zm0 4.616h3.465v3.465H1.151V5.767Zm0 4.617h3.465v3.464H1.151v-3.464Z"
    />
  </Svg>
);
export default GridIcon;
