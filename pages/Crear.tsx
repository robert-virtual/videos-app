import {
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Button,
  StatusBar,
} from "react-native";
import { Camera } from "expo-camera";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { PageProps } from "../routes";
import { VideoCodec } from "expo-camera/build/Camera.types";
import { Video } from "expo-av";

declare global {
  interface FormData {
    append(name: string, value: string | Blob | any, fileName?: string): void;
  }
}

export interface IVideo {
  uri: string;
  codec?: VideoCodec | undefined;
}

export function Crear({ navigation }: PageProps<"Crear">) {
  const [CameraType, setCameraType] = useState<"back" | "front">();
  const [cargando, setCargando] = useState(true);
  const [granted, setGranted] = useState(false);
  const cameraRef = useRef<Camera>(null);
  const [video, setVideo] = useState<IVideo>();

  // funciones

  async function detenerGrabacion() {
    // detener grabacion al soltar el boton
    cameraRef.current?.stopRecording();
  }
  useEffect(() => {
    if (video) {
      navigation.navigate("Video", { video: video });
    }
  }, [video]);

  async function grabar() {
    console.log("grabando...");
    const res = await cameraRef.current?.recordAsync();
    console.log("fin");
    console.log(res);
    setVideo(res);
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTintColor: "white",
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            // cambiera a camara frontal o tracera
            setCameraType(CameraType == "back" ? "front" : "back");
          }}
        >
          <MaterialIcons name="flip-camera-android" size={24} color="white" />
        </TouchableOpacity>
      ),
    });
  }, []);

  useEffect(() => {
    Camera.requestCameraPermissionsAsync().then((status) => {
      Camera.requestMicrophonePermissionsAsync().then((status2) => {
        setGranted(status2.granted);
        setCargando(false);
      });
    });
  }, []);

  if (cargando) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={"large"} color="blue" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={{ flex: 1, height: "100%", width: "100%" }}
        type={CameraType}
      >
        <View
          style={{
            position: "absolute",
            bottom: 25,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onLongPress={grabar}
            onPressOut={detenerGrabacion}
            style={{
              width: 75,
              height: 75,
              borderRadius: 37,
              backgroundColor: "white",
            }}
          ></TouchableOpacity>
        </View>
      </Camera>
      <StatusBar barStyle={"light-content"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
