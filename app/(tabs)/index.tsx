import { RootState } from "@/store/store";
import { router } from "expo-router";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";

export default function Home() {
  const session = useSelector((state: RootState) => state.auth.session);
  if (!session) {
    router.replace("/");
  }
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
}
