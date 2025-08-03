import Header from "@/components/Shared/header/Header";
import { setUndeliverdCount } from "@/store/orderCountSlice";
import { RootState } from "@/store/store";
import { getUndeliverdCount } from "@/utils/getUndeliverdCount";
import MCIcon from "@expo/vector-icons/MaterialCommunityIcons";
import { Tabs } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
interface Tab {
  name: string;
  icon: "home-outline" | "account-outline" | "cart-check";
}

export default function TabLayout() {
  const session = useSelector((state: RootState) => state.auth.session);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCount = async () => {
      if (session?.user?.id) {
        const count = await getUndeliverdCount(session?.user.id);
        if (count !== null) {
          dispatch(setUndeliverdCount(count));
        }
      }
    };

    fetchCount();
  }, [session?.user.id]);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const value: number = 8;
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
                      top: 8,
                      backgroundColor:
                        cartItems.length === 0 ? "transparent" : "#de1b1bff",
                      fontWeight: "bold",
                      fontSize: 12,
                      color: cartItems.length === 0 ? "transparent" : "white",
                    }}
                  >
                    {cartItems.length}
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
