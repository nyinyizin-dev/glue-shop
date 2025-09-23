import { useAuthStore } from "@/store/authStore";
import { Stack } from "expo-router";

export default function VerifyLayout() {
  const { isPasswordScreen } = useAuthStore();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Protected guard={isPasswordScreen}>
        <Stack.Screen name="password" />
      </Stack.Protected>
    </Stack>
  );
}
