import React, {useState, useEffect} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
} from 'react-native';
import {COLORS, FONTS, SIZES} from '@/constants';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {fetchCourses} from '@/api/user';
import {Roller, sendToast} from '@/components/Template/utils';
import HeaderA from '@/components/Header/HeaderA';

const CourseScreen = () => {
  const navigation = useNavigation();
  const user = useSelector(state => state?.auth?.user);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const getCourses = async () => {
    const {data, status} = await fetchCourses(
      `level=${user?.level}&semester=${user?.semester}`,
    );
    if (status === 200) {
      setCourses(data?.data);
    } else {
      console.log(data);
      sendToast('error', data ? data.error.message : 'Network error');
    }
    setLoading(false);
  };

  useEffect(() => {
    getCourses();
  }, []);

  const calculateUnits = () => {
    let totalUnits = 0;
    courses.map(course => {
      totalUnits += course.unit;
    });
    return totalUnits;
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await getCourses();
    sendToast('success', 'Courses refreshed');
    setRefreshing(false);
  };

  return (
    <View style={styles.page}>
      <HeaderA title={'Course'} />
      <View
        style={{paddingHorizontal: SIZES.width * 0.05, paddingTop: SIZES.h1}}>
        {/* TOP BORDER */}
        <View
          style={{
            height: SIZES.h1 * 2.7,
            borderWidth: 0.7,
            borderColor: COLORS.chocolateBackground,
            borderRadius: SIZES.base,
            backgroundColor: COLORS.gray,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{...FONTS.h3, color: COLORS.black}}>
            {user?.level} L - {user?.semester} Semester
          </Text>
          <Text style={{...FONTS.body4, color: COLORS.black}}>
            {courses.length} Courses {calculateUnits()} units
          </Text>
        </View>
        {/* LIST COMPONENTS */}
        <View style={{marginTop: SIZES.h1 * 1.4}}>
          <Roller visible={loading} />
          <FlatList
            data={courses}
            refreshControl={
              <RefreshControl
                colors={[COLORS.primary, COLORS.secondary]}
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.container}
                  onPress={() => navigation.navigate('CourseDescription')}>
                  <View>
                    <Text style={{...FONTS.h4, color: COLORS.black}}>
                      {item.code}
                    </Text>
                    <Text style={{...FONTS.body4, color: COLORS.black}}>
                      {item.name}
                    </Text>
                  </View>
                  <Text style={{...FONTS.body4, color: COLORS.black}}>
                    {item.unit} units
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

export default CourseScreen;

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
