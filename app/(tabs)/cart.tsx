import ProductCart from "@/components/Screens/cart/ProductCart";
import { DefaultButton } from "@/components/Shared/DefaultButton";
import { DeliveryLocation } from "@/components/Shared/DeliveryLocation";
import { HeaderTabsProps } from "@/components/Shared/header/HeaderTabs";
import { removeItem } from "@/store/cardSlice";
import { persistor, RootState } from "@/store/store";
import { Product } from "@/types/product";
import { router, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
export default function Cart() {
  const dispatch = useDispatch();
  const session = useSelector((state: RootState) => state.auth.session);
  const items = useSelector((state: RootState) => state.cart.items);
  const subTotal = useSelector((state: RootState) => state.cart.subTotal);

  const handleRemove = (product: Product, quantity = 1) => {
    dispatch(removeItem({ product, quantity }));
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
              <Text style={styles.subtotalValue}>${subTotal}</Text>
            </View>

            {session && (
              <DefaultButton
                onPress={() => {
                  persistor.purge();
                }}
              >
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
