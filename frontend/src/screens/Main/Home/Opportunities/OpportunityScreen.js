import {
  FlatList,
  Image,
  Linking,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS, IMAGES, SIZES} from '@/constants';
import {fetchScholarship} from '@/api/student';
import {Roller, sendToast} from '@/components/Template/utils';

const OpportunityScreen = () => {
  let [load, setLoad] = useState(false);
  const [academicFreshData, setAcademicFreshData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getScholarships = async () => {
    setLoad(true);
    const {data, status} = await fetchScholarship('limit=40');
    setLoad(false);

    if (status === 200) {
      sendToast('success', 'Data received successfully');
      setAcademicFreshData(data?.data);
    } else {
      sendToast('error', 'Network error');
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await getScholarships();
    setRefreshing(false);
  };

  useEffect(() => {
    getScholarships();
  }, []);

  const handleOpenUrl = async url => {
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  };
  return (
    <View style={styles.page}>
      {load && <Roller visible={load} />}
      <Text style={{...FONTS.h2, color: COLORS.black, marginBottom: SIZES.h4}}>
        Academic Opportunities
      </Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={academicFreshData}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => handleOpenUrl(item?.applyLink)}
              style={styles.container}>
              <Image
                source={item.image ? {uri: item.image} : IMAGES.pic1}
                style={{height: SIZES.h1 * 3, width: SIZES.h1 * 3}}
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
                  {item?.title}
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

export default OpportunityScreen;

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
