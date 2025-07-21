import BottomSheetComponent from "@/components/Screens/profile/BottomSheet";
import { ProfileUnauthedBanner } from "@/components/Screens/profile/ProfileUnauthedBanner";
import { DefaultButton } from "@/components/Shared/DefaultButton";
import { RootState } from "@/store/store";
import { supabase } from "@/supabase";
import Icon from "@expo/vector-icons/Ionicons";
import BottomSheet from "@gorhom/bottom-sheet";

import { router, useFocusEffect, useNavigation } from "expo-router";
import { useCallback, useEffect, useRef } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { useSelector } from "react-redux";

export default function Profile() {
  const session = useSelector((state: RootState) => state.auth.session);
  const navigation = useNavigation();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const onClickLogin = () => router.push("/(auth)");
  const onClickSignUp = () => router.push("/(auth)/signup");

  const signOut = async () => {
    await supabase.auth.signOut();
    router.replace("/(tabs)");
  };
  const openSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerSearchShown: Boolean(session),
      headerLeft: !session
        ? () => (
            <Image
              source={require("@/assets/images/amazon-images/amazon-logo.png")}
              style={{ width: 100, height: 30 }}
            />
          )
        : null,
    });
  }, [navigation.setOptions, session]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        bottomSheetRef.current?.close();
      };
    }, [])
  );
  return (
    <>
      <ScrollView style={{ backgroundColor: "white" }}>
        {session ? (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 20,
              gap: 20,
            }}
          >
            <Pressable onPress={openSheet}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <View
                  style={{
                    height: 30,
                    width: 30,
                    borderRadius: 50,
                    backgroundColor: "gray",
                  }}
                />
                <Text style={{ fontSize: 18, fontFamily: "Amazon-Ember" }}>
                  Hello, {session?.user.email}
                </Text>

                <Icon name="chevron-down" size={20} />
              </View>
            </Pressable>
          </View>
        ) : (
          <View
            style={{ flex: 1, paddingTop: 40, alignItems: "center", gap: 45 }}
          >
            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                gap: 40,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 24,
                  fontFamily: "Amazon-Ember",
                }}
              >
                Sign in for the optimal experience
              </Text>
              <View style={{ width: "90%", gap: 15 }}>
                <DefaultButton onPress={onClickLogin}>Sign In</DefaultButton>
                <DefaultButton onPress={onClickSignUp} variant="secondary">
                  Create Account
                </DefaultButton>
              </View>
            </View>
            <ProfileUnauthedBanner />
          </View>
        )}
      </ScrollView>
      <BottomSheetComponent
        bottomSheetRef={bottomSheetRef}
        minIndex="25%"
        maxIndex="50%"
      />
    </>
  );
}
