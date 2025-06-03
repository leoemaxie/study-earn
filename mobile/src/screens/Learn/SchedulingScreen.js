import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS, FONTS, SIZES} from '@/constants';

const SchedulingScreen = () => {
  const timeSlots = [
    '9:00 AM - 9:30 AM',
    '10:00 AM - 10:30 AM',
    '11:00 AM - 11:30 AM',
    '1:00 PM - 1:30 PM',
    '2:00 PM - 2:30 PM',
    '3:00 PM - 3:30 PM',
    '4:00 PM - 4:30 PM',
    '5:00 PM - 5:30 PM',
  ];

  return (
    <View style={styles.page}>
      <Text style={styles.title}>Schedule an Appointment</Text>
      <Text style={styles.subtitle}>
        You can schedule an appointment with any staff or tutors. Select a time
        slot to book your appointment.
      </Text>
      <FlatList
        data={timeSlots}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.item}>
            <Text style={styles.itemText}>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default SchedulingScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: SIZES.h3,
    backgroundColor: COLORS.lightGray,
  },
  title: {
    ...FONTS.h2,
    color: COLORS.black,
    textAlign: 'center',
    marginBottom: SIZES.h2,
  },
  subtitle: {
    ...FONTS.body4,
    color: COLORS.black,
    textAlign: 'center',
    marginBottom: SIZES.h3,
  },
  listContainer: {
    paddingBottom: SIZES.h3,
  },
  item: {
    backgroundColor: COLORS.white,
    padding: SIZES.h3,
    marginVertical: SIZES.h5,
    borderRadius: SIZES.radius,
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },
  itemText: {
    ...FONTS.h4,
    color: COLORS.black,
  },
});
