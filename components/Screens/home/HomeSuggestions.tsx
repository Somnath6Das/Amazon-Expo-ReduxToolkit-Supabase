import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
const IMG_AD_1 = require("@/assets/images/amazon-images/home-sugg-1.png");
const IMG_AD_2 = require("@/assets/images/amazon-images/home-sugg-2.png");
const IMG_AD_3 = require("@/assets/images/amazon-images/home-sugg-1.png");
const images = [IMG_AD_1, IMG_AD_2, IMG_AD_3];

export function HomeSuggestions() {
  return (
    <View
      style={{
        height: 210,
        width: Dimensions.get("window").width,
        position: "absolute",
        top: 279,
      }}
    >
      <ScrollView
        horizontal={true}
        contentContainerStyle={{ marginTop: 4 }}
        showsHorizontalScrollIndicator={false}
      >
        {images.map((image, index) => (
          <View
            key={index}
            style={{
              backgroundColor: "white",
              width: 150,
              height: 200,
              borderRadius: 4,
              marginLeft: 20,
              shadowColor: "#000",
              shadowOffset: { width: 3, height: 3 },
              shadowOpacity: 0.4,
              shadowRadius: 6,
              ...Platform.select({
                android: {
                  elevation: 6,
                },
              }),
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                paddingHorizontal: 10,
                paddingBottom: 25,
                paddingTop: 10,
              }}
            >
              New Arrivals
            </Text>
            <Image
              source={image}
              style={{
                width: "100%",
                height: 150,
                borderBottomRightRadius: 4,
                borderBottomLeftRadius: 4,
              }}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
