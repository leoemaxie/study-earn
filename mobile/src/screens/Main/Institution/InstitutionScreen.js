import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {COLORS, FONTS, IMAGES, SIZES} from '@/constants';
import {useNavigation} from '@react-navigation/native';
import {fetchAnnouncements} from '@/api/data';
import {fetchFaculties, fetchAcademicCalendar} from '@/api/school';
import {format} from 'date-fns';
import Markdown from 'react-native-markdown-display';
import client from '@/api/client';

const InstitutionScreen = () => {
  const navigation = useNavigation();
  const [announcements, setAnnouncement] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [academicCalendar, setAcademicCalendar] = useState([]);

  const getAnnouncement = async () => {
    const {data, status} = await fetchAnnouncements('');
    status === 200 && setAnnouncement(data?.data);
  };

  const getFaculties = async () => {
    const {data, status} = await fetchFaculties();
    status === 200 && setFaculties(data?.data);
  };

  const getAcademicCalendar = async () => {
    const {data, status} = await fetchAcademicCalendar(
      'semester=1&session=2023&markdown=true',
    );
    if (status === 200) {
      const response = await client.get(data?.data.url);
      setAcademicCalendar(response.data);
    }
  };

  useEffect(() => {
    getAnnouncement();
    getFaculties();
    getAcademicCalendar();
  }, []);

  const RenderHeader = () => {
    return (
      <View>
        {/* PUBLIC NOTICE */}
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: SIZES.h4,
            }}>
            <Text
              style={{
                ...FONTS.body3,
                color: COLORS.black,
                fontFamily: 'Satoshi-Medium',
              }}>
              Public Notice
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('AnnouncementScreen', {announcements})
              }>
              <Text style={{...FONTS.body4, color: COLORS.orange}}>
                See All
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <FlatList
            numColumns={2}
            columnWrapperStyle={{justifyContent: 'space-between'}}
            data={announcements.slice(0, 2)}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>
                  navigation.navigate('AnnouncementScreenDetails', {
                    announcement: item,
                  })
                }
                style={styles.container}>
                <Image
                  source={item.image ? {uri: item.image} : IMAGES.empty}
                  style={{
                    height: SIZES.height * 0.1,
                    width: SIZES.width * 0.2,
                  }}
                />
                <View
                  style={{
                    maxWidth: SIZES.width * 0.2,
                    marginLeft: SIZES.width * 0.03,
                    flexDirection: 'column',
                  }}>
                  <Text
                    numberOfLines={3}
                    style={{
                      ...FONTS.body3,
                      color: COLORS.black,
                      fontFamily: 'Satoshi-Medium',
                    }}>
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      ...FONTS.body5,
                      color: COLORS.black,
                      fontFamily: 'Satoshi-Regular',
                      marginTop: SIZES.h5,
                      lineHeight: SIZES.h5,
                    }}>
                    {item.by}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
        {/* ACADEMIC CALENDER */}
        <View style={{marginTop: SIZES.h3}}>
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.black,
              fontFamily: 'Satoshi-Medium',
            }}>
            Check Out School Calender
          </Text>

          <SafeAreaView>
            <ScrollView style={styles.calendarCtn}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>
                  navigation.navigate('CalendarScreenDetails', {
                    calendar: academicCalendar,
                  })
                }>
                <Text style={{...FONTS.body4, color: COLORS.black}}>
                  {`Today ${format(new Date(), 'dd MMMM, yyyy')}`}
                </Text>
                <Markdown style={{...FONTS.body5, color: COLORS.black}}>
                  {academicCalendar}
                </Markdown>
              </TouchableOpacity>
            </ScrollView>
          </SafeAreaView>
        </View>
        {/* ESTEEM LECTURERS  */}
        <View style={{marginTop: SIZES.h3}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: SIZES.h4,
              marginTop: SIZES.h4,
            }}>
            <Text
              style={{
                ...FONTS.body3,
                color: COLORS.black,
                fontFamily: 'Satoshi-Medium',
              }}>
              Faculties
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('FacultyScreen', {faculty: faculties})
              }>
              <Text style={{...FONTS.body4, color: COLORS.orange}}>
                See All
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <FlatList
              numColumns={2}
              columnWrapperStyle={{justifyContent: 'space-between'}}
              data={faculties.slice(0, 4)}
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
      </View>
    );
  };

  return (
    <View style={styles.page}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: SIZES.h1,
        }}>
        <Text style={{...FONTS.h2, color: COLORS.black}}>Institution</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Security')}
          style={styles.sendBtn}>
          <Text style={{...FONTS.h4, color: COLORS.white}}>Send Alert</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={['']}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={RenderHeader}
      />
    </View>
  );
};

export default InstitutionScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: COLORS.grey2,
    paddingTop: SIZES.h5,
    paddingHorizontal: SIZES.width * 0.04,
  },
  container: {
    height: SIZES.height * 0.2,
    maxWidth: SIZES.width * 0.445,
    elevation: 3,
    marginHorizontal: 1,
    backgroundColor: COLORS.white,
    marginBottom: SIZES.h2,
    borderRadius: SIZES.base,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.width * 0.03,
    flex: 1,
  },
  calendarCtn: {
    height: SIZES.height * 0.2,
    borderWidth: 2,
    borderColor: COLORS.chocolateBackground,
    backgroundColor: COLORS.white,
    marginTop: SIZES.base * 1.3,
    borderRadius: SIZES.base,
    paddingHorizontal: SIZES.h4,
    paddingVertical: SIZES.h4,
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
  sendBtn: {
    height: SIZES.h1 * 1.2,
    width: SIZES.width * 0.2,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.base,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
