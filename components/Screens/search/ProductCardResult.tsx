import { DefaultButton } from "@/components/Shared/DefaultButton";
import { addItem } from "@/store/cardSlice";
import { persistor } from "@/store/store";
import { Product } from "@/types/product";
import { deliveryDate } from "@/utils/deliveryDate";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";

interface Props {
  product: Product;
  onPress: VoidFunction;
}

export function ProductCardResult({ product, onPress }: Props) {
  const dispatch = useDispatch();

  const handleItemAdd = (product: Product, quantity: number) => {
    persistor.purge().then(() => {
      dispatch(addItem({ product, quantity }));
    });
  };

  return (
    <Pressable onPress={onPress} style={styles.pressable}>
      <View style={styles.container}>
        <Image
          source={{ uri: product.imageUrl ?? "" }}
          resizeMode="contain"
          style={styles.image}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.name} numberOfLines={4} ellipsizeMode="tail">
            {product.name}
          </Text>
          <Text style={styles.price}>${product.currentPrice}</Text>

          {product.isAmazonChoice && (
            <Image
              source={require("@/assets/images/amazon-images/prime-label.png")}
              style={styles.primeLabel}
            />
          )}

          <View style={styles.deliveryRow}>
            <Text style={styles.deliveryPrice}>
              {product.deliveryPrice === 0
                ? "FREE"
                : `$${product.deliveryPrice}`}{" "}
              Delivery{" "}
            </Text>
            <Text style={styles.deliveryDate}>
              {deliveryDate(product.deliveryInDays)}
            </Text>
          </View>

          <DefaultButton
            style={styles.button}
            onPress={() => handleItemAdd(product, 1)}
          >
            Add to basket
          </DefaultButton>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    marginVertical: 8,
  },
  container: {
    height: 300,
    flexDirection: "row",
    backgroundColor: "#e0e0e0", // equivalent to $gray5Light
    borderRadius: 6,
    borderWidth: 1,
    overflow: "hidden",
  },
  image: {
    width: "35%",
    height: "100%",
    backgroundColor: "#00000022", // $shadowColor like value
    padding: 10,
  },
  infoContainer: {
    width: "65%",
    padding: 20,
    gap: 10,
    flexDirection: "column",
  },
  name: {
    fontSize: 14,
    lineHeight: 20,
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
  },
  primeLabel: {
    height: 30,
    width: 70,
    resizeMode: "contain",
  },
  deliveryRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  deliveryPrice: {
    fontSize: 14,
  },
  deliveryDate: {
    fontSize: 14,
    fontWeight: "bold",
  },
  button: {
    marginTop: "auto",
    height: 40,
  },
  buttonText: {
    fontSize: 14,
  },
});
