import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import { OtpInput } from "react-native-otp-entry";

import { useAuthStore } from "@/store/authStore";

const OtpScreen = () => {
  const { setPasswordScreen } = useAuthStore();
  const router = useRouter();

  const handleOtpFilled = (otp: string) => {
    // console.log(`OTP is ${otp}`);
    setPasswordScreen();
    router.navigate("/verify/password");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Verify Otp Screen</Text>
      <View style={{ width: "80%", marginTop: 20 }}>
        <OtpInput
          //   numberOfDigits={6}
          //   onTextChange={(text) => console.log(text)}
          //   secureTextEntry={true}
          focusColor="green"
          type="numeric"
          onFilled={handleOtpFilled}
        />
      </View>
    </View>
  );
};

export default OtpScreen;
