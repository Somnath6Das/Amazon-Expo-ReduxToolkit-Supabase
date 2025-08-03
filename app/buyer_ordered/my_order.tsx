import OrdersCard from "@/components/Screens/buyer_order/OrdersCard";
import { RootState } from "@/store/store";
import { supabase } from "@/supabase";
import { AmazonEmberBold } from "@/utils/Constant";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";

export default function MyOrder() {
  const session = useSelector((state: RootState) => state.auth.session);
  const [getOrder, setGetOrder] = useState<any[] | null>(null);
  const allOrders = async () => {
    let { data: orders = [], error } = await supabase
      .from("orders")
      .select("*")
      .eq("buyer_id", session?.user.id)
      .order("created_at", { ascending: false });
    setGetOrder(orders);
    // console.log(getOrder);
  };
  useEffect(() => {
    allOrders();
  }, [getOrder]);
  return (
    <View
      style={{
        flex: 1,
        marginTop: "5%",
        paddingHorizontal: 10,
        justifyContent: "flex-start",
      }}
    >
      <Text
        style={{
          fontFamily: AmazonEmberBold,
          fontSize: 25,
          marginBottom: 10,
        }}
      >
        Your Orders
      </Text>
      {getOrder?.map((order) => (
        <OrdersCard key={order.id} order={order} />
      ))}
    </View>
  );
}
