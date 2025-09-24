import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";
import { OtpInput } from "react-native-otp-entry";

import { useAuthStore } from "@/store/authStore";
import { formatTime } from "@/utils";

const OTP_TIMEOUT_MS = 90 * 1000; // 90 seconds

const OtpScreen = () => {
  const { setPasswordScreen } = useAuthStore();
  const router = useRouter();

  const endTimeRef = useRef(Date.now() + OTP_TIMEOUT_MS);
  const [timeLeft, setTimeLeft] = useState(() =>
    Math.ceil((endTimeRef.current - Date.now()) / 1000),
  );

  useEffect(() => {
    const id = setInterval(() => {
      const diff = endTimeRef.current - Date.now();
      setTimeLeft(Math.max(0, Math.ceil(diff / 1000)));
    }, 500);
    return () => clearInterval(id);
  }, []);

  const handleOtpFilled = (otp: string) => {
    // console.log(`OTP is ${otp}`);
    setPasswordScreen();
    router.navigate("/verify/password");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Verify Otp Screen</Text>
      <View style={{ width: "80%", marginVertical: 20 }}>
        <OtpInput
          //   numberOfDigits={6}
          //   onTextChange={(text) => console.log(text)}
          //   secureTextEntry={true}
          focusColor="green"
          type="numeric"
          onFilled={handleOtpFilled}
        />
      </View>
      <Text>Time remaining: {formatTime(timeLeft)}s</Text>
    </View>
  );
};

export default OtpScreen;
