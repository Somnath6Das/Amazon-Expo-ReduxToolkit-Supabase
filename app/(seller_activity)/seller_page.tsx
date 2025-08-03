import MyProductCard from "@/components/Screens/seller-zone/MyProductCard";
import { DefaultButton } from "@/components/Shared/DefaultButton";
import { RootState } from "@/store/store";
import { supabase } from "@/supabase";
import { Product } from "@/types/product";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";

export default function SellerPage() {
  const goCreateProductPage = () => router.push("/create_product");
  const session = useSelector((state: RootState) => state.auth.session);
  const [myProduct, setMyProduct] = useState<Product[]>([]);

  const getMyProduct = async () => {
    const { data = [] } = await supabase
      .from("products")
      .select("*")
      .eq("user_id", session?.user.id)
      .order("created_at", { ascending: false });
    setMyProduct(data as Product[]);
  };
  useEffect(() => {
    getMyProduct();
  }, [myProduct]);
  return (
    <View
      style={{
        flex: 1,
        marginTop: "5%",
        paddingHorizontal: 10,
        justifyContent: "flex-start",
      }}
    >
      <DefaultButton style={{ width: "100%" }} onPress={goCreateProductPage}>
        Create Product
      </DefaultButton>
      {myProduct.map((product) => (
        <MyProductCard key={product.id} product={product} />
      ))}
    </View>
  );
}
