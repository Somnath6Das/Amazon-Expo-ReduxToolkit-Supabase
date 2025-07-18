import { RootState } from "@/store/store";
import { Redirect, Stack } from "expo-router";
import { useSelector } from "react-redux";

export default function Layout() {
  const session = useSelector((state: RootState) => state.auth.session);
  if (!session) {
    return <Redirect href="/(auth)" />;
  }
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
