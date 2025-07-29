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
        name="signup"
        options={{
          headerShown: true,
          header: (props) => <Header {...props} />,
          animation: "fade",
        }}
      />
    </Stack>
  );
}
