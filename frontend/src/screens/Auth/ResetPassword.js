import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {COLORS, FONTS, SIZES} from '@/constants';

const ResetPassword = () => {
  return (
    <View style={styles.page}>
      <StatusBar backgroundColor={COLORS.offwhite} barStyle="dark-content" />
      <Text style={{...FONTS.h1a, color: COLORS.dark}}>
        Reset Your Password
      </Text>
      <View style={{marginTop: SIZES.h3}}>
        <Text style={{...FONTS.body4, color: COLORS.black}}>
          Enter transaction 4-digit PIN-Code or use yout biometrics to perform
          action.
        </Text>
        {/* UNDER */}
        <View style={{marginTop: SIZES.h1}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: SIZES.h5,
              alignSelf: 'center',
            }}>
            <Text style={{...FONTS.body4, color: COLORS.black}}>
              Didn't recieve an OTP?
            </Text>
            <TouchableOpacity>
              <Text
                style={{
                  ...FONTS.h4,
                  color: COLORS.black,
                  fontFamily: 'Satoshi-Black',
                }}>
                {' '}
                Resend
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <Text
              style={{
                ...FONTS.body4,
                textDecorationLine: 'underline',
                color: COLORS.black2,
                textAlign: 'center',
              }}>
              Change Email Address
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: COLORS.offwhite,
    paddingTop: SIZES.h3,
    paddingHorizontal: SIZES.width * 0.05,
  },
});
