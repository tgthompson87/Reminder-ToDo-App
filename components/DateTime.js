import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const DateTime = ({ setDate, setTime }) => {
  //create date/time state object outside component to pass in
  //design: date state = {year: null, month: null, day: null}
  //pass in as year = date.year || month || day
  //design time state = {hour: null, min: null}
  //pass in as time.hour || min

  //pre-check holder values
  const [yearHolder, setYearHolder] = useState();
  const [monthHolder, setMonthHolder] = useState();
  const [dayHolder, setDayHolder] = useState();
  const [hourHolder, setHourHolder] = useState();
  const [minHolder, setMinHolder] = useState();

  //update/setDate
  const onDateChangeHandler = () => {
    //update holders (pre-check) if a value is given for each holder
    if (yearHolder) {
      setYearHolder(Number(yearHolder));
    }
    if (monthHolder) {
      setMonthHolder(Number(monthHolder));
    }
    if (dayHolder) {
      setDayHolder(Number(dayHolder));
    }
    //conditional checks on correct date inputs
    if (
      dayHolder > 0 &&
      dayHolder < 32 &&
      monthHolder > 0 &&
      monthHolder <= 12 &&
      yearHolder > 2020
    ) {
      if (monthHolder == 2) {
        if (dayHolder <= 29) {
          if (yearHolder % 4 == 0) {
            //set leap year feb
            setDate({
              day: dayHolder,
              month: monthHolder,
              year: yearHolder,
            });
          }
        } else if (dayHolder <= 28) {
          //set none leap year feb
          setDate({
            day: dayHolder,
            month: monthHolder,
            year: yearHolder,
          });
        }
      }
      if (
        monthHolder == 1 ||
        monthHolder == 3 ||
        monthHolder == 5 ||
        monthHolder == 7 ||
        monthHolder == 8 ||
        monthHolder == 10 ||
        monthHolder == 12
      ) {
        if (dayHolder > 0 && dayHolder <= 31) {
          //set date for 31 day months
          setDate({
            day: dayHolder,
            month: monthHolder,
            year: yearHolder,
          });
        }
      }
      if (
        monthHolder == 4 ||
        monthHolder == 6 ||
        monthHolder == 9 ||
        monthHolder == 11
      ) {
        if (dayHolder > 0 && dayHolder <= 30) {
          //set date for 30 day months
          setDate({
            day: dayHolder,
            month: monthHolder,
            year: yearHolder,
          });
        }
      }
    }
  };
  //update/setTime
  const onTimeChangeHandler = () => {
    //update holders (pre-check) if a value is given for each holder
    if (hourHolder) {
      setHourHolder(Number(hourHolder));
    }
    if (minHolder) {
      setMinHolder(Number(minHolder));
    }
    //conditional checks on correct time inputs
    if (hourHolder >= 0 && hourHolder <= 24) {
      //setTime hour
      setTime({
        ...time,
        hour: hourHolder,
      });
    }
    if (minHolder >= 0 && minHolder <= 59) {
      //setTime min
      setTime({
        ...time,
        min: minHolder,
      });
    }
  };

  const placeHolderDate = new Date();

  return (
    <View>
      <View>
        <Text>
          Current Date: {placeHolderDate.getDate().toString()} /{" "}
          {(placeHolderDate.getMonth() + 1).toString()} /{" "}
          {placeHolderDate.getUTCFullYear()}
        </Text>
        <Text>
          Current Time: {placeHolderDate.getHours().toString()}:
          {placeHolderDate.getMinutes().toString()}
        </Text>
      </View>
      <View style={styles.container}>
        {/* date */}
        <View>
          <Text>Date: [dd/mm/yyyy]</Text>
          <View style={styles.dateBox}>
            {/* dd */}
            <View>
              <TextInput
                placeholder={"dd"}
                onChangeText={onDateChangeHandler}
                value={dayHolder}
              />
            </View>
            <Text style={styles.text}> / </Text>
            {/* mm */}
            <View>
              <TextInput
                placeholder="mm"
                onChangeText={onDateChangeHandler}
                value={monthHolder}
              />
            </View>
            <Text style={styles.text}> / </Text>
            {/* yyyy */}
            <View>
              <TextInput
                placeholder="yyyy"
                onChangeText={onDateChangeHandler}
                value={yearHolder}
              />
            </View>
          </View>
        </View>
        {/* time */}
        <View>
          <Text>Time: [24hr eg. 04:30]</Text>
          <View style={styles.timeBox}>
            {/* hr */}
            <View>
              <TextInput
                placeholder="hr"
                onChangeText={onTimeChangeHandler}
                value={hourHolder}
              />
            </View>
            <Text> : </Text>
            {/* min */}
            <View>
              <TextInput
                placeholder="min"
                onChangeText={onTimeChangeHandler}
                value={minHolder}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DateTime;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  text: {
    fontSize: 17,
  },
  dateBox: {
    flexDirection: "row",
  },
  timeBox: {
    flexDirection: "row",
  },
});
