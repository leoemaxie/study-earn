import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, IMAGES, SIZES, FONTS, ICONS} from '@/constants';
import {useNavigation} from '@react-navigation/native';
import {Roller, sendToast} from '@/components/Template/utils';
import {fetchUsers} from '@/api/user';
import HeaderA from '@/components/Header/HeaderA';
import {format, parseISO} from 'date-fns';

const ChatScreen = () => {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  let query = `department=${name}&role=staff`;

  const getUsers = async () => {
    setLoading(true);
    const {data, status} = await fetchUsers();
    if (status === 200) {
      setUsers(data?.data);
    } else {
      sendToast('error', data ? data.error.message : 'Network error');
    }
    setLoading(false);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <View style={styles.page}>
      <HeaderA title={'Chats'} />

      <View style={styles.TextInput}>
        <TextInput
          placeholder="Search by department e.g Physics"
          style={{...FONTS.h4}}
          onChangeText={setName}
        />
        <TouchableOpacity style={{marginLeft: SIZES.h4}} onPress={getUsers}>
          <Image
            source={ICONS.search}
            style={{
              width: SIZES.h4,
              height: SIZES.h4,
              tintColor: COLORS.chocolate,
            }}
          />
        </TouchableOpacity>
        <Roller color={COLORS.chocolate} size={SIZES.h4} visible={loading} />
      </View>
      <View
        style={{paddingHorizontal: SIZES.width * 0.05, paddingTop: SIZES.h1}}>
        {/* flatlist of department */}
        <View style={{marginBottom: SIZES.h2 * 2}}>
          <FlatList
            data={users}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() => navigation.navigate('ChatOpen', {item})}
                  activeOpacity={0.7}
                  style={styles.container}>
                  <View>
                    <Image
                      source={
                        item.picture ? {uri: item.picture} : IMAGES.avatar
                      }
                      style={{
                        width: SIZES.h1,
                        height: SIZES.h1,
                        borderRadius: 100,
                      }}
                    />
                  </View>
                  <View>
                    <Text style={{...FONTS.h4, color: COLORS.black}}>
                      {item.postion} {item.firstName} {item.lastName}
                    </Text>
                    <Text style={{...FONTS.body4, color: COLORS.black}}>
                      {item.directorate} {item['department.name']}
                    </Text>
                  </View>
                  <View style={{alignItems: 'center'}}>
                    <Text style={{...FONTS.body4, color: COLORS.black}}>
                      {format(parseISO(item.updatedAt), 'hh:mm a')}
                    </Text>
                    <View
                      style={{
                        width: SIZES.h2 * 2,
                        height: SIZES.h2,
                        backgroundColor:
                          item.role === 'staff' ? COLORS.green2 : COLORS.orange,
                        borderRadius: SIZES.h3a,
                        alignItems: 'center',
                      }}>
                      <Text style={{...FONTS.h5, color: COLORS.white}}>
                        {item.role}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: COLORS.grey2,
  },
  TextInput: {
    height: SIZES.height * 0.084,
    width: SIZES.width * 0.96,
    borderRadius: SIZES.base,
    borderWidth: 1,
    borderColor: COLORS.chocolateBackground,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SIZES.base * 1.3,
    marginLeft: SIZES.base * 1,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SIZES.h3,
    borderWidth: 1,
    borderColor: COLORS.chocolateBackground,
    backgroundColor: COLORS.grey3,
    height: SIZES.h1 * 2.5,
    borderRadius: SIZES.base,
    paddingHorizontal: SIZES.h4,
    marginHorizontal: 2,
    marginVertical: 2,
  },
});
