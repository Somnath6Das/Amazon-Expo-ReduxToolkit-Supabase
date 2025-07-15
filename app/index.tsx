import { RootState } from "@/store/store";
import { router } from "expo-router";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";

enum Step {
  "EMAIL" = 1,
  "PASSWORD" = 2,
}
export default function Login() {
  const session = useSelector((state: RootState) => state.auth.session);
  if (session) {
    router.replace("/(tabs)");
  }
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontFamily: "Amazon-Ember-Bold" }}>Hello</Text>
      <Text style={{ fontFamily: "Amazon-Ember-Light" }}>Hello</Text>
      <Text style={{ fontFamily: "Amazon-Ember", fontSize: 30 }}>Hello</Text>
      <Text style={{ fontFamily: "Amazon-Ember-Medium", fontSize: 30 }}>
        Hello
      </Text>
    </View>
  );
}
