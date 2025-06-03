import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import {COLORS, FONTS, SIZES, ICONS} from '@/constants';
import {useForm, Controller} from 'react-hook-form';
import {Picker} from '@react-native-picker/picker';
import {sendToast} from '../Template/utils';
import {zodResolver} from '@hookform/resolvers/zod';
import {fetchDepartments} from '@/api/school';
import FormButton from '../Button/FormButton';
import schema from '@/schemas/createUser';

const FormComponent = ({onSubmit}) => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hide, setHide] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: zodResolver(schema),
  });

  const fetchData = async () => {
    try {
      const {data, status} = await fetchDepartments('');
      setLoading(false);
      if (status !== 200) {
        return sendToast(
          'error',
          'Unable to fetch departments. Please try again later',
        );
      }
      setDepartments(data?.data);
    } catch (error) {
      setLoading(false);
      sendToast('error', 'An error occurred while fetching departments.');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <View>
      <View>
        <Text style={styles.text}>First Name</Text>
        <Controller
          control={control}
          name="firstName"
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Enter your first name"
              autoCapitalize="words"
            />
          )}
        />
        {errors.firstName && (
          <Text style={styles.error}>{errors.firstName.message}</Text>
        )}
      </View>

      <View>
        <Text style={styles.text}>Last Name</Text>
        <Controller
          control={control}
          name="lastName"
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Enter your last name"
              autoCapitalize="words"
            />
          )}
        />
        {errors.lastName && (
          <Text style={styles.error}>{errors.lastName.message}</Text>
        )}
      </View>

      <View>
        <Text style={styles.text}>Email</Text>
        <Controller
          control={control}
          name="email"
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Enter your student email"
              keyboardType="email-address"
            />
          )}
        />
        {errors.email && (
          <Text style={styles.error}>{errors.email.message}</Text>
        )}
      </View>

      <View>
        <Text style={styles.text}>Phone Number</Text>
        <Controller
          control={control}
          name="phoneNumber"
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
            />
          )}
        />
        {errors.phoneNumber && (
          <Text style={styles.error}>{errors.phoneNumber.message}</Text>
        )}
      </View>
      <View>
        <Text style={styles.text}>Password</Text>
        <Controller
          control={control}
          name="password"
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Enter your password"
              secureTextEntry={hide}
            />
          )}
        />
        <View>
          <Pressable onPress={() => setHide(!hide)}>
            <Image
              source={hide ? ICONS.eyeclose : ICONS.eye}
              style={{
                height: SIZES.h3,
                width: SIZES.h3,
                position: 'absolute',
                top: SIZES.h2 * -2.3,
                right: SIZES.h3 * 1.1,
              }}
            />
          </Pressable>
        </View>
        {errors.password && (
          <Text style={styles.error}>{errors.password.message}</Text>
        )}
      </View>

      <View>
        <Text style={styles.text}>Department</Text>
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : (
          <Controller
            control={control}
            name="departmentId"
            defaultValue={departments[0]?.id}
            render={({field: {onChange, onBlur, value}}) => (
              <Picker
                selectedValue={value}
                onValueChange={itemValue => onChange(itemValue)}
                onBlur={onBlur}
                style={styles.input}
                itemStyle={{fontSize: SIZES.h4 * 1.1}}
                prompt="Select your department"
                selectionColor={COLORS.primary}>
                {departments &&
                  departments.map(department => (
                    <Picker.Item
                      key={department.id}
                      label={department.name}
                      value={department.id}
                      style={styles.input}
                    />
                  ))}
              </Picker>
            )}
          />
        )}
        {errors.departmentId && (
          <Text style={styles.error}>{errors.departmentId.message}</Text>
        )}
      </View>

      <View>
        <Text style={styles.text}>Role</Text>
        <Controller
          control={control}
          name="role"
          defaultValue="student"
          render={({field: {onChange, onBlur, value}}) => (
            <Picker
              selectedValue={value}
              onValueChange={itemValue => onChange(itemValue)}
              onBlur={onBlur}
              style={styles.input}
              selectionColor={COLORS.primary}
              mode="dropdown">
              <Picker.Item
                label="Student"
                value="student"
                style={styles.input}
              />
              <Picker.Item label="Staff" value="staff" style={styles.input} />
            </Picker>
          )}
        />
      </View>

      <FormButton
        title={'Sign Up'}
        onPress={handleSubmit(onSubmit)}
        btnStyle={{marginTop: SIZES.h1}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: SIZES.h1 * 1.9,
    borderWidth: 0.8,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.base * 0.8,
    marginTop: SIZES.h5 * 0.7,
    marginBottom: SIZES.h3,
    paddingLeft: SIZES.h3,
    paddingRight: SIZES.base * 1.1,
    flexDirection: 'column',
    fontSize: SIZES.h4 * 1.1,
    fontFamily: 'Satoshi-Regular',
    alignItems: 'center',
    color: '#040B1B',
    justifyContent: 'space-between',
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

export default FormComponent;
