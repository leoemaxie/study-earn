import React, {useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS, FONTS, ICONS, IMAGES, SIZES} from '@/constants';
import {useSelector} from 'react-redux';
import PictureInput from '@/components/Input/PictureInput';
import ModalInput from '@/components/Input/Modal';
import HeaderA from '@/components/Header/HeaderA';
import * as schema from '@/schemas/updateUser';

const EditProfile = () => {
  const user = useSelector(state => state?.auth?.user);
  const data = [
    ...schema.data,
    ...(user.role === 'student' ? schema.student : schema.staff),
  ];
  const [visible, setVisible] = useState(false);
  const [fileVisible, setFileVisible] = useState(false);
  const [modalArgs, setModalArgs] = useState(null);

  const handleClick = args => {
    setModalArgs(args);
    setVisible(true);
  };

  const handleCloseModal = () => {
    setVisible(false);
    setModalArgs(null);
  };

  const handleUpload = () => {
    setFileVisible(true);
  };

  const handleCloseFileModal = () => {
    setFileVisible(false);
  };

  return (
    <View style={styles.page}>
      <HeaderA title="Edit Profile" />
      <View style={{marginHorizontal: SIZES.h3}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity onPress={() => handleUpload()}>
            <Image
              source={user.picture ? {uri: user.picture} : IMAGES.avatar1}
              style={{
                width: SIZES.width * 0.25,
                height: SIZES.width * 0.25,
                marginVertical: SIZES.h3,
                borderRadius: 100,
              }}
            />
          </TouchableOpacity>

          <PictureInput visible={fileVisible} onClose={handleCloseFileModal} />

          <View
            style={{...styles.flex, flex: 1, marginLeft: SIZES.width * 0.05}}>
            <View style={styles.container}>
              <Text style={{fontSize: SIZES.h2, color: COLORS.black}}>
                {user?.firstName} {user?.lastName}
              </Text>
              <Text style={{...FONTS.body5, color: COLORS.black}}>
                {user?.email}
              </Text>
            </View>
            <TouchableOpacity onPress={() => handleClick(schema.name[0])}>
              <Image source={ICONS.edit} style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <View>
              <View style={styles.flex}>
                <View style={{...styles.container}}>
                  <Text
                    style={{
                      ...FONTS.h3,
                      color: COLORS.black,
                      marginTop: SIZES.h2,
                    }}>
                    {item[0].label}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Satoshi-Regular',
                      color: COLORS.black,
                    }}>
                    {item[0].format(user[item[0].key] ?? '_')}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    handleClick(item);
                  }}>
                  <Image source={ICONS.edit} style={styles.icon} />
                </TouchableOpacity>
              </View>
              <View>
                <Text
                  style={{
                    ...FONTS.h3,
                    marginTop: SIZES.h3,
                    color: COLORS.black,
                  }}>
                  {item[1].label}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Satoshi-Regular',
                    color: COLORS.black,
                    marginBottom: SIZES.h2,
                  }}>
                  {item[1].format(user[item[1].key])}
                </Text>
              </View>
              <View
                style={{
                  height: 1,
                  backgroundColor: COLORS.chocolateBackground,
                  marginTop: SIZES.h3,
                }}
              />
            </View>
          )}
        />
      </View>

      {visible && (
        <ModalInput
          visible={visible}
          args={modalArgs}
          user={user}
          onClose={handleCloseModal}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: COLORS.grey2,
  },
  container: {
    flexDirection: 'column',
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: SIZES.h2,
    height: SIZES.h2,
    marginLeft: SIZES.h5 * 1.2,
  },
});
export default EditProfile;
