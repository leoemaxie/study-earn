import {View, Image, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-toast-message';
import {COLORS, IMAGES, SIZES} from '@/constants';

export const sendToast = (type, text) => {
  Toast.show({
    type: type || 'error',
    text1: text,
  });
};

export const Roller = ({visible}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Spinner
      visible={loading && visible}
      size="large"
      color="#182952"
      cancelable={true}
    />
  );
};

export const RenderEmpty = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showEmptyImage, setShowEmptyImage] = useState(false);

  useEffect(() => {
    // Simulate a delay of 5 seconds
    const delay = setTimeout(() => {
      setShowEmptyImage(true);
      setIsLoading(false);
    }, 9000);

    return () => clearTimeout(delay);
  }, []);
  if (isLoading) {
    return (
      <View style={{alignContent: 'center', marginLeft: SIZES.h1 * 2}}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (showEmptyImage) {
    return (
      <View style={{alignSelf: 'center', marginLeft: SIZES.h1 * 2}}>
        <Image
          source={IMAGES.empty} // Replace with your empty image source
          style={{height: SIZES.height * 0.2, width: SIZES.width * 0.6}}
        />
      </View>
    );
  }

  return null;
};
