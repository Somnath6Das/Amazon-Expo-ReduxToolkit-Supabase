import FloatingBackButton from "@/components/Shared/FloatingBackButton";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import {
  Camera,
  DefaultLight,
  FilamentScene,
  FilamentView,
  Model,
  useCameraManipulator,
} from "react-native-filament";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useSharedValue } from "react-native-worklets-core";

function Scene({ modelUrl }: { modelUrl: string }) {
  const cameraManipulator = useCameraManipulator({
    orbitHomePosition: [0, 0, 8], // "Camera location"
    targetPosition: [0, 0, 0], // "Looking at"
    orbitSpeed: [0.003, 0.003],
  });

  // Pan gesture
  const viewHeight = Dimensions.get("window").height;
  const panGesture = Gesture.Pan()
    .onBegin((event) => {
      const yCorrected = viewHeight - event.translationY;
      cameraManipulator?.grabBegin(event.translationX, yCorrected, false); // false means rotation instead of translation
    })
    .onUpdate((event) => {
      const yCorrected = viewHeight - event.translationY;
      cameraManipulator?.grabUpdate(event.translationX, yCorrected);
    })
    .maxPointers(1)
    .onEnd(() => {
      cameraManipulator?.grabEnd();
    });

  // Scale gesture
  const previousScale = useSharedValue(1);
  const scaleMultiplier = 100;
  const pinchGesture = Gesture.Pinch()
    .onBegin(({ scale }) => {
      previousScale.value = scale;
    })
    .onUpdate(({ scale, focalX, focalY }) => {
      const delta = scale - previousScale.value;
      cameraManipulator?.scroll(focalX, focalY, -delta * scaleMultiplier);
      previousScale.value = scale;
    });
  const combinedGesture = Gesture.Race(pinchGesture, panGesture);

  return (
    <GestureDetector gesture={combinedGesture}>
      <FilamentView>
        <Camera cameraManipulator={cameraManipulator} />
        <DefaultLight />

        <Model source={{ uri: modelUrl }} transformToUnitCube />
      </FilamentView>
    </GestureDetector>
  );
}

export default function CameraPan() {
  const { modelUrl } = useLocalSearchParams<{ modelUrl: string }>();
  const router = useRouter();
  return (
    <View style={styles.container}>
      <FloatingBackButton onPress={() => router.push("/(tabs)")} />
      <FilamentScene>
        <Scene modelUrl={modelUrl} />
      </FilamentScene>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
