import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";

export const Routes = () => {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = (user: any) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscribe = auth.onAuthStateChanged(onAuthStateChanged);
    return subscribe;
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
