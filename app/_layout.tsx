import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { useAuthViewModel } from "@/src/presentation/hooks/use-auth-view-model";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const authVm = useAuthViewModel();
  const router = useRouter();

  console.log(
    "[RootLayout] initializing:",
    authVm.initializing,
    "user:",
    authVm.user?.email,
  );

  useEffect(() => {
    if (authVm.initializing) {
      console.log("[RootLayout] Still initializing...");
      return;
    }

    if (authVm.user) {
      console.log("[RootLayout] User logged in, navigate to tabs");
      router.replace("/(tabs)");
    } else {
      console.log("[RootLayout] No user, navigate to sign-in");
      router.replace("/sign-in");
    }
  }, [authVm.initializing, authVm.user, router]);

  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen
            name="sign-in"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="modal"
            options={{
              presentation: "modal",
              title: "Modal",
              headerShown: false,
            }}
          />
        </Stack>
        <StatusBar style="auto" translucent={false} />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
