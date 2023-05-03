import React, { useState } from "react";
import { View, Platform, Text, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import CustomButton from "./CustomButton";

const DateTimer = () => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <CustomButton clickHandler={showDatepicker}>Select Date</CustomButton>
        </View>
        <View style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
        {show && Platform.OS === "ios" && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
            style={{width: 100, backgroundColor: "white", height: 100, marginLeft: mode === "time"?33:0}}
          />
        )}
        {show && Platform.OS === "android" && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
        </View>
        <View style={styles.button}>
          <CustomButton clickHandler={showTimepicker}>Select Time</CustomButton>
        </View>
      </View>
      {/* debug text view */}
      <Text>{date.toString()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 5,
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    marginHorizontal: 8,
    justifyContent: "space-between" 
  },
  datePickerAndButtons:{
    flexDirection: "column"
  }
});

export default DateTimer;
