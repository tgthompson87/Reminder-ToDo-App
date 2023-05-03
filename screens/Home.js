import React, { useState, useContext } from "react";
import { StyleSheet, View, Text, Button, FlatList, Modal } from "react-native";
import CustomFlatList from "../components/CustomFlatList";
import CustomButton from "../components/CustomButton";
import CreateNew from "./CreateNew";

import AsyncStorage from "@react-native-async-storage/async-storage";

//importing context useContext pattern
import { StateContext } from "../model/model";

const Home = (props) => {
  //state context to pass to flatlist/create new
  const reducerContext = useContext(StateContext);

  const [toggle, setToggle] = useState(false);
  const onToggleHandler = () => {
    setToggle((prevState) => !prevState);
  };

  const [getValue, setGetValue] = useState({ num: 45 });
  const [value, setValue] = useState();

  const saveValueFunction = () => {
    //function to save the value in AsyncStorage
    if (getValue) {
      //To check the input not empty
      const update = JSON.stringify(getValue);
      AsyncStorage.setItem("any_key_here", update);
      //Setting a data to a AsyncStorage with respect to a key
    }
  };

  //saveValueFunction();

  const getValueFunction = () => {
    //function to get the value from AsyncStorage
    AsyncStorage.getItem("any_key_here").then((value) => {
      //AsyncStorage returns a promise so adding a callback to get the value
      const obj = JSON.parse(value);
      setGetValue(obj);
      //Setting the value in Text
    });
  };
  //getValueFunction();

  const getFunction = () => {
    //function to get the value from AsyncStorage
    AsyncStorage.getItem("any_keytrtert").then((value) => {
      //AsyncStorage returns a promise so adding a callback to get the value
      const val = JSON.stringify(value);
      setValue(val);
      //Setting the value in Text
    });
  };
  //getFunction()

  const Rendered = ({ children }) => {
    return <Text>{children}</Text>;
  };

  return (
    <View style={styles.container}>
      {toggle && (
        <Modal>
          <CreateNew
            dispatch={reducerContext.dispatch}
            onToggleHandler={onToggleHandler}
          />
        </Modal>
      )}

      <CustomButton style={styles.createButton} clickHandler={onToggleHandler}>
        Create New
      </CustomButton>

      <View style={{ flex: 1 }}>
        {/* <Text>Testing Async Call: {getValue === null ? "not found" : typeof getValue.num}</Text>
        <Text>{getValue.num}</Text>
        <Rendered>value inside jsx: {getValue.num}</Rendered>
        <Text>Unfound Value Type: {typeof value} Value: "{value}"</Text> */}
        <CustomFlatList
          state={reducerContext.state}
          dispatch={reducerContext.dispatch}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  modal: {},
  createButton: {},
});

export default Home;
