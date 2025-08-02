import FloatingBackButton from "@/components/Shared/FloatingBackButton";
import {
  Viro3DObject,
  ViroAmbientLight,
  ViroARPlane,
  ViroARScene,
  ViroARSceneNavigator,
  ViroMaterials,
} from "@reactvision/react-viro";
import { Viro3DPoint } from "@reactvision/react-viro/dist/components/Types/ViroUtils";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
ViroMaterials.createMaterials({
  QuadMaterial: {
    lightingModel: "Constant",
    diffuseColor: "#888",
  },
});

function Scene({ modelUrl }: { modelUrl: string }) {
  const [position, setPosition] = useState<Viro3DPoint | null>(null);

  return (
    <ViroARScene>
      <ViroAmbientLight color="white" />
      <ViroARPlane
        onAnchorFound={(anchor) => {
          setPosition(anchor.position); // this uses real-world surface
        }}
        dragType="FixedToWorld"
      >
        {position && (
          <Viro3DObject
            source={{ uri: modelUrl }}
            position={position}
            scale={[0.2, 0.2, 0.2]} // adjust scale if needed
            type="GLB"
            dragType="FixedToWorld"
            onDrag={() => {}}
          />
        )}
      </ViroARPlane>
    </ViroARScene>
  );
}

export default function AR() {
  const { modelUrl } = useLocalSearchParams<{ modelUrl: string }>();
  return (
    <>
      <FloatingBackButton onPress={router.back} />
      <ViroARSceneNavigator
        initialScene={{ scene: () => <Scene modelUrl={modelUrl} /> }}
      />
    </>
  );
}
