import {Text, View, TextInput, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {COLORS, FONTS, SIZES} from '@/constants';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {sendToast, Roller} from '@/components/Template/utils';
import {sendNotification} from '@/api/user';
import {useNavigation} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import {z} from 'zod';
import HeaderA from '@/components/Header/HeaderA';
import FormButton from '@/components/Button/FormButton';
import {registerDevice} from '@/utils/sendNotification';
import {send} from '@/constants/icons';

const schema = z.object({
  body: z
    .string({
      required_error: 'Body is required',
    })
    .min(20, 'Body must be at least 20 characters long')
    .max(200, 'Body is too long'),
  title: z
    .string({
      required_error: 'Title is required',
    })
    .min(5, 'Title must be at least 5 characters long')
    .max(50, 'Title is too long'),
});

const AREAS = [
  {label: 'Under G', value: 'Under G'},
  {label: 'Adenike', value: 'Adenike'},
  {label: 'Yoaco', value: 'Yoaco'},
  {label: 'School', value: 'School'},
];

const SendNotification = () => {
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
    sendToast('info', 'Sending notification...');
    return;
    setLoading(true);
    await registerDevice();

    const {data, status} = await sendNotification({
      title: `${body.title} - ${body.location}`,
      body: body.body,
    });

    setLoading(false);

    if (status === 200) {
      sendToast('success', 'Notification sent successfully');
      navigation.goBack();
    } else {
      sendToast(
        'error',
        data?.error?.message || 'An error occurred, please try again',
      );
    }
  };

  return (
    <View>
      <HeaderA title="Send Alert" />
      <Roller visible={loading} />

      <View style={styles.page}>
        <View>
          <Text style={styles.text}>Location</Text>
          <Controller
            control={control}
            name="location"
            render={({field: {onChange, onBlur, value}}) => (
              <Picker
                selectedValue={value}
                onValueChange={onChange}
                onBlur={onBlur}
                style={styles.input}
                selectionColor={COLORS.primary}
                mode="dropdown">
                <Picker.Item
                  label="Select Area"
                  value="Under G"
                  style={styles.picker}
                />
                {AREAS.map((area, index) => (
                  <Picker.Item
                    key={index}
                    label={area.label}
                    value={area.value}
                    style={styles.picker}
                  />
                ))}
              </Picker>
            )}
          />
        </View>

        <View>
          <Text style={styles.text}>Title</Text>
          <Controller
            control={control}
            name="title"
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Title"
              />
            )}
          />
          {errors.title && (
            <Text style={styles.error}>{errors.title.message}</Text>
          )}
        </View>

        <View>
          <Text style={styles.text}>Message</Text>
          <Controller
            control={control}
            name="body"
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={{
                  ...styles.input,
                  paddingVertical: SIZES.h3,
                  height: SIZES.height * 0.3,
                }}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Security Message"
                multiline
                textAlignVertical="top"
              />
            )}
          />
          {errors.body && (
            <Text style={styles.error}>{errors.body.message}</Text>
          )}
        </View>

        <FormButton
          title={'Send'}
          onPress={() => handleSubmit(onSubmit)()}
          btnStyle={{
            marginTop: SIZES.h1 * 1.3,
            width: SIZES.width * 0.6,
            marginLeft: SIZES.width * 0.15,
          }}
        />
      </View>
    </View>
  );
};

export default SendNotification;

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
    marginBottom: SIZES.h3a,
    borderColor: COLORS.chocolateBackground,
  },
  text: {
    ...FONTS.body3c,
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
