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
import {fetchEvents} from '@/api/data';
import {Roller, sendToast} from '@/components/Template/utils';

const EventScreen = ({route}) => {
  const navigation = useNavigation();
  const [load, setLoad] = useState(false);
  const [events, setEvents] = useState(route.params?.events || []);
  const [refreshing, setRefreshing] = useState(false);

  const getEvents = async () => {
    setLoad(true);
    const {data, status} = await fetchEvents('limit=40');
    setLoad(false);

    if (status === 200) {
      setEvents(data?.data);
    } else {
      sendToast('error', 'Network error');
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await getEvents();
    setRefreshing(false);
  };

  return (
    <View style={styles.page}>
      {load && <Roller visible={load} />}
      <Text style={{...FONTS.h2, color: COLORS.black, marginBottom: SIZES.h4}}>
        Events
      </Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        data={events}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() =>
                navigation.navigate('EventScreenDetails', {event: item})
              }
              style={styles.container}>
              <Image
                source={item.image ? {uri: item.image} : IMAGES.pic1}
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
                  {item?.category[0]}
                </Text>
                <Text
                  numberOfLines={2}
                  style={{...FONTS.h4, color: COLORS.black}}>
                  {item?.name}
                </Text>
                <Text
                  numberOfLines={3}
                  style={{
                    marginTop: SIZES.base,
                    ...FONTS.body4,
                    color: COLORS.black,
                  }}>
                  {item?.description}
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

export default EventScreen;

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
