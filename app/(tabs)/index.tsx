import { Button, ButtonText, ButtonSpinner } from "@/components/ui/button";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <Button variant="solid" size="md" action="primary">
        <ButtonText>Click me</ButtonText>
        <ButtonSpinner color="gray" />
      </Button>
    </SafeAreaView>
  );
}
