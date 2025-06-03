import React from 'react';
import {StyleSheet, Image, Text, View, StatusBar} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {COLORS, ICONS, SIZES} from '@/constants';
import LearnStack from './LearnStack';
import NewHome from '@/screens/Main/Home/NewHome';
import InstitutionScreen from '@/screens/Main/Institution/InstitutionScreen';
import BusinessScreen from '@/screens/Main/Business/BusinessScreen';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <>
      <StatusBar backgroundColor={COLORS.primary} barStyle={'light-content'} />
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarShowLabel: true,
          tabBarStyle: {
            height: SIZES.h1 * 1.9,
            backgroundColor: COLORS.white,
            borderTopWidth: 1,
          },
          tabBarLabel: ({focused}) => (
            <View
              style={{
                backgroundColor: focused ? COLORS.primary : COLORS.white,
                borderRadius: SIZES.base,
                paddingVertical: SIZES.base * 1.3,
                paddingHorizontal: SIZES.base * 2,
                marginBottom: 5,
                flexDirection: focused ? 'row' : 'column',
                alignItems: 'center',
              }}>
              <Image
                source={getIconName(route.name)}
                style={{
                  height: SIZES.h3,
                  width: SIZES.h3,
                  tintColor: focused ? COLORS.white : COLORS.black,
                  marginRight: focused ? 5 : 0,
                }}
              />
              <Text
                style={{
                  fontSize: SIZES.body5,
                  fontFamily: 'Satoshi-Medium',
                  color: focused ? COLORS.white : COLORS.black,
                }}>
                {route.name}
              </Text>
            </View>
          ),
          tabBarIcon: () => null,
          headerShown: false,
        })}>
        <Tab.Screen name="Home" component={NewHome} />
        <Tab.Screen name="Academics" component={LearnStack} />
        <Tab.Screen name="Institution" component={InstitutionScreen} />
        <Tab.Screen name="Business" component={BusinessScreen} />
      </Tab.Navigator>
    </>
  );
};

const getIconName = routeName => {
  switch (routeName) {
    case 'Home':
      return ICONS.home;
    case 'Academics':
      return ICONS.academic;
    case 'Institution':
      return ICONS.institution;
    case 'Business':
      return ICONS.business;
    default:
      return null;
  }
};

export default BottomTab;

const styles = StyleSheet.create({});
