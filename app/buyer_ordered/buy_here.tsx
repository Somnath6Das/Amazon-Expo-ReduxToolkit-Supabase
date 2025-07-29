import { RootState } from "@/store/store";
import { supabase } from "@/supabase";
import { deliveryDate } from "@/utils/deliveryDate";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useLayoutEffect, useState } from "react";
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";

import { useSelector } from "react-redux";

export default function BuyHere() {
  const session = useSelector((state: RootState) => state.auth.session);
  const [address, setAddress] = useState<any | null>(null);
  const { name, quantity, deliveryInDays, productImage } =
    useLocalSearchParams();
  const imageUrl = Array.isArray(productImage)
    ? productImage[0]
    : productImage ?? "";
  const getUserProduct = async () => {
    const { data: address, error: err } = await supabase
      .from("profiles")
      .select("full_name, location")
      .eq("id", session?.user.id)
      .single();
    setAddress(address);
    // console.log(address?.location);
    // console.log(data.name);
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
          <Text
            style={{ fontFamily: "Amazon-Ember", fontSize: 22, marginTop: 10 }}
          >
            {`Delivering to ${address?.full_name}`}
          </Text>
          <Text
            style={{ fontFamily: "Amazon-Ember", fontSize: 18, marginTop: 6 }}
          >
            {address?.location}
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/buyer_ordered/location")}
          >
            <Text
              style={{
                textDecorationLine: "underline",
                color: "#3434bcff",
                fontFamily: "Amazon-Ember",
                marginTop: 8,
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
              fontFamily: "Amazon-Ember",
            }}
          >
            Add a address
          </Text>
        </TouchableOpacity>
      )}
      <View
        style={{
          width: "100%",
          height: 2,
          backgroundColor: "#b1b1b1ff",
          marginTop: 10,
        }}
      />

      <Text
        style={{ fontFamily: "Amazon-Ember", fontSize: 18, marginTop: 6 }}
        // save to db
      >{`Arriving ${deliveryDate(Number(deliveryInDays))}`}</Text>
      <Text>if you order in the next 10 hours and 48 minutes</Text>
      <View
        style={{
          marginTop: 20,
          flexDirection: "row",
          padding: 20,
          backgroundColor: "#e5e5e5ff",
          height: 300,
        }}
      >
        <Image
          source={{ uri: imageUrl }}
          style={{
            height: 150,

            resizeMode: "contain",
            width: 130,
            backgroundColor: "#f8f8f8",
          }}
        />
        <View></View>
      </View>
    </View>
  );
}
