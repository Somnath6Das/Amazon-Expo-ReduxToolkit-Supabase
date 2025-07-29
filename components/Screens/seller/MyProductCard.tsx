import { Product } from "@/types/product";
import { Text, View } from "react-native";

interface Props {
  product: Product;
}
export default function MyProductCard({ product }: Props) {
  return (
    <View>
      <Text style={{ backgroundColor: "red" }}>{product.name}</Text>
    </View>
  );
}
