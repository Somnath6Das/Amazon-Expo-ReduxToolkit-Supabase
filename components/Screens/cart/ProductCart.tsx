import { addItem, removeItem } from "@/store/cardSlice";
import { persistor } from "@/store/store";
import { Product } from "@/types/product";
import MCIcon from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";

interface Props {
  product: Product;
  quantity: number;
}

export default function ProductCart({ product, quantity }: Props) {
  const dispatch = useDispatch();
  const handleItemAdd = (product: Product, quantity: number) => {
    persistor.purge().then(() => {
      dispatch(addItem({ product, quantity }));
    });
  };

  const handleItemRemove = (product: Product, quantity: number) => {
    persistor.purge().then(() => {
      dispatch(removeItem({ product, quantity }));
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={{ uri: product.imageUrl ?? "" }}
          style={styles.productImage}
          resizeMode="contain"
        />
        <View style={styles.infoContainer}>
          <Text numberOfLines={4} ellipsizeMode="tail" style={styles.name}>
            {product.name}
          </Text>
          <Text style={styles.price}>₹{product.currentPrice}</Text>
          {product.isAmazonChoice && (
            <Image
              source={require("@/assets/images/amazon-images/prime-label.png")}
              style={styles.primeImage}
            />
          )}
          <Text style={styles.delivery}>
            {product.deliveryPrice === 0 ? "FREE" : `₹${product.deliveryPrice}`}{" "}
            Delivery
          </Text>
        </View>
      </View>

      <View style={styles.actionRow}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => handleItemAdd(product, 1)}
        >
          <Text style={styles.quantity}>{quantity}</Text>
          <MCIcon name="plus" size={24} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleItemRemove(product, 1)}
        >
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    marginBottom: 20,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#f1f1f1",
    minHeight: 200,
    borderRadius: 5,
    overflow: "hidden",
  },
  productImage: {
    width: "35%",
    height: "100%",
    backgroundColor: "#ccc",
    padding: 10,
  },
  infoContainer: {
    width: "65%",
    padding: 20,
    justifyContent: "space-between",
  },
  name: {
    fontSize: 16,
    marginBottom: 5,
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
  },
  primeImage: {
    width: 70,
    height: 30,
    marginVertical: 5,
  },
  delivery: {
    fontSize: 14,
    color: "#333",
  },
  actionRow: {
    flexDirection: "row",
    gap: 20,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#f1b023",
    paddingVertical: 8,
    paddingHorizontal: 16,
    gap: 8,
  },
  quantity: {
    fontWeight: "bold",
    marginRight: "auto",
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#999",
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  deleteText: {
    fontWeight: "500",
  },
});
