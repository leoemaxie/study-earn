import React, {useEffect} from 'react';
import {StyleSheet, StatusBar, View, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {COLORS, IMAGES, SIZES} from '@/constants';

const SplashScreen = () => {
  const navigation = useNavigation();
  const selector = useSelector(state => state?.auth?.isLoggedIn);
  const onboard = useSelector(state => state?.auth?.isOnboardingDisabled);

  const check = async () => {
    if (selector === true) {
      setTimeout(() => {
        navigation.replace('Main', {screen: 'Bottom'});
      }, 2000);
    } else if (!onboard) {
      setTimeout(() => {
        navigation.replace('IntroSlider');
      }, 2000);
    } else {
      setTimeout(() => {
        navigation.replace('CreateAccount');
      }, 2000);
    }
  };

  useEffect(() => {
    check();
  }, []);

  return (
    <View style={styles.page}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      <Image
        source={IMAGES.logo}
        style={{height: SIZES.h1 * 10, width: SIZES.h1 * 10}}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
