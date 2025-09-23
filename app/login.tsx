import { Text } from "react-native";

import { useAuthStore } from "@/store/authStore";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  const { login } = useAuthStore();

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text
        onPress={() => {
          login();
        }}
      >
        Sign In
      </Text>
    </SafeAreaView>
  );
}
