import {
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Button,
  StatusBar,
  useWindowDimensions,
} from "react-native";
import { Camera } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { PageProps } from "../routes";
import { VideoCodec } from "expo-camera/build/Camera.types";

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
  const { width } = useWindowDimensions();
  const [CameraType, setCameraType] = useState<"back" | "front">("back");
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
    console.log(video);

    if (video) {
      navigation.navigate("Video", { video: video });
      setVideo(undefined);
    }
    if (!video) {
      cameraRef.current?.resumePreview();
    }
  }, [video]);

  async function grabar() {
    console.log("grabando...");
    const res = await cameraRef.current?.recordAsync();
    console.log("fin");
    console.log(res);
    setVideo(res);
  }

  useEffect(() => {
    solicitarPermisos();
  }, []);

  async function solicitarPermisos() {
    let camerapermission = await Camera.getCameraPermissionsAsync();
    let audioPermission = await Camera.getMicrophonePermissionsAsync();

    if (!audioPermission.granted) {
      camerapermission = await Camera.requestCameraPermissionsAsync();
    }

    if (!camerapermission.granted) {
      audioPermission = await Camera.requestMicrophonePermissionsAsync();
    }
    setGranted(camerapermission.granted && audioPermission.granted);
    setCargando(false);
  }

  if (cargando) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={"large"} color="blue" />
      </View>
    );
  }
  if (!granted) {
    <View style={styles.container}>
      <Text>Debe proporcionar permisos para usar el microfono y la camara</Text>
      <Button title="Volver a Solicitar " onPress={solicitarPermisos} />
    </View>;
  }
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <Camera
        ratio="16:9"
        ref={cameraRef}
        style={{ height: (width / 9) * 16, width: "100%" }}
        type={CameraType}
      />
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
      <TouchableOpacity
        style={{
          width: 75,
          height: 75,
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          bottom: 25,
          right: 25,
        }}
        onPress={() => {
          // cambiera a camara frontal o tracera
          setCameraType((prev) => {
            console.log(prev);

            return prev == "back" ? "front" : "back";
          });
        }}
      >
        <MaterialIcons name="flip-camera-android" size={24} color="white" />
      </TouchableOpacity>
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
