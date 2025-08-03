import { Pressable, Text } from "react-native";

export function HeaderTitleApp() {
  return (
    <Text style={{ fontSize: 18, fontFamily: "Amazon-Ember-Bold" }}>
      Amazon.in
    </Text>
  );
}
export function HeaderLeftBack({ onPress }: { onPress: VoidFunction }) {
  return (
    <Pressable onPress={onPress}>
      <Text style={{ fontSize: 18, fontFamily: "Amazon-Ember-Light" }}>
        Back
      </Text>
    </Pressable>
  );
}
