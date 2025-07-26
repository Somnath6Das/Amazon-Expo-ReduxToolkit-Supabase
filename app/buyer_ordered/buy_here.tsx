import { RootState } from "@/store/store";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useLayoutEffect } from "react";
import { Pressable, Text, View } from "react-native";
import { useSelector } from "react-redux";

export default function BuyHere() {
  const session = useSelector((state: RootState) => state.auth.session);
  const { productId } = useLocalSearchParams();

  const navigation = useNavigation();
  const onGoBack = () => router.back();
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
    <View>
      <Text>{productId}</Text>
    </View>
  );
}
