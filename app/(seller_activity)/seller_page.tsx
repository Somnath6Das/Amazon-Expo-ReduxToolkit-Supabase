import { DefaultButton } from "@/components/Shared/DefaultButton";
import { router, useNavigation } from "expo-router";
import { useLayoutEffect } from "react";
import { Pressable, Text, View } from "react-native";

export default function SellerPage() {
  const navigation = useNavigation();
  const onGoBack = () => router.back();
  const goCreateProductPage = () => router.push("/create_product");
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable onPress={onGoBack}>
          <Text style={{ fontSize: 18, fontFamily: "Amazon-Ember-Light" }}>
            Back
          </Text>
        </Pressable>
      ),
      headerTitle: () => (
        <Text style={{ fontSize: 18, fontFamily: "Amazon-Ember-Bold" }}>
          Amazon.in
        </Text>
      ),
    });
  }, [navigation]);
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
    </View>
  );
}
