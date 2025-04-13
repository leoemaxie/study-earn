import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {COLORS, FONTS, IMAGES, SIZES} from '@/constants';
import HeaderA from '@/components/Header/HeaderA';

const ProductScreen = () => {
  const navigation = useNavigation();
  const data = [
    {
      id: 1,
      title: 'Brown Beans',
      image: IMAGES.bean,
      description: 'Fresh products from the farm. Amazing offers for you.',
    },
    {
      id: 2,
      title: 'Red Tomato',
      image: IMAGES.tomato,
      description: 'Fresh products from the farm. Amazing offers for you.',
    },
  ];

  return (
    <View style={styles.page}>
      <HeaderA title={'Farm Products'} />
      <View style={{marginHorizontal: SIZES.width * 0.04}}>
        <FlatList
          data={data}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                style={styles.container}
                onPress={() =>
                  navigation.navigate('ProductScreenDetails', {
                    image: item.image,
                  })
                }>
                <Image
                  source={item.image}
                  style={{height: SIZES.h1 * 3.9, width: SIZES.h1 * 3}}
                />
                <View style={{marginLeft: SIZES.h5, flex: 1}}>
                  <Text style={{...FONTS.h4, color: COLORS.black}}>
                    {item.title}
                  </Text>
                  <Text
                    numberOfLines={3}
                    style={{
                      marginTop: SIZES.base,
                      ...FONTS.body4,
                      color: COLORS.black,
                    }}>
                    {item.description}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: COLORS.grey2,
  },
  container: {
    height: SIZES.height * 0.15,
    elevation: 3,
    marginHorizontal: 1,
    backgroundColor: COLORS.white,
    marginBottom: SIZES.h2,
    borderRadius: SIZES.base,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
});
