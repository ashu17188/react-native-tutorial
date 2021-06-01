import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={style.container}>
      <Text>Home</Text>
      <Button
        title="Go to profile"
        onPress={() => navigation.navigate("Profile")}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default HomeScreen;
