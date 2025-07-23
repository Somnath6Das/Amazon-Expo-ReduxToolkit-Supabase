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
  const [fileNameGLB, setFileNameGLB] = useState<string | null>(null);
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
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access media library is required!");
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      setImageName(result.assets[0].fileName ?? "product.jpg");
    }
  };
  const pickAndUploadGLB = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: true,
    });

    if (!result.canceled) {
      setFileUrlGLB(result.assets[0].uri);
      setFileNameGLB(result.assets[0].name);
    }
    console.log("0");
    // submit
    // const file = result.assets[0];
    // const fileUri = file.uri;
    // const fileName = file.name;
    // const fileType = file.mimeType || "model/gltf-binary";
  };
  const createProduct = async () => {
    const fileUri = imageUri;
    const fileName = `${Date.now()}.jpg`;

    const formData = new FormData();
    formData.append("file", {
      uri: fileUri,
      name: fileName,
      type: "image/jpeg",
    } as any);

    const response = await fetch(
      `${process.env.EXPO_PUBLIC_SUPABASE_URL}/storage/v1/object/user-data/user-uploads/${fileName}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY}`,
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      }
    );

    const { data: publicData } = supabase.storage
      .from("user-data")
      .getPublicUrl(`user-uploads/${fileName}`);

    console.log("Uploaded!", publicData.publicUrl);
    if (!response.ok) {
      const text = await response.text();
      console.error("Upload error response:", text);
      throw new Error("Upload failed");
    }
    // if (fileUrlGLB && fileNameGLB) {
    //   const fileBlob = await fetch(fileUrlGLB).then((res) => res.blob());
    //   const { error: glbError } = await supabase.storage
    //     .from("user-data")
    //     .upload(`user-uploads/${fileNameGLB}`, fileBlob, {
    //       contentType: "model/gltf-binary",
    //       upsert: true,
    //     });
    //   if (!glbError) {
    //     glbPublicUrl = supabase.storage
    //       .from("user-data")
    //       .getPublicUrl(`user-uploads/${fileNameGLB}`).data.publicUrl;
    //     console.log(glbPublicUrl);
    //   } else {
    //     console.error("GLB upload failed:", glbError);
    //   }
    // }

    // save to supabase table
    setLoading(false);
    router.back();
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
                color="#5a5a5aff"
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
          <View>
            <Pressable onPress={() => setFileUrlGLB(null)}>
              <MaterialCommunityIcons
                name="close-circle"
                size={25}
                color="#5a5a5aff"
                style={{ position: "absolute", left: 36, top: -10 }}
              />
            </Pressable>
            <MaterialIcons name="upload-file" size={50} color="#393939ff" />
          </View>
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
