import { Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

const Detail = () => {
  return (
    <SafeAreaView>
      <Link href="../">Back to Home</Link>
      <Text>Detail</Text>
    </SafeAreaView>
  );
};

export default Detail;
