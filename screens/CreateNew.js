import React, { useState, useContext } from "react";
import { TextInput, Text, View, StyleSheet } from "react-native";

import DateTimer from "../components/DateTimer";
import CustomButton from "../components/CustomButton";
import CustomSelect from "../components/CustomSelect";
//import DateTime from "../components/DateTime";
import { Alert } from "react-native";
//import { Picker } from "@react-native-community/picker";
import { Ionicons } from "@expo/vector-icons";
import { StateContext } from "../model/model";

const CreateNew = (props) => {
  const reducerContext = useContext(StateContext);

  const [createdToDo, setCreatedToDo] = useState({});
  const [title, setTitle] = useState("");
  const [id, setId] = useState("");
  const [description, setDescription] = useState("");
  //date/time handled in the DatePickers
  const [priority, setPriority] = useState("");
  const [alarm, setAlarm] = useState("");
  // const [colourLabel, setColourLabel] = useState("");
  const [date, setDate] = useState(new Date());
  // const [switcher, setSwitch] = useState(false);
  const [dateObj, setDateObj] = useState({
    year: null,
    month: null,
    day: null,
  });
  const [timeObj, setTimeObj] = useState({
    hour: null,
    min: null,
  });

  const [titlePicker, setTitlePicker] = useState("Select Group");

  const [toggleSelect, setToggleSelect] = useState(false);

  //group update handling logic
  const [newGroupTitle, setNewGroupTitle] = useState("");
  const [newGroupDescription, setNewGroupDescription] = useState("");

  const onTitleChangeHandler = (title) => {
    if (title.length >= 0 && title.length <= 13) {
      setTitle(title);
    }
  };

  const onDescriptionChangeHandler = (description) => {
    setDescription(description);
  };

  const onSubmitHandler = () => {
    const uuid = () => {
      return Math.floor(Math.random() * 100000).toString();
    };
    //month 0-11 hence -1 val
    //const dateInput = new Date(dateObj.year,(dateObj.month + 1),dateObj.day,timeObj.hour,timeObj.min);
    //create random key to add below
    const newToDo = {
      key: uuid(),
      complete: false,
      item: title,
      description: description,
      date: {
        full: date,
        year: date.getFullYear().toString(),
        month: date.getMonth().toString(),
        day: date.getDate().toString(),
      },
    };

    //dispatch({type: "add", payload: {data: xxxxx, title: xxxxxx}})
    if (title !== "" && description !== "") {
      reducerContext.dispatch({
        type: "add",
        payload: { data: newToDo, title: titlePicker },
      });
    }

    if (newGroupDescription !== "") {
      //dispatch({type: "edit group", payload: {oldTitle: xxxxx, newTitle: xxxx, newDescription: xxxxx}})
      reducerContext.dispatch({
        type: "edit group desc",
        payload: { oldTitle: titlePicker, newDescription: newGroupDescription },
      });
    }

    // const groupUpdate = {oldTitle: titlePicker, newTitle: newGroupTitle.toString(), newDescription: newGroupDescription.toString()}
    if (newGroupTitle !== "") {
      //dispatch({type: "edit group", payload: {oldTitle: xxxxx, newTitle: xxxx, newDescription: xxxxx}})
      reducerContext.dispatch({
        type: "edit group title",
        payload: { oldTitle: titlePicker, newTitle: newGroupTitle },
      });
    }

    //handle add, possibly pass as a drilled prop
    props.onToggleHandler();
  };

  const clearHandler = () => {
    setTitle("");
    setId("");
    setDescription("");
    //date/time handled in the DatePickers
    setPriority("");
    setAlarm("");
    // setColourLabel("");
    setSwitch(false);
  };

  //https://docs.expo.io/versions/latest/react-native/alert/
  const onCancelHandler = () => {
    Alert.alert("Are You Sure?", "All content will be lost...", [
      { text: "Cancel", onPress: clearHandler() },
      { text: "Okay" },
    ]);
  };

  const groupTitleUpdateHandler = (title) => {
    if (title.length >= 0 && title.length <= 13) {
      setNewGroupTitle(title);
    }
  };

  const groupDescUpdateHandler = (description) => {
    setNewGroupDescription(description);
  };
  // const onPickerChangeHandler = () => {
  //   setPicker({ currVal: picker });
  // };

  // const [modalOptions, setModalOptions] = useState([
  //   {key: 1, colour: "Green"},
  //   {key: 2, colour: "Blue"},
  //   {key: 3, colour: "Red"}]);

  //   const [modalToggle, setModalToggle] = useState(false);

  //   const modalToggleHandler = (modalToggle)=>{
  //     setModalToggle(modalToggle => !modalToggle);
  //   };

  const titleSelectHandler = (item) => {
    setTitlePicker(item.title);
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={{ marginTop: 5, fontSize: 19 }}>
          TODO Title: Length:{" "}
          <Text
            style={{
              color:
                title.length == 0
                  ? "black"
                  : title.length < 1 || title.length > 13
                  ? "red"
                  : "green",
            }}
          >
            {title.length}
          </Text>
        </Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Title"
          onChangeText={onTitleChangeHandler}
          value={title}
        />
        <Text style={{ fontSize: 19 }}>TODO Description:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Description"
          onChangeText={onDescriptionChangeHandler}
          value={description}
        />
        <CustomSelect
          state={reducerContext.state}
          titlePicker={titlePicker}
          setTitlePicker={setTitlePicker}
        />
        {/* <Text style={{marginTop: 10}}>Edit: Selected = {titlePicker}</Text> */}
        <TextInput
          style={[styles.textInput, { marginTop: 15 }]}
          placeholder="Edit Group Title"
          onChangeText={groupTitleUpdateHandler}
          value={newGroupTitle}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Edit Group Description"
          onChangeText={groupDescUpdateHandler}
          value={newGroupDescription}
        />
      </View>
      <DateTimer date={date} setDate={setDate} />
      {/* <DateTime 
        setDate={setDateObj} 
        setTime={setTimeObj} 
      /> */}
      <View>
        {/* <Text>Selected Date:{}</Text>
        <Text>Selected Time:{}</Text> */}
      </View>
      {/* <View>
        <CustomSwitch
          label="Strict Mode [No Overlaps]"
          switch={switcher}
          SwitchHandler={SwitchHandler}
        />
      </View> */}
      <View style={styles.buttonView}>
        <View style={styles.buttonLength}>
          <CustomButton
            style={styles.button}
            clickHandler={() => onSubmitHandler(titlePicker)}
          >
            Submit
          </CustomButton>
        </View>
        <View style={styles.buttonLength}>
          {/* due to toggle create new functionality, on submit needs to toggle same as cancel but with additional information submission */}
          <CustomButton
            style={styles.button}
            clickHandler={props.onToggleHandler}
          >
            Cancel
          </CustomButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#cae1ff",
    marginHorizontal: 0,
  },
  buttonView: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-evenly",
    margin: 4,
    paddingHorizontal: 7,
    alignItems: "center",
    marginTop: 10,
  },
  buttonLength: {
    width: "46.5%",
  },
  textInput: {
    borderStyle: "solid",
    borderColor: "#a04486",
    borderWidth: 2,
    borderRadius: 5,
    padding: 3,
    paddingHorizontal: 8,
    marginVertical: 3,
    width: 270,
    fontSize: 19,
  },
  pickerInput: {
    justifyContent: "space-between",
    flexDirection: "row",
    borderStyle: "solid",
    borderColor: "#a04486",
    borderWidth: 2,
    borderRadius: 5,
    padding: 3,
    paddingHorizontal: 8,
    marginVertical: 3,
    width: 225,
    fontSize: 15,
  },
  textPicker: {
    fontSize: 16,
  },
});

export default CreateNew;
