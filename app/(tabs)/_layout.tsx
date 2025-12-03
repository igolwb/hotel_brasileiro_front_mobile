import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: route.name !== "index", // Hide header for index
        tabBarStyle: route.name === "index" ? { display: "none" } : undefined, // Hide bottom tabs for index
      })}
    />
  );
}