import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {COLORS, FONTS, SIZES} from '@/constants';

const FacultyScreen = ({route}) => {
  const navigation = useNavigation();
  const faculty = route.params?.faculty || [];

  return (
    <View style={styles.page}>
      <Text style={{...FONTS.h2, color: COLORS.black, marginBottom: SIZES.h4}}>
        Faculties
      </Text>

      <View>
        <FlatList
          numColumns={2}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          data={faculty}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() =>
                navigation.navigate('FacultyScreenDetails', {faculty: item})
              }
              style={styles.esteemedCtn}>
              <Text
                style={{
                  fontSize: SIZES.h3,
                  fontFamily: 'Satoshi-Bold',
                  color: COLORS.white,
                }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default FacultyScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: COLORS.grey2,
    paddingHorizontal: SIZES.width * 0.04,
    paddingTop: SIZES.h4 * 0.8,
  },
  esteemedCtn: {
    height: SIZES.height * 0.2,
    width: SIZES.width * 0.445,
    borderRadius: SIZES.base,
    marginBottom: SIZES.h3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
  },
});
