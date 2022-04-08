import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { Crear, IVideo, VideoPage } from "../pages";
import { RouteProp } from "@react-navigation/native";
import { BottomTabs } from "./BottomTabs";

export type Pages = {
  Crear: undefined;
  Video: { video: IVideo };
  BottomTabs: undefined;
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
        options={{ headerShown: false }}
        name="BottomTabs"
        component={BottomTabs}
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
