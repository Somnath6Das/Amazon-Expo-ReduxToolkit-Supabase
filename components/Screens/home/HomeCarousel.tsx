import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from "react-native";

const IMG_AD_1 = require("@/assets/images/amazon-images/home-ad-1.png");
const IMG_AD_2 = require("@/assets/images/amazon-images/home-ad-2.png");
const IMG_AD_3 = require("@/assets/images/amazon-images/home-ad-3.png");

const images = [IMG_AD_1, IMG_AD_2, IMG_AD_3];
const { width } = Dimensions.get("window");

export default function HomeCarousel() {
  const ref = useRef<FlatList>(null);
  const currentIndex = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex.current + 1) % images.length;
      ref.current?.scrollToIndex({ index: nextIndex, animated: true });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    currentIndex.current = index;
    setActiveIndex(index);
  };

  return (
    <View>
      <FlatList
        ref={ref}
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        onScroll={handleScroll}
        renderItem={({ item }) => (
          <View style={{ width }}>
            <Image
              source={item}
              style={{ width: "100%", height: 280 }}
              resizeMode="cover"
            />
          </View>
        )}
      />

      {/* Dots */}
      <View style={styles.dotsContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              activeIndex === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dotsContainer: {
    position: "absolute",
    bottom: 60,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  activeDot: {
    backgroundColor: "#0774d4ff",
    width: 10,
    height: 10,
  },
  inactiveDot: {
    backgroundColor: "white",
    borderColor: "#0774d4ff",
    borderWidth: 1,
    width: 10,
    height: 10,
  },
});
