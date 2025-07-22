import Header from "@/components/Shared/header/Header";
import Entypo from "@expo/vector-icons/Entypo";
import { Tabs } from "expo-router";
import { Text, View } from "react-native";
interface Tab {
  name: string;
  icon: "add-to-list" | "archive";
}

export default function TabLayout() {
  // const session = useSelector((state: RootState) => state.auth.session);
  // if (!session) {
  //   return <Redirect href="/(auth)" />;
  // }
  const value: number = 10;
  const tabs: Tab[] = [
    {
      name: "seller_page",
      icon: "add-to-list",
    },
    {
      name: "product_ordered",
      icon: "archive",
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

                <Entypo
                  name={tab.icon}
                  size={30}
                  color={focused ? "#238db0" : "#feb43dff"}
                />
                {tab.name === "cart" && (
                  <Text
                    style={{
                      paddingHorizontal: 4,
                      borderRadius: 10,
                      position: "absolute",
                      top: 8,
                      backgroundColor:
                        value === 0 ? "transparent" : "#de1b1bff",
                      fontWeight: "bold",
                      fontSize: 12,
                      color: value === 0 ? "transparent" : "white",
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
