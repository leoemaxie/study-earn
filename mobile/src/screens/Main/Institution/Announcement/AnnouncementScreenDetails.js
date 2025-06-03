import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, SIZES, FONTS, IMAGES} from '@/constants';
import {format, parseISO} from 'date-fns';
import HeaderA from '@/components/Header/HeaderA';

const AnnouncementScreenDetails = ({route}) => {
  const {announcement} = route?.params || {};
  const color =
    {
      High: COLORS.red,
      Medium: COLORS.orange,
      Low: COLORS.green,
    }[announcement?.priority] || COLORS.black;
  return (
    <View style={styles.page}>
      <HeaderA title={'Announcement Details'} />
      <View style={{paddingHorizontal: SIZES.width * 0.04}}>
        <Image
          source={
            Object.hasOwn(announcement, 'image')
              ? {uri: announcement.image}
              : IMAGES.announcement
          }
          style={{
            height: SIZES.height * 0.22,
            width: SIZES.width * 0.92,
            borderRadius: SIZES.h5,
          }}
        />

        {/* DETAILS */}
        <View style={{marginTop: SIZES.h2}}>
          <Text
            style={{...FONTS.h3, color: COLORS.black, marginBottom: SIZES.h4}}>
            {announcement?.title}
          </Text>
          <Text style={{...FONTS.body4, color: COLORS.black}}>
            {announcement?.content}
          </Text>
          <View
            style={{
              ...FONTS.body5,
              color: COLORS.black,
              flexDirection: 'column',
              marginTop: SIZES.h3 * 2,
              height: SIZES.h1 * 3.2,
              justifyContent: 'space-between',
            }}>
            <Text>By: {announcement?.by}</Text>
            <Text>Category: {announcement?.tags[1]}</Text>
            <Text style={{color}}>Priority: {announcement?.priority}</Text>
            <Text>
              Date: {format(parseISO(announcement?.date), 'dd/MM/yyyy')}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AnnouncementScreenDetails;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
