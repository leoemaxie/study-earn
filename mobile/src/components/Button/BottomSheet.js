import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useRef} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {COLORS, FONTS, ICONS, SIZES} from '@/constants';

const BottomSheet = ({
  bottomSheetRef,
  onPress1,
  onPress2,
  title,
  text1,
  text2,
}) => {
  // Create a ref for the bottom sheet
  // const bottomSheetRef = useRef();
  // // Function to open the bottom sheet
  const closeBottomSheet = () => {
    bottomSheetRef.current.close();
  };

  return (
    <RBSheet
      ref={bottomSheetRef}
      height={SIZES.height * 0.32} // Set the height of the bottom sheet
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
      {/* Content inside the bottom sheet */}
      <View style={{flex: 1, backgroundColor: COLORS.white}}>
        <TouchableOpacity onPress={() => closeBottomSheet()}>
          <Image
            source={ICONS.close2}
            style={{
              height: SIZES.h4 * 1.1,
              width: SIZES.h4 * 1.1,
              alignSelf: 'flex-end',
            }}
          />
        </TouchableOpacity>
        <Text style={{...FONTS.h3, color: COLORS.dark}}>{title}</Text>
        {/* FIRST CTN */}
        <TouchableOpacity onPress={onPress1} style={styles.box}>
          <Image
            source={ICONS.send}
            style={{height: SIZES.h2 * 1.1, width: SIZES.h2 * 1.1}}
          />
          <Text
            style={{
              marginLeft: SIZES.base,
              ...FONTS.body3a,
              color: COLORS.dark,
              flex: 1,
            }}>
            {text1}
          </Text>
          <Image
            source={ICONS.arrowright}
            style={{height: SIZES.h4, width: SIZES.h4, tintColor: '#4E535E'}}
          />
        </TouchableOpacity>
        {/* SECOND THIN */}
        <TouchableOpacity onPress={onPress2} style={styles.box}>
          <Image
            source={ICONS.send}
            style={{height: SIZES.h2 * 1.1, width: SIZES.h2 * 1.1}}
          />
          <Text
            style={{
              marginLeft: SIZES.base,
              ...FONTS.body3a,
              color: COLORS.dark,
              flex: 1,
            }}>
            {text2}
          </Text>
          <Image
            source={ICONS.arrowright}
            style={{height: SIZES.h4, width: SIZES.h4, tintColor: '#4E535E'}}
          />
        </TouchableOpacity>
      </View>
    </RBSheet>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  box: {
    height: SIZES.h1 * 1.9,
    // borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: SIZES.base,
    marginTop: SIZES.h5 * 1.1,
    paddingHorizontal: SIZES.width * 0.03,
    backgroundColor: COLORS.offwhite,
    borderWidth: 0.3,
    borderColor: COLORS.chocolateBackground,
  },
});
