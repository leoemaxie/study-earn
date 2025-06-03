import {
  Image,
  StyleSheet,
  Text,
  View,
  Linking,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {COLORS, SIZES, FONTS, IMAGES} from '@/constants';
import HeaderA from '@/components/Header/HeaderA';

const BusinessScreenDetails = ({route}) => {
  const {business} = route?.params || {};
  const handleLink = url => {
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  };

  return (
    <View style={styles.page}>
      <HeaderA title={'Business Details'} />
      <View style={{paddingHorizontal: SIZES.width * 0.04}}>
        <Image
          source={
            Object.hasOwn(business, 'image')
              ? {uri: business.image}
              : IMAGES.bean
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
            {business?.name}
          </Text>
          <Text style={{...FONTS.body4, color: COLORS.black}}>
            {business?.description}
          </Text>
          <Text style={{marginTop: SIZES.h2 * 2}}>More Info: </Text>
          <View
            style={{
              flexDirection: 'column',
              marginTop: SIZES.h3,
              height: SIZES.height * 0.2,
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              onPress={() => handleLink(`tel:${business?.contactNumber}`)}>
              <Text style={styles.text}>
                {`Contact Number:${' '.repeat(6)}${business?.contactNumber}`}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleLink(`mailto:${business?.email}`)}>
              <Text style={styles.text}>
                {`Email Address:${' '.repeat(9)}${business?.email}`}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleLink(business?.website)}>
              <Text style={styles.text}>
                {`Website:${' '.repeat(19)}${business?.website}`}
              </Text>
            </TouchableOpacity>
            <Text style={styles.text}>
              {`Operating Hours:${' '.repeat(5)}${business?.openingHours}`}
            </Text>
            <Text style={styles.text}>
              {`Location:${' '.repeat(18)}${business?.location}`}
            </Text>
            <Text style={styles.text}>
              {`Category:${' '.repeat(16)}${business?.category}`}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default BusinessScreenDetails;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  text: {
    color: COLORS.black,
    ...FONTS.body3c,
    fontFamily: 'Satoshi-Regular',
  },
});
