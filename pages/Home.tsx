import { Video } from "expo-av";
import { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  FlatList,
  useWindowDimensions,
} from "react-native";
import { VideoItem } from "../components";

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

  const [videos, setVideos] = useState<IVideoRes[]>([]);
  useEffect(() => {
    fetchVideos();
  }, []);
  async function fetchVideos() {
    try {
      const res = await fetch("https://videos-backen.herokuapp.com/videos");

      let data = await res.json();
      console.log(data);
      setVideos(data);
    } catch (error) {
      console.warn(error);
    }
  }
  return (
    <>
      <FlatList
        onRefresh={fetchVideos}
        refreshing={true}
        snapToInterval={height * 0.94}
        snapToAlignment={"start"}
        decelerationRate={"normal"}
        style={{ flex: 1, backgroundColor: "#ffff" }}
        contentContainerStyle={{ backgroundColor: "black" }}
        data={videos}
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
  },
});
