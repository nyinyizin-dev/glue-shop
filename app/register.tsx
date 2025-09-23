import { Link, useRouter } from "expo-router";
import { Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuthStore } from "@/store/authStore";

const Register = () => {
  const { setOtpScreen } = useAuthStore();
  const router = useRouter();

  const handleOtpScreen = () => {
    setOtpScreen();
    router.navigate("/verify");
  };

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text>Register Screen</Text>
      <Link href="/login" style={{ fontSize: 24 }}>
        Login
      </Link>
      <Button title="Go to OTP Screen" onPress={handleOtpScreen} />
    </SafeAreaView>
  );
};

export default Register;
