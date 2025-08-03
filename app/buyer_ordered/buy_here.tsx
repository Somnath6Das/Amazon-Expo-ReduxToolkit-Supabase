import { DefaultButton } from "@/components/Shared/DefaultButton";
import { RootState } from "@/store/store";
import { supabase } from "@/supabase";
import { deliveryDate } from "@/utils/deliveryDate";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { useSelector } from "react-redux";

export default function BuyHere() {
  const session = useSelector((state: RootState) => state.auth.session);
  const [address, setAddress] = useState<any | null>(null);
  const {
    name,
    quantity,
    deliveryInDays,
    productImage,
    deliveryCharge,
    currentPrice,
    achoice,
    deliveryPrice,
    sellerId,
  } = useLocalSearchParams();
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
  }, [address]);

  const orderSaveDb = async () => {
    const { data, error } = await supabase
      .from("orders")
      .insert([
        {
          product_name: name,
          delivery_address: `${address?.full_name} ${address?.location}`,
          image: productImage,
          buyer_id: session?.user.id,
          current_price: currentPrice,
          delivery_date: deliveryDate(Number(deliveryInDays)),
          delivery_price: deliveryPrice,
          seller_id: sellerId,
          quantity,
          total: Number(deliveryPrice) * Number(quantity),
        },
      ])
      .select();
    if (!error) {
      router.push("/buyer_ordered/thanks_buying");
    }
  };
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
          height: 190,
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
        <View style={{ marginHorizontal: 10 }}>
          <Text style={{ fontSize: 20 }}>{name}</Text>
          <Text
            style={{ fontSize: 15, marginTop: 10 }}
          >{`Quantity:${quantity}`}</Text>
          <Text
            style={{ fontSize: 15, marginTop: 10 }}
          >{`₹${currentPrice}`}</Text>
          <Text>{`Delivery Charge: ₹${deliveryCharge}`}</Text>
          <Text style={{ fontSize: 15, marginTop: 10 }}>{`Sub Total: ₹${
            Number(deliveryPrice) * Number(quantity)
          }`}</Text>
          {achoice === "true" && (
            <Image
              source={require("@/assets/images/amazon-images/prime-label.png")}
              style={{
                height: 50,
                resizeMode: "contain",
                width: 60,
              }}
            />
          )}
        </View>
      </View>
      <DefaultButton onPress={orderSaveDb} style={{ marginTop: 20 }}>
        Pay with cash on delivery
      </DefaultButton>
    </View>
  );
}
