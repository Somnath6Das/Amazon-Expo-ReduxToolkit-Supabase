import Header from "@/components/Shared/header/Header";
import { setSession } from "@/store/authSlice";
import store from "@/store/store";
import { supabase } from "@/supabase";
import { Session } from "@supabase/supabase-js";
import { useFonts } from "expo-font";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { AppState } from "react-native";
import { Provider, useDispatch } from "react-redux";

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
  const [useSession, setUseSession] = useState<Session | null>();
  const [loaded, error] = useFonts({
    "Amazon-Ember-Bold": require("@/assets/fonts/Amazon-Ember-Bold.ttf"),
    "Amazon-Ember-Light": require("@/assets/fonts/Amazon-Ember-Light.ttf"),
    "Amazon-Ember": require("@/assets/fonts/Amazon-Ember.ttf"),
  });
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      dispatch(setSession(session));
      setUseSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      dispatch(setSession(session));
      setUseSession(session);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [dispatch]);

  useEffect(() => {
    if (loaded || error) {
      if (useSession) {
        router.replace("/(tabs)");
      }
      setTimeout(() => SplashScreen.hideAsync(), 1000);
    }
  }, [error, loaded, useSession]);

  if (!loaded && !error) {
    return null;
  }

  return (
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
export default function RootLayout() {
  return (
    <Provider store={store}>
      <Layout />
    </Provider>
  );
}
