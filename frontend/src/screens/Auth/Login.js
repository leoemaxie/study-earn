import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, SIZES, FONTS} from '@/constants';
import {useNavigation} from '@react-navigation/native';
import {Roller, sendToast} from '@/components/Template/utils';
import {loginUser} from '@/api/auth';
import {useDispatch} from 'react-redux';
import {setAccessToken, setRefreshToken} from '@/redux/slices/authSlice';
import FormInput from '@/components/Input/FormInput';
import FormButton from '@/components/Button/FormButton';

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const body = {email, password};

    if (
      /^[a-z]+@(student\.)?lautech\.edu\.ng$/.test(email) === false ||
      /^\S{8,}$/.test(password) === false
    ) {
      sendToast('error', 'Invalid email or password');
      return;
    }

    try {
      setLoad(true);
      const {data, status} = await loginUser(body);
      setLoad(false);

      if (status === 200) {
        sendToast('success', 'Login successfully!');
        dispatch(setAccessToken(data?.accessToken));
        dispatch(setRefreshToken(data?.refreshToken));
        navigation.replace('Main', {screen: 'Bottom'});
      } else {
        sendToast('error', data?.error?.message);
      }
    } catch (error) {
      console.log('error from login', error);
    }
  };

  return (
    <View style={styles.page}>
      {load && <Roller visible={true} />}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={{...FONTS.h3, color: COLORS.black, textAlign: 'center'}}>
          Welcome Back!
        </Text>
        <Text
          style={{...FONTS.body4, color: COLORS.black, textAlign: 'center'}}>
          Ready to continue your journey? Let's dive back in and achieve more
          together.
        </Text>

        <FormInput
          title={'Email'}
          placeholder={'Enter your student email'}
          value={email}
          setValue={setEmail}
        />
        <FormInput
          title={'Password'}
          placeholder={'Enter password'}
          value={password}
          setValue={setPassword}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPassword')}
          style={{marginBottom: SIZES.h1 * 1.9}}>
          <Text style={{...FONTS.body4, color: COLORS.red, textAlign: 'right'}}>
            Forgot Passsword?
          </Text>
        </TouchableOpacity>
        <FormButton title={'Login'} onPress={() => handleLogin()} />
        <TouchableOpacity
          onPress={() => navigation.navigate('CreateAccount')}
          style={{marginTop: SIZES.base}}>
          <Text
            style={{...FONTS.body4, color: COLORS.black, textAlign: 'center'}}>
            Don't have an account?{' '}
            <Text style={{color: COLORS.red, fontFamily: 'Satoshi-Medium'}}>
              Register
            </Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: COLORS.grey2,
    paddingHorizontal: SIZES.width * 0.05,
    paddingTop: SIZES.h1 * 1.5,
  },
});
