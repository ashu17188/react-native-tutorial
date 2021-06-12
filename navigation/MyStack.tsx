import { createStackNavigator, TransitionSpecs } from "@react-navigation/stack";
import React from "react";
import { Animated } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { HeaderStyleInterpolators } from "@react-navigation/stack";
import { AppOnBoarding } from "../screens/AppOnBoarding";

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
        name="Onboarding"
        component={AppOnBoarding}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
        }}
      />
    </Stack.Navigator>
  );
};
