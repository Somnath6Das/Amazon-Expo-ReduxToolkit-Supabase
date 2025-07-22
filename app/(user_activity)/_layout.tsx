import Header from "@/components/Shared/header/Header";
import { router, Stack, useNavigation } from "expo-router";
import { useLayoutEffect } from "react";
import { Pressable, Text } from "react-native";

export default function Layout() {
  const navigation = useNavigation();
  const onGoBack = () => router.back();
  useLayoutEffect(() => {
    navigation.setOptions({
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
    });
  }, [navigation]);
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="product_ordered"
        options={{
          headerShown: true,
          header: (props) => <Header {...props} />,
          gestureEnabled: true,
        }}
      />
      <Stack.Screen
        name="seller_page"
        options={{
          headerShown: true,
          header: (props) => <Header {...props} />,
          gestureEnabled: true,
        }}
      />
      <Stack.Screen
        name="create_product"
        options={{
          headerShown: true,
          header: (props) => <Header {...props} />,
          gestureEnabled: true,
        }}
      />
    </Stack>
  );
}
