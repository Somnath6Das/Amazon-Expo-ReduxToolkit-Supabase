import { AmazonEmberBold, AmazonEmberlight } from "@/utils/Constant";
import { Pressable, Text } from "react-native";

export function HeaderTitleApp() {
  return (
    <Text style={{ fontSize: 18, fontFamily: AmazonEmberBold }}>Amazon.in</Text>
  );
}
export function HeaderLeftBack({ onPress }: { onPress: VoidFunction }) {
  return (
    <Pressable onPress={onPress}>
      <Text style={{ fontSize: 18, fontFamily: AmazonEmberlight }}>Back</Text>
    </Pressable>
  );
}
