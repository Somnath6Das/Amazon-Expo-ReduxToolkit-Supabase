import { TextInputProps } from "react-native";
import { OtpInput } from "react-native-otp-entry";

interface Props extends TextInputProps {
  onTextChange: (value: string) => void;
}

export default function OtpNumInput({ onTextChange }: Props) {
  return (
    <OtpInput
      focusColor={"#f1b023ff"}
      type="numeric"
      numberOfDigits={6}
      onTextChange={onTextChange}
      autoFocus={true}
      theme={{
        containerStyle: {
          justifyContent: "center",
          gap: 8,
          alignItems: "center",
          height: 10,
          width: 10,
          marginVertical: 40,
        },
        pinCodeTextStyle: { color: "#f1b023ff" },
        focusStickStyle: { borderColor: "#f1b023ff" },
        pinCodeContainerStyle: { backgroundColor: "white" },
      }}
    />
  );
}
