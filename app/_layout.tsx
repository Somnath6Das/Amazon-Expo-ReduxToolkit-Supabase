import Header from "@/components/Shared/header/Header";
import store from "@/store/store";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Provider } from "react-redux";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "Amazon-Ember-Bold": require("@/assets/fonts/Amazon-Ember-Bold.ttf"),
    "Amazon-Ember-Light": require("@/assets/fonts/Amazon-Ember-Light.ttf"),
    "Amazon-Ember": require("@/assets/fonts/Amazon-Ember.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      setTimeout(() => SplashScreen.hideAsync(), 1000);
    }
  }, [error, loaded]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Provider store={store}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="index"
          options={{
            headerShown: true,
            header: (props) => <Header {...props} />,
            presentation: "fullScreenModal",
          }}
        />
      </Stack>
    </Provider>
  );
}
