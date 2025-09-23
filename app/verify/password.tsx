import { Button, Text, View } from "react-native";

import { useAuthStore } from "@/store/authStore";

const Password = () => {
  const { login } = useAuthStore();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24 }}>Password Screen</Text>
      <Button title="submit" onPress={login} />
    </View>
  );
};

export default Password;
