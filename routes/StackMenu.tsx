import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { Crear, Home, IVideo, VideoPage } from "../pages";
import { Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { RouteProp } from "@react-navigation/native";

export type Pages = {
  Home: undefined;
  Crear: undefined;
  Video: { video: IVideo };
};
export type PageProps<T extends keyof Pages> = {
  navigation: NativeStackNavigationProp<Pages, T>;
  route: RouteProp<Pages, T>;
};

const Stack = createNativeStackNavigator<Pages>();

export function StackMenu() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={({ navigation }) => ({
          headerStyle: {
            backgroundColor: "black",
          },
          headerTintColor: "white",
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Crear")}>
              <Entypo name="camera" size={24} color="white" />
            </TouchableOpacity>
          ),
        })}
        name="Home"
        component={Home}
      />
      <Stack.Screen
        options={{ headerTransparent: true }}
        name="Crear"
        component={Crear}
      />
      <Stack.Screen name="Video" component={VideoPage} />
    </Stack.Navigator>
  );
}
