import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TopTab from './TopTab';

const LearnStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Top"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Top" component={TopTab} />
    </Stack.Navigator>
  );
};

export default LearnStack;
