import { useEffect, useState } from "react";
import { IOScrollView } from "react-native-intersection-observer";

import {
  StyleSheet,
  StatusBar,
  FlatList,
  useWindowDimensions,
} from "react-native";
import { VideoItem } from "../components";
import { api_url } from "../constantes";

export interface IVideoRes {
  filename: string;
  id: string;
  user: {
    nombre: string;
  };
  titulo: string;
  url: string;
}

export function Home() {
  const { height } = useWindowDimensions();
  const [cargando, setCargando] = useState(true);
  const [videos, setVideos] = useState<IVideoRes[]>([]);
  useEffect(() => {
    fetchVideos();
  }, []);
  async function fetchVideos() {
    try {
      setCargando(true);
      const res = await fetch(api_url + "/videos");

      let data = await res.json();
      setVideos(data);
    } catch (error) {
      console.warn(error);
    }
    setCargando(false);
  }

  return (
    <>
      <IOScrollView
        snapToInterval={height * 0.9}
        snapToAlignment={"start"}
        decelerationRate={"normal"}
        style={{ flex: 1, backgroundColor: "#ffff" }}
        contentContainerStyle={{ backgroundColor: "black" }}
      >
        {videos.map((v) => (
          <VideoItem key={v.id} item={v} />
        ))}
      </IOScrollView>
      <StatusBar barStyle={"light-content"} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});
