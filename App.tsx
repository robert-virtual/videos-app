import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { useColorScheme } from "react-native";
import { StackMenu } from "./routes";

export default function App() {
  const schema = useColorScheme();
  return (
    <NavigationContainer theme={schema === "dark" ? DarkTheme : DefaultTheme}>
      <StackMenu />
    </NavigationContainer>
  );
}
