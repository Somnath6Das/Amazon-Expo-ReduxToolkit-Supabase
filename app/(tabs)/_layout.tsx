import Header from "@/components/Shared/header/Header";
import MCIcon from "@expo/vector-icons/MaterialCommunityIcons";
import { Tabs } from "expo-router";
import { Text, View } from "react-native";
interface Tab {
  name: string;
  icon: "home-outline" | "account-outline" | "cart-check";
}

export default function TabLayout() {
  // const session = useSelector((state: RootState) => state.auth.session);
  // if (!session) {
  //   return <Redirect href="/(auth)" />;
  // }
  const value = 8;
  const tabs: Tab[] = [
    {
      name: "index",
      icon: "home-outline",
    },
    {
      name: "profile",
      icon: "account-outline",
    },
    {
      name: "cart",
      icon: "cart-check",
    },
  ];

  return (
    <Tabs>
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            tabBarStyle: {
              borderTopWidth: 1,
              borderTopColor: "lightgray",
            },
            header: (props) => <Header {...props} />,
            tabBarLabel: () => null,
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  flex: 1,
                  marginTop: -5,
                  gap: 10,
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    width: 50,
                    height: 4,
                    borderRadius: 20,
                    backgroundColor: focused ? "#238db0" : "transparent",
                  }}
                />

                <MCIcon
                  name={tab.icon}
                  size={30}
                  color={focused ? "#238db0" : "black"}
                />
                {tab.name === "cart" && (
                  <Text
                    style={{
                      paddingHorizontal: 4,
                      borderRadius: 10,
                      position: "absolute",
                      top: 11,
                      backgroundColor: "white",
                      fontWeight: "bold",
                      fontSize: 12,
                      color: focused ? "#238db0" : "black",
                    }}
                  >
                    {value}
                  </Text>
                )}
              </View>
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
