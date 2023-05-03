import React from "react";
import { StyleSheet, View, Text } from "react-native";

const About = () => {
  //code
  return (
    <View style={styles.container}>
      <Text style={styles.fontSizing}>Version: 1.0.0</Text>
      <Text style={styles.fontSizing}>Author: T Thompson</Text>
      <Text style={styles.fontSizing}>Changing Group Title & Description:</Text>
      <Text style={styles.fontSizingAlt}>
        'tap' "Create New"; 'select' "Select Group" and "Edit Group Title"/"Edit
        Group Description" options.
      </Text>
      <Text style={styles.fontSizing}>Enabling New Groups:</Text>
      <Text style={styles.fontSizingAlt}>
        'tap' "Create New"; 'select' "New Group X" and "Edit Group Title"/"Edit
        Group Description" options. NOTE: A new TODO (title and description)
        must first be added to the group for it to show within the
        "Home"/"Daily" screens.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 5,
    backgroundColor: "white",
    padding: 8,
    borderRadius: 10,
    overflow: "hidden",
    margin: 5,
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: 2,
    marginTop: "35%",
  },
  fontSizing: {
    fontSize: 17,
    marginVertical: 4,
    fontWeight: "bold",
  },
  fontSizingAlt: {
    fontSize: 17,
    marginVertical: 1,
    paddingLeft: 10,
  },
});

export default About;
