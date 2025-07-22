import { DefaultButton } from "@/components/Shared/DefaultButton";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Checkbox from "expo-checkbox";
import * as ImagePicker from "expo-image-picker";
import { router, useNavigation } from "expo-router";
import { useLayoutEffect, useState } from "react";
import {
  Image,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
export default function CreateProduct() {
  const navigation = useNavigation();
  const onGoBack = () => router.back();
  const [name, setName] = useState("");
  const [isAmazonChoice, setIsAmazonChoice] = useState(false);
  const [image, setImage] = useState<string | null>("");
  const [fileUrl, setFileUrl] = useState<string | null>(null);
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
  const pickMedia = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [5, 3],
      quality: 0.5,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const pickDocument = () => {};
  const createProduct = () => {};
  return (
    <ScrollView
      contentContainerStyle={{
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
        {image && (
          <View>
            <Image
              source={{ uri: image }}
              style={{
                width: 150,
                aspectRatio: 5 / 3,
                borderRadius: 10,
                backgroundColor: "#bababa",
                position: "relative",
              }}
            />
            <Pressable
              onPress={() => setImage("")}
              style={{ position: "absolute", top: 3, left: 122 }}
            >
              <MaterialCommunityIcons
                name="close-circle"
                size={24}
                color="white"
              />
            </Pressable>
          </View>
        )}
        <TouchableOpacity onPress={pickMedia}>
          <Text
            style={{
              alignSelf: "flex-start",
              fontSize: 16,
              fontWeight: "bold",
              fontFamily: "Amazon-Ember",
              marginBottom: 12,
            }}
          >
            Add Product Image
          </Text>
          {!image && (
            <View
              style={{
                borderWidth: 1,
                borderRadius: 4,
                borderColor: "black",
                padding: 10,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  fontFamily: "Amazon-Ember",
                  color: "#b6b6b6ff",
                }}
              >
                Add Product Image
              </Text>
              <Feather name="folder-plus" size={20} color="black" />
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={pickDocument}>
          <Text
            style={{
              alignSelf: "flex-start",
              fontSize: 16,
              fontWeight: "bold",
              fontFamily: "Amazon-Ember",
              marginBottom: 12,
            }}
          >
            Uplaod .glb
          </Text>
          <View
            style={{
              borderWidth: 1,
              borderRadius: 4,
              borderColor: "black",
              padding: 10,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                fontFamily: "Amazon-Ember",
                color: "#b6b6b6ff",
              }}
            >
              {fileUrl ? "File added" : "Upload .glb"}
            </Text>
            <Feather name="folder-plus" size={20} color="black" />
          </View>
        </TouchableOpacity>

        <DefaultButton style={{ width: "100%" }} onPress={createProduct}>
          Create Product
        </DefaultButton>
      </View>
    </ScrollView>
  );
}
