import { setSession } from "@/store/authSlice";
import store, { RootState, persistor } from "@/store/store";
import { supabase } from "@/supabase";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { ActivityIndicator, AppState, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider, useDispatch, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

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
    AmazonEmberBold: require("@/assets/fonts/Amazon-Ember-Bold.ttf"),
    AmazonEmberlight: require("@/assets/fonts/Amazon-Ember-Light.ttf"),
    AmazonEmber: require("@/assets/fonts/Amazon-Ember.ttf"),
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
    <>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(auth)" />
      </Stack>
    </>
  );
}
export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        <PersistGate
          loading={
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator size="large" />
            </View>
          }
          persistor={persistor}
        >
          <Layout />
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}
