import { TabBarIcon } from "@/components/ui/icon-symbol";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { getMaterialScheme } from "@/src/presentation/theme/material-you";
import { Tabs } from "expo-router";

export default function TabLayout() {
  const colorScheme = useColorScheme() ?? "light";
  const scheme = getMaterialScheme(colorScheme);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          display: "none",
        },
        headerStyle: {
          backgroundColor: scheme.primary,
        },
        headerTintColor: scheme.onPrimary,
        headerTitleStyle: {
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Todo",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "checklist" : "checklist"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
