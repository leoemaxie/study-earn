import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS, FONTS, SIZES} from '@/constants';
import {useNavigation} from '@react-navigation/native';
import HeaderA from '@/components/Header/HeaderA';

const CourseDescription = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.page}>
      <HeaderA title={'Course'} />
      <View
        style={{paddingHorizontal: SIZES.width * 0.05, paddingTop: SIZES.h1}}>
        {/* TOP BORDER */}
        <View
          style={{
            height: SIZES.h1 * 4.7,
            borderWidth: 0.7,
            paddingHorizontal: SIZES.h1 * 2,
            borderColor: COLORS.chocolateBackground,
            borderRadius: SIZES.base,
            backgroundColor: COLORS.gray,
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}>
          <Text style={{...FONTS.body2a}}>CSC 401</Text>
          <Text style={{...FONTS.h3}}>Operating System</Text>
          <Text style={{...FONTS.body4}}>8 Chapters 3 units</Text>
          <Text style={{...FONTS.body4}}>200 pages</Text>
        </View>
        {/* LIST COMPONENTS */}
        <View style={{marginTop: SIZES.h1 * 1.2}}>
          <FlatList
            data={['', '', '', '', '', '']}
            renderItem={({item}) => {
              return (
                <TouchableOpacity activeOpacity={0.7} style={styles.container}>
                  <View>
                    <Text style={{...FONTS.h4, color: COLORS.black}}>
                      Chapter 1
                    </Text>
                    <Text style={{...FONTS.body4, color: COLORS.black}}>
                      Operating System
                    </Text>
                  </View>
                  <Text style={{...FONTS.body4, color: COLORS.black}}>
                    20 pages
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default CourseDescription;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: COLORS.grey2,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SIZES.h3,
    borderWidth: 1,
    borderColor: COLORS.chocolateBackground,
    backgroundColor: COLORS.white,
    height: SIZES.h1 * 2.4,
    borderRadius: SIZES.base,
    paddingHorizontal: SIZES.h4,
    marginHorizontal: 2,
    marginBottom: SIZES.h3,
  },
});
