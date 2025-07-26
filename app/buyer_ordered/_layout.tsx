import Header from "@/components/Shared/header/Header";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          header: (props) => <Header {...props} />,
          animation: "fade",
        }}
      />
      <Stack.Screen
        name="location"
        options={{
          headerShown: true,
          header: (props) => <Header {...props} />,
          presentation: "fullScreenModal",
        }}
      />
      <Stack.Screen
        name="buy_here"
        options={{
          headerShown: true,
          header: (props) => <Header {...props} />,
          presentation: "fullScreenModal",
        }}
      />
    </Stack>
  );
}
