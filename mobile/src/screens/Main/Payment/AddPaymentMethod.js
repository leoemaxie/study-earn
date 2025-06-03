import {Text, View, TextInput, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {COLORS, FONTS, SIZES} from '@/constants';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {sendToast, Roller} from '@/components/Template/utils';
import {addPaymentMethod} from '@/api/user';
import {useNavigation} from '@react-navigation/native';
import HeaderA from '@/components/Header/HeaderA';
import FormButton from '@/components/Button/FormButton';
import schema from '@/schemas/paymentMethod';

const AddPaymentMethod = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const {
    control,
    formState: {errors},
    handleSubmit,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async body => {
    setLoading(true);
    const {data, status} = await addPaymentMethod(body);

    setLoading(false);

    if (status === 201) {
      sendToast('success', 'Payment method added successfully');
      navigation.navigate('ViewPaymentMethod');
    } else {
      sendToast(
        'error',
        data?.error?.message || 'An error occurred, please try again',
      );
    }
  };

  return (
    <View>
      <HeaderA title="Add Payment Method" />
      <Roller visible={loading} />

      <View style={styles.page}>
        <View>
          <Text style={styles.text}>Account Number</Text>
          <Controller
            control={control}
            name="accountNumber"
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Enter your account number"
                keyboardType="number-pad"
              />
            )}
          />
          {errors.accountNumber && (
            <Text style={styles.error}>{errors.accountNumber.message}</Text>
          )}
        </View>

        <View>
          <Text style={styles.text}>Account Name</Text>
          <Controller
            control={control}
            name="accountName"
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Enter your account name"
              />
            )}
          />
          {errors.accountName && (
            <Text style={styles.error}>{errors.accountName.message}</Text>
          )}
        </View>

        <View>
          <Text style={styles.text}>Bank Name</Text>
          <Controller
            control={control}
            name="bankName"
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Enter your bank name"
              />
            )}
          />
          {errors.bankName && (
            <Text style={styles.error}>{errors.bankName.message}</Text>
          )}
        </View>

        <FormButton
          title={'Add Payment Method'}
          onPress={() => handleSubmit(onSubmit)()}
          btnStyle={{marginTop: SIZES.h1 * 1.3}}
        />
      </View>
    </View>
  );
};

export default AddPaymentMethod;

const styles = StyleSheet.create({
  page: {
    backgroundColor: COLORS.grey2,
    paddingHorizontal: SIZES.width * 0.05,
    paddingTop: SIZES.width * 0.01,
  },
  input: {
    height: SIZES.h1 * 1.9,
    borderWidth: 0.8,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.base * 0.8,
    marginTop: SIZES.base * 1.2,
    paddingHorizontal: SIZES.h3,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SIZES.h3a,
    borderColor: COLORS.chocolateBackground,
  },
  text: {
    ...FONTS.body4,
    color: COLORS.black,
    fontFamily: 'Satoshi-Medium',
  },
  error: {
    color: COLORS.red,
    marginTop: SIZES.h5 * -0.9,
    marginBottom: SIZES.h5 * 1.5,
    fontFamily: 'Satoshi-Regular',
  },
});
