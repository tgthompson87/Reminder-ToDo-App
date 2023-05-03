import React, { useState, useContext } from "react";
import { StateContext } from "../model/model";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
  Button,
  Modal,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { ACTIONS } from "../model/model";

//outside external group list
const Item = (props) => (
  <>
    {props.item.items.length !== 0 && (
      <TouchableOpacity
        onPress={props.onPress}
        style={[styles.item, styles.card, props.style]}
        opacity={0.1}
      >
        {/* Item titles and number of items in this section */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 12,
          }}
        >
          <Text style={styles.title}>{props.item.title} </Text>
          <View style={styles.length}>
            <Text style={styles.bold}>Contains: {props.item.items.length}</Text>
            <Text style={styles.bold}>TODOs</Text>
          </View>
        </View>
        <View style={{ display: props.showMore }}>
          {/* description of the section */}
          <Text style={{ paddingHorizontal: 5, fontSize: 17 }}>
            {props.item.description}
          </Text>
          {/* mapping out of the array of todo's within this section */}
          {props.item.items.map((i, index) => {
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
            return (
              <View
                key={i.key}
                style={[
                  styles.list,
                  { backgroundColor: i.complete ? "#93E6BD" : "#ffbaba" },
                ]}
              >
                <View style={{ flexDirection: "row" }}>
                  <View
                    style={{
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={styles.listText}>
                      <Text style={styles.bold}>Title: </Text>
                      {i.item}
                    </Text>
                    <Text style={styles.listText}>
                      <Text style={styles.bold}>Date: </Text>
                      {days[i.date.full.getDay()]} {i.date.full.getDate()}{" "}
                      {months[i.date.full.getMonth()]}
                    </Text>
                    <Text style={styles.listText}>
                      <Text style={styles.bold}>Time: </Text>
                      {i.date.full.getHours()}:
                      {i.date.full.getMinutes() < 10
                        ? "0" + i.date.full.getMinutes().toString()
                        : i.date.full.getMinutes()}
                    </Text>
                  </View>
                  {props.moreInfo !== i.key && (
                    <FontAwesome
                      name="chevron-circle-down"
                      size={30}
                      color="#d05bcf"
                      style={styles.icons}
                      onPress={() => {
                        props.setMoreInfo(i.key);
                      }}
                    />
                  )}
                  {props.moreInfo === i.key && (
                    <View style={{ width: 44 }}></View>
                  )}
                  <Text
                    style={{ paddingTop: 10, fontSize: 17, paddingLeft: 5 }}
                  >
                    {i.complete ? "Completed" : "Unfinished:"}
                  </Text>
                  {i.complete && (
                    <FontAwesome
                      name="check-square"
                      size={30}
                      color="#d05bcf"
                      style={styles.icons}
                      onPress={() => {
                        props.dispatch({
                          type: "toggle",
                          payload: { title: props.groupTitle, itemKey: i.key },
                        });
                        props.onPress();
                      }}
                    />
                  )}
                  {!i.complete && (
                    <FontAwesome
                      name="square"
                      size={30}
                      color="#d05bcf"
                      style={styles.icons}
                      onPress={() => {
                        props.dispatch({
                          type: "toggle",
                          payload: { title: props.groupTitle, itemKey: i.key },
                        });
                        props.onPress();
                      }}
                    />
                  )}
                  {/* <Text>{i.complete}</Text> */}
                </View>
                <View>
                  {props.moreInfo === i.key && (
                    <View style={styles.detailsText}>
                      {/* further details of each todo */}
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "flex-start",
                          width: "100%",
                        }}
                      >
                        <Text style={{ fontSize: 17 }}>
                          <Text style={styles.bold}>Description: </Text>
                          {props.item.items[index].description}
                        </Text>
                      </View>
                      <FontAwesome
                        name="trash"
                        size={30}
                        color="#d05bcf"
                        style={styles.icons}
                        onPress={() => {
                          props.dispatch({
                            type: "del",
                            payload: {
                              title: props.groupTitle,
                              itemKey: i.key,
                            },
                          });
                          props.onPress();
                        }}
                      />
                    </View>
                  )}
                </View>
              </View>
            );
          })}
        </View>
      </TouchableOpacity>
    )}
  </>
);

const CustomFlatList = ({ state, dispatch }) => {
  const reducerContext = useContext(StateContext);

  const [selectedId, setSelectedId] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [toggleToDo, setToggleToDo] = useState(false);
  const [moreInfo, setMoreInfo] = useState("Test");

  //deals with created item above and passed in props
  const renderItem = ({ item }) => {
    const onPressHandler = () => {
      setSelectedId(item.key);
      setToggle((prev) => (prev = !toggle));
    };

    const display = item.key === selectedId ? "flex" : "none";
    const backgroundColor = item.key === selectedId ? "#9257ae" : "#f9c2ff";

    return (
      <Item
        item={item}
        onPress={onPressHandler}
        style={{ backgroundColor }}
        showMore={display}
        toggle={toggle}
        toggleHandler={setToggle}
        toggleToDo={toggleToDo}
        setToggleToDo={setToggleToDo}
        setMoreInfo={setMoreInfo}
        moreInfo={moreInfo}
        dispatch={reducerContext.dispatch}
        groupTitle={item.title}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={state}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  icons: {
    padding: 5,
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 5,
  },
  title: {
    fontSize: 32,
  },
  card: {
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 5,
    backgroundColor: "white",
    padding: 8,
    borderRadius: 10,
    overflow: "hidden",
  },
  list: {
    flexDirection: "column",
    justifyContent: "space-between",
    margin: 2,
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 5,
  },
  listText: {
    padding: 10,
    flex: 1,
    fontSize: 17,
  },
  detailsText: {
    padding: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  bold: {
    fontWeight: "bold",
  },
  length: {
    paddingHorizontal: 17,
    alignItems: "center",
  },
  fontSize: {
    fontSize: 17,
  },
});

export default CustomFlatList;
