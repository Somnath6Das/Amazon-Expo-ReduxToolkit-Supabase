import { Image, Text, View } from "react-native";
type OrderRow = {
  id: number;
  is_delivered: boolean;
  image: string;
  product_name: string;
  delivery_address: string;
  current_price: number;
  delivery_date: string;
};
export default function OrdersCard({ order }: { order: OrderRow }) {
  return (
    <>
      <View
        style={{
          height: 100,
          width: "100%",
          flexDirection: "row",
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
        <View style={{ justifyContent: "center" }}>
          <Text style={{ fontSize: 18, fontFamily: "Amazon-Ember-Bold" }}>
            {order.product_name.split(" ").length > 4
              ? order.product_name.split(" ").slice(0, 4).join(" ") + "..."
              : order.product_name}
          </Text>
          <Text>{`₹ ${order.current_price}`}</Text>
          <Text>{order.delivery_date}</Text>
          {order.is_delivered ? (
            <Text>Product Deliverd</Text>
          ) : (
            <Text>Delivery Pending...</Text>
          )}
        </View>
      </View>
      <View
        style={{ backgroundColor: "#d8d8d8ff", height: 2, width: "100%" }}
      />
    </>
  );
}
