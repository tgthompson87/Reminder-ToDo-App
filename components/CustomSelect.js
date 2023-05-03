import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CustomSelect = ({ state, titlePicker, setTitlePicker }) => {
  const [toggleSelect, setToggleSelect] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const groupToggleHandler = () => {
    setToggleSelect((prev) => !prev);
  };

  const groupTitleHandler = (item) => {
    setTitlePicker(item.title);
    setToggleSelect((prev) => !prev);
  };

  return (
    <View style={(styles.titlePicker, { height: toggleSelect ? 150 : 30 })}>
      <TouchableOpacity onPress={groupToggleHandler}>
        <View style={styles.selectGroup}>
          <Text style={{ fontSize: 19 }}>{titlePicker}</Text>
          {toggleSelect && (
            <Ionicons name="ios-arrow-up" size={24} color="black" />
          )}
          {!toggleSelect && (
            <Ionicons name="ios-arrow-down" size={24} color="black" />
          )}
        </View>
      </TouchableOpacity>
      {toggleSelect && (
        <ScrollView>
          {state.map((item) => {
            return (
              <TouchableOpacity
                key={item.key}
                onPress={() => groupTitleHandler(item)}
              >
                <View style={styles.selectGroupOptions}>
                  <Text style={{ fontSize: 19 }}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
};

export default CustomSelect;

const styles = StyleSheet.create({
  titlePicker: {
    borderStyle: "solid",
    borderWidth: 2,
  },
  selectGroup: {
    borderStyle: "solid",
    borderColor: "#a04486",
    borderWidth: 2,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 35,
    padding: 3,
    paddingHorizontal: 8,
    marginVertical: 3,
    width: 270,
    fontSize: 19,
    marginBottom: 10,
  },
  selectGroupOptions: {
    borderStyle: "dotted",
    borderColor: "black",
    borderWidth: 1,
    height: 25,
  },
});
