import { RootState } from "@/store/store";
import { supabase } from "@/supabase";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useLayoutEffect, useState } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";

export default function BuyHere() {
  const session = useSelector((state: RootState) => state.auth.session);
  const [product, setProduct] = useState<any | null>(null);
  const [address, setAddress] = useState<any | null>(null);
  const { productId } = useLocalSearchParams();

  const getUserProduct = async () => {
    let { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", productId)
      .single();
    setProduct(data);
    const { data: address, error: err } = await supabase
      .from("profiles")
      .select("full_name, location")
      .eq("id", session?.user.id)
      .single();
    setAddress(address);
    console.log(address?.location);
    console.log(data.name);
  };

  useEffect(() => {
    getUserProduct();
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
      {address?.location ? (
        <>
          <Text style={{ fontFamily: "Amazon-Ember" }}>
            {address?.location}
          </Text>
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
      <Text>{product?.name ?? null}</Text>
    </View>
  );
}
