import Header from "@/components/Shared/header/Header";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="location"
        options={{
          headerShown: true,
          header: (props) => <Header {...props} />,
        }}
      />
      <Stack.Screen
        name="buy_here"
        options={{
          headerShown: true,
          header: (props) => <Header {...props} />,
        }}
      />
      <Stack.Screen
        name="my_order"
        options={{
          headerShown: true,
          header: (props) => <Header {...props} />,
        }}
      />
    </Stack>
  );
}
