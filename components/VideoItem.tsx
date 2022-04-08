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
import { InView } from "react-native-intersection-observer";
import { TapGestureHandler } from "react-native-gesture-handler";
interface Props {
  item: IVideoRes;
}

export function VideoItem({ item }: Props) {
  const { height, width } = useWindowDimensions();
  const videoRef = useRef<Video>(null);
  const [visible, setVisible] = useState(false);
  function toggleControl() {
    console.log("touch ends");
    if (!visible) {
      videoRef.current?.pauseAsync();
      console.log("paused");
    } else {
      videoRef.current?.playAsync();
      console.log("playing");
    }
    setVisible((prev) => !prev);
  }
  function inView(inView: Boolean) {
    if (inView) {
      videoRef.current?.playAsync();
      return;
    }
    videoRef.current?.stopAsync();
  }

  return (
    <InView
      onChange={inView}
      style={{
        padding: 0,
        margin: 0,
        position: "relative",
        width,
        height: height * 0.9,
        backgroundColor: "black",
      }}
    >
      <TapGestureHandler onActivated={toggleControl}>
        <Video
          ref={videoRef}
          style={{ width, height: height * 0.9 }}
          source={{
            uri: item.url,
          }}
          isLooping
          resizeMode="contain"
        ></Video>
      </TapGestureHandler>
      {visible ? (
        <TouchableOpacity
          style={{
            position: "absolute",
            alignItems: "center",
            justifyContent: "center",
            top: (height * 0.9) / 2,
            left: width * 0.5,
            margin: 0,
            padding: 0,
            backgroundColor: "#333",
            width: 60,
            height: 60,
            borderRadius: 30,
          }}
        >
          <Entypo
            style={{ margin: 0, padding: 0 }}
            name="controller-paus"
            size={50}
            color="white"
          />
        </TouchableOpacity>
      ) : null}
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
    </InView>
  );
}
