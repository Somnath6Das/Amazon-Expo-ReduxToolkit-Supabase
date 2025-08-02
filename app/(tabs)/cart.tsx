import ProductCart from "@/components/Screens/cart/ProductCart";
import { DefaultButton } from "@/components/Shared/DefaultButton";
import { DeliveryLocation } from "@/components/Shared/DeliveryLocation";
import { HeaderTabsProps } from "@/components/Shared/header/HeaderTabs";
import { clearCart } from "@/store/cardSlice";
import { persistor, RootState } from "@/store/store";
import { supabase } from "@/supabase";
import { deliveryDate } from "@/utils/deliveryDate";
import { router, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
export default function Cart() {
  const dispatch = useDispatch();
  const session = useSelector((state: RootState) => state.auth.session);
  const items = useSelector((state: RootState) => state.cart.items);
  const subTotal = useSelector((state: RootState) => state.cart.subTotal);
  const [address, setAddress] = useState<any | null>(null);
  // console.log("cart.tsx :");
  // console.log(items);
  const getUserProduct = async () => {
    const { data: address, error: err } = await supabase
      .from("profiles")
      .select("full_name, location")
      .eq("id", session?.user.id)
      .single();
    setAddress(address);
    // console.log(address?.location);
    // console.log(data.name);
  };
  useEffect(() => {
    getUserProduct();
  }, [address]);
  const handleClearCart = async () => {
    const formattedOrders = items.map((item) => {
      const { product, quantity } = item;

      return {
        product_name: product.name,
        delivery_address: `${address?.full_name} ${address?.location}`,
        image: product.imageUrl,
        buyer_id: session?.user.id,
        current_price: product.currentPrice,
        delivery_date: deliveryDate(Number(product.deliveryInDays)),
        delivery_price: product.deliveryPrice,
        seller_id: product.user_id,
        quantity,
        total: Number(product.deliveryPrice) * Number(quantity),
      };
    });

    const { data, error } = await supabase
      .from("orders")
      .insert(formattedOrders);

    if (error) {
      console.error("Error placing order:", error.message);
      // Alert.alert("Checkout Failed", error.message); // Optional
    }
    persistor.purge().then(() => {
      console.log("Persisted cart cleared!");
      dispatch(clearCart());
    });
    router.push("/buyer_ordered/thanks_buying");
  };
  const navigation = useNavigation();

  const onClickAuth = () => router.push("/(auth)");

  const tabs: HeaderTabsProps["tabs"] = [
    {
      active: true,
      title: "Basket",
      onPress: () => Alert.alert("Basket"),
    },
  ];

  useEffect(() => {
    navigation.setOptions({
      headerSearchShown: true,
      headerTabsProps: { tabs },
    });
  }, [navigation]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <DeliveryLocation />
      <View style={styles.innerContainer}>
        {items.length ? (
          <>
            <View style={styles.subtotalRow}>
              <Text style={styles.subtotalLabel}>Subtotal:</Text>
              <Text style={styles.subtotalValue}>₹{subTotal}</Text>
            </View>

            {session && (
              <DefaultButton onPress={handleClearCart}>
                {`Proceed to checkout (${items.length}) items`}
              </DefaultButton>
            )}

            {items.map((item) => (
              <ProductCart key={item.product.id} {...item} />
            ))}
          </>
        ) : (
          <>
            <Image
              source={require("@/assets/images/amazon-images/empty-cart.png")}
              style={styles.emptyImage}
              resizeMode="contain"
            />
            <Text style={styles.emptyTitle}>Your Amazon cart is empty</Text>
            <Text style={styles.emptySubtitle}>Good stuff goes here</Text>
          </>
        )}

        {!session && (
          <View style={styles.authButtons}>
            <DefaultButton onPress={onClickAuth}>Sign In</DefaultButton>
            <DefaultButton onPress={onClickAuth} variant="secondary">
              Create Account
            </DefaultButton>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  innerContainer: {
    flex: 1,
    alignItems: "center",
    gap: 20,
    paddingHorizontal: 20,
  },
  subtotalRow: {
    flexDirection: "row",
    alignSelf: "flex-start",
    marginTop: 10,
  },
  subtotalLabel: {
    marginRight: 10,
    fontSize: 26,
  },
  subtotalValue: {
    fontSize: 26,
    fontWeight: "bold",
  },
  emptyImage: {
    width: 300,
    height: 200,
  },
  emptyTitle: {
    fontSize: 26,
    fontWeight: "bold",
  },
  emptySubtitle: {
    fontSize: 18,
    color: "#666",
  },
  authButtons: {
    width: "100%",
    gap: 15,
    marginTop: 20,
  },
});
