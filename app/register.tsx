import { Link } from "expo-router";
import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Register = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text>Register Screen</Text>
      <Link href="/login" style={{ fontSize: 24 }}>
        Login
      </Link>
    </SafeAreaView>
  );
};

export default Register;
