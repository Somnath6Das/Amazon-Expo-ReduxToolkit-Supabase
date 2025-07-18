import Header from "@/components/Shared/header/Header";
import { Stack } from "expo-router";

export default function Layout() {
  // const session = useSelector((state: RootState) => state.auth.session);
  // if (session) {
  //   return <Redirect href="/(tabs)" />;
  // }
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          header: (props) => <Header {...props} />,
          presentation: "fullScreenModal",
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
