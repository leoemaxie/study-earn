import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useSelector} from 'react-redux';
import ChatbotModal from '@/components/Chat/ChatbotModal';
import {COLORS, FONTS, ICONS, IMAGES, SIZES} from '@/constants';

function getDepartmentCode(department) {
  let departmentCode = '';
  let chunk = department.replace('and', '').split(' ');

  if (chunk.length === 1) {
    return chunk[0].substring(0, 3).toUpperCase();
  }
  chunk.forEach(word => {
    departmentCode += word.substring(0, 1).toUpperCase();
  });
  return departmentCode;
}

function getCourseCode(level, semester) {
  const min = semester === 1 ? level + 1 : level;
  const max = semester === 1 ? level + 15 : level + 16;
  let courseCode;

  do {
    courseCode = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (
    (semester === 1 && courseCode % 2 === 0) ||
    (semester === 2 && courseCode % 2 !== 0)
  );

  return courseCode;
}

const LearnScreen = () => {
  const [chatVisible, setChatVisible] = useState(false);
  const user = useSelector(state => state?.auth?.user);
  const code = `${getDepartmentCode(user.department)} ${getCourseCode(
    parseInt(user.level),
    user.semester,
  )}`;

  const openChat = () => {
    setChatVisible(true);
  };

  const closeChat = () => {
    setChatVisible(false);
  };

  const courses = [
    {
      id: '1',
      title: `Introduction to ${user.department}`,
      code,
      lessons: '10 lessons',
    },
    {
      id: '2',
      title: `Advanced ${user.department}`,
      code,
      lessons: '15 lessons',
    },
  ];

  return (
    <View style={styles.page}>
      <Text style={styles.headerText}>My Courses</Text>
      <View style={styles.courseListContainer}>
        <FlatList
          data={courses}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <View style={styles.container}>
              <View style={styles.courseInfo}>
                <Image source={IMAGES.slide2} style={styles.courseImage} />
                <View style={styles.courseDetails}>
                  <Text numberOfLines={1} style={styles.courseTitle}>
                    {item.title}
                  </Text>
                  <Text numberOfLines={1} style={styles.courseCode}>
                    {item.code}
                  </Text>
                  <Text numberOfLines={1} style={styles.courseLessons}>
                    {item.lessons}
                  </Text>
                </View>
              </View>
              <TouchableOpacity style={styles.getCtn}>
                <Text style={styles.getCtnText}>Get Back Into It</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
      <TouchableOpacity style={styles.floatingButton} onPress={openChat}>
        <Image source={ICONS.chat} style={styles.image} />
        <ChatbotModal visible={chatVisible} onClose={closeChat} />
      </TouchableOpacity>
    </View>
  );
};

export default LearnScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: COLORS.grey2,
    paddingTop: SIZES.h5,
    paddingHorizontal: SIZES.width * 0.04,
  },
  headerText: {
    ...FONTS.h2,
    color: COLORS.black,
    textAlign: 'center',
  },
  courseListContainer: {
    marginTop: SIZES.h2,
    paddingBottom: SIZES.h1,
  },
  container: {
    height: SIZES.height * 0.18,
    borderWidth: 1,
    borderRadius: SIZES.base,
    marginBottom: SIZES.h4,
    borderColor: COLORS.chocolateBackground,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
  },
  courseInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.width * 0.03,
  },
  courseImage: {
    height: SIZES.h1 * 2.3,
    width: SIZES.h1 * 2.3,
  },
  courseDetails: {
    marginLeft: SIZES.h5,
    flex: 1,
  },
  courseTitle: {
    ...FONTS.h4,
    color: COLORS.black,
  },
  courseCode: {
    ...FONTS.body4,
    color: COLORS.black,
  },
  courseLessons: {
    fontSize: SIZES.h5 * 1.1,
    fontFamily: 'Satoshi-Medium',
    color: COLORS.black,
  },
  getCtn: {
    height: SIZES.h1 * 1.4,
    borderWidth: 1,
    marginHorizontal: SIZES.width * 0.03,
    borderColor: COLORS.primary,
    marginTop: SIZES.base * 1.2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZES.base * 0.5,
    backgroundColor: COLORS.grey3,
  },
  getCtnText: {
    ...FONTS.h5,
    fontFamily: 'Satoshi-Black',
    color: COLORS.primary,
  },
  floatingButton: {
    position: 'absolute',
    bottom: SIZES.h1,
    right: SIZES.width * 0.05,
    height: SIZES.h1 * 2,
    width: SIZES.h1 * 2,
    borderRadius: SIZES.h1,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    height: SIZES.h1,
    width: SIZES.h1,
    tintColor: COLORS.white,
  },
});
