import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS, FONTS, ICONS, SIZES} from '../../constants';

const FormInputClick = ({title, onPress, checkText}) => {
  return (
    <View>
      <Text
        style={{
          ...FONTS.body3,
          color: COLORS.dark2,
          fontFamily: 'Satoshi-Medium',
        }}>
        {title}
      </Text>
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <Text style={{...FONTS.body4, color: COLORS.black}}>{checkText}</Text>
        <Image
          source={ICONS.arrowdown}
          style={{height: SIZES.h3, width: SIZES.h3}}
        />
      </TouchableOpacity>
    </View>
  );
};

export default FormInputClick;

const styles = StyleSheet.create({
  container: {
    height: SIZES.h1 * 1.7,
    borderWidth: 0.8,
    borderRadius: SIZES.base * 0.8,
    marginTop: SIZES.base * 0.7,
    paddingHorizontal: SIZES.base * 1.1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SIZES.h4,
    borderColor: '#F3F7FF',
    backgroundColor: COLORS.white,
  },
});
