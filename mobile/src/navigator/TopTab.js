import React from 'react';
import {StyleSheet, Text, StatusBar} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {COLORS} from '@/constants';
import LearnScreen from '@/screens/Learn/LearnScreen';
import SchedulingScreen from '@/screens/Learn/SchedulingScreen';
import TimeTableScreen from '@/screens/Learn/TimeTableScreen';
import ExternalProviders from '@/screens/Learn/ExternalProviders';

const Tab = createMaterialTopTabNavigator();

const TopTab = () => {
  return (
    <>
      <StatusBar backgroundColor={COLORS.primary} barStyle={'light-content'} />
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarShowLabel: true,
          tabBarStyle: {
            height: 50,
            backgroundColor: COLORS.primary,
          },
          tabBarLabelStyle: {
            fontSize: 14,
            fontFamily: 'Satoshi-Medium',
            textTransform: 'capitalize',
          },
          tabBarIndicatorStyle: {
            backgroundColor: COLORS.white,
          },
          tabBarActiveTintColor: COLORS.white,
          tabBarInactiveTintColor: COLORS.secondary,
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                color: focused ? COLORS.secondary : COLORS.white,
                fontSize: 14,
                fontFamily: 'Satoshi-Medium',
                textTransform: 'capitalize',
              }}>
              {route.name}
            </Text>
          ),
          headerShown: false,
        })}>
        <Tab.Screen name="Learn" component={LearnScreen} />
        <Tab.Screen name="Scheduling" component={SchedulingScreen} />
        <Tab.Screen name="Time Table" component={TimeTableScreen} />
        <Tab.Screen name="External" component={ExternalProviders} />
      </Tab.Navigator>
    </>
  );
};

export default TopTab;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: COLORS.grey2,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  container: {
    height: 100,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: COLORS.chocolateBackground,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
  },
  getCtn: {
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
