import { DefaultButton } from "@/components/Shared/DefaultButton";
import OtpNumInput from "@/components/Shared/OtpNumInput";
import { setSession } from "@/store/authSlice";
import { supabase } from "@/supabase";
import { Session } from "@supabase/supabase-js";
import { Checkbox } from "expo-checkbox";
import { router, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  AppState,
  Dimensions,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
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
  "OTP" = 2,
  "PASSWORD" = 3,
}
export default function Login() {
  const dispatch = useDispatch();
  const [useSession, setUseSession] = useState<Session | null>();
  const navigation = useNavigation();
  const [step, setStep] = useState(Step.EMAIL);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
  function register() {
    supabase.auth
      .signUp({ email, password })
      .then(onGoBack)
      .catch((err) => Alert.alert("Error", err.message));
  }

  function login() {
    supabase.auth
      .signInWithPassword({ email, password })
      .then(({ error }) => {
        if (error) return register();
        else onGoBack();
      })
      .catch(register);
  }
  const onGoBack = () => router.back();
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable onPress={onGoBack}>
          <Text style={{ fontSize: 18, fontWeight: 800 }}>Back</Text>
        </Pressable>
      ),
      headerTitle: () => (
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Amazon.in</Text>
      ),
    });
  }, [navigation, navigation.setOptions]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        padding: 20,
        gap: 20,
        backgroundColor: "white",
      }}
    >
      <Text
        style={{
          alignSelf: "flex-start",
          fontSize: 20,
          fontWeight: "bold",
          fontFamily: "Amazon-Ember-Bold",
        }}
      >
        Sign in {step === Step.EMAIL && "or create an account"}
      </Text>

      <View style={{ width: "100%", gap: 15 }}>
        {step === Step.EMAIL ? (
          <Text
            style={{
              alignSelf: "flex-start",
              fontSize: 16,
              fontWeight: "bold",
              fontFamily: "Amazon-Ember",
            }}
          >
            Enter Email
          </Text>
        ) : (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Text
              style={{
                alignSelf: "flex-start",
                fontSize: 16,
                fontWeight: "bold",
                fontFamily: "Amazon-Ember",
              }}
            >
              {email}
            </Text>
            <Pressable onPress={() => setStep(Step.EMAIL)}>
              <Text
                style={{
                  textDecorationLine: "underline",
                  color: "#f1b101ff",
                }}
              >
                Change
              </Text>
            </Pressable>
          </View>
        )}

        {step === Step.EMAIL ? (
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={{
              borderWidth: 1,
              borderRadius: 4,
              borderColor: "#ccc",
              padding: 10,
              fontFamily: "Amazon-Ember",
            }}
            placeholder="Email"
            autoCapitalize="none"
            autoCorrect={false}
          />
        ) : step === Step.OTP ? (
          <OtpNumInput onTextChange={setOtp} />
        ) : (
          <>
            <TextInput
              value={password}
              onChangeText={setPassword}
              style={{
                borderWidth: 1,
                borderRadius: 4,
                borderColor: "#ccc",
                padding: 10,
              }}
              placeholder="Password"
              secureTextEntry={!showPassword}
            />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Checkbox
                value={showPassword}
                onValueChange={setShowPassword}
                style={{ margin: 8 }}
                color={showPassword ? "#f1b023ff" : undefined}
              />
              <Text>Show Password</Text>
            </View>
          </>
        )}
      </View>

      <DefaultButton
        style={[
          {
            width: "100%",
          },
          email.length < 5 && { opacity: 0.5 },
        ]}
        onPress={() => {
          if (step === Step.EMAIL) {
            setStep(Step.OTP);
          } else if (step === Step.OTP) {
            setStep(Step.PASSWORD);
          } else login();
        }}
        disabled={email.length < 5}
      >
        {step === Step.EMAIL ? "Continue" : "Sign In"}
      </DefaultButton>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontFamily: "Amazon-Ember-Light" }}>
          By continuing, you agree to Amazon&apos;s{" "}
        </Text>
        <Text
          style={{
            textDecorationLine: "underline",
            color: "#146eb4",
            fontFamily: "Amazon-Ember-Light",
          }}
        >
          Conditions
        </Text>
      </View>

      <View
        style={{
          marginTop: 10,
          height: 3,
          backgroundColor: "lightgray",
          width: Dimensions.get("window").width,
        }}
      />

      <View style={{ gap: 20 }}>
        <View style={{ flexDirection: "row", gap: 20 }}>
          {["Conditions of use", "Privacy Notice", "Help"].map((link) => (
            <Text
              key={link}
              style={{
                fontSize: 16,
                textDecorationLine: "underline",
                color: "#146eb4",
                fontFamily: "Amazon-Ember-Light",
              }}
            >
              {link}
            </Text>
          ))}
        </View>
        <Text style={{ color: "gray", fontSize: 14 }}>
          © 1996-2021, Amazon.com, Inc. or its affiliates.
        </Text>
      </View>
    </View>
  );
}
