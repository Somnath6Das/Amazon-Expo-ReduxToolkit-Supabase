import { useEffect, useRef } from "react";
import { Dimensions, FlatList, Image } from "react-native";
import Animated, { useSharedValue } from "react-native-reanimated";

const IMG_AD_1 = require("@/assets/images/amazon-images/home-ad-1.png");
const IMG_AD_2 = require("@/assets/images/amazon-images/home-ad-2.png");
const IMG_AD_3 = require("@/assets/images/amazon-images/home-ad-3.png");

const images = [IMG_AD_1, IMG_AD_2, IMG_AD_3];
const { width } = Dimensions.get("window");

export default function HomeCarousel() {
  const scrollX = useSharedValue(0);
  const ref = useRef<FlatList>(null);
  const currentIndex = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      currentIndex.current = (currentIndex.current + 1) % images.length;
      ref.current?.scrollToIndex({
        index: currentIndex.current,
        animated: true,
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  return (
    <FlatList
      contentContainerStyle={{ position: "relative" }}
      ref={ref}
      data={images}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item}
      pagingEnabled
      renderItem={({ item }) => (
        <Animated.View style={{ width }} key={item}>
          <Image source={item} style={{ width: "100%", height: 280 }} />
        </Animated.View>
      )}
      onScroll={(event) => {
        scrollX.value = event.nativeEvent.contentOffset.x;
      }}
    />
  );
}
