import React from "react";
import { StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Home from "../screens/Home";
import Daily from "../screens/Daily";
import About from "../screens/About";

const Stack = createStackNavigator();
//https://reactnavigation.org/docs/hello-react-navigation
const Tab = createBottomTabNavigator();
//https://reactnavigation.org/docs/tab-based-navigation
const Drawer = createDrawerNavigator();
//https://reactnavigation.org/docs/drawer-based-navigation

const HomeStack = (props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerTintColor: "#9257ae",
          headerRight: () => (
            <FontAwesome
              name="navicon"
              size={24}
              color="#9257ae"
              style={styles.headerButton}
              onPress={() => {
                props.navigation.openDrawer();
              }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const DailyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Daily"
        component={Daily}
        options={{
          headerTintColor: "#9257ae",
          headerRight: () => (
            <FontAwesome
              name="navicon"
              size={24}
              color="#9257ae"
              style={styles.headerButton}
              onPress={(props) => {
                props.navigation.openDrawer();
              }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const AboutStack = (props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="About"
        component={About}
        options={{
          headerTintColor: "#9257ae",
          headerRight: () => (
            <FontAwesome
              name="navicon"
              size={24}
              color="#9257ae"
              style={styles.headerButton}
              onPress={() => {
                props.navigation.openDrawer();
              }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: () => (
            <FontAwesome name="home" size={24} color="#9257ae" />
          ),
        }}
      />
      <Tab.Screen
        name="Daily"
        component={DailyStack}
        options={{
          tabBarIcon: () => (
            <FontAwesome name="list-alt" size={24} color="#9257ae" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Login">
      <Drawer.Screen name="Main" component={TabNavigator} />
      <Drawer.Screen name="About" component={AboutStack} />
    </Drawer.Navigator>
  );
};

const NavigationController = () => {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  headerButton: {
    paddingRight: 15,
  },
});

export default NavigationController;
