import React, {useState, useEffect} from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {Roller, sendToast} from '../Template/utils';
import {SIZES, COLORS, FONTS} from '@/constants';
import {fetchProfile, uploadFile} from '@/api/user';
import {setUser} from '@/redux/slices/authSlice';
import {useDispatch} from 'react-redux';
import DocumentPicker from 'react-native-document-picker';
import FormButton from '../Button/FormButton';
import FileInput from './FileInput';

const PictureInput = ({visible, onClose}) => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(visible);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  useEffect(() => {
    setModalVisible(visible);
  }, [visible]);

  const onSubmit = async () => {
    if (!file) {
      sendToast('error', 'Please select a file');
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('file', {
        uri: file.uri,
        type: file.type,
        name: file.name,
      });

      const {data: uploadData, status: uploadStatus} = await uploadFile(
        'picture',
        formData,
      );
      if (uploadStatus === 200) {
        const {data: profileData, status: profileStatus} = await fetchProfile();
        if (profileStatus === 200) {
          sendToast('success', 'Profile updated successfully');
          dispatch(setUser(profileData.data));
          onClose();
        } else {
          sendToast(
            'error',
            profileData?.error?.message || 'An error occurred',
          );
        }
      } else {
        sendToast('error', uploadData?.error?.message || 'An error occurred');
      }
    } catch (error) {
      console.error(error);
      sendToast('error', 'An error occurred while updating the profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onClose}>
      {loading && <Roller visible={loading} />}
      <SafeAreaProvider>
        <SafeAreaView style={styles.modal}>
          <View style={styles.container}>
            <Text style={styles.title}>Update Profile Picture</Text>
            <FileInput
              buttonTitle={'Select Picture'}
              onFileSelected={setFile}
              buttonStyle={styles.btn}
              type={[DocumentPicker.types.images]}
            />
            <FormButton
              title="Update"
              onPress={onSubmit}
              btnStyle={styles.btn}
            />
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </Modal>
  );
};

export default PictureInput;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  container: {
    backgroundColor: COLORS.white,
    width: SIZES.width * 0.9,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
  },
  title: {
    ...FONTS.h3,
    color: COLORS.black,
    textAlign: 'center',
    marginBottom: SIZES.h1,
  },
  btn: {
    marginTop: SIZES.h1,
  },
});
