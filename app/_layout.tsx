import Header from "@/components/Shared/header/Header";
import { setSession } from "@/store/authSlice";
import store from "@/store/store";
import { supabase } from "@/supabase";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
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

function AppContent() {
  const dispatch = useDispatch();

  const [loaded, error] = useFonts({
    "Amazon-Ember-Bold": require("@/assets/fonts/Amazon-Ember-Bold.ttf"),
    "Amazon-Ember-Light": require("@/assets/fonts/Amazon-Ember-Light.ttf"),
    "Amazon-Ember": require("@/assets/fonts/Amazon-Ember.ttf"),
    "Amazon-Ember-Medium": require("@/assets/fonts/Amazon-Ember-Medium.ttf"),
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

    if (loaded || error) {
      setTimeout(() => SplashScreen.hideAsync(), 1000);
    }
    return () => {
      subscription?.unsubscribe();
    };
  }, [loaded, error, dispatch]);

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
    </Stack>
  );
}
export default function RootLayout() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}
