import { setSession } from "@/store/authSlice";
import { RootState } from "@/store/store";
import { supabase } from "@/supabase";
import { Pressable, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  const session = useSelector((state: RootState) => state.auth.session);

  const hendleSignout = async () => {
    dispatch(setSession(null));
    await supabase.auth.signOut();
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Pressable
        onPress={() => {
          hendleSignout();
        }}
      >
        <Text>Sign out</Text>
      </Pressable>
    </View>
  );
}
