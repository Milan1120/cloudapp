import * as React from 'react';
import { View } from 'react-native';
import Svg, { Path } from "react-native-svg";

const NotificationbellIcon = ({ size, space = 2,  }) => (
  <View style={{ padding: space }}>
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
    >
      <Path
        fill="#232323"
        fillRule="evenodd"
        d="M15 3.75a7.5 7.5 0 0 0-7.5 7.5v6.25a5 5 0 0 1-.67 2.5h16.34a5 5 0 0 1-.67-2.5v-6.25a7.5 7.5 0 0 0-7.5-7.5ZM27.5 20a2.5 2.5 0 0 1-2.5-2.5v-6.25a10 10 0 0 0-20 0v6.25A2.5 2.5 0 0 1 2.5 20a1.25 1.25 0 1 0 0 2.5h25V20Zm-15.29 5.169a1.25 1.25 0 0 1 1.709.454 1.249 1.249 0 0 0 2.162 0 1.25 1.25 0 1 1 2.163 1.254 3.75 3.75 0 0 1-6.488 0 1.25 1.25 0 0 1 .454-1.708Z"
        clipRule="evenodd"
      />
    </Svg>
  </View>
);

export default NotificationbellIcon;
