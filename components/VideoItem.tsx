import { Video } from "expo-av";
import { useRef } from "react";
import { Text, useWindowDimensions, View } from "react-native";
import { IVideoRes } from "../pages";

interface Props {
  item: IVideoRes;
}

export function VideoItem({ item }: Props) {
  const { height } = useWindowDimensions();
  const videoRef = useRef<Video>(null);
  return (
    <View
      style={{
        position: "relative",
        width: "100%",
        height: height * 0.94,
        backgroundColor: "black",
      }}
    >
      <Video
        ref={videoRef}
        onLoad={() => {
          videoRef.current?.playAsync();
        }}
        style={{ width: "100%", height: "100%" }}
        source={{
          uri: item.url,
        }}
        resizeMode="contain"
        isLooping
      />
      <View
        style={{
          position: "absolute",
          bottom: 10,
          padding: 15,
          width: "100%",
          backgroundColor: "black",
        }}
      >
        <Text style={{ color: "white" }}>{item.titulo}</Text>
        <Text style={{ color: "white" }}>{item.user.nombre}</Text>
      </View>
    </View>
  );
}
