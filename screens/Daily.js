import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { StateContext } from "../model/model";
import { FontAwesome } from "@expo/vector-icons";

const Daily = (props) => {
  const reducerContext = useContext(StateContext);
  //instantiates date comparison object
  const currentDate = new Date();
  const currentDateObj = {
    full: currentDate,
    year: currentDate.getFullYear(),
    month: currentDate.getMonth(),
    day: currentDate.getDate(),
  };
  //for list render tbc
  const [toggleToDo, setToggleToDo] = useState(false);
  const [moreInfo, setMoreInfo] = useState("");

  // useEffect(()=>{
  //   const updateOnLoad = props.navigation.addListener('focus', ()=>{
  //     props.navigation.replace("Daily");
  //   })
  //   return updateOnLoad
  // }, [props.navigation]);
  // props.navigation.addListener('focus', ()=>{
  //   props.navigation.replace("Daily");
  // })

  const refresh = () => {
    props.navigation.replace("Daily");
  };

  // useEffect(()=>{
  //   props.navigation.replace("Daily");
  // },[])

  const dailyItems = reducerContext.state.map((group) => {
    const uuid = () => {
      return Math.floor(Math.random() * 100000).toString();
    };

    return (
      <View key={uuid()}>
        {group.items.map((i) => {
          if (
            i.date.year == currentDateObj.year &&
            i.date.month == currentDateObj.month &&
            i.date.day == currentDateObj.day
          ) {
            const toggleHandler = ({ reducerContext, group, i }) => {
              reducerContext.dispatch({
                type: "toggle",
                payload: { title: group.title, itemKey: i.key },
              });
            };

            return (
              <View
                key={uuid()}
                style={[
                  styles.card,
                  {
                    backgroundColor: i.complete ? "#93E6BD" : "#F0AAA9",
                    marginHorizontal: 15,
                  },
                ]}
              >
                <Text style={styles.fontSize}>
                  <Text style={styles.bold}>Group:</Text> {group.title}
                </Text>
                <Text style={styles.fontSize}>
                  <Text style={styles.bold}>Title:</Text> {i.item}
                </Text>
                <Text style={styles.fontSize}>
                  <Text style={styles.bold}>Description:</Text> {i.description}
                </Text>
                <Text style={styles.fontSize}>
                  <Text style={styles.bold}>Time:</Text>{" "}
                  {i.date.full.getHours()}:
                  {i.date.full.getMinutes() < 10
                    ? "0" + i.date.full.getMinutes().toString()
                    : i.date.full.getMinutes()}
                </Text>
                <Text style={styles.fontSize}>
                  <Text style={styles.bold}>Completed:</Text>{" "}
                  {i.complete ? "Completed" : "Unfinished"}
                </Text>
              </View>
            );
          }
          return (
            <View key={uuid()} style={{ display: "none" }}>
              <Text>{i.item}</Text>
            </View>
          );
        })}
      </View>
    );
  });

  const ItemRender = ({ children }) => {
    const uuid = () => {
      return Math.floor(Math.random() * 100000).toString();
    };
    return (
      <>
        {children.map((item) => (
          <View key={uuid()}>{item}</View>
        ))}
      </>
    );
  };

  return (
    <View style={styles.container}>
      <View style={[styles.card, styles.background]}>
        <TouchableWithoutFeedback onPress={refresh}>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ paddingTop: 5, paddingLeft: 4 }}>
              Made Changes? Tap Here To Update!
            </Text>
            <FontAwesome
              name="refresh"
              size={30}
              color="#d05bcf"
              style={[styles.icons, { paddingLeft: 20 }]}
              onPress={refresh}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <ScrollView>
        {/* <ItemRender> */}
        {dailyItems}
        {/* </ItemRender> */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "white",
    margin: 10,
    borderRadius: 5,
  },
  bold: {
    fontWeight: "bold",
  },
  card: {
    flexDirection: "column",
    justifyContent: "space-between",
    borderStyle: "solid",
    borderColor: "#9257ae",
    borderWidth: 1,
    borderRadius: 10,
    padding: 4,
    margin: 5,
  },
  background: {
    backgroundColor: "#F5F0AC",
    marginHorizontal: 15,
    paddingLeft: 17,
  },
  list: {
    flexDirection: "column",
    justifyContent: "space-between",
    margin: 2,
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: 3,
  },
  detailsText: {
    padding: 10,
  },
  listText: {
    padding: 10,
    flex: 1,
  },
  fontSize: {
    fontSize: 17,
  },
});

export default Daily;
