import {StyleSheet, View} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '@/constants';
import HeaderA from '@/components/Header/HeaderA';

const SearchScreen = () => {
  return (
    <View style={styles.page}>
      <HeaderA title={'Search'} />
      <View style={{paddingHorizontal: SIZES.width * 0.04}}></View>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: COLORS.grey2,
    paddingTop: SIZES.h5,
  },
});
