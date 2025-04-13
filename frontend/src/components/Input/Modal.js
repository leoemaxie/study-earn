import React, {useState, useEffect} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {useForm, Controller} from 'react-hook-form';
import {Picker} from '@react-native-picker/picker';
import {Roller, sendToast} from '../Template/utils';
import {zodResolver} from '@hookform/resolvers/zod';
import {SIZES, COLORS, FONTS} from '@/constants';
import {updateProfile} from '@/api/user';
import {userSchema} from '@/schemas/updateUser';
import {useDispatch} from 'react-redux';
import {setUser} from '@/redux/slices/authSlice';
import FormButton from '../Button/FormButton';

const ModalInput = ({visible, args, user, onClose}) => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(visible);
  const [loading, setLoading] = useState(false);
  const [rollerVisible, setRollerVisible] = useState(false);
  const [pickerData, setPickerData] = useState({});

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: args.reduce((acc, item) => {
      acc[item.key] = user[item.key] || '';
      return acc;
    }, {}),
  });

  useEffect(() => {
    setModalVisible(visible);
  }, [visible]);

  useEffect(() => {
    const fetchPickerData = async () => {
      const data = {};
      for (const item of args) {
        if (item.type === 'picker') {
          const result = await item.action(setLoading);
          data[item.key] = result;
        }
      }
      setPickerData(data);
    };

    fetchPickerData();
  }, [args]);

  const onSubmit = async body => {
    setRollerVisible(true);
    const {data, status} = await updateProfile(body);
    setRollerVisible(false);
    if (status === 200) {
      dispatch(setUser(data?.data));
      sendToast('success', 'Profile updated successfully');
      onClose();
    } else {
      sendToast('error', data ? data.error.message : 'Profile update failed');
    }
  };

  return (
    <SafeAreaProvider>
      <Roller visible={rollerVisible} />
      <SafeAreaView style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
            onClose();
          }}>
          <View style={styles.modalView}>
            {args.map(item => (
              <View key={item.key}>
                <Text style={styles.text}>{item.label}</Text>
                {!Object.hasOwn(item, 'type') ? (
                  <Controller
                    control={control}
                    name={item.key}
                    render={({field: {onChange, onBlur, value}}) => (
                      <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        placeholder={item.format(user[item.key])}
                        keyboardType={
                          Object.hasOwn(item, 'keyboardType')
                            ? item.keyboardType
                            : 'default'
                        }
                        autoCapitalize={
                          Object.hasOwn(item, 'autoCapitalize')
                            ? item.autoCapitalize
                            : 'words'
                        }
                      />
                    )}
                  />
                ) : loading ? (
                  <ActivityIndicator
                    key={item.key}
                    size="large"
                    color={COLORS.primary}
                  />
                ) : (
                  <Controller
                    control={control}
                    name={item.key}
                    render={({field: {value, onChange, onBlur}}) => (
                      <Picker
                        selectedValue={value}
                        onValueChange={itemValue => onChange(itemValue)}
                        onBlur={onBlur}
                        style={[
                          styles.input,
                          {backgroundColor: COLORS.white, elevation: 4},
                        ]}
                        itemStyle={{fontSize: SIZES.h4 * 1.1}}
                        mode={
                          Object.hasOwn(item, 'mode') ? item.mode : 'dropdown'
                        }
                        prompt={
                          Object.hasOwn(item, 'prompt') ? item.prompt : ''
                        }
                        selectionColor={COLORS.primary}>
                        {pickerData[item.key]?.map(v => (
                          <Picker.Item
                            key={v.id}
                            label={v.name}
                            value={v.id}
                            style={styles.picker}
                          />
                        ))}
                      </Picker>
                    )}
                  />
                )}
                {errors[item.key] && (
                  <Text style={styles.error}>{errors[item.key].message}</Text>
                )}
              </View>
            ))}
            <FormButton
              title={'Save'}
              onPress={handleSubmit(onSubmit)}
              btnStyle={styles.btn}
            />
          </View>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    marginTop: SIZES.height * 0.25,
    marginHorizontal: SIZES.width * 0.1,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  btn: {
    padding: SIZES.h1 * 0.5,
    elevation: 2,
    width: SIZES.width * 0.3,
    marginTop: SIZES.height * 0.02,
  },
  input: {
    height: SIZES.h1 * 1.9,
    borderWidth: 0.8,
    borderRadius: SIZES.base * 0.8,
    marginTop: SIZES.base * 1.2,
    width: SIZES.width * 0.6,
    paddingLeft: SIZES.h3 * 0.8,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SIZES.h2,
    borderColor: COLORS.chocolateBackground,
  },
  picker: {
    fontSize: SIZES.h4 * 1.1,
    fontFamily: 'Satoshi-Regular',
    color: '#040B1B',
    flex: 1,
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

export default ModalInput;
