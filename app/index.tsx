import { verifyInstallation } from "nativewind";
import { Text, View } from "react-native";

export default function Index() {
  verifyInstallation();

  return (
    <View className="flex-1 justify-center items-center">
      <Text>Home</Text>
    </View>
  );
}
