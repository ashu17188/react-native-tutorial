import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Animated } from "react-native";
import HomeScreen from "../components/HomeScreen";
import ProfileScreen from "../components/ProfileScreen";

const Stack = createStackNavigator();
const forFade = ({ current, next }) => {
  const opacity = Animated.add(
    current.progress,
    next ? next.progress : 0
  ).interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 1, 0],
  });

  return {
    leftButtonStyle: { opacity },
    rightButtonStyle: { opacity },
    titleStyle: { opacity },
    backgroundStyle: { opacity },
  };
};

export const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTintColor: "white",
          headerStyle: { backgroundColor: "tomato" },
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerStyleInterpolator: forFade,
        }}
      />
    </Stack.Navigator>
  );
};
