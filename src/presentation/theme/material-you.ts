import { Platform } from "react-native";

export type MaterialScheme = {
  background: string;
  surface: string;
  surfaceContainer: string;
  surfaceContainerHigh: string;
  primary: string;
  onPrimary: string;
  onSurface: string;
  onSurfaceVariant: string;
  outline: string;
  secondaryContainer: string;
  onSecondaryContainer: string;
  errorContainer: string;
  onErrorContainer: string;
};

const lightScheme: MaterialScheme = {
  background: "#F8F4FF",
  surface: "#FDF7FF",
  surfaceContainer: "#EEE7F8",
  surfaceContainerHigh: "#E5DEF0",
  primary: "#6750A4",
  onPrimary: "#FFFFFF",
  onSurface: "#1D1B20",
  onSurfaceVariant: "#49454F",
  outline: "#7A757F",
  secondaryContainer: "#E8DEF8",
  onSecondaryContainer: "#1E192B",
  errorContainer: "#F9DEDC",
  onErrorContainer: "#410E0B",
};

const darkScheme: MaterialScheme = {
  background: "#15121C",
  surface: "#191622",
  surfaceContainer: "#221E2D",
  surfaceContainerHigh: "#2A2537",
  primary: "#D0BCFF",
  onPrimary: "#381E72",
  onSurface: "#E6E0E9",
  onSurfaceVariant: "#CAC4D0",
  outline: "#948F99",
  secondaryContainer: "#4A4458",
  onSecondaryContainer: "#E8DEF8",
  errorContainer: "#8C1D18",
  onErrorContainer: "#F9DEDC",
};

export function getMaterialScheme(
  colorScheme: "light" | "dark",
): MaterialScheme {
  return colorScheme === "dark" ? darkScheme : lightScheme;
}

export const materialTypography = {
  titleLarge: {
    fontFamily: Platform.select({
      android: "sans-serif-medium",
      default: "System",
    }),
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "700" as const,
  },
  titleMedium: {
    fontFamily: Platform.select({
      android: "sans-serif-medium",
      default: "System",
    }),
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "600" as const,
  },
  bodyLarge: {
    fontFamily: Platform.select({ android: "sans-serif", default: "System" }),
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400" as const,
  },
  bodyMedium: {
    fontFamily: Platform.select({ android: "sans-serif", default: "System" }),
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "400" as const,
  },
  labelLarge: {
    fontFamily: Platform.select({
      android: "sans-serif-medium",
      default: "System",
    }),
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600" as const,
  },
};
