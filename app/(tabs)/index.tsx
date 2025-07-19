import HomeCarousel from "@/components/Screens/home/HomeCarousel";
import { HomeSuggestions } from "@/components/Screens/home/HomeSuggestions";
import { ProductDealCard } from "@/components/Screens/home/ProductDealCard";
import { DeliveryLocation } from "@/components/Shared/DeliveryLocation";
import { setSession } from "@/store/authSlice";
import { RootState } from "@/store/store";
import { supabase } from "@/supabase";
import { Product } from "@/types/product";
import { router } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  const session = useSelector((state: RootState) => state.auth.session);

  const hendleSignout = async () => {
    dispatch(setSession(null));
    await supabase.auth.signOut();
  };
  const deals: Product[] = [
    {
      id: 1,
      name: "Wireless Mouse",
      amountInStock: 100,
      currentPrice: 999,
      previousPrice: 1299,
      deliveryPrice: 40,
      deliveryInDays: 2,
      isAmazonChoice: true,
      imageUrl: "https://uniquec.com/wp-content/uploads/235.jpg",
      model3DUrl: null,
    },
    {
      id: 2,
      name: "Keyboard",
      amountInStock: 50,
      currentPrice: 1499,
      previousPrice: 1799,
      deliveryPrice: 60,
      deliveryInDays: 3,
      isAmazonChoice: false,
      imageUrl: "https://m.media-amazon.com/images/I/61QxkJGYxeL.jpg",
      model3DUrl: null,
    },
  ];
  const onProductPress = ({ id }: Product) => {
    router.push(`/product/${id}`);
  };
  return (
    <ScrollView
      scrollEnabled
      contentContainerStyle={{
        flex: 1,
      }}
    >
      <DeliveryLocation />
      <HomeCarousel />
      <HomeSuggestions />
      <View
        style={{
          backgroundColor: "white",
          width: "100%",
          padding: 20,
          gap: 20,
        }}
      >
        <Text
          style={{
            alignSelf: "flex-start",
            fontFamily: "Amazon-Ember-Bold",
            fontSize: 20,
          }}
        >
          {session ? "Deals for you" : "Sign in for your best experience"}
        </Text>
        {session ? (
          <View
            style={{
              justifyContent: "space-between",
              gap: 30,
              flexWrap: "wrap",
              height: "21%",
            }}
          >
            {deals.map((product) => (
              <ProductDealCard
                key={product.id}
                product={product}
                onPress={() => onProductPress(product)}
              />
            ))}
          </View>
        ) : (
          <View></View>
        )}
      </View>
    </ScrollView>
  );
}
