import { setSession } from "@/context/authSlice";
import store from "@/context/store";
import { supabase } from "@/supabase";
import { useFonts } from "expo-font";
import { router, Stack } from "expo-router";
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

export default function RootLayout() {
  const dispatch = useDispatch();
  // const session = useSelector((state: RootState) => state.auth.session);
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

    supabase.auth.onAuthStateChange((_event, session) => {
      dispatch(setSession(session));
    });

    router.replace("/(tabs)");

    if (loaded || error) {
      setTimeout(() => SplashScreen.hideAsync(), 1000);
    }
  }, [loaded, error, dispatch]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="index" />
      </Stack>
    </Provider>
  );
}
