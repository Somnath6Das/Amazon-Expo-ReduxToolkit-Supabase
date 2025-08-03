import HomeCarousel from "@/components/Screens/home/HomeCarousel";
import { HomeSuggestions } from "@/components/Screens/home/HomeSuggestions";
import { ProductDealCard } from "@/components/Screens/home/ProductDealCard";
import { DefaultButton } from "@/components/Shared/DefaultButton";
import { DeliveryLocation } from "@/components/Shared/DeliveryLocation";
import { HeaderTabsProps } from "@/components/Shared/header/HeaderTabs";
import { RootState } from "@/store/store";
import { supabase } from "@/supabase";
import { Product } from "@/types/product";
import { router, useNavigation } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const session = useSelector((state: RootState) => state.auth.session);
  const [deals, setDeals] = useState<Product[]>([]);

  const tabs: HeaderTabsProps["tabs"] = [
    {
      active: true,
      title: "Alexa Lists",
      onPress: () => Alert.alert("Alexa Lists"),
    },
    {
      title: "Prime",
      onPress: () => Alert.alert("Prime"),
    },
    {
      title: "Video",
      onPress: () => Alert.alert("Video"),
    },
  ];
  const getDeals = useCallback(async () => {
    try {
      const { data = [] } = await supabase.from("products").select("*");
      setDeals(data as Product[]);
    } catch (error) {
      console.log("error", error);
    }
  }, []);
  useEffect(() => {
    navigation.setOptions({
      headerSearchShown: true,
      headerTabsProps: { tabs },
    });

    getDeals();
  }, [navigation.setOptions]);
  const onProductPress = ({ id }: Product) => {
    router.push(`/product/${id}`);
  };
  const onClickAuth = () => router.push("/(auth)");

  return (
    <ScrollView
      scrollEnabled
      contentContainerStyle={{
        paddingBottom: 10,
      }}
      showsVerticalScrollIndicator={false}
    >
      <DeliveryLocation />
      <HomeCarousel />
      <HomeSuggestions />
      <View
        style={{
          marginTop: "40%",
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
              gap: 20,
              flexWrap: "wrap",
              flexDirection: "row",
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
          <DefaultButton onPress={onClickAuth}>Sign in Securely</DefaultButton>
        )}
      </View>
    </ScrollView>
  );
}
