import React, { useState } from "react";
import { View, Platform, Text, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import CustomButton from "./CustomButton";

const DateTimer = ({ date, setDate }) => {
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const displayDate = useState({});

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
  const days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  //hours 0-23 min/sec 0-59
  //yr std 4 digit disp

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <CustomButton clickHandler={showDatepicker}>Select Date</CustomButton>
        </View>
        <View style={styles.button}>
          <CustomButton clickHandler={showTimepicker}>Select Time</CustomButton>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {show && Platform.OS === "ios" && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
            style={{
              width: 100,
              backgroundColor: "white",
              height: 100,
              marginLeft: mode === "time" ? 33 : 0,
            }}
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
      <Text style={{ fontSize: 19 }}>
        <Text style={{ fontWeight: "bold" }}>Date: </Text>
        {days[date.getDay()]} {date.getDate()} {months[date.getMonth()]}
        <Text style={{ fontWeight: "bold" }}> Time: </Text>
        {date.getHours()}:
        {date.getMinutes() < 10
          ? "0" + date.getMinutes().toString()
          : date.getMinutes()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 4,
    width: "40%",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  datePickerAndButtons: {
    flexDirection: "column",
  },
});

export default DateTimer;
