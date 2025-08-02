import Icon from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  onPress: VoidFunction;
}

export default function FloatingBackButton({ onPress }: Props) {
  const edgeInsets = useSafeAreaInsets();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        position: "absolute",
        backgroundColor: "lightgray",
        top: 10 + edgeInsets.top,
        left: 10,
        borderRadius: 50,
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1,
      }}
    >
      <Icon name="chevron-back" size={22} />
    </TouchableOpacity>
  );
}
