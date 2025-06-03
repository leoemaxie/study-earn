import React from 'react';
import {StyleSheet, Text, View, Image, StatusBar} from 'react-native';
import {COLORS, IMAGES, FONTS, SIZES} from '@/constants';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setOnboardingDisabled} from '@/redux/slices/authSlice';
import AppIntroSlider from 'react-native-app-intro-slider';

const IntroSlider = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const slides = [
    {
      key: 'slide1',
      image: IMAGES.slide1,
      title: 'Welcome to Study Earn',
      text: 'Dive into a world where learning meets earning!',
    },
    {
      key: 'slide2',
      image: IMAGES.slide2,
      title: 'Unlock Your Potential',
      text: 'Connect, get updates, plan your studies, and earn rewards!',
    },
    {
      key: 'slide3',
      image: IMAGES.slide3,
      title: 'Join Our Tribe',
      text: 'Embark on your path to financial freedom now!',
    },
  ];
  const _renderItem = ({item}) => {
    return (
      <View
        style={{
          backgroundColor: COLORS.white,
        }}>
        <Image
          source={item.image}
          style={{
            width: SIZES.width,
            height: SIZES.height * 0.6,
            borderRadius: -SIZES.h1 * 2,
          }}
        />
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Text
            style={{
              ...FONTS.h1,
              color: COLORS.black,
              fontFamily: 'Satoshi-Black',
              marginTop: SIZES.h1 * 1.5,
            }}>
            {item.title}
          </Text>
          <Text
            style={{
              ...FONTS.body3a,
              marginTop: SIZES.h4,
              color: '#040B1B',
            }}>
            {item.text}
          </Text>
        </View>
      </View>
    );
  };
  const _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Text style={{...FONTS.body3a, color: COLORS.white}}>Continue</Text>
      </View>
    );
  };

  const _renderDoneButton = () => {
    return (
      <View>
        <View style={styles.buttonCircle}>
          <Text style={{...FONTS.body3a, color: COLORS.white}}>Done</Text>
        </View>
        <_renderSkipButton />
      </View>
    );
  };

  const _renderSkipButton = () => {
    return (
      <View style={{marginTop: SIZES.h4, marginBottom: SIZES.h5}}>
        <Text
          style={{
            ...FONTS.body3a,
            color: COLORS.black,
            textAlign: 'center',
            fontFamily: 'Satoshi-Medium',
          }}>
          Skip
        </Text>
      </View>
    );
  };

  const _onEndReached = () => {
    dispatch(setOnboardingDisabled(true));
    navigation.navigate('CreateAccount');
  };
  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      <AppIntroSlider
        data={slides}
        renderItem={_renderItem}
        renderDoneButton={_renderDoneButton}
        renderNextButton={_renderNextButton}
        renderSkipButton={_renderSkipButton}
        onDone={_onEndReached}
        onSkip={_onEndReached}
        dotClickEnabled={true}
        showNextButton={true}
        showDoneButton={true}
        showSkipButton={true}
        dotStyle={{
          height: 7,
          width: 7,
          backgroundColor: '#D9D9D9',
          borderRadius: 100,
          marginBottom: SIZES.height * 0.56,
        }}
        activeDotStyle={{
          backgroundColor: '#001EC5',
          height: 7,
          width: 20,
          borderRadius: 100,
          marginBottom: SIZES.height * 0.56,
        }}
        bottomButton={true}
      />
    </View>
  );
};

export default IntroSlider;

const styles = StyleSheet.create({
  buttonCircle: {
    height: SIZES.h1 * 1.8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.base,
  },
});
