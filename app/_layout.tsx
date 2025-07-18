import { setSession } from "@/store/authSlice";
import store, { RootState } from "@/store/store";
import { supabase } from "@/supabase";

import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { AppState } from "react-native";

import { Provider, useDispatch, useSelector } from "react-redux";

SplashScreen.preventAutoHideAsync();

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});
function Layout() {
  const dispatch = useDispatch();
  const session = useSelector((state: RootState) => state.auth.session);
  const [loaded, error] = useFonts({
    "Amazon-Ember-Bold": require("@/assets/fonts/Amazon-Ember-Bold.ttf"),
    "Amazon-Ember-Light": require("@/assets/fonts/Amazon-Ember-Light.ttf"),
    "Amazon-Ember": require("@/assets/fonts/Amazon-Ember.ttf"),
  });
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      dispatch(setSession(session));
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      dispatch(setSession(session));
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [dispatch]);

  useEffect(() => {
    if (loaded || error) {
      setTimeout(() => SplashScreen.hideAsync(), 1000);
    }
  }, [error, loaded, session]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(auth)" />
    </Stack>
  );
}
export default function RootLayout() {
  return (
    <Provider store={store}>
      <Layout />
    </Provider>
  );
}
