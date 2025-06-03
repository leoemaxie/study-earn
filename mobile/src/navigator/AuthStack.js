import {StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import SplashScreen from '@/screens/Auth/SplashScreen';
import IntroSlider from '@/screens/Auth/IntroSlider';
import CreateAccount from '@/screens/Auth/CreateAccount';
import Login from '@/screens/Auth/Login';
import ForgotPassword from '@/screens/Auth/ForgotPassword';
import ResetPassword from '@/screens/Auth/ResetPassword';
import VerifyEmail from '@/screens/Auth/VerifyEmail';
import VerifyPassword from '@/screens/Auth/VerifyPassword';
import CreateAccountPassword from '@/screens/Main/Payment/AddPaymentMethod';

const AuthStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="IntroSlider" component={IntroSlider} />
      <Stack.Screen name="VerifyEmail" component={VerifyEmail} />
      <Stack.Screen name="CreateAccount" component={CreateAccount} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="VerifyPassword" component={VerifyPassword} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen
        name="CreateAccountPassword"
        component={CreateAccountPassword}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;