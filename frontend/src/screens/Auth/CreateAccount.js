import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, FONTS, SIZES} from '@/constants';
import {useNavigation} from '@react-navigation/native';
import {Roller, sendToast} from '@/components/Template/utils';
import {registerUser, sendOTP} from '@/api/auth';
import FormComponent from '@/components/Input/FormComponent';

const CreateAccount = () => {
  const navigation = useNavigation();
  const [load, setLoad] = useState(false);

  const onSubmit = async body => {
    setLoad(true);
    try {
      const {data, status} = await registerUser(body);

      if (status === 201) {
        const {email} = body;
        sendToast('success', 'Account created successfully!');
        const {data, status} = await sendOTP({email});
        setLoad(false);
        if (status === 200) {
          return navigation.navigate('VerifyEmail', {email});
        } else {
          sendToast(
            'error',
            'Account Verification Failed, Please login to verify',
          );
        }
      } else {
        sendToast(
          'error',
          data?.error?.message || 'An error occurred, please try again',
        );
      }
    } catch (error) {
      sendToast('error', error.message);
    } finally {
      setLoad(false);
    }
  };

  return (
    <View style={styles.page}>
      {/* HEADER */}
      {load && <Roller visible={load} />}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={{...FONTS.h3, color: COLORS.black, textAlign: 'center'}}>
          Create Your Account
        </Text>
        <Text
          style={{
            ...FONTS.body4,
            color: COLORS.black,
            textAlign: 'center',
            marginBottom: SIZES.h2,
          }}>
          Please fill in the details below to get started
        </Text>
        <FormComponent onSubmit={onSubmit} />
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={{marginTop: SIZES.base}}>
          <Text
            style={{
              ...FONTS.body4,
              color: COLORS.black,
              textAlign: 'center',
              marginBottom: SIZES.h5 * 0.5,
            }}>
            Already have an account?{' '}
            <Text style={{color: COLORS.red, fontFamily: 'Satoshi-Medium'}}>
              Login
            </Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default CreateAccount;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: COLORS.grey2,
    paddingHorizontal: SIZES.width * 0.05,
    paddingTop: SIZES.h1 * 1.5,
  },
});
