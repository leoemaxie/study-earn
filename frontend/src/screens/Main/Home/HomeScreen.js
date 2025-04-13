import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLORS, FONTS, SIZES, ICONS, IMAGES} from '@/constants';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const RenderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('CourseDetail')}
        activeOpacity={0.8}
        style={styles.container}>
        <Image
          source={IMAGES.slide2}
          style={{
            width: SIZES.width * 0.515,
            height: SIZES.height * 0.14,
            borderTopLeftRadius: SIZES.base,
            borderTopRightRadius: SIZES.base,
          }}
        />
        <View
          style={{paddingHorizontal: SIZES.base, marginTop: SIZES.base * 0.8}}>
          <Text
            numberOfLines={2}
            style={{
              fontSize: SIZES.h4,
              fontFamily: 'Satoshi-Medium',
              color: COLORS.black,
            }}>
            Introduction to Engineering techni
          </Text>
          <Text numberOfLines={1} style={{...FONTS.body5, color: COLORS.black}}>
            MEE 201{' '}
            <Text style={{fontFamily: 'Satoshi-Bold'}}>
              (25 students enrolled)
            </Text>
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: SIZES.base * 0.3,
              marginBottom: SIZES.base,
            }}>
            <Image
              source={ICONS.person3}
              style={{
                height: SIZES.h3,
                width: SIZES.h3,
                marginRight: SIZES.base * 0.7,
              }}
            />
            <Text
              numberOfLines={1}
              style={{
                fontSize: SIZES.h5,
                fontFamily: 'Satoshi-Medium',
                color: COLORS.black,
              }}>
              Padi Team
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.9}
            style={{
              alignSelf: 'flex-end',
              height: SIZES.h1 * 0.9,
              width: SIZES.h1 * 2.7,
              backgroundColor: COLORS.primary,
              borderRadius: SIZES.base * 0.9,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: SIZES.h5,
                fontFamily: 'Satoshi-Medium',
                color: COLORS.white,
              }}>
              Enroll now
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const RenderHeader = () => {
    return (
      <View style={{marginTop: SIZES.h4}}>
        {/* BANNER */}
        <Image
          style={{
            height: SIZES.height * 0.11,
            width: SIZES.width * 0.92,
            alignSelf: 'center',
            borderRadius: SIZES.base,
          }}
          source={{
            uri: 'https://img.freepik.com/free-photo/psychedelic-paper-shapes-with-copy-space_23-2149378246.jpg?t=st=1725745803~exp=1725749403~hmac=93b90af88f74904d1da13f5098ccfd7e7b291f3dbaf9f530e9754357c2d121ce&w=900',
          }}
        />
        {/* MY COURSE */}
        <View
          style={{paddingHorizontal: SIZES.width * 0.04, marginTop: SIZES.h4}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{...FONTS.h3, color: COLORS.black}}>My Course</Text>
            <TouchableOpacity>
              <Text
                style={{
                  ...FONTS.body4b,
                  color: COLORS.black,
                  textDecorationLine: 'underline',
                }}>
                See more
              </Text>
            </TouchableOpacity>
          </View>
          {/* CONTAINER */}
          <View style={styles.courseCtn}>
            <Text style={{...FONTS.body4, color: COLORS.black}}>
              Progress-75%
            </Text>
            <View
              style={{
                height: SIZES.base,
                backgroundColor: COLORS.chocolate,
                borderRadius: SIZES.h4,
                marginTop: SIZES.base * 0.3,
              }}>
              <View
                style={{
                  height: SIZES.base,
                  width: SIZES.width * 0.5,
                  backgroundColor: COLORS.red,
                  borderTopLeftRadius: SIZES.h4,
                  borderBottomLeftRadius: SIZES.h4,
                }}
              />
            </View>
            <View style={styles.myCourseMiniCtn}>
              <Image
                source={IMAGES.slide2}
                style={{
                  height: SIZES.h1 * 1.1,
                  width: SIZES.h1 * 2,
                  borderRadius: SIZES.base,
                }}
              />
              <View style={{marginLeft: SIZES.h5}}>
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: SIZES.h4,
                    color: COLORS.black,
                    fontFamily: 'Satoshi-Medium',
                  }}>
                  Introducion to Fluid Mechanism
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: SIZES.h5 * 0.9,
                    fontFamily: 'Satoshi-Regular',
                    color: COLORS.black,
                  }}>
                  MEE 202
                </Text>
              </View>
            </View>
          </View>
        </View>
        {/* RECOMMENDED COURSES */}
        <View style={{marginTop: SIZES.h3}}>
          <View
            style={{
              marginHorizontal: SIZES.width * 0.04,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{...FONTS.h3, color: COLORS.black}}>
              Recommended for you
            </Text>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => navigation.navigate('SeeMore')}>
              <Text
                style={{
                  ...FONTS.body4b,
                  color: COLORS.black,
                  textDecorationLine: 'underline',
                }}>
                See more
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={['', '', '', '', '']}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              marginLeft: SIZES.width * 0.04,
              marginTop: SIZES.h4,
            }}
            renderItem={({item}) => <RenderItem item={item} />}
          />
        </View>
        {/* ALL COURSES */}
        <View style={{marginTop: SIZES.h3}}>
          <View
            style={{
              marginHorizontal: SIZES.width * 0.04,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{...FONTS.h3, color: COLORS.black}}>All Courses</Text>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => navigation.navigate('SeeMore')}>
              <Text
                style={{
                  ...FONTS.body4b,
                  color: COLORS.black,
                  textDecorationLine: 'underline',
                }}>
                See more
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={['', '', '', '', '']}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              marginLeft: SIZES.width * 0.04,
              marginTop: SIZES.h4,
            }}
            renderItem={({item}) => <RenderItem item={item} />}
          />
        </View>
        {/* PAST QUESTIONS SOLUTIONS */}
        <View style={{marginTop: SIZES.h3}}>
          <View
            style={{
              marginHorizontal: SIZES.width * 0.04,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{...FONTS.h3, color: COLORS.black}}>
              Past Question Solution
            </Text>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => navigation.navigate('SeeMore')}>
              <Text
                style={{
                  ...FONTS.body4b,
                  color: COLORS.black,
                  textDecorationLine: 'underline',
                }}>
                See more
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={['', '', '', '', '']}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              marginLeft: SIZES.width * 0.04,
              marginTop: SIZES.h4,
            }}
            renderItem={({item}) => <RenderItem item={item} />}
          />
        </View>
        {/* FREE COURSE */}
        <View style={{marginTop: SIZES.h3}}>
          <View
            style={{
              marginHorizontal: SIZES.width * 0.04,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{...FONTS.h3, color: COLORS.black}}>Free Course</Text>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => navigation.navigate('SeeMore')}>
              <Text
                style={{
                  ...FONTS.body4b,
                  color: COLORS.black,
                  textDecorationLine: 'underline',
                }}>
                See more
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={['', '', '', '', '']}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              marginLeft: SIZES.width * 0.04,
              marginTop: SIZES.h4,
            }}
            renderItem={({item}) => <RenderItem item={item} />}
          />
        </View>

        {/* MARGIN BOTTOM */}
        <View style={{marginBottom: SIZES.h1}} />
      </View>
    );
  };

  return (
    <View style={styles.page}>
      <View
        style={{
          paddingHorizontal: SIZES.width * 0.04,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          source={IMAGES.avatar1}
          style={{
            height: SIZES.h1 * 1.2,
            width: SIZES.h1 * 1.2,
            borderRadius: 100,
          }}
        />
        <View style={{marginLeft: SIZES.h4, flex: 1}}>
          <Text
            style={{
              ...FONTS.body4,
              fontFamily: 'Satoshi-Medium',
              color: COLORS.black,
            }}>
            Oluwasegun Boluwatife,
          </Text>
          <Text
            style={{
              fontSize: SIZES.h5,
              fontFamily: 'Satoshi-Regular',
              color: COLORS.black,
            }}>
            Welcome
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}>
            <Image
              source={ICONS.search}
              style={{
                height: SIZES.h2,
                width: SIZES.h2,
                marginRight: SIZES.h3 * 1.2,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('NotificationScreen')}>
            <Image
              source={ICONS.bell}
              style={{height: SIZES.h2, width: SIZES.h2}}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          height: 1,
          backgroundColor: COLORS.chocolateBackground,
          marginTop: SIZES.h4,
        }}
      />
      <FlatList
        ListHeaderComponent={RenderHeader}
        showsVerticalScrollIndicator={false}
        data={['', '']}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: COLORS.grey2,
    paddingTop: SIZES.h5,
  },
  courseCtn: {
    height: SIZES.height * 0.135,
    paddingHorizontal: SIZES.width * 0.03,
    borderWidth: 1,
    borderRadius: SIZES.base,
    borderColor: COLORS.chocolateBackground,
    backgroundColor: COLORS.white,
    marginTop: SIZES.h5,
    justifyContent: 'center',
  },
  myCourseMiniCtn: {
    height: SIZES.h1 * 1.7,
    backgroundColor: COLORS.grey2,
    marginTop: SIZES.base * 0.6,
    borderRadius: SIZES.base,
    paddingHorizontal: SIZES.h5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    height: SIZES.height * 0.31,
    width: SIZES.width * 0.52,
    borderWidth: 1,
    borderColor: COLORS.chocolateBackground,
    marginRight: SIZES.h4,
    borderRadius: SIZES.base,
    backgroundColor: COLORS.white,
  },
});
