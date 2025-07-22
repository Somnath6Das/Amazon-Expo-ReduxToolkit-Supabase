import { DefaultButton } from "@/components/Shared/DefaultButton";
import { supabase } from "@/supabase";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Checkbox from "expo-checkbox";
import * as DocumentPicker from "expo-document-picker";
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
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);
  const [fileUrlGLB, setFileUrlGLB] = useState<string | null>(null);
  const [fileNameGLB, setfileNameGLB] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
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
      setImageUri(result.assets[0].uri);
      setImageName(result.assets[0].fileName ?? "product.jpg");
    }
  };
  const pickAndUploadGLB = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/octet-stream", // fallback for .glb
      copyToCacheDirectory: true,
    });

    if (result.canceled) return;
    setFileUrlGLB(result.assets[0].uri);
    setfileNameGLB(result.assets[0].name);

    // submit
    const file = result.assets[0];
    const fileUri = file.uri;
    const fileName = file.name;
    // const fileType = file.mimeType || "model/gltf-binary";
  };
  const createProduct = async () => {
    setLoading(true);
    let imageFileName = "";
    if (imageUri) {
      const blob = await fetch(imageUri).then((res) => res.blob());
      const fileName = `${Date.now()}_${imageName}`;
      imageFileName = fileName;
      const { data, error } = await supabase.storage
        .from("user-data")
        .upload(`user-uploads/${fileName}`, blob, {
          contentType: "image/jpeg",
          upsert: true,
        });
    }
    const { data: imagePublicUri } = supabase.storage
      .from("user-data")
      .getPublicUrl(`user-uploads/${imageFileName}`);

    if (fileUrlGLB) {
      const fileBlob = await fetch(fileUrlGLB).then((res) => res.blob());
      const { data, error } = await supabase.storage
        .from("user-data")
        .upload(`user-uploads/${fileNameGLB}`, fileBlob, {
          contentType: "model/gltf-binary",
          upsert: true,
        });
    }
    const publicUrlGLB = supabase.storage
      .from("user-data")
      .getPublicUrl(`user-uploads/${fileNameGLB}`).data.publicUrl;

    console.log(imagePublicUri);
    console.log(publicUrlGLB);
    // save to supabase table
    setLoading(false);
    //  if (error) console.error("Upload error:", error);
    //  else console.log("Uploaded:", data);
  };
  return (
    <ScrollView
      contentContainerStyle={{
        padding: 20,
        gap: 20,
        backgroundColor: "white",
      }}
    >
      <View style={{ width: "100%", gap: 15, paddingBottom: 20 }}>
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
        {imageUri && (
          <View>
            <Image
              source={{ uri: imageUri }}
              style={{
                width: 150,
                aspectRatio: 5 / 3,
                borderRadius: 10,
                backgroundColor: "#bababa",
                position: "relative",
              }}
            />
            <Pressable
              onPress={() => setImageUri("")}
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
          {!imageUri && (
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

        <Text
          style={{
            alignSelf: "flex-start",
            fontSize: 16,
            fontWeight: "bold",
            fontFamily: "Amazon-Ember",
          }}
        >
          Uplaod .glb
        </Text>
        {fileUrlGLB ? (
          <Pressable onPress={() => setFileUrlGLB(null)}>
            <MaterialCommunityIcons
              name="close-circle"
              size={25}
              color="black"
              style={{ position: "absolute", left: 36, top: -10 }}
            />
            <MaterialIcons name="file-present" size={50} color="black" />
          </Pressable>
        ) : (
          <TouchableOpacity onPress={pickAndUploadGLB}>
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

                  fontFamily: "Amazon-Ember",
                  color: "#b6b6b6ff",
                }}
              >
                Upload .glb
              </Text>
              <AntDesign name="addfile" size={18} color="black" />
            </View>
          </TouchableOpacity>
        )}

        <DefaultButton
          style={{ width: "100%" }}
          onPress={createProduct}
          disabled={loading}
        >
          {loading ? "Please Wait..." : "Create Product"}
        </DefaultButton>
      </View>
    </ScrollView>
  );
}
