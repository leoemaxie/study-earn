import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, FONTS, ICONS, SIZES} from '../../constants';

const FormInput = ({
  title,
  placeholder,
  keyboardType,
  eyeoff,
  value,
  setValue,
}) => {
  const [hide, setHide] = useState(false);
  return (
    <View>
      <Text
        style={{
          ...FONTS.body4,
          color: COLORS.black,
          fontFamily: 'Satoshi-Medium',
        }}>
        {title}
      </Text>
      <View style={styles.container}>
        <TextInput
          placeholder={placeholder}
          style={{
            fontSize: SIZES.h4 * 1.1,
            fontFamily: 'Satoshi-Regular',
            color: '#040B1B',
            flex: 1,
          }}
          keyboardType={keyboardType}
          value={value}
          onChangeText={setValue}
        />
        {eyeoff && (
          <TouchableOpacity onPress={() => setHide(!hide)}>
            <Image
              source={hide ? ICONS.padlock : ICONS.padlock}
              style={{height: SIZES.h2, width: SIZES.h2}}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  container: {
    height: SIZES.h1 * 1.9,
    borderWidth: 0.8,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.base * 0.8,
    marginTop: SIZES.base * 1.2,
    paddingLeft: SIZES.h3,
    paddingRight: SIZES.base * 1.1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SIZES.h5,
    borderColor: COLORS.chocolateBackground,
  },
});
