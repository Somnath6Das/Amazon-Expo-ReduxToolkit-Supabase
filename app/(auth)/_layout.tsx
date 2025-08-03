import Header from "@/components/Shared/header/Header";
import { router, Stack } from "expo-router";
import { Pressable, Text } from "react-native";

export default function Layout() {
  const onGoBack = () => router.back();
  const onGoSignIn = () => router.push("/(auth)");
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          header: (props) => <Header {...props} />,
          animation: "fade",
          headerLeft: () => (
            <Pressable onPress={onGoBack}>
              <Text style={{ fontSize: 18, fontFamily: "Amazon-Ember-Light" }}>
                Back
              </Text>
            </Pressable>
          ),
          headerTitle: () => (
            <Text style={{ fontSize: 18, fontFamily: "Amazon-Ember-Bold" }}>
              Amazon.in
            </Text>
          ),
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          headerShown: true,
          header: (props) => <Header {...props} />,
          animation: "fade",
          headerLeft: () => (
            <Pressable onPress={onGoSignIn}>
              <Text style={{ fontSize: 18, fontFamily: "Amazon-Ember-Light" }}>
                Back
              </Text>
            </Pressable>
          ),
          headerTitle: () => (
            <Text style={{ fontSize: 18, fontFamily: "Amazon-Ember-Bold" }}>
              Amazon.in
            </Text>
          ),
        }}
      />
    </Stack>
  );
}
