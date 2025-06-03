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
import {fetchPaymentMethod, deletePaymentMethod as dpm} from '@/api/user';
import {Roller, sendToast} from '@/components/Template/utils';
import {useNavigation} from '@react-navigation/native';
import {format, parseISO} from 'date-fns';
import HeaderA from '@/components/Header/HeaderA';

const ViewPaymentMethod = () => {
  const navigation = useNavigation();
  const [paymentMethod, setPaymentMethod] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const getPaymentMethod = async () => {
    const {data, status} = await fetchPaymentMethod();
    setLoading(false);
    if (status === 200) {
      setPaymentMethod(data?.data);
    } else {
      sendToast('error', data ? data.error.message : 'Network error');
    }
  };

  const deletePaymentMethod = async id => {
    setDisabled(true);

    if (!id && paymentMethod.length === 0) {
      return sendToast('error', 'No payment method to delete');
    }

    const {data, status} = await dpm(id ? `id=${id}` : '');

    if (status === 204) {
      setPaymentMethod(paymentMethod.filter(item => item.id !== id));
      sendToast('success', 'Payment Method deleted');
    } else if (status === 404) {
      sendToast('error', 'Payment Method has been deleted');
    } else {
      sendToast('error', data ? data.error.message : 'Network error');
    }
    setDisabled(false);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await getPaymentMethod();
    sendToast('success', 'Data refreshed');
    setRefreshing(false);
  };

  useEffect(() => {
    getPaymentMethod();
  }, []);

  const renderPaymentMethod = useCallback(
    ({item}) => (
      <TouchableOpacity activeOpacity={0.8} style={styles.container}>
        <View style={styles.flex}>
          <Text style={{...FONTS.h2}}>{item.accountNumber}</Text>
          <Text style={{...FONTS.body4, color: COLORS.orange}}>
            {item.type ?? 'Bank Transfer'}
          </Text>
        </View>

        <View
          style={{
            ...styles.flex,
            marginTop: SIZES.h4,
          }}>
          <Text
            style={{
              ...FONTS.body2a,
            }}>
            {item.accountName}
          </Text>
          <TouchableOpacity
            onPress={() => deletePaymentMethod(item.id)}
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
        <View
          style={{
            ...styles.flex,
            marginTop: SIZES.h4,
            marginBottom: SIZES.h4 * 0.2,
          }}>
          <Text
            style={{
              ...FONTS.body4,
            }}>
            {item.bankName}
          </Text>
          <Text style={{...FONTS.body4, color: COLORS.black}}>
            {format(parseISO(item.createdAt), 'MMM do, yyyy h:mm a')}
          </Text>
        </View>
      </TouchableOpacity>
    ),
    [paymentMethod, disabled],
  );

  const keyExtractor = useCallback(item => item.id, []);

  const RenderItem = ({title, data}) => {
    return (
      <View style={{marginBottom: SIZES.h3}}>
        <Roller visible={loading} />
        {/* Payment Header */}
        <View style={styles.flex}>
          <Text
            style={{...FONTS.h2, color: COLORS.black, marginBottom: SIZES.h5}}>
            {title}
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('AddPaymentMethod')}
              activeOpacity={0.5}>
              <Image
                source={ICONS.edit}
                style={{
                  height: SIZES.h2,
                  width: SIZES.h2 * 1.2,
                  marginRight: SIZES.h4,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => deletePaymentMethod()}
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
          renderItem={renderPaymentMethod}
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
    return (
      <View>
        <RenderItem title={'Payment Method'} data={paymentMethod} />
      </View>
    );
  };

  return (
    <View style={styles.page}>
      <HeaderA title={'Payment Method'} />
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

export default ViewPaymentMethod;

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
