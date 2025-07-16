import { ComponentProps } from "react";
import { Text, TouchableOpacity } from "react-native";

interface Props
  extends Omit<ComponentProps<typeof TouchableOpacity>, "variant"> {
  onPress: VoidFunction;
  variant?: "primary" | "secondary";
}

export function DefaultButton({
  onPress,
  variant = "primary",
  children,
  style,
  ...props
}: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          padding: 15,
          alignItems: "center",
          height: 50,
          borderRadius: 50,
          backgroundColor: variant === "primary" ? "#f8ab05ff" : "white",
          borderColor: variant === "primary" ? "#f8ab05ff" : "gray",
          justifyContent: "center",
          borderWidth: variant === "primary" ? 0 : 1,
          opacity: props.disabled ? 0.5 : 1,
        },
        style,
      ]}
      {...props}
    >
      <Text
        style={{
          color: "white",
          fontFamily: "Amazon-Ember",
          fontSize: 18,
        }}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
}
