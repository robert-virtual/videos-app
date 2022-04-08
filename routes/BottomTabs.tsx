import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Crear, Home } from "../pages";
import { Perfil } from "../pages/Perfil";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
const Tab = createBottomTabNavigator();
import { Entypo } from "@expo/vector-icons";

export function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={({ navigation }) => ({
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
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
      <Tab.Screen
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
        }}
        name="Nuevo"
        component={Crear}
      />
      <Tab.Screen
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
        }}
        name="Perfil"
        component={Perfil}
      />
    </Tab.Navigator>
  );
}
