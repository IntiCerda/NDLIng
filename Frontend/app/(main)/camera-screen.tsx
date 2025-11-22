import {
  CameraMode,
  CameraType,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import React, { useRef, useState } from "react";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { router } from "expo-router";

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const ref = useRef<CameraView>(null);
  const [uri, setUri] = useState<string | null>(null);
  const [mode, setMode] = useState<CameraMode>("picture");
  const [facing, setFacing] = useState<CameraType>("back");
  const [recording, setRecording] = useState(false);

  if (!permission) {
    return null;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to use the camera
        </Text>
        <Button onPress={requestPermission} title="Grant permission" />
      </View>
    );
  }

  const toggleMode = () => {
    setMode((prev) => (prev === "picture" ? "video" : "picture"));
  };

  const takePicture = async () => {
    const photo = await ref.current?.takePictureAsync();
    if (photo?.uri) {
      // Return photo to CreateReport
      router.replace({
        pathname: "/create-report",
        params: {
          photoUri: photo.uri
        },
      });
    }
  };

  const recordVideo = async () => {
    if (recording) {
      setRecording(false);
      ref.current?.stopRecording();
      return;
    }
    setRecording(true);
    const video = await ref.current?.recordAsync();
    console.log({ video });
  };

  const toggleFacing = () => {
    setFacing((prev) => (prev === "back" ? "front" : "back"));
  };

  const renderPicture = (uri: string) => {
    return (
      <View>
        <Image
          source={{ uri }}
          contentFit="contain"
          style={{ width: 300, aspectRatio: 1 }}
        />
        <Button onPress={() => setUri(null)} title="Take another picture" />
      </View>
    );
  };

  const renderCamera = () => {
    return (
      <View style={styles.cameraContainer}>
        <CameraView
          style={styles.camera}
          ref={ref}
          mode={mode}
          facing={facing}
          mute={false}
          responsiveOrientationWhenOrientationLocked
        />
        <View style={styles.shutterContainer}>
          <Pressable onPress={toggleMode}>
            {mode === "picture" ? (
              <Text>Picture</Text>
            ) : (
              <Text>Video</Text>
            )}
          </Pressable>
          <Pressable onPress={mode === "picture" ? takePicture : recordVideo}>
            {({ pressed }) => (
              <View
                style={[
                  styles.shutterBtn,
                  {
                    opacity: pressed ? 0.5 : 1,
                  },
                ]}
              >
                <View
                  style={[
                    styles.shutterBtnInner,
                    {
                      backgroundColor: mode === "picture" ? "white" : "red",
                    },
                  ]}
                />
              </View>
            )}
          </Pressable>
          <Pressable onPress={toggleFacing}>
            <Text>Rotate Left</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {uri ? renderPicture(uri) : renderCamera()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },

  cameraContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "#000",
  },

  camera: {
    flex: 1,
  },

  topControls: {
    position: "absolute",
    top: 45,
    width: "100%",
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  topButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  shutterContainer: {
    position: "absolute",
    bottom: 45,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  shutterBtn: {
    width: 90,
    height: 90,
    borderRadius: 50,
    borderWidth: 5,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },

  shutterBtnInner: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },

  modeSwitch: {
    position: "absolute",
    bottom: 150,
    width: "100%",
    alignItems: "center",
  },

  modeText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    opacity: 0.9,
    paddingVertical: 8,
  },

  flipButton: {
    position: "absolute",
    right: 20,
    top: 45,
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 40,
  },

  flipButtonText: {
    color: "#fff",
    fontSize: 16,
  },

  reviewContainer: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  reviewImage: {
    width: "100%",
    height: "80%",
    resizeMode: "contain",
    borderRadius: 12,
  },

  reviewButton: {
    marginTop: 20,
    padding: 14,
    borderRadius: 10,
    backgroundColor: "#fff",
  },

  reviewButtonText: {
    color: "#000",
    fontWeight: "600",
    fontSize: 16,
  },
});
