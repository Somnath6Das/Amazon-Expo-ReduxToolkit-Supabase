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
          gestureEnabled: true,
          headerLeft: () => <HeaderLeftBack onPress={onGoBack} />,
          headerTitle: () => <HeaderTitleApp />,
        }}
      />
    </Stack>
  );
}
