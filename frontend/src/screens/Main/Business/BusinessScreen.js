import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  RefreshControl,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {COLORS, FONTS, SIZES, IMAGES} from '@/constants';
import {fetchBusiness} from '@/api/data';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {sendToast, Roller} from '@/components/Template/utils';
import {logout} from '@/redux/slices/authSlice';

const BusinessScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [business, setBusiness] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const getBusiness = async () => {
    setLoading(true);
    const {data, status} = await fetchBusiness('limit=40');
    setLoading(false);
    if (status === 200) {
      setBusiness(data?.data);
    } else {
      sendToast('error', data ? data.error.message : 'Network error');
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await getBusiness();
    setRefreshing(false);
  };

  useEffect(() => {
    getBusiness();
  }, []);

  const handleLogout = async () => {
    dispatch(logout());
    navigation.replace('Auth', {screen: 'Login'});
  };

  const RenderHeader = () => {
    return (
      <View>
        {/* BUSINESS HUB */}
        <View>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Lautech Farm Products</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('ProductScreen')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <View>
            <FlatList
              numColumns={2}
              columnWrapperStyle={styles.columnWrapper}
              data={['', '']}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() =>
                      navigation.navigate('ProductScreenDetails', {
                        image: index === 0 ? IMAGES.bean : IMAGES.tomato,
                      })
                    }>
                    <Image
                      source={index === 0 ? IMAGES.bean : IMAGES.tomato}
                      style={styles.productImage}
                    />
                    <Text style={styles.productText}>
                      {index === 0 ? 'Brown Beans' : 'Fresh Tomatoes'}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          {/* LOGISTIC SERVICE */}
          <View style={styles.logisticServiceContainer}>
            {loading && <Roller visible={loading} />}
            <FlatList
              data={business}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() =>
                      navigation.navigate('BusinessScreenDetails', {
                        business: item,
                      })
                    }>
                    <Text style={styles.businessCategoryText}>
                      {item.category[0]} Service
                    </Text>
                    <View style={styles.container}>
                      <Image
                        source={item?.image ? {uri: item?.image} : IMAGES.pic1}
                        style={styles.businessImage}
                      />
                      <View style={styles.businessInfoContainer}>
                        <Text numberOfLines={2} style={styles.businessNameText}>
                          {item?.name}
                        </Text>
                        <Text
                          numberOfLines={3}
                          style={styles.businessDescriptionText}>
                          {item?.description}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={handleRefresh}
                  colors={[COLORS.primary, COLORS.secondary]}
                />
              }
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Business Hub</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => handleLogout()}
          style={styles.logoutBtn}>
          <Text style={styles.logoutText}>Logout</Text>
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

export default BusinessScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: COLORS.grey2,
    paddingTop: SIZES.h5,
    paddingHorizontal: SIZES.width * 0.05,
  },
  container: {
    height: SIZES.height * 0.2,
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
  logoutBtn: {
    height: SIZES.h1 * 1.2,
    width: SIZES.width * 0.17,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.base,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SIZES.h1,
  },
  headerTitle: {
    ...FONTS.h2,
    color: COLORS.black,
  },
  logoutText: {
    ...FONTS.h4,
    color: COLORS.white,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SIZES.h4,
  },
  headerText: {
    ...FONTS.body3,
    color: COLORS.black,
    fontFamily: 'Satoshi-Medium',
  },
  seeAllText: {
    ...FONTS.body4,
    color: COLORS.orange,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  productImage: {
    resizeMode: 'cover',
    height: SIZES.h1 * 5,
    width: SIZES.width * 0.43,
    borderRadius: SIZES.base,
  },
  productText: {
    ...FONTS.body4,
    color: COLORS.black,
    marginTop: SIZES.base,
  },
  logisticServiceContainer: {
    marginTop: SIZES.h3,
  },
  businessCategoryText: {
    ...FONTS.body3,
    fontFamily: 'Satoshi-Medium',
    color: COLORS.black,
    marginBottom: SIZES.h3,
  },
  businessImage: {
    height: SIZES.h1 * 3,
    width: SIZES.h1 * 3,
  },
  businessInfoContainer: {
    marginLeft: SIZES.h5,
    flex: 1,
  },
  businessNameText: {
    ...FONTS.h4,
    color: COLORS.black,
  },
  businessDescriptionText: {
    marginTop: SIZES.base,
    ...FONTS.body4,
    color: COLORS.black,
  },
});
