import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { AppOnBoarding } from "../screens/AppOnBoarding";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const Stack = createStackNavigator();

const LaunchEnum = {
  ALREADY_LAUNCH: "alreadyLaunched",
};
const AuthStack = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(true);
  let routeName;

  useEffect(() => {
    AsyncStorage.getItem(LaunchEnum.ALREADY_LAUNCH).then((value) => {
      console.log(`Async value: ${value}`);
      if (value == null) {
        AsyncStorage.setItem(LaunchEnum.ALREADY_LAUNCH, "true");
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(true);
      }
    });
  }, []);
  if (isFirstLaunch == null) {
    return null;
  } else if (isFirstLaunch == true) {
    routeName = "Onboarding";
  } else {
    routeName = "Login";
  }

  return (
    <Stack.Navigator initialRouteName={routeName}>
      <Stack.Screen
        name="Onboarding"
        component={AppOnBoarding}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={({ navigation }) => ({
          title: "",
          headerStyle: {
            backgroundColor: "#f9fafd",
            shadowColor: "#f9fafd",
            elevation: 0,
          },
          headerLeft: () => (
            <View style={{ marginLeft: 10 }}>
              <FontAwesome.Button
                name="long-arrow-left"
                size={25}
                backgroundColor="#f9fafd"
                color="#333"
                onPress={() => navigation.navigate("Login")}
              />
            </View>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
