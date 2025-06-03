import {Image, StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {COLORS, SIZES, IMAGES, FONTS} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import {sendOTP} from '@/api/auth';
import {sendToast, Roller} from '@/components/Template/utils';
import AuthHeader from '@/components/Header/AuthHeader';
import FormInput from '@/components/Input/FormInput';
import FormButton from '@/components/Button/FormButton';

const ForgotPassword = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (/^[a-z]+@(student\.)?lautech\.edu\.ng$/.test(email) === false) {
      sendToast('error', 'Invalid email');
      return;
    }
    setLoading(true);
    const {data, status} = await sendOTP({email});
    setLoading(false);
    if (status === 200) {
      sendToast('success', 'OTP sent successfully!');
      navigation.navigate('VerifyPassword', {email});
    } else {
      sendToast('error', data?.error?.message || 'Network error');
    }
  };

  return (
    <View style={styles.page}>
      {loading && <Roller visible={loading} />}
      <AuthHeader title="Forget Password" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={IMAGES.forgotpassword}
          style={{
            height: SIZES.height * 0.3,
            marginTop: SIZES.h1 * 2,
            width: SIZES.width * 0.7,
            alignSelf: 'center',
          }}
        />
        <View style={{alignItems: 'center'}}>
          <Text
            style={{
              ...FONTS.body3c,
              color: COLORS.black,
              textAlign: 'center',
              marginHorizontal: SIZES.h1,
            }}>
            You can request your password reset below.
          </Text>
          <Text
            style={{
              ...FONTS.body3c,
              color: COLORS.black,
              textAlign: 'center',
              marginHorizontal: SIZES.h1,
            }}>
            We will send a security code to the email address, please make sure
            it is correct.
          </Text>
        </View>
        <View style={{marginTop: SIZES.h5}}>
          <View style={{marginVertical: SIZES.h1}}>
            <FormInput placeholder="Email" setValue={setEmail} />
          </View>
          {/* BUTTONS */}
          <FormButton
            title="Request Password Reset"
            onPress={() => handleSubmit()}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.width * 0.04,
  },
});
