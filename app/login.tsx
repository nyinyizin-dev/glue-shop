import { router } from "expo-router";
import { Text } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useSession } from "../providers/ctx";

export default function Login() {
  const { signIn } = useSession();
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text
        onPress={() => {
          signIn();
          // Navigate after signing in. You may want to tweak this to ensure sign-in is successful before navigating.
          router.replace("/");
        }}
      >
        Sign In
      </Text>
    </SafeAreaView>
  );
}
