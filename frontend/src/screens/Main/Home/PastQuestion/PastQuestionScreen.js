import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {COLORS, FONTS, SIZES} from '@/constants';
import {fetchCourses} from '@/api/user';
import HeaderA from '@/components/Header/HeaderA';

const PastQuestionScreen = () => {
  const [pqData, setPqData] = useState([]);

  const fetchPqData = async () => {
    const {data, status} = await fetchCourses();
    status === 200 && setPqData(data?.data);
  };

  useEffect(() => {
    fetchPqData();
  }, []);

  const RenderHeader = () => {
    return (
      <View
        style={{
          marginBottom: SIZES.h3,
          height: SIZES.h1 * 2.7,
          borderWidth: 0.7,
          borderColor: COLORS.chocolateBackground,
          borderRadius: SIZES.base,
          backgroundColor: COLORS.gray,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{...FONTS.h3, color: COLORS.black}}>
          400 L - 1st Semester
        </Text>
        <Text style={{...FONTS.body4, color: COLORS.black}}>
          8 Past Questions 24 units
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.page}>
      <HeaderA title={'Past Questions'} />
      <View
        style={{
          paddingHorizontal: SIZES.width * 0.05,
          marginTop: SIZES.h4,
          marginBottom: SIZES.h1 * 2,
        }}>
        <FlatList
          data={pqData}
          ListHeaderComponent={RenderHeader}
          renderItem={({item}) => {
            return (
              <TouchableOpacity activeOpacity={0.7} style={styles.container}>
                <View>
                  <Text style={{...FONTS.h4, color: COLORS.black}}>
                    {item?.code}
                  </Text>
                  <Text style={{...FONTS.body4, color: COLORS.black}}>
                    {item?.name}
                  </Text>
                </View>
                <Text style={{...FONTS.body4, color: COLORS.black}}>
                  {item?.units} units
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};

export default PastQuestionScreen;

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
    height: SIZES.h1 * 2.5,
    borderRadius: SIZES.base,
    paddingHorizontal: SIZES.h4,
    marginHorizontal: 2,
    marginVertical: 2,
  },
});
