import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {COLORS, SIZES, FONTS, images} from '@/constants';
import HeaderA from '@/components/Header/HeaderA';

const ProductScreenDetails = ({route}) => {
  const {image} = route?.params || {};
  return (
    <View style={styles.page}>
      <HeaderA title={'Lautech Farm Product'} />
      <View style={{paddingHorizontal: SIZES.width * 0.04}}>
        <Image
          source={image ?? images.bean}
          style={{
            height: SIZES.height * 0.22,
            width: SIZES.width * 0.92,
            borderRadius: SIZES.h5,
          }}
        />

        {/* DETAILS */}
        <View style={{marginTop: SIZES.h4}}>
          <Text
            style={{...FONTS.h4, color: COLORS.black, marginBottom: SIZES.h4}}>
            LAUTECH Fresh Farm Products
          </Text>
          <Text style={{...FONTS.body4, color: COLORS.black}}>
            We provide fresh farm products from our farm. We have a variety of
            products. This feature is still in development Stay Tuned!
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ProductScreenDetails;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
