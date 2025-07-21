import Header from "@/components/Shared/header/Header";
import { Stack } from "expo-router";

export default function Layout() {
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
    </Stack>
  );
}
