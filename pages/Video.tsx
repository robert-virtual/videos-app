import { Video } from "expo-av";
import { useRef, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Button,
  ActivityIndicator,
} from "react-native";
import { PageProps } from "../routes";

export function VideoPage({ route }: PageProps<"Video">) {
  const videoRef = useRef<Video>(null);
  const { video } = route.params;
  const [titulo, setTitulo] = useState("");
  const [cargando, setCargando] = useState(false);
  const [msg, setMsg] = useState("");
  // funciones
  async function subirVideo() {
    if (!titulo) {
      return;
    }
    let body = new FormData();
    body.append("titulo", titulo);

    body.append("video", {
      name: `nombreNoImporta.mp4`,
      type: `video/mp4`,
      uri: video?.uri,
    });
    console.log(body);

    try {
      setCargando(true);
      const res = await fetch("http://192.168.0.30:3000/videos", {
        method: "post",
        body,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const data = await res.json();
      setMsg("Video Subido exitosamente");
      console.log(data);
    } catch (error) {
      console.log(error);
      setMsg("Ups hubo un error");
    }
    setCargando(false);
  }
  if (msg) {
    return (
      <View style={styles.container}>
        <Text>{msg}</Text>
      </View>
    );
  }
  if (cargando) {
    return (
      <View style={styles.container}>
        <Text>Subiendo video...</Text>
        <ActivityIndicator size={"large"} color="blue" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        onLoad={() => {
          videoRef.current?.playAsync();
        }}
        style={{ width: "100%", height: "100%" }}
        source={{
          uri: video.uri,
        }}
        useNativeControls={true}
        resizeMode="contain"
        isLooping
      />
      <View style={{ position: "absolute", bottom: 10, width: "100%" }}>
        <TextInput
          style={{ padding: 15, backgroundColor: "#f3f3f3" }}
          placeholder="titulo del video"
          value={titulo}
          onChangeText={setTitulo}
        />
        <Button title="Subir" onPress={subirVideo} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
