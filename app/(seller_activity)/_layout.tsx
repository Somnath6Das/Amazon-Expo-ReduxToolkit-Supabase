import Header from "@/components/Shared/header/Header";
import { RootState } from "@/store/store";
import Entypo from "@expo/vector-icons/Entypo";
import { Tabs } from "expo-router";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";
interface Tab {
  name: string;
  icon: "add-to-list" | "archive";
}

export default function TabLayout() {
  // const session = useSelector((state: RootState) => state.auth.session);
  const undeliveredCount = useSelector(
    (state: RootState) => state.orderCount.undeliverdCount
  );
  // const [undeliveredCount, setUndeliveredCount] = useState<number | null>(null);
  // useEffect(() => {
  //   const fetchCount = async () => {
  //     if (session?.user?.id) {
  //       const count = await getUndeliverdCount(session.user.id);
  //       setUndeliveredCount(count);
  //     }
  //   };

  //   fetchCount();
  // }, [undeliveredCount]);
  // const value: number = 8;
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
