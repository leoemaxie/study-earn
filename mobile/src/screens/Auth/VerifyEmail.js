import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {z} from 'zod';
import {verifyEmail} from '@/api/auth';
import {COLORS, SIZES, FONTS} from '@/constants';
import {sendToast, Roller} from '@/components/Template/utils';
import {useNavigation} from '@react-navigation/native';
import AuthHeader from '@/components/Header/AuthHeader';
import FormButton from '@/components/Button/FormButton';
import ConfirmationCodeField from '@/components/Input/CodeConfirmation';

const schema = z.object({
  token: z
    .string({
      required_error: 'Verification code is required',
    })
    .length(6, {
      message: 'Verification code must be 6 characters long',
    }),
});

const VerifyEmail = ({route}) => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleSubmit = async () => {
    const validationErrors = schema.safeParse({token: otp});
    if (!validationErrors.success) {
      sendToast('error', 'Invalid OTP');
      return;
    }

    setLoading(true);
    const {data, status} = await verifyEmail({
      email: route.params.email,
      token: otp,
    });
    setLoading(false);

    if (status === 200) {
      sendToast('success', 'Email verified successfully!');
      return navigation.navigate('Login');
    } else {
      sendToast('error', data?.error?.message || 'An error occurred');
    }
  };

  return (
    <View style={styles.page}>
      <AuthHeader title="Verify OTP" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text
          style={{
            ...FONTS.h3,
            color: COLORS.black,
            textAlign: 'center',
            marginTop: SIZES.h1 * 1.4,
          }}>
          Enter Verification Code
        </Text>
        <Text
          style={{
            ...FONTS.body4,
            color: COLORS.black,
            textAlign: 'center',
            marginTop: SIZES.h5,
          }}>
          We have sent an email to {route.params.email}
        </Text>
        <View style={{marginTop: SIZES.h2}}>
          <ConfirmationCodeField value={otp} setValue={setOtp} />
          {/* BUTTONS */}
          <FormButton
            title="Verify"
            onPress={() => handleSubmit()}
            btnStyle={{marginTop: SIZES.h1 * 1.5}}
          />
          {loading && <Roller visible={true} />}
        </View>
      </ScrollView>
    </View>
  );
};

export default VerifyEmail;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.width * 0.04,
  },
});
