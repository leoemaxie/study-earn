import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {COLORS, FONTS, ICONS, SIZES} from '@/constants';
import {useNavigation} from '@react-navigation/native';

const HeaderA = ({title, top}) => {
  const navigation = useNavigation();
  return (
    <View style={{marginBottom: top ? 0 : SIZES.h4}}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={ICONS.arrowleft}
            style={{height: SIZES.h2 * 1.1, width: SIZES.h2 * 1.1}}
          />
        </TouchableOpacity>
        <Text
          style={{
            ...FONTS.body3,
            color: COLORS.black,
            fontFamily: 'Satoshi-Medium',
          }}>
          {title}
        </Text>
        <View />
      </View>
      <View
        style={{
          height: 1,
          backgroundColor: COLORS.chocolateBackground,
          marginTop: SIZES.h5,
        }}
      />
    </View>
  );
};

export default HeaderA;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.width * 0.04,
    paddingTop: SIZES.h4,
  },
});
