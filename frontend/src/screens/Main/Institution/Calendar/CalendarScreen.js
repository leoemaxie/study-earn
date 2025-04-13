import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {COLORS, FONTS, IMAGES, SIZES} from '@/constants';
import {fetchCalendars} from '@/api/data';
import {Roller, sendToast} from '@/components/Template/utils';

const CalendarScreen = ({route}) => {
  const navigation = useNavigation();
  const [load, setLoad] = useState(false);
  const [calendars, setCalendars] = useState(route.params?.calendars || []);
  const [refreshing, setRefreshing] = useState(false);

  const getCalendars = async () => {
    setLoad(true);
    const {data, status} = await fetchCalendars('limit=40');
    setLoad(false);

    if (status === 200) {
      setCalendars(data?.data);
    } else {
      sendToast('error', 'Network error');
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await getCalendars();
    setRefreshing(false);
  };

  return (
    <View style={styles.page}>
      {load && <Roller visible={load} />}
      <Text style={{...FONTS.h2, color: COLORS.black, marginBottom: SIZES.h4}}>
        Calendars
      </Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        data={calendars}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() =>
                navigation.navigate('CalendarScreenDetails', {
                  calendar: item,
                })
              }
              style={styles.container}>
              <Image
                source={
                  Object.hasOwn(item, 'image')
                    ? {uri: item.image}
                    : IMAGES.empty
                }
                style={{
                  height: SIZES.h1 * 3,
                  width: SIZES.h1 * 3,
                }}
              />
              <View style={{marginLeft: SIZES.h5, flex: 1}}>
                <Text
                  style={{
                    marginBottom: SIZES.base,
                    ...FONTS.body5,
                    color: COLORS.orange,
                    textAlign: 'right',
                    fontFamily: 'Satoshi-Medium',
                  }}>
                  {item?.tags[1]}
                </Text>
                <Text
                  numberOfLines={2}
                  style={{...FONTS.h4, color: COLORS.black}}>
                  {item?.title}
                </Text>
                <Text
                  numberOfLines={3}
                  style={{
                    marginTop: SIZES.base,
                    ...FONTS.body4,
                    color: COLORS.black,
                  }}>
                  {item?.content}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
        refreshControl={
          <RefreshControl
            colors={[COLORS.primary, COLORS.secondary]}
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        }
      />
    </View>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: COLORS.grey2,
    paddingHorizontal: SIZES.width * 0.05,
    paddingTop: SIZES.h4,
  },
  container: {
    height: SIZES.height * 0.22,
    elevation: 3,
    marginHorizontal: 1,
    backgroundColor: COLORS.white,
    marginBottom: SIZES.h5,
    borderRadius: SIZES.base,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.width * 0.03,
    flex: 1,
  },
});
