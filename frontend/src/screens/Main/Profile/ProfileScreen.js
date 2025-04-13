import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {COLORS, FONTS, ICONS, IMAGES, SIZES} from '@/constants';
import {deleteProfile} from '@/api/user';
import {logout} from '@/redux/slices/authSlice';
import {Roller, sendToast} from '@/components/Template/utils';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector(state => state?.auth?.user);
  const [loading, setLoading] = useState(false);
  const profileData = [
    {
      id: 1,
      title: 'Edit Profile',
      iconName: ICONS.person,
      action: () => navigation.navigate('EditProfile'),
    },
    {
      id: 2,
      title: 'Notification',
      iconName: ICONS.bell,
      action: () => navigation.navigate('NotificationScreen'),
    },
    {
      id: 3,
      title: 'Withdraw Point',
      iconName: ICONS.cart,
      action: () => navigation.navigate('WithdrawPoint'),
    },
    {
      id: 4,
      title: 'View Payment Method',
      iconName: ICONS.padlock,
      action: () => navigation.navigate('ViewPaymentMethod'),
    },
    {
      id: 5,
      title: 'View Payment History',
      iconName: ICONS.history,
      action: () => navigation.navigate('PaymentHistory'),
    },
    {
      id: 6,
      title: 'Logout',
      iconName: ICONS.logout2,
      action: () => handleLogout(),
    },
    {
      id: 7,
      title: 'Delete Account',
      iconName: ICONS.delete2,
      action: () => handleDelete(),
    },
  ];

  const handleLogout = async () => {
    setLoading(true);
    dispatch(logoutUser());
    setLoading(false);
    navigation.replace('Auth', {screen: 'Login'});
  };

  const handleDelete = async () => {
    setLoading(true);

    const {data, status} = await deleteProfile();

    if (status === 200) {
      dispatch(logoutUser());
      navigation.replace('Auth', {screen: 'CreateAccount'});
      setLoading(false);
    } else {
      setLoading(false);
      sendToast(
        'error',
        data?.error?.message || 'An error occurred, please try again',
      );
    }
  };

  return (
    <View style={styles.page}>
      <Text style={{...FONTS.h2, color: COLORS.black, textAlign: 'center'}}>
        Profile
      </Text>
      <View style={{marginTop: SIZES.h5}}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={user.picture ? {uri: user.picture} : IMAGES.avatar}
            style={{
              height: SIZES.h1 * 2.5,
              width: SIZES.h1 * 2.5,
              borderRadius: 100,
            }}
          />
          <Text
            style={{
              fontSize: SIZES.h3,
              fontFamily: 'Satoshi-Bold',
              color: COLORS.black,
              marginTop: SIZES.h4,
            }}>
            {user.firstName} {user.lastName}
          </Text>
          <Text
            style={{
              fontSize: SIZES.h4,
              fontFamily: 'Satoshi-Medium',
              color: COLORS.black,
            }}>
            {user.department}
          </Text>
          <Text
            style={{
              fontSize: SIZES.h4,
              fontFamily: 'Satoshi-Medium',
              color: COLORS.black,
            }}>
            {user.level} Level
          </Text>
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: COLORS.chocolateBackground,
            marginTop: SIZES.h3,
          }}
        />

        {user.role === 'student' && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              marginTop: SIZES.h2,
            }}>
            <Text
              style={{
                fontSize: SIZES.h3,
                fontFamily: 'Satoshi-Bold',
                color: COLORS.primary,
              }}>
              YOUR BALANCE:
            </Text>
            <Text
              style={{
                fontSize: SIZES.h3,
                fontFamily: 'Satoshi-Bold',
                color: COLORS.primary,
              }}>
              {user.points}
            </Text>
          </View>
        )}
        <Roller visible={loading} />
        <FlatList
          data={profileData}
          contentContainerStyle={{
            paddingHorizontal: SIZES.width * 0.05,
            marginTop: SIZES.h1,
          }}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.container}
                onPress={item.action}>
                <Image
                  source={item.iconName}
                  style={{height: SIZES.h2, width: SIZES.h2}}
                />
                <Text
                  style={{
                    fontSize: SIZES.h4 * 1.1,
                    fontFamily: 'Satoshi-Medium',
                    color: COLORS.black,
                    marginLeft: SIZES.h4,
                    flex: 1,
                  }}>
                  {item.title}
                </Text>
                <Image
                  source={ICONS.arrowright2}
                  style={{
                    height: SIZES.h3,
                    width: SIZES.h3,
                    tintColor: COLORS.primary,
                  }}
                />
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: COLORS.grey2,
    paddingTop: SIZES.h5,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.h1 * 1.1,
  },
});
