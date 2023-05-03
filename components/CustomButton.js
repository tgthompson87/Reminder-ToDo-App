import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

const CustomButton = (props) => {
  return (
    <TouchableOpacity onPress={props.clickHandler} activeOpacity={0.6}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#d05bcf",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 19,
    textAlign: "center",
  },
});

export default CustomButton;
