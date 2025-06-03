import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {COLORS, FONTS, SIZES, ICONS, IMAGES} from '@/constants';
import {useNavigation} from '@react-navigation/native';
import {fetchCourses} from '@/api/school';
import HeaderA from '@/components/Header/HeaderA';

const SeeMore = () => {
  const navigation = useNavigation();
  const [courses, setCourses] = useState([]);

  const getCourses = async () => {
    const {data, status} = await fetchCourses();
    status === 200 && setCourses(data?.data);
  };

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <View style={styles.page}>
      <HeaderA title={'All Courses'} />
      <View
        style={{
          paddingHorizontal: SIZES.width * 0.04,
          paddingBottom: SIZES.h1 * 1.6,
        }}>
        <FlatList
          data={courses}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate('CourseDetail')}
                style={styles.container}>
                <Image
                  source={IMAGES.slide2}
                  style={{
                    height: SIZES.h1 * 1.9,
                    width: SIZES.h1 * 2.6,
                    borderRadius: SIZES.base * 0.5,
                  }}
                />
                <View style={{marginLeft: SIZES.base, flex: 1}}>
                  <Text
                    numberOfLines={1}
                    style={{
                      ...FONTS.body4,
                      color: COLORS.black,
                      fontFamily: 'Satoshi-Medium',
                    }}>
                    {item.name}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={{...FONTS.body5, color: COLORS.black}}>
                    {item.code}{' '}
                    <Text style={{fontFamily: 'Satoshi-Bold'}}>
                      (25 students)
                    </Text>
                  </Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: SIZES.base * 0.3,
                        marginBottom: SIZES.base,
                      }}>
                      <Image
                        source={ICONS.person3}
                        style={{
                          height: SIZES.h3,
                          width: SIZES.h3,
                          marginRight: SIZES.base * 0.7,
                        }}
                      />
                      <Text
                        numberOfLines={1}
                        style={{
                          fontSize: SIZES.h5,
                          fontFamily: 'Satoshi-Medium',
                          color: COLORS.black,
                        }}>
                        Study Earn Team
                      </Text>
                    </View>
                    <TouchableOpacity
                      activeOpacity={0.9}
                      style={{
                        height: SIZES.h1 * 0.9,
                        width: SIZES.h1 * 2.7,
                        backgroundColor: COLORS.primary,
                        borderRadius: SIZES.base * 0.9,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: SIZES.h5,
                          fontFamily: 'Satoshi-Medium',
                          color: COLORS.white,
                        }}>
                        Enroll now
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};

export default SeeMore;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: COLORS.grey2,
    paddingTop: SIZES.h5,
  },
  container: {
    height: SIZES.h1 * 3,
    borderRadius: SIZES.base,
    borderWidth: 1,
    marginBottom: SIZES.h3,
    borderColor: COLORS.chocolateBackground,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.width * 0.02,
  },
});
