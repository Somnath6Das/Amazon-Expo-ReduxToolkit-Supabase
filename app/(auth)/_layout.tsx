import Header from "@/components/Shared/header/Header";
import {
  HeaderLeftBack,
  HeaderTitleApp,
} from "@/components/Shared/header/HeaderTitle";
import { router, Stack } from "expo-router";

export default function Layout() {
  const onGoBack = () => router.back();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          header: (props) => <Header {...props} />,
          animation: "fade",
          headerLeft: () => <HeaderLeftBack onPress={onGoBack} />,
          headerTitle: () => <HeaderTitleApp />,
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          headerShown: true,
          header: (props) => <Header {...props} />,
          animation: "fade",
          headerLeft: () => <HeaderLeftBack onPress={onGoBack} />,
          headerTitle: () => <HeaderTitleApp />,
        }}
      />
    </Stack>
  );
}
