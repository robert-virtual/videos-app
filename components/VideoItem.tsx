import { Video } from "expo-av";
import { useRef, useState } from "react";
import {
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { IVideoRes } from "../pages";
import { Entypo } from "@expo/vector-icons";
interface Props {
  item: IVideoRes;
}

export function VideoItem({ item }: Props) {
  const { height, width } = useWindowDimensions();
  const videoRef = useRef<Video>(null);
  const [visible, setVisible] = useState(false);
  function toggleControl() {
    if (visible) {
      videoRef.current?.pauseAsync();
    } else {
      videoRef.current?.playAsync();
    }

    setVisible((prev) => !prev);
  }

  return (
    <View
      onTouchEnd={toggleControl}
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
      >
        {visible ? (
          <TouchableOpacity
            style={{
              position: "absolute",
              top: (height * 0.94) / 2,
              left: width / 2,
              backgroundColor: "#333333e2",
              width: 60,
              height: 60,
              borderRadius: 30,
            }}
          >
            <Entypo name="controller-play" size={50} color="white" />
          </TouchableOpacity>
        ) : null}
      </Video>
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
