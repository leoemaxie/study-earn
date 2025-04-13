import React, {useState} from 'react';
import {View, Button, Platform} from 'react-native';
import {COLORS} from '@/constants';
import DateTimePicker from '@react-native-community/datetimepicker';

const CalendarPicker = ({onDateTimeChange, initialDateTime = new Date()}) => {
  const [date, setDate] = useState(initialDateTime);
  const [time, setTime] = useState(initialDateTime);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
    setShowTimePicker(true);
  };

  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(Platform.OS === 'ios');
    setTime(currentTime);
    onDateTimeChange(
      new Date(date.setHours(currentTime.getHours(), currentTime.getMinutes())),
    );
  };

  return (
    <View>
      <Button
        onPress={() => setShowDatePicker(true)}
        title="Show Calendar"
        color={COLORS.primary}
      />
      {showDatePicker && (
        <DateTimePicker
          testID="datePicker"
          value={date}
          mode="date"
          display="calendar"
          onChange={onDateChange}
        />
      )}
      {showTimePicker && (
        <DateTimePicker
          testID="timePicker"
          value={time}
          mode="time"
          display="clock"
          onChange={onTimeChange}
        />
      )}
    </View>
  );
};

export default CalendarPicker;
