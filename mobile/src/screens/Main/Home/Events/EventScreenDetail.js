import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, SIZES, FONTS} from '@/constants';
import {format, parseISO} from 'date-fns';
import HeaderA from '@/components/Header/HeaderA';

const EventScreenDetails = ({route}) => {
  const {event} = route?.params || {};
  
  return (
    <View style={styles.page}>
      <HeaderA title={'Event Details'} />
      <View style={{paddingHorizontal: SIZES.width * 0.04}}>
        {event?.image && (
          <Image
            source={{uri: event.image}}
            style={{
              height: SIZES.height * 0.22,
              width: SIZES.width * 0.92,
              borderRadius: SIZES.h5,
            }}
          />
        )}

        {/* DETAILS */}
        <View style={{marginTop: SIZES.h2}}>
          <Text
            style={{...FONTS.h3, color: COLORS.black, marginBottom: SIZES.h4}}>
            {event?.name}
          </Text>
          <Text style={{...FONTS.body4, color: COLORS.black}}>
            {event?.description}
          </Text>
          <View
            style={{
              ...FONTS.body5,
              color: COLORS.black,
              flexDirection: 'column',
              marginTop: SIZES.h3 * 2,
              height: SIZES.h1 * 2.7,
              justifyContent: 'space-between',
            }}>
            <Text>Category: {event?.category}</Text>
            <Text>Location: {event?.location}</Text>
            <Text>Date: {format(parseISO(event?.date), 'dd/MM/yyyy')}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default EventScreenDetails;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
