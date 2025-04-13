import {StyleSheet, Text, View, ScrollView, SafeAreaView} from 'react-native';
import React from 'react';
import {COLORS, FONTS, SIZES} from '@/constants';
import Markdown from 'react-native-markdown-display';
import HeaderA from '@/components/Header/HeaderA';

const CalendarScreenDetails = ({route}) => {
  const {calendar} = route?.params || {};

  return (
    <View style={styles.page}>
      <HeaderA title={'Calendar'} />
      <SafeAreaView>
        <ScrollView style={styles.calendarCtn}>
          <Markdown style={{...FONTS.body5, color: COLORS.black}}>
            {calendar}
          </Markdown>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default CalendarScreenDetails;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.width * 0.04,
  },
});
