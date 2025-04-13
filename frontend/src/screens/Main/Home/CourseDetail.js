import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {COLORS, FONTS, SIZES, IMAGES, ICONS} from '@/constants';
import {useNavigation} from '@react-navigation/native';
import HeaderA from '@/components/Header/HeaderA';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
// import Video from 'react-native-video';

const Tab = createMaterialTopTabNavigator();

const Lesson = () => {
  return (
    <View
      style={{
        paddingHorizontal: SIZES.width * 0.04,
        paddingTop: SIZES.base,
        paddingBottom: SIZES.h1,
      }}>
      <Text style={{...FONTS.h4, color: COLORS.black, marginBottom: SIZES.h4}}>
        Lessons (20)
      </Text>
      <FlatList
        data={['', '', '', '', '', '', '']}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <View style={styles.lessonCtn}>
              <View style={styles.numCircle}>
                <Text
                  style={{
                    ...FONTS.h4,
                    fontFamily: 'Satoshi-Black',
                    color: COLORS.primary,
                  }}>
                  {index + 1}
                </Text>
              </View>
              <View style={{marginLeft: SIZES.h4, flex: 1}}>
                <Text
                  numberOfLines={1}
                  style={{...FONTS.h4, color: COLORS.black}}>
                  Trigonometry
                </Text>
                <Text style={{...FONTS.body5, color: COLORS.black}}>15:00</Text>
              </View>
              <TouchableOpacity style={styles.numCircle}>
                <Image
                  source={index === 0 ? ICONS.play : ICONS.padlock}
                  style={{height: SIZES.h3, width: SIZES.h3}}
                />
              </TouchableOpacity>
            </View>
          );
        }}
      />
      <View style={{}} />
    </View>
  );
};

const About = () => {
  return (
    <View
      style={{
        paddingHorizontal: SIZES.width * 0.04,
        paddingTop: SIZES.base,
        paddingBottom: SIZES.h1,
      }}>
      <Text style={{...FONTS.h4, color: COLORS.black, marginBottom: SIZES.h4}}>
        About Course
      </Text>
      <Text style={{...FONTS.body4b, color: COLORS.black}}>
        CHM 101 is an introductory course in Chemistry that covers the
        foundational principles of atomic structure, chemical bonding, and the
        periodic table. Students will explore key concepts such as
        stoichiometry, states of matter, and basic thermodynamics. This course
        provides a solid basis for understanding chemical reactions and
        laboratory techniques essential for advanced studies in Chemistry.
      </Text>
    </View>
  );
};

const RenderTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Lessons"
      screenOptions={{
        tabBarLabelStyle: {
          textTransform: 'none',
        },
      }}>
      <Tab.Screen name="About" component={About} />
      <Tab.Screen name="Lessons" component={Lesson} />
    </Tab.Navigator>
  );
};

const CourseDetail = () => {
  return (
    <View style={styles.page}>
      <HeaderA title={'Course Detail'} top={true} />
      <View style={{flex: 1}}>
        {/* <Video
          source={{
            uri: 'https:res.cloudinary.com/dycjtbrdm/video/upload/v1725364083/videoplayback_1_x4ymdb.mp4',
          }} // Replace this with the actual video URL
          style={styles.video}
          resizeMode="cover" // Adjust the video to cover the container
          controls={true} // Display default controls (play, pause, etc.)
        /> */}
        {/* DETAILS */}
        <View style={styles.container}>
          <View
            style={{
              paddingHorizontal: SIZES.width * 0.04,
              paddingTop: SIZES.base,
            }}>
            <Text numberOfLines={2} style={{...FONTS.h3, color: COLORS.black}}>
              Introduction to Fluid Mechanism
            </Text>
            <Text
              numberOfLines={1}
              style={{...FONTS.body4, color: COLORS.black}}>
              MEE 201{' '}
              <Text style={{fontFamily: 'Satoshi-Bold'}}>
                (25 students enrolled)
              </Text>
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: SIZES.base,
                  marginBottom: SIZES.base,
                }}>
                <Image
                  source={IMAGES.avatar1}
                  style={{
                    height: SIZES.h2,
                    width: SIZES.h2,
                    marginRight: SIZES.base * 0.7,
                    borderRadius: 100,
                  }}
                />
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: SIZES.h4,
                    fontFamily: 'Satoshi-Medium',
                    color: COLORS.black,
                  }}>
                  Padi Team
                </Text>
              </View>
              <Text
                style={{
                  ...FONTS.body3c,
                  fontFamily: 'Satoshi-Medium',
                  color: COLORS.black,
                }}>
                Lessons (10)
              </Text>
            </View>
          </View>

          {/* TOP TAB */}
          <RenderTab />
        </View>
      </View>
    </View>
  );
};

export default CourseDetail;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: COLORS.grey2,
    paddingTop: SIZES.h4,
  },
  container: {
    flex: 1,
    borderWidth: 1,
    borderTopLeftRadius: SIZES.h1 * 1.5,
    borderTopRightRadius: SIZES.h1 * 1.5,
    backgroundColor: COLORS.white,
    borderColor: COLORS.chocolateBackground,
    paddingTop: SIZES.h4,
  },
  lessonCtn: {
    height: SIZES.h1 * 2.6,
    borderWidth: 1,
    marginBottom: SIZES.h5,
    borderRadius: SIZES.base,
    borderColor: COLORS.chocolateBackground,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.width * 0.03,
  },
  numCircle: {
    height: SIZES.h1 * 1.2,
    width: SIZES.h1 * 1.2,
    borderWidth: 1,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLORS.chocolateBackground,
    backgroundColor: COLORS.grey2,
  },
  video: {
    height: SIZES.height * 0.27,
    width: SIZES.width,
    alignSelf: 'center',
    borderRadius: SIZES.base,
  },
});
