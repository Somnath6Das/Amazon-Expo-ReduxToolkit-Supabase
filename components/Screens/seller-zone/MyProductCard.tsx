import { Product } from "@/types/product";
import { Image, Text, View } from "react-native";

interface Props {
  product: Product;
}
export default function MyProductCard({ product }: Props) {
  return (
    <View
      style={{
        height: 70,
        width: "100%",
        flexDirection: "row",
        backgroundColor: "#d8d8d8ff",
        marginTop: 20,
        paddingVertical: 14,
        borderRadius: 10,
      }}
    >
      <Image
        source={{ uri: product.imageUrl ?? "" }}
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
          width: 160,
          flexWrap: "wrap",
          fontFamily: "Amazon-Ember",
        }}
      >
        {product.name.split(" ").length > 8
          ? product.name.split(" ").slice(0, 8).join(" ") + "..."
          : product.name}
      </Text>
      <Text
        style={{
          fontSize: 14,
          alignSelf: "flex-start",
          width: 80,
          flexWrap: "wrap",
          fontFamily: "Amazon-Ember",
        }}
      >{`C.P ₹${product.currentPrice}`}</Text>
      <Text
        style={{
          fontSize: 14,
          alignSelf: "flex-start",
          width: 80,
          flexWrap: "wrap",
          fontFamily: "Amazon-Ember",
        }}
      >{`D.P ₹${product.deliveryPrice}`}</Text>
    </View>
  );
}
