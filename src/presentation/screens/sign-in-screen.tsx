import { useColorScheme } from "@/hooks/use-color-scheme";
import { useAuthViewModel } from "@/src/presentation/hooks/use-auth-view-model";
import {
  getMaterialScheme,
  materialTypography,
} from "@/src/presentation/theme/material-you";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  card: {
    borderRadius: 12,
    padding: 24,
    marginBottom: 24,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
  },
  input: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  buttonText: {
    fontWeight: "600",
    fontSize: 16,
  },
  errorBanner: {
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 14,
  },
  noticeBanner: {
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  noticeText: {
    fontSize: 14,
  },
  toggleModeContainer: {
    alignItems: "center",
    marginTop: 16,
  },
  toggleModeText: {
    fontSize: 14,
  },
  toggleModeButton: {
    padding: 4,
  },
  cooldownText: {
    fontSize: 12,
    marginTop: 8,
  },
});

export default function SignInScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const scheme = getMaterialScheme(colorScheme);
  const vm = useAuthViewModel();

  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      style={[styles.safeArea, { backgroundColor: scheme.background }]}
    >
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: "padding", default: undefined })}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <View
            style={[
              styles.card,
              { backgroundColor: scheme.surfaceContainerHigh },
            ]}
          >
            <Text
              style={[
                styles.title,
                materialTypography.titleLarge,
                { color: scheme.onSurface },
              ]}
            >
              TodoApp
            </Text>
            <Text
              style={[
                styles.subtitle,
                materialTypography.bodyMedium,
                { color: scheme.onSurfaceVariant },
              ]}
            >
              {vm.mode === "sign-in"
                ? "Đăng nhập để tiếp tục"
                : "Tạo tài khoản mới"}
            </Text>

            {vm.error && (
              <View
                style={[
                  styles.errorBanner,
                  { backgroundColor: scheme.errorContainer },
                ]}
              >
                <Text
                  style={[
                    styles.errorText,
                    materialTypography.bodySmall,
                    { color: scheme.onErrorContainer },
                  ]}
                >
                  {vm.error}
                </Text>
              </View>
            )}

            {vm.notice && (
              <View
                style={[
                  styles.noticeBanner,
                  { backgroundColor: scheme.tertiaryContainer },
                ]}
              >
                <Text
                  style={[
                    styles.noticeText,
                    materialTypography.bodySmall,
                    { color: scheme.onTertiaryContainer },
                  ]}
                >
                  {vm.notice}
                </Text>
              </View>
            )}

            <View style={styles.inputContainer}>
              <Text
                style={[
                  styles.label,
                  materialTypography.labelMedium,
                  { color: scheme.onSurface },
                ]}
              >
                Email
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: scheme.surface,
                    borderColor: scheme.outline,
                    color: scheme.onSurface,
                  },
                ]}
                placeholder="example@email.com"
                placeholderTextColor={scheme.outlineVariant}
                value={vm.email}
                onChangeText={vm.setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                editable={!vm.loading}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text
                style={[
                  styles.label,
                  materialTypography.labelMedium,
                  { color: scheme.onSurface },
                ]}
              >
                Mật khẩu
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: scheme.surface,
                    borderColor: scheme.outline,
                    color: scheme.onSurface,
                  },
                ]}
                placeholder="••••••"
                placeholderTextColor={scheme.outlineVariant}
                value={vm.password}
                onChangeText={vm.setPassword}
                secureTextEntry
                editable={!vm.loading}
              />
            </View>

            <Pressable
              style={[
                styles.button,
                { backgroundColor: scheme.primary },
                vm.loading && { opacity: 0.6 },
              ]}
              onPress={vm.submit}
              disabled={vm.loading}
            >
              <Text style={[styles.buttonText, { color: scheme.onPrimary }]}>
                {vm.loading
                  ? "Đang xử lý..."
                  : vm.mode === "sign-in"
                    ? "Đăng nhập"
                    : "Đăng ký"}
              </Text>
            </Pressable>

            {vm.mode === "sign-up" && vm.signupCooldownSeconds > 0 && (
              <Text
                style={[
                  styles.cooldownText,
                  {
                    color: scheme.error,
                    textAlign: "center",
                  },
                ]}
              >
                Thử lại trong {vm.signupCooldownSeconds}s
              </Text>
            )}

            <View style={styles.toggleModeContainer}>
              <Text
                style={[
                  styles.toggleModeText,
                  { color: scheme.onSurfaceVariant },
                ]}
              >
                {vm.mode === "sign-in"
                  ? "Chưa có tài khoản? "
                  : "Đã có tài khoản? "}
              </Text>
              <Pressable
                style={styles.toggleModeButton}
                onPress={() => {
                  vm.setMode(vm.mode === "sign-in" ? "sign-up" : "sign-in");
                  vm.setError(null);
                  vm.setNotice(null);
                }}
                disabled={vm.loading}
              >
                <Text
                  style={[
                    styles.toggleModeText,
                    { color: scheme.primary, fontWeight: "600" },
                  ]}
                >
                  {vm.mode === "sign-in" ? "Đăng ký" : "Đăng nhập"}
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
