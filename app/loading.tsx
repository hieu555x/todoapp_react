import { useColorScheme } from "@/hooks/use-color-scheme";
import { getMaterialScheme } from "@/src/presentation/theme/material-you";
import { View } from "react-native";

export default function LoadingScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const scheme = getMaterialScheme(colorScheme);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: scheme.background,
        justifyContent: "center",
        alignItems: "center",
      }}
    />
  );
}
