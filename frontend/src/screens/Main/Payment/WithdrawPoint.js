import {
  Text,
  View,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {COLORS, FONTS, SIZES} from '@/constants';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Picker} from '@react-native-picker/picker';
import {z} from 'zod';
import {sendToast, Roller} from '@/components/Template/utils';
import {withdrawPoint, fetchPaymentMethod} from '@/api/user';
import {useNavigation} from '@react-navigation/native';
import HeaderA from '@/components/Header/HeaderA';
import FormButton from '@/components/Button/FormButton';

const schema = z.object({
  amount: z.coerce
    .number({
      required_error: 'Amount is required',
      invalid_type_error: 'Amount must be a number',
    })
    .min(1000, 'Amount must be at least 1000')
    .max(1000000, 'Amount must not exceed 1000000'),
});

const WithdrawPoint = () => {
  const navigation = useNavigation();
  const [paymentMethod, setPaymentMethod] = useState([]);
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
    const {data, status} = await withdrawPoint(body);

    setLoading(false);

    if (status === 200) {
      sendToast('success', 'Withdrawal request sent successfully');
      navigation.navigate('Main', {screen: 'Bottom'});
    } else {
      sendToast(
        'error',
        data?.error?.message || 'An error occurred, please try again',
      );
    }
  };

  useEffect(() => {
    const getPaymentMethod = async () => {
      const {data, status} = await fetchPaymentMethod();
      if (status === 200) {
        setPaymentMethod(data?.data);
      } else {
        sendToast('error', data ? data.error.message : 'Network error');
      }
    };

    getPaymentMethod();
  }, []);

  return (
    <View>
      <HeaderA title="Withdraw Point" />
      <Roller visible={loading} />

      <View style={styles.page}>
        <View>
          <Text style={styles.text}>Amount</Text>
          <Controller
            rules={'valueAsNumber'}
            control={control}
            name="amount"
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Enter Amount"
                keyboardType="number-pad"
              />
            )}
          />
          {errors.amount && (
            <Text style={styles.error}>{errors.amount.message}</Text>
          )}
        </View>

        <View>
          <Text style={styles.text}>Payment Method</Text>
          {loading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : (
            <Controller
              control={control}
              name="departmentId"
              render={({field: {onChange, onBlur, value}}) => (
                <Picker
                  selectedValue={value}
                  onValueChange={onChange}
                  onBlur={onBlur}
                  style={styles.input}
                  itemStyle={{fontSize: SIZES.h4 * 1.1}}
                  mode="dropdown"
                  selectionColor={COLORS.primary}>
                  {paymentMethod &&
                    paymentMethod.map(item => {
                      const {accountNumber, bankName} = item;
                      const label = `${accountNumber}  — ${bankName}`;
                      return (
                        <Picker.Item
                          key={item.id}
                          label={label}
                          value={item.id}
                          style={styles.picker}
                        />
                      );
                    })}
                </Picker>
              )}
            />
          )}
        </View>

        <FormButton
          title={'Withdraw'}
          onPress={() => handleSubmit(onSubmit)()}
          btnStyle={{marginTop: SIZES.h1 * 1.3}}
        />
      </View>
    </View>
  );
};

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
  picker: {
    fontSize: SIZES.h4 * 1.1,
    fontFamily: 'Satoshi-Regular',
    color: '#040B1B',
    flex: 1,
  },
  error: {
    color: COLORS.red,
    marginTop: SIZES.h5 * -0.9,
    marginBottom: SIZES.h5 * 1.5,
    fontFamily: 'Satoshi-Regular',
  },
});

export default WithdrawPoint;
