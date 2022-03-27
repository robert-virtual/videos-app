import { NavigationContainer } from "@react-navigation/native";
import { StackMenu } from "./routes";

export default function App() {
  return (
    <NavigationContainer>
      <StackMenu />
    </NavigationContainer>
  );
}
