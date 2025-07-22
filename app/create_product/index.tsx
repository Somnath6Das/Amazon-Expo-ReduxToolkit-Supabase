import { DefaultButton } from "@/components/Shared/DefaultButton";
import Checkbox from "expo-checkbox";
import { router, useNavigation } from "expo-router";
import { useLayoutEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export default function CreateProduct() {
  const navigation = useNavigation();
  const onGoBack = () => router.back();
  const [name, setName] = useState("");
  const [isAmazonChoice, setIsAmazonChoice] = useState(false);
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
  const createProduct = () => {};
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        padding: 20,
        gap: 20,
        backgroundColor: "white",
      }}
    >
      <View style={{ width: "100%", gap: 15 }}>
        <Text
          style={{
            alignSelf: "flex-start",
            fontSize: 16,
            fontWeight: "bold",
            fontFamily: "Amazon-Ember",
          }}
        >
          Enter Product Name
        </Text>
        <TextInput
          value={name}
          onChangeText={setName}
          style={{
            borderWidth: 1,
            borderRadius: 4,
            borderColor: "black",
            padding: 10,
            fontFamily: "Amazon-Ember",
          }}
          placeholder="Product Name"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Text
          style={{
            alignSelf: "flex-start",
            fontSize: 16,
            fontWeight: "bold",
            fontFamily: "Amazon-Ember",
          }}
        >
          Amount in stock
        </Text>
        <TextInput
          value={name}
          onChangeText={setName}
          style={{
            borderWidth: 1,
            borderRadius: 4,
            borderColor: "black",
            padding: 10,
            fontFamily: "Amazon-Ember",
          }}
          placeholder="Amount in stock"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Text
          style={{
            alignSelf: "flex-start",
            fontSize: 16,
            fontWeight: "bold",
            fontFamily: "Amazon-Ember",
          }}
        >
          Current Price
        </Text>
        <TextInput
          value={name}
          onChangeText={setName}
          style={{
            borderWidth: 1,
            borderRadius: 4,
            borderColor: "black",
            padding: 10,
            fontFamily: "Amazon-Ember",
          }}
          placeholder="Current Price"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Text
          style={{
            alignSelf: "flex-start",
            fontSize: 16,
            fontWeight: "bold",
            fontFamily: "Amazon-Ember",
          }}
        >
          Previous Price
        </Text>
        <TextInput
          value={name}
          onChangeText={setName}
          style={{
            borderWidth: 1,
            borderRadius: 4,
            borderColor: "black",
            padding: 10,
            fontFamily: "Amazon-Ember",
          }}
          placeholder="Previous Price"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Text
          style={{
            alignSelf: "flex-start",
            fontSize: 16,
            fontWeight: "bold",
            fontFamily: "Amazon-Ember",
          }}
        >
          Delivery Price
        </Text>
        <TextInput
          value={name}
          onChangeText={setName}
          style={{
            borderWidth: 1,
            borderRadius: 4,
            borderColor: "black",
            padding: 10,
            fontFamily: "Amazon-Ember",
          }}
          placeholder="Delivery Price"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Checkbox
            value={isAmazonChoice}
            onValueChange={setIsAmazonChoice}
            style={{ margin: 8 }}
            color={isAmazonChoice ? "#f1b023ff" : undefined}
          />
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              fontFamily: "Amazon-Ember",
            }}
          >
            Amazon Choice
          </Text>
        </View>
      </View>
      {/* imageUrl and model3dUrl */}
      <DefaultButton style={{ width: "100%" }} onPress={createProduct}>
        Create Product
      </DefaultButton>
    </View>
  );
}
