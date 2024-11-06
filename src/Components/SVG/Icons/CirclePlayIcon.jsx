import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { 
  widthPercentageToDP as wp, 
  heightPercentageToDP as hp 
} from 'react-native-responsive-screen';

const CirclePlayIcon = ({ width = wp('6%'), height = wp('6%'), ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    {...props}
  >
    <Path
      fill={props.color || 'black'}
      fillRule="evenodd"
      d="M12 3.5a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm-11 9c0-6.075 4.925-11 11-11s11 4.925 11 11-4.925 11-11 11-11-4.925-11-11Z"
      clipRule="evenodd"
    />
    <Path
      fill={props.color || 'black'}
      fillRule="evenodd"
      d="M9.528 7.618a1 1 0 0 1 1.027.05l6 4a1 1 0 0 1 0 1.664l-6 4A1 1 0 0 1 9 16.5v-8a1 1 0 0 1 .528-.882ZM11 10.368v4.264l3.197-2.132L11 10.368Z"
      clipRule="evenodd"
    />
  </Svg>
);

export default CirclePlayIcon;
