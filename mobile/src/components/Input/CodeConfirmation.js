import React from 'react';
import {SafeAreaView, Text, StyleSheet, View} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {COLORS, SIZES} from '@/constants';

const styles = StyleSheet.create({
  codeFieldRoot: {marginTop: SIZES.h1 * 1.2},
  cell: {
    width: SIZES.h1 * 1.6,
    height: SIZES.h1 * 1.6,
    fontSize: SIZES.h1 * 1.2,
    borderWidth: 1,
    borderColor: COLORS.dark,
    textAlign: 'center',
    color: 'black',
    borderRadius: SIZES.base,
  },
  root: {
    paddingHorizontal: SIZES.width * 0.05,
    marginBottom: SIZES.h2,
  },
  focusCell: {
    borderColor: 'gray',
  },
});

const CELL_COUNT = 6;

const ConfirmationCodeField = ({value, setValue}) => {
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <SafeAreaView style={styles.root}>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="phone-pad"
        autoComplete={Platform.select({
          android: 'sms-otp',
          default: 'one-time-code',
        })}
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <View key={index} onLayout={getCellOnLayoutHandler(index)}>
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default ConfirmationCodeField;
