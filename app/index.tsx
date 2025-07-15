import { setSession } from "@/store/authSlice";
import { supabase } from "@/supabase";
import { Session } from "@supabase/supabase-js";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { AppState, Text, View } from "react-native";
import { useDispatch } from "react-redux";

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});
enum Step {
  "EMAIL" = 1,
  "PASSWORD" = 2,
}
export default function Login() {
  const dispatch = useDispatch();
  const [useSession, setUseSession] = useState<Session | null>();
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

  if (useSession) {
    router.replace("/(tabs)");
  }
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontFamily: "Amazon-Ember-Bold" }}>Hello</Text>
      <Text style={{ fontFamily: "Amazon-Ember-Light" }}>Hello</Text>
      <Text style={{ fontFamily: "Amazon-Ember", fontSize: 30 }}>Hello</Text>
      <Text style={{ fontFamily: "Amazon-Ember-Medium", fontSize: 30 }}>
        Hello
      </Text>
    </View>
  );
}
