import { RootState } from "@/store/store";
import { supabase } from "@/supabase";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router, useNavigation } from "expo-router";
import { useEffect, useLayoutEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { useSelector } from "react-redux";
export default function OrderLocation() {
  const session = useSelector((state: RootState) => state.auth.session);
  const [location, setLocation] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const getLocation = async () => {
    setLoading(true);
    await supabase
      .from("profiles")
      .update({ location: location })
      .eq("id", session?.user?.id)
      .single();
    const { data, error } = await supabase
      .from("profiles")
      .select("location")
      .eq("id", session?.user?.id)
      .single();

    setLocation(data?.location);
    console.log(data?.location);
    setLoading(false);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (location.trim() !== "") {
        getLocation();
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [location]);

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
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        marginTop: 20,
        gap: 14,
        paddingHorizontal: 20,
      }}
    >
      <Text style={{ fontSize: 20, fontFamily: "Amazon-Ember" }}>
        Give Delivery Address
      </Text>
      <Text>{location}</Text>
      <TextInput
        value={location}
        onChangeText={setLocation}
        multiline
        autoFocus
        style={{
          borderColor: "black",
          padding: 10,
          fontFamily: "Amazon-Ember",

          borderWidth: 1,

          borderRadius: 8,

          minHeight: 100,
          textAlignVertical: "top",
        }}
        placeholder="Email"
        autoCapitalize="none"
        autoCorrect={false}
      />
      {!loading && (
        <AntDesign
          name="checkcircle"
          size={18}
          color={"green"}
          style={{
            position: "absolute",
            right: 25,
            top: 116,
          }}
        />
      )}
    </View>
  );
}
