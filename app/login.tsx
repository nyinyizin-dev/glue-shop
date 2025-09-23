import { Link } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuthStore } from "@/store/authStore";

export default function Login() {
  const { login } = useAuthStore();

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text
        style={{ fontSize: 24, marginBottom: 20 }}
        onPress={() => {
          login();
        }}
      >
        Sign In
      </Text>
      <Link href="/register" style={{ fontSize: 24 }}>
        Register
      </Link>
    </SafeAreaView>
  );
}
