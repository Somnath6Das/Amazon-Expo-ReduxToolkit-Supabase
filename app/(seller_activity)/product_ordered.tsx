import MyOrderedCard from "@/components/Screens/seller-zone/MyOrderedCard";
import { RootState } from "@/store/store";
import { supabase } from "@/supabase";
import { Order } from "@/types/order";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";

export default function SellerZone() {
  const session = useSelector((state: RootState) => state.auth.session);
  const [ordereds, setOrdereds] = useState<Order[]>([]);

  const getMyProduct = async () => {
    const { data = [] } = await supabase
      .from("orders")
      .select("*")
      .eq("seller_id", session?.user.id)
      .order("created_at", { ascending: false });
    setOrdereds(data as Order[]);
  };
  useEffect(() => {
    getMyProduct();
  }, [ordereds]);
  return (
    <View
      style={{
        flex: 1,
        marginTop: "5%",
        paddingHorizontal: 10,
        justifyContent: "flex-start",
      }}
    >
      {ordereds.map((ordered) => (
        <MyOrderedCard key={ordered.id} order={ordered} />
      ))}
    </View>
  );
}
