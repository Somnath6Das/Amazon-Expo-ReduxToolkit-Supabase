import { RootState } from "@/store/store";
import { supabase } from "@/supabase";
import { Pressable, Text, View } from "react-native";
import { useSelector } from "react-redux";

export default function Home() {
  const session = useSelector((state: RootState) => state.auth.session);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Pressable
        onPress={() => {
          supabase.auth.signOut();
        }}
      >
        <Text>Sign out</Text>
      </Pressable>
    </View>
  );
}
