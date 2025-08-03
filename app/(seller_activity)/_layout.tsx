import Header from "@/components/Shared/header/Header";
import { RootState } from "@/store/store";
import Entypo from "@expo/vector-icons/Entypo";
import { router, Tabs } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { useSelector } from "react-redux";
interface Tab {
  name: string;
  icon: "add-to-list" | "archive";
}

export default function TabLayout() {
  const onGoBack = () => router.back();
  const undeliveredCount = useSelector(
    (state: RootState) => state.orderCount.undeliverdCount
  );

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
            headerLeft: () => (
              <Pressable onPress={onGoBack}>
                <Text
                  style={{ fontSize: 18, fontFamily: "Amazon-Ember-Light" }}
                >
                  Back
                </Text>
              </Pressable>
            ),
            headerTitle: () => (
              <Text style={{ fontSize: 18, fontFamily: "Amazon-Ember-Bold" }}>
                Amazon.in
              </Text>
            ),
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
                  color={focused ? "#238db0" : "#959493ff"}
                />
                {tab.name === "product_ordered" && (
                  <Text
                    style={{
                      paddingHorizontal: 4,
                      borderRadius: 10,
                      position: "absolute",
                      top: 8,
                      backgroundColor:
                        undeliveredCount === 0 ? "transparent" : "#de1b1bff",
                      fontWeight: "bold",
                      fontSize: 12,
                      color: undeliveredCount === 0 ? "transparent" : "white",
                    }}
                  >
                    {undeliveredCount}
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
