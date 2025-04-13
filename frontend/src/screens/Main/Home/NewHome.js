import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS, ICONS, IMAGES, SIZES} from '@/constants';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchEvents} from '@/api/data';
import {fetchProfile} from '@/api/user';
import {setUser} from '@/redux/slices/authSlice';
import {sendToast} from '@/components/Template/utils';

const NewHome = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useSelector(state => state?.auth?.user);
  const [events, setEvents] = useState([]);

  const menuData = [
    {
      id: 1,
      title: 'Courses',
      iconName: ICONS.course,
      onPress: () => navigation.navigate('CourseScreen'),
    },
    {
      id: 2,
      title: 'Past Questions',
      iconName: ICONS.pq,
      onPress: () => navigation.navigate('PastQuestionScreen'),
    },
    {
      id: 3,
      title: 'Chat',
      iconName: ICONS.chat,
      onPress: () => navigation.navigate('ChatScreen'),
    },
    {
      id: 4,
      title: 'Opportunities',
      iconName: ICONS.assignment,
      onPress: () => navigation.navigate('OpportunityScreen'),
    },
  ];

  const fetchLatestEvents = async () => {
    const {data, status} = await fetchEvents('');

    if (status === 200) {
      setEvents(data?.data);
    }
  };

  const fetchUserProfile = async () => {
    //if (user) return;
    const {data, status} = await fetchProfile();

    if (status === 200) {
      dispatch(setUser(data?.data));
      if (data?.data?.isVerified === false) {
        sendToast(
          'info',
          'Please verify your email to enjoy full access to the app',
        );
        return navigation.replace('VerifyEmail', {email: data?.data?.email});
      }
    } else {
      sendToast('error', 'Please check your internet connection');
    }
  };

  const handleClick = () => {
    if (events.length > 0) {
      navigation.navigate('EventScreenDetails', {event: events[0]});
    }
  };

  useEffect(() => {
    fetchUserProfile();
    fetchLatestEvents();
  }, []);

  const RenderHeader = () => {
    return (
      <View style={{marginTop: SIZES.h3}}>
        {/* QUICK MENU */}
        <View style={{paddingHorizontal: SIZES.width * 0.04}}>
          <Text
            style={{
              ...FONTS.body3a,
              color: COLORS.black,
              fontFamily: 'Satoshi-Medium',
              marginBottom: SIZES.h3,
            }}>
            Quick Menu
          </Text>
          <FlatList
            data={menuData}
            numColumns={4}
            columnWrapperStyle={{justifyContent: 'space-between'}}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={item.onPress}
                  activeOpacity={0.7}
                  style={{alignItems: 'center'}}>
                  <View style={styles.menuCtn}>
                    <Image
                      source={item.iconName}
                      style={{height: SIZES.h1, width: SIZES.h1}}
                    />
                  </View>
                  <Text style={{...FONTS.body4b, color: COLORS.black}}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        {/* QUICK MENU */}
        {/* EVENTS */}
        <View
          style={{paddingHorizontal: SIZES.width * 0.04, paddingTop: SIZES.h2}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                ...FONTS.body3a,
                color: COLORS.black,
                fontFamily: 'Satoshi-Medium',
              }}>
              Events
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('EventScreen', {events})}>
              <Text style={{...FONTS.body4, color: COLORS.orange}}>
                See All
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => handleClick()}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flex: 1,
              marginTop: SIZES.h4,
            }}>
            <Image
              source={events[0]?.image ? {uri: events[0].image} : IMAGES.empty}
              style={{
                height: SIZES.h1 * 4,
                width: SIZES.h1 * 4,
                borderRadius: 10,
              }}
            />
            <View style={{marginLeft: SIZES.h3, flex: 1}}>
              <Text
                style={{
                  ...FONTS.body4,
                  color: COLORS.black,
                  fontFamily: 'Satoshi-Medium',
                }}>
                {events[0]?.name
                  ? events[0].name
                  : 'No Event Available at the moment'}
              </Text>
              <Text
                numberOfLines={3}
                style={{
                  ...FONTS.body4b,
                  color: COLORS.black,
                  marginBottom: SIZES.h3,
                  lineHeight: 20,
                }}>
                {events[0]?.description ? events[0].description : ''}
              </Text>
              <Text>Read More...</Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* DAILY POINTS */}
        <View
          style={{paddingHorizontal: SIZES.width * 0.04, marginTop: SIZES.h3}}>
          <Text
            style={{
              ...FONTS.body3a,
              color: COLORS.black,
              fontFamily: 'Satoshi-Medium',
              marginBottom: SIZES.h3,
            }}>
            Daily Point
          </Text>
          <Image
            source={IMAGES.daily}
            style={{
              height: SIZES.height * 0.23,
              width: SIZES.width * 0.92,
              borderRadius: SIZES.h5,
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.page}>
      <View
        style={{
          height: SIZES.height * 0.3,
          backgroundColor: COLORS.primary,
          paddingHorizontal: SIZES.width * 0.05,
          paddingTop: SIZES.h4,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ProfileScreen')}>
            <Image
              source={user?.picture ? {uri: user?.picture} : IMAGES.avatar1}
              style={{
                height: SIZES.h1 * 1.3,
                width: SIZES.h1 * 1.3,
                borderRadius: 100,
              }}
            />
          </TouchableOpacity>
          <View style={{flex: 1, marginLeft: SIZES.h4}}>
            <Text style={{...FONTS.body4, color: COLORS.white}}>Welcome</Text>
            <Text
              style={{
                ...FONTS.body4,
                color: COLORS.white,
              }}>{`${user?.firstName} ${user?.lastName}`}</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('NotificationScreen', {user})}>
            <Image
              source={ICONS.bell}
              style={{
                height: SIZES.h2,
                width: SIZES.h2,
                tintColor: COLORS.white,
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.black,
              marginBottom: SIZES.h3,
            }}>
            Faculty of {user?.faculty}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text
                style={{
                  ...FONTS.body3a,
                  color: COLORS.black,
                  fontFamily: 'Satoshi-Medium',
                }}>
                Department
              </Text>
              <Text style={{...FONTS.body4b, color: COLORS.black}}>
                {user?.department}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  ...FONTS.body3a,
                  color: COLORS.black,
                  fontFamily: 'Satoshi-Medium',
                }}>
                Level
              </Text>
              <Text style={{...FONTS.body4b, color: COLORS.black}}>
                {user?.level ? `${user?.level}L` : '_'}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  ...FONTS.body3a,
                  color: COLORS.black,
                  fontFamily: 'Satoshi-Medium',
                }}>
                Semester
              </Text>
              <Text style={{...FONTS.body4b, color: COLORS.black}}>
                {user?.semester
                  ? `${user?.semester}${user?.semester == 1 ? 'st' : 'nd'}`
                  : '_'}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <FlatList data={['']} ListHeaderComponent={RenderHeader} />
    </View>
  );
};

export default NewHome;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: COLORS.grey2,
  },
  container: {
    paddingHorizontal: SIZES.h3,
    paddingVertical: SIZES.h3,
    backgroundColor: COLORS.white,
    marginTop: SIZES.h3,
    borderRadius: SIZES.base,
  },
  menuCtn: {
    height: SIZES.h1 * 2.3,
    width: SIZES.h1 * 2.3,
    borderRadius: SIZES.base,
    backgroundColor: COLORS.gray,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.base,
  },
});
