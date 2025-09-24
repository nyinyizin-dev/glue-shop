import { Button, Text, View } from "react-native";

import { useAuthStore } from "@/store/authStore";

const Password = () => {
  const { login } = useAuthStore();

  const handleLogin = () => {
    login();
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24 }}>Password Screen</Text>
      <Button title="submit" onPress={handleLogin} />
    </View>
  );
};

export default Password;
