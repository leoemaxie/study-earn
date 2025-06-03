import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS, FONTS, IMAGES, SIZES} from '@/constants';

const ExternalProviders = () => {
  const data = [
    {
      id: 1,
      name: 'Coursera',
      image: IMAGES.coursera,
    },
    {
      id: 2,
      name: 'Udemy',
      image: IMAGES.udemy,
    },
    {
      id: 3,
      name: 'edX',
      image: IMAGES.edx,
    },
    {
      id: 4,
      name: 'Linkedin Learning',
      image: IMAGES.linkedin,
    },
    {
      id: 5,
      name: 'Ulesson',
      image: IMAGES.ulesson,
    },
    {
      id: 6,
      name: 'Udacity',
      image: IMAGES.udacity,
    },
  ];

  return (
    <View style={styles.page}>
      <Text style={styles.title}>External Providers</Text>
      <Text style={styles.text}>
        You can connect your profile to the following external learning
        platforms and earn points. Please note that this feature is still in
        development.
      </Text>

      <View>
        <FlatList
          numColumns={2}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          showsVerticalScrollIndicator={true}
          data={data}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity activeOpacity={0.7} style={styles.container}>
              <Image source={item.image} style={styles.image} />
              <Text style={styles.name}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default ExternalProviders;

const styles = StyleSheet.create({
  page: {
    backgroundColor: COLORS.grey2,
    paddingHorizontal: SIZES.width * 0.05,
    paddingTop: SIZES.width * 0.01,
  },
  name: {
    fontSize: SIZES.h3,
    fontFamily: 'Satoshi-Bold',
    color: COLORS.black,
  },
  text: {
    ...FONTS.body3c,
    color: COLORS.black,
    marginTop: SIZES.h4,
    marginBottom: SIZES.h2,
  },
  image: {
    height: SIZES.height * 0.15,
    width: SIZES.width * 0.35,
    resizeMode: 'contain',
  },
  container: {
    height: SIZES.height * 0.2,
    elevation: 3,
    marginHorizontal: 2,
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.h5,
    paddingBottom: SIZES.h3,
    marginBottom: SIZES.h2,
    borderRadius: SIZES.base,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {...FONTS.h2, color: COLORS.black, marginTop: SIZES.h4},
});
