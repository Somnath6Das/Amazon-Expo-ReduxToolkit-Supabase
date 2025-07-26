import { RootState } from "@/store/store";
import { supabase } from "@/supabase";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useLayoutEffect, useState } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";

export default function BuyHere() {
  const session = useSelector((state: RootState) => state.auth.session);
  const [user, setUser] = useState<any | null>(null);
  const { productId } = useLocalSearchParams();

  const getUser = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select()
      .eq("id", session?.user.id)
      .single();
    setUser(data);
  };
  useEffect(() => {
    getUser();
  }, []);

  const navigation = useNavigation();
  const onGoBack = () => router.back();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable onPress={onGoBack}>
          <Text style={{ fontSize: 18, fontFamily: "Amazon-Ember-Light" }}>
            Back
          </Text>
        </Pressable>
      ),
      headerTitle: () => (
        <Text style={{ fontSize: 18, fontFamily: "Amazon-Ember-Bold" }}>
          Amazon.in
        </Text>
      ),
    });
  }, [navigation]);
  return (
    <View
      style={{ flex: 1, justifyContent: "flex-start", paddingHorizontal: 14 }}
    >
      {user?.location ? (
        <>
          <Text style={{ fontFamily: "Amazon-Ember" }}>{user?.location}</Text>
          <TouchableOpacity
            onPress={() => router.push("/buyer_ordered/location")}
          >
            <Text
              style={{
                textDecorationLine: "underline",
                color: "#3434bcff",
              }}
            >
              Change address
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity
          onPress={() => router.push("/buyer_ordered/location")}
        >
          <Text
            style={{
              textDecorationLine: "underline",
              color: "#3434bcff",
            }}
          >
            Add a address
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
