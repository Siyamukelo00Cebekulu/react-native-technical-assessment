
import React from "react";
import { AuthProvider } from "../context/AuthContext";
import RootNavigator from "./Navigation/RootNavigator";

export default function Index() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}
