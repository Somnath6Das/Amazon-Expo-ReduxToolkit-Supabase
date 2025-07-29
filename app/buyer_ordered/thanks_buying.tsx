import AntDesign from "@expo/vector-icons/AntDesign";
import { Text, View } from "react-native";

export default function ThanksBuying() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#31db39ff",
        gap: 20,
      }}
    >
      <Text
        style={{
          fontSize: 30,
          fontFamily: "Amazon-Ember-Bold",
          color: "yellow",
        }}
      >
        Thanks you for Buying!
      </Text>
      <AntDesign name="checkcircle" size={100} color="white" />
    </View>
  );
}
