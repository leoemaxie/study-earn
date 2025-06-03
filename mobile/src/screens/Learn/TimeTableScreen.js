import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {COLORS, FONTS, SIZES} from '@/constants';
import {setSchedule, removeSchedule} from '@/redux/slices/scheduleSlice';
import {sendToast} from '@/components/Template/utils';
import CalendarPicker from '@/components/Input/CalendarPicker';
import {format} from 'date-fns';

const TimeTableScreen = () => {
  const schedule = useSelector(state => state.schedule?.schedules);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [schedules, setSchedules] = useState(schedule || []);
  const [modalVisible, setModalVisible] = useState(false);
  const [activityType, setActivityType] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();
  console.log(schedules);

  const handleDateChange = date => {
    setSelectedDate(date);
    setModalVisible(true);
  };

  const saveSchedule = () => {
    const newSchedule = {
      id: schedules?.length + 1,
      date: selectedDate,
      type: activityType,
      description: description,
    };
    setSchedules([...schedules, newSchedule]);
    dispatch(setSchedule([...schedules, newSchedule]));
    setModalVisible(false);
    setActivityType('');
    setDescription('');
    sendToast('success', 'Activity added successfully');
  };

  return (
    <View style={styles.container}>
      <CalendarPicker onDateTimeChange={handleDateChange} />
      <FlatList
        data={schedules}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => {
          const diffInMs = new Date(item.date) - new Date();
          const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
          const diffInHours = Math.floor(
            (diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          );
          const diffInMinutes = Math.floor(
            (diffInMs % (1000 * 60 * 60)) / (1000 * 60),
          );
          return (
            <View style={styles.scheduleItem}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.scheduleDate}>
                  {item ? format(new Date(item.date), 'dd/MM/yyyy') : ''}
                </Text>
                <Text style={styles.scheduleCountdown}>
                  {diffInMs > 0
                    ? `${diffInDays} days ${diffInHours} hours ${diffInMinutes} minutes left`
                    : 'Expired'}
                </Text>
              </View>
              <Text style={styles.scheduleType}>{item.type}</Text>
              <Text style={styles.scheduleText}>{item.description}</Text>
            </View>
          );
        }}
      />
      {modalVisible && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Add Activity</Text>
              <TextInput
                style={styles.input}
                placeholder="Activity Type"
                value={activityType}
                onChangeText={setActivityType}
              />
              <TextInput
                style={styles.input}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
              />
              <TouchableOpacity style={styles.button} onPress={saveSchedule}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default TimeTableScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SIZES.h2,
    backgroundColor: COLORS.lightGray,
  },
  scheduleItem: {
    backgroundColor: COLORS.white,
    padding: SIZES.h2,
    marginVertical: SIZES.h5,
    borderRadius: SIZES.base,
    elevation: 2,
  },
  scheduleText: {
    ...FONTS.body3,
    color: COLORS.black,
    marginTop: SIZES.h5,
  },
  scheduleType: {
    ...FONTS.h3,
    color: COLORS.primary,
    marginTop: SIZES.h5,
  },
  scheduleDate: {
    ...FONTS.body4,
    color: COLORS.black,
  },
  scheduleCountdown: {
    ...FONTS.body4,
    color: COLORS.black,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: COLORS.white,
    padding: SIZES.h2,
    borderRadius: SIZES.base,
    elevation: 5,
  },
  modalTitle: {
    ...FONTS.h2,
    color: COLORS.black,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: SIZES.base,
    padding: SIZES.h1,
    marginBottom: SIZES.h2,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: SIZES.h2,
    borderRadius: SIZES.base,
    alignItems: 'center',
  },
  buttonText: {
    ...FONTS.h3,
    color: COLORS.white,
  },
});
