import { RootState } from "@/store/store";
import { supabase } from "@/supabase";
import Checkbox from "expo-checkbox";
import { useState } from "react";
import { Image, Text, View } from "react-native";
import { useSelector } from "react-redux";

type OrderRow = {
  id: number;
  is_delivered: boolean;
  image: string;
  product_name: string;
  delivery_address: string;
  current_price: number;
};
export default function MyOrderedCard({ order }: { order: OrderRow }) {
  const [deleverd, setDeliverd] = useState(order.is_delivered);
  const session = useSelector((state: RootState) => state.auth.session);

  const checkDelevered = async (newValue: boolean) => {
    setDeliverd(newValue);

    const { data, error } = await supabase
      .from("orders")
      .update({ is_delivered: newValue })
      .eq("id", order.id)
      .eq("seller_id", session?.user.id)
      .select();

    // console.log("Need to change RLS based on seller_id:", order.id);
    if (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <View
      style={{
        height: 70,
        width: "100%",
        flexDirection: "row",
        backgroundColor: "#d8d8d8ff",

        paddingVertical: 14,
        borderRadius: 10,
        gap: 3,
      }}
    >
      <Image
        source={{ uri: order.image ?? "" }}
        style={{
          objectFit: "contain",
          height: 50,
          width: 70,
          alignSelf: "center",
          borderRadius: 20,
        }}
      />
      <Text
        style={{
          fontSize: 16,
          alignSelf: "flex-start",
          width: 70,
          flexWrap: "wrap",
          fontFamily: "Amazon-Ember",
        }}
      >
        {order.product_name.split(" ").length > 4
          ? order.product_name.split(" ").slice(0, 8).join(" ") + "..."
          : order.product_name}
      </Text>
      <Text
        style={{
          fontSize: 16,
          alignSelf: "flex-start",
          width: 100,
          flexWrap: "wrap",
          fontFamily: "Amazon-Ember",
        }}
      >
        {order.delivery_address}
      </Text>
      <Text
        style={{
          fontSize: 14,
          alignSelf: "flex-start",
          width: 70,
          flexWrap: "wrap",
          fontFamily: "Amazon-Ember",
        }}
      >{`C.P ₹${order.current_price}`}</Text>

      <Checkbox
        value={deleverd}
        onValueChange={checkDelevered}
        style={{ margin: 8, alignSelf: "flex-start" }}
        color={deleverd ? "#f1b023ff" : undefined}
      />
    </View>
  );
}
