import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {SIZES, ICONS, FONTS, COLORS} from '@/constants';
import {useNavigation} from '@react-navigation/native';

const AuthHeader = ({title}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          source={ICONS.arrowleft}
          style={{height: SIZES.h2, width: SIZES.h2}}
        />
      </TouchableOpacity>
      <View>
        <Text
          style={{
            ...FONTS.h1a,
            fontFamily: 'Urbanist-Medium',
            color: COLORS.primary,
            marginTop: SIZES.h1,
          }}>
          {title}
        </Text>
      </View>
      <View />
    </View>
  );
};

export default AuthHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
