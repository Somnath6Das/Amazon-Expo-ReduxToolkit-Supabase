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
          color: "white",
          backgroundColor: "#034e0bff",
          padding: 10,
          borderRadius: 20,
        }}
      >
        Thanks you for Buying!
      </Text>
      <View
        style={{ backgroundColor: "white", padding: 10, borderRadius: 100 }}
      >
        <AntDesign name="checkcircle" size={100} color="#034e0bff" />
      </View>
    </View>
  );
}
