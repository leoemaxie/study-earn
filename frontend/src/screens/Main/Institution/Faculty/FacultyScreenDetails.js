import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {COLORS, SIZES, FONTS} from '@/constants';
import {fetchDepartments} from '@/api/school';
import {sendToast} from '@/components/Template/utils';
import HeaderA from '@/components/Header/HeaderA';

const FacultyScreenDetails = ({route}) => {
  const {faculty} = route?.params || {};
  const [departments, setDepartments] = useState([]);

  const getDepartment = async () => {
    try {
      if (!faculty) return;
      const {data, status} = await fetchDepartments(`faculty=${faculty?.name}`);
      if (status === 200) {
        setDepartments(data?.data);
      }
    } catch (error) {
      sendToast('error', 'An error occurred');
    }
  };

  useEffect(() => {
    getDepartment();
  }, [faculty]);

  return (
    <View style={styles.page}>
      <HeaderA title={faculty?.name} />
      <View style={{paddingHorizontal: SIZES.width * 0.04}}>
        <Text style={styles.description}>
          {faculty?.description ||
            'The faculty has the following departments: '}
        </Text>
        <FlatList
          data={departments}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View style={styles.departmentCtn}>
              <Text style={styles.departmentText}>{item.name}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default FacultyScreenDetails;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  departmentText: {
    ...FONTS.h3,
    padding: SIZES.h4,
    color: COLORS.black,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey,
  },
  description: {
    ...FONTS.body2a,
    color: COLORS.black,
    marginBottom: SIZES.h5,
  },
});
