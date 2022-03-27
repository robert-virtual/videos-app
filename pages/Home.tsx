import { useEffect, useState } from "react";
import {
  StyleSheet,
  StatusBar,
  FlatList,
  useWindowDimensions,
  View,
  Text,
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
      const res = await fetch(api_url + "/videos");

      let data = await res.json();
      console.log(data);
      setVideos(data);
    } catch (error) {
      console.warn(error);
    }
    setCargando(false);
  }
  if (!cargando && !videos.length) {
    return (
      <View style={styles.container}>
        <Text>Aun no hay videos</Text>
      </View>
    );
  }
  return (
    <>
      <FlatList
        data={videos}
        onRefresh={fetchVideos}
        refreshing={cargando}
        snapToInterval={height * 0.94}
        snapToAlignment={"start"}
        decelerationRate={"normal"}
        style={{ flex: 1, backgroundColor: "#ffff" }}
        contentContainerStyle={{ backgroundColor: "black" }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <VideoItem item={item} />}
      />
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
