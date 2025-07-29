import EvilIcons from "@expo/vector-icons/EvilIcons";
import { View } from "react-native";

export default function ThanksBuying() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <EvilIcons name="check" size={24} color="black" />
    </View>
  );
}
