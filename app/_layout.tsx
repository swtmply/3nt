import { Stack, Tabs } from "expo-router";
import { Clock, Wallet } from "lucide-react-native";

import "./styles/global.css";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopWidth: 0,
          height: 100,
          paddingVertical: 0,
        },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
        tabBarItemStyle: {
          height: "100%",
          padding: 0,
          margin: 0,
        },
        tabBarIconStyle: {
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: (props) => <Wallet {...props} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: (props) => <Clock {...props} />,
        }}
      />
    </Tabs>
  );
}
