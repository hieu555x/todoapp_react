import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";

export type ThemeMode = "light" | "dark" | "system";

const THEME_KEY = "@todoapp_theme_mode";

export function useThemeMode() {
  const [mode, setMode] = useState<ThemeMode>("system");
  const [isLoading, setIsLoading] = useState(true);

  // Load saved theme preference on mount
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const saved = await AsyncStorage.getItem(THEME_KEY);
        if (saved === "light" || saved === "dark" || saved === "system") {
          setMode(saved);
        }
      } catch (error) {
        console.error("[Theme] Failed to load theme:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTheme();
  }, []);

  // Save theme preference
  const setThemeMode = useCallback(async (newMode: ThemeMode) => {
    try {
      setMode(newMode);
      await AsyncStorage.setItem(THEME_KEY, newMode);
      console.log("[Theme] Saved theme mode:", newMode);
    } catch (error) {
      console.error("[Theme] Failed to save theme:", error);
    }
  }, []);

  const toggleThemeMode = useCallback(async () => {
    const newMode: ThemeMode = mode === "light" ? "dark" : "light";
    await setThemeMode(newMode);
  }, [mode, setThemeMode]);

  return {
    mode,
    setThemeMode,
    toggleThemeMode,
    isLoading,
  };
}
