import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {COLORS, FONTS, ICONS, SIZES} from '@/constants';
import {
  addDays,
  format,
  isAfter,
  isBefore,
  isSameDay,
  parseISO,
} from 'date-fns';
import {deleteActivity, fetchActivity} from '@/api/user';
import {Roller, sendToast} from '@/components/Template/utils';
import HeaderA from '@/components/Header/HeaderA';

const NotificationScreen = () => {
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const getUserActivity = async () => {
    const {data, status} = await fetchActivity('limit=40');
    setLoading(false);
    if (status === 200) {
      sendToast('success', 'Activity fetched successfully');
      setActivity(data?.data);
    } else {
      sendToast('error', data ? data.error.message : 'Network error');
    }
  };

  const deleteUserActivity = async id => {
    setDisabled(true);
    if (!id && activity.length === 0) {
      return sendToast('error', 'No activity to delete');
    }
    const {data, status} = await deleteActivity(id ? `id=${id}` : '');

    if (status === 204) {
      if (id) {
        setActivity(activity.filter(item => item.id !== id));
      } else {
        setActivity([]);
      }
      sendToast('success', 'Activity deleted');
    } else if (status === 404) {
      sendToast('error', 'Activity has been deleted');
    } else {
      sendToast('error', data ? data.error.message : 'Network error');
    }
    setDisabled(false);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await getUserActivity();
    sendToast('success', 'Activity refreshed');
    setRefreshing(false);
  };

  useEffect(() => {
    getUserActivity();
  }, []);

  const renderActivity = useCallback(
    ({item}) => (
      <TouchableOpacity activeOpacity={0.9} style={styles.container}>
        <View style={styles.flex}>
          <Text style={{...FONTS.h2, color: COLORS.black}}>
            {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
          </Text>
          <Text
            style={{
              ...FONTS.body4,
              color:
                item.metadata.status === 'success' ? COLORS.green2 : COLORS.red,
            }}>
            {item.metadata.status}
          </Text>
        </View>

        <View
          style={{
            ...styles.flex,
            marginTop: SIZES.h4,
            marginBottom: SIZES.h4,
          }}>
          <Text
            style={{
              ...FONTS.body4,
              color: COLORS.black,
            }}>
            {item.description}
          </Text>
          <TouchableOpacity
            onPress={() => deleteUserActivity(item.id)}
            disabled={disabled}>
            <Image
              source={ICONS.delete2}
              style={{
                height: SIZES.h3 * 1.5,
                width: SIZES.h3 * 1.5,
              }}
            />
          </TouchableOpacity>
        </View>
        <Text style={{...FONTS.body4, color: COLORS.black}}>
          {format(parseISO(item.createdAt), 'MMM do, yyyy h:mm a')}
        </Text>
      </TouchableOpacity>
    ),
    [activity, disabled],
  );

  const keyExtractor = useCallback(item => item.id, []);

  const RenderItem = ({title, data}) => {
    return (
      <View style={{marginBottom: SIZES.h3}}>
        <Roller visible={loading} />
        {/* Activity Header */}
        <View style={styles.flex}>
          <Text
            style={{...FONTS.h2, color: COLORS.black, marginBottom: SIZES.h5}}>
            {title}
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <TouchableOpacity
              onPress={() => console.log('clicked')}
              activeOpacity={0.5}>
              <Image
                source={ICONS.filter}
                style={{
                  height: SIZES.h2 * 1.5,
                  width: SIZES.h2 * 1.5,
                  marginRight: SIZES.h4,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => deleteUserActivity()}
              activeOpacity={0.5}>
              <Image
                source={ICONS.delete2}
                style={{height: SIZES.h2 * 1.2, width: SIZES.h2 * 1.3}}
              />
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          data={data}
          keyExtractor={keyExtractor}
          renderItem={renderActivity}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
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

  const RenderHeader = () => {
    const today = new Date();
    const sevenDaysAgo = addDays(today, 7);
    const thirtyDaysAgo = addDays(today, 30);

    const filterActivity = useCallback(
      condition => {
        return activity.filter(item => {
          const date = parseISO(item.createdAt);
          return condition(date);
        });
      },
      [activity],
    );

    const todayActivity = useMemo(
      () => filterActivity(date => isSameDay(today, date)),
      [filterActivity, today, sevenDaysAgo],
    );
    const last7DaysActivity = useMemo(
      () =>
        filterActivity(
          date => !isSameDay(today, date) && isBefore(date, sevenDaysAgo),
        ),
      [filterActivity, today, sevenDaysAgo],
    );
    const last30DaysActivity = useMemo(
      () =>
        filterActivity(
          date =>
            !isSameDay(date, today) &&
            isAfter(date, sevenDaysAgo) &&
            isBefore(date, thirtyDaysAgo),
        ),
      [filterActivity, today, sevenDaysAgo, thirtyDaysAgo],
    );

    return (
      <View>
        <RenderItem title={'Today'} data={todayActivity} />
        <RenderItem title={'Last 7 Days'} data={last7DaysActivity} />
        <RenderItem title={'Last 30 Days'} data={last30DaysActivity} />
      </View>
    );
  };

  return (
    <View style={styles.page}>
      <HeaderA title={'Notification'} />
      <View
        style={{
          paddingHorizontal: SIZES.width * 0.04,
          paddingBottom: SIZES.h1,
        }}>
        <FlatList
          data={['']}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={RenderHeader}
        />
      </View>
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: COLORS.grey2,
    paddingTop: SIZES.h5,
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: SIZES.h3,
    borderWidth: 1,
    borderColor: COLORS.chocolateBackground,
    backgroundColor: COLORS.white,
    padding: SIZES.h4,
    borderRadius: SIZES.base,
    paddingHorizontal: SIZES.h4,
    marginHorizontal: 2,
    marginVertical: 2,
  },
  flex: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    display: 'flex',
  },
});
