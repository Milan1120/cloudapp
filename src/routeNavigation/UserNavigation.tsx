import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import component
import Edituser from '../user/Edituser';
import Help from '../user/Help';
import Premium from '../user/Premium';
import Privacy_Policy from '../user/Privacy_Policy';
import Settings from '../user/Settings';
import UserComponent from '../tabcomponent/UserComponent';
import About from '../user/About';
import Security from '../user/Security';
import Cleardata from '../user/Cleardata';
import Deactivateaccount from '../user/Deactivateaccount';
import Changepassword from '../user/Changepassword';
import Changescreenlock from '../user/Changescreenlock';
import HomeScreenlock from '../user/HomeScreenlock';
import Payment from '../user/Payment';


const Stack = createNativeStackNavigator();

const UserNavigation = () => {
  return (
      <Stack.Navigator initialRouteName="User" screenOptions={{headerShown: true}}>
        <Stack.Screen name="User" component={UserComponent} />
        <Stack.Screen name="EditUser" component={Edituser} />
        <Stack.Screen name="Help" component={Help} />
        <Stack.Screen name="Premium" component={Premium} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="PrivacyPolicy" component={Privacy_Policy} />
        <Stack.Screen name="Setting" component={Settings} />
        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="Security" component={Security} />
        <Stack.Screen name="ClearData" component={Cleardata} />
        <Stack.Screen name="Deactivateaccount" component={Deactivateaccount} />
        <Stack.Screen name="Changepassword" component={Changepassword} />
        <Stack.Screen name="Changescreenlock" component={Changescreenlock} />
        <Stack.Screen name="HomeScreenlock" component={HomeScreenlock} />
      </Stack.Navigator>
  );
};

export default UserNavigation;
