import React, {useState} from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';
import {sendToast} from '../Template/utils';
import {FONTS, SIZES, COLORS} from '@/constants';
import PropTypes from 'prop-types';
import DocumentPicker from 'react-native-document-picker';

const FileInput = ({onFileSelected, type, buttonTitle, buttonStyle}) => {
  const [fileName, setFileName] = useState(null);

  const handleFilePick = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: type ?? [DocumentPicker.types.allFiles],
      });
      const selectedFile = res[0];
      setFileName(selectedFile.name);

      if (selectedFile.size > 5 * 1024 ** 2) {
        sendToast('error', 'File size too large');
        return;
      }

      if (onFileSelected) {
        onFileSelected(selectedFile);
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        sendToast('info', 'File selection cancelled');
      } else {
        sendToast('error', 'An error occurred while selecting the file');
      }
    }
  };

  return (
    <View style={styles.container}>
      {fileName && <Text style={styles.fileName}>{fileName}</Text>}
      <Button
        title={buttonTitle}
        onPress={handleFilePick}
        color={COLORS.primary}
        style={buttonStyle}
      />
    </View>
  );
};

FileInput.propTypes = {
  onFileSelected: PropTypes.func,
  type: PropTypes.array,
  buttonTitle: PropTypes.string,
  buttonStyle: PropTypes.object,
};

FileInput.defaultProps = {
  buttonTitle: 'Select File',
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: SIZES.h1 * 2,
  },
  fileName: {
    ...FONTS.body3,
    marginBottom: SIZES.base * 1.5,
    textAlign: 'center',
    color: COLORS.black,
  },
});

export default FileInput;
