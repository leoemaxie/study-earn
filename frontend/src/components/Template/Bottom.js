import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {SIZES, ICONS, FONTS, COLORS} from '@/constants';
import RBSheet from 'react-native-raw-bottom-sheet';
import FormButton from '@/components/Button/FormButton';

const Bottom = ({bottomSheetRef, title, onPress}) => {
  const closeBottomSheet = () => {
    bottomSheetRef.current.close();
  };
  return (
    <RBSheet
      ref={bottomSheetRef}
      height={SIZES.height * 0.5} // Set the height of the bottom sheet
      closeOnDragDown={true}
      customStyles={{
        wrapper: {
          backgroundColor: 'rgba(0,0,0,0.5)',
        },
        container: {
          borderTopLeftRadius: SIZES.h5,
          borderTopRightRadius: SIZES.h5,
          paddingHorizontal: SIZES.width * 0.05,
        },
      }}>
      <TouchableOpacity onPress={() => closeBottomSheet()}>
        <Image
          source={ICONS.close2}
          style={{height: SIZES.h3, width: SIZES.h3, alignSelf: 'flex-end'}}
        />
      </TouchableOpacity>
      <Image
        source={ICONS.checkbig}
        style={{
          height: SIZES.h1 * 3.5,
          width: SIZES.h1 * 3.5,
          alignSelf: 'center',
        }}
      />
      <Text
        style={{
          ...FONTS.h1a,
          color: COLORS.black,
          textAlign: 'center',
          marginTop: SIZES.base,
        }}>
        N23,000
      </Text>
      <Text
        style={{
          ...FONTS.body4,
          color: COLORS.black,
          textAlign: 'center',
          marginTop: SIZES.h2,
        }}>
        Has been successfully transfer to Micheal Johnson UBA-092 729 197
      </Text>
      <FormButton
        title={title}
        btnStyle={{marginTop: SIZES.h1}}
        onPress={onPress}
      />
    </RBSheet>
  );
};

export default Bottom;

const styles = StyleSheet.create({});
