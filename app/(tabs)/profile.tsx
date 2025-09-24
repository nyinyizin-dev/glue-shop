import React from "react";
import { Text, View } from "react-native";

import { useAuthStore } from "@/store/authStore";

const Profile = () => {
  const { logout } = useAuthStore();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text
        style={{ fontSize: 24 }}
        onPress={() => {
          logout();
        }}
      >
        Sign Out
      </Text>
    </View>
  );
};

export default Profile;
