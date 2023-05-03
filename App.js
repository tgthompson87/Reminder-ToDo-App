import React, { useState, useReducer, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NavigationController from "./navigation/NavigationController";
import { reducer, initialState, StateContext } from "./model/model";

const App = () => {
  const [getAsyncState, setAsyncState] = useState();

  const getAsyncStateFunction = () => {
    //function to get the value from AsyncStorage
    AsyncStorage.getItem("async_state").then((value) => {
      //AsyncStorage returns a promise so adding a callback to get the value
      setAsyncState(JSON.parse(value));
    });
  };

  //gets state async once upon first render
  useEffect(() => {
    getAsyncStateFunction();
  }, []);

  if (getAsyncState == undefined) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
      <StateContext.Provider value={{ state: state, dispatch: dispatch }}>
        <NavigationController />
      </StateContext.Provider>
    );
  } else {
    const [state, dispatch] = useReducer(reducer, getAsyncState);

    return (
      <StateContext.Provider value={{ state: state, dispatch: dispatch }}>
        <NavigationController />
      </StateContext.Provider>
    );
  }
};

export default App;
