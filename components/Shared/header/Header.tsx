import {
  BottomTabHeaderProps,
  BottomTabNavigationOptions,
} from "@react-navigation/bottom-tabs";
import {
  NativeStackHeaderProps,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import { View } from "react-native";

import { HeaderTabsProps } from "./HeaderTabs";
export interface CustomHeaderProps {
  headerSearchShown?: boolean;
  headerTabsProps?: HeaderTabsProps;
}
export interface StackHeaderProps extends NativeStackHeaderProps {
  options: NativeStackNavigationOptions & CustomHeaderProps;
}

export interface TabsHeaderProps extends BottomTabHeaderProps {
  options: BottomTabNavigationOptions & CustomHeaderProps;
}

export default function Header({
  options,
}: StackHeaderProps | TabsHeaderProps) {
  return <View></View>;
}
