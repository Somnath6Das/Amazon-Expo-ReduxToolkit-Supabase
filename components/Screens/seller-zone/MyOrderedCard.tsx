import { Order } from "@/types/order";
import { Text, View } from "react-native";

interface Props {
  order: Order;
}
export default function MyOrderedCard({ order }: Props) {
  return (
    <View>
      <Text style={{ backgroundColor: "red" }}>Order</Text>
    </View>
  );
}
