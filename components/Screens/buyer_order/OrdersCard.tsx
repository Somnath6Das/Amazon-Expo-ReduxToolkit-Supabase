import { Image, View } from "react-native";
type OrderRow = {
  id: number;
  is_delivered: boolean;
  image: string;
  product_name: string;
  delivery_address: string;
  current_price: number;
};
export default function OrdersCard({ order }: { order: OrderRow }) {
  return (
    <View
      style={{
        height: 100,
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
          height: 80,
          width: 100,
          alignSelf: "center",
          borderRadius: 20,
        }}
      />
    </View>
  );
}
