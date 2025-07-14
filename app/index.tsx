import { Text, View } from "react-native";

export default function Index() {
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
