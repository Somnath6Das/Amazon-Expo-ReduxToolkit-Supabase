import Header from "@/components/Shared/header/Header";
import { router, Stack } from "expo-router";
import { Pressable, Text } from "react-native";

export default function Layout() {
  const onGoBack = () => router.back();
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="location"
        options={{
          headerShown: true,
          header: (props) => <Header {...props} />,
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
        name="buy_here"
        options={{
          headerShown: true,
          header: (props) => <Header {...props} />,
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
        name="my_order"
        options={{
          headerShown: true,
          header: (props) => <Header {...props} />,
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
        name="thanks_buying"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
