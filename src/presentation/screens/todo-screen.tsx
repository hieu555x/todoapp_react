import { useColorScheme } from "@/hooks/use-color-scheme";
import type { TodoFilter } from "@/src/domain/entities/todo";
import { useAuthViewModel } from "@/src/presentation/hooks/use-auth-view-model";
import { useThemeMode } from "@/src/presentation/hooks/use-theme-mode";
import { useTodoViewModel } from "@/src/presentation/hooks/use-todo-view-model";
import {
  getMaterialScheme,
  materialTypography,
} from "@/src/presentation/theme/material-you";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const FILTERS: { key: TodoFilter; label: string }[] = [
  { key: "all", label: "Tất cả" },
  { key: "active", label: "Đang làm" },
  { key: "completed", label: "Hoàn thành" },
];

export default function TodoScreen() {
  const systemColorScheme = useColorScheme() ?? "light";
  const { mode: themeMode, toggleThemeMode } = useThemeMode();

  // Use manual theme mode if set to light/dark, otherwise use system preference
  const colorScheme = themeMode === "system" ? systemColorScheme : themeMode;

  const scheme = getMaterialScheme(colorScheme);
  const vm = useTodoViewModel();
  const authVm = useAuthViewModel();
  const { loadTodos } = vm;

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      style={[styles.safeArea, { backgroundColor: scheme.background }]}
    >
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: "padding", default: undefined })}
        style={styles.flexOne}
      >
        <View style={styles.container}>
          <View
            style={[
              styles.heroCard,
              { backgroundColor: scheme.surfaceContainerHigh },
            ]}
          >
            <View style={styles.heroHeader}>
              <Pressable
                onPress={toggleThemeMode}
                style={({ pressed }) => [
                  styles.themeToggleButton,
                  {
                    backgroundColor: scheme.secondaryContainer,
                    opacity: pressed ? 0.85 : 1,
                  },
                ]}
              >
                <Text
                  style={[
                    materialTypography.titleMedium,
                    {
                      color: scheme.onSecondaryContainer,
                    },
                  ]}
                >
                  {colorScheme === "dark" ? "☀️" : "🌙"}
                </Text>
              </Pressable>
              <View>
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
                  {vm.activeCount} việc đang chờ trong tổng số {vm.totalCount}{" "}
                  việc
                </Text>
              </View>
              <Pressable
                onPress={authVm.signOut}
                style={({ pressed }) => [
                  styles.signOutButtonIcon,
                  {
                    backgroundColor: scheme.errorContainer,
                    opacity: pressed ? 0.85 : 1,
                  },
                ]}
                disabled={authVm.loading}
              >
                <MaterialIcons
                  name="logout"
                  size={20}
                  color={scheme.onErrorContainer}
                />
              </Pressable>
            </View>
          </View>

          {vm.error && (
            <View
              style={[
                styles.errorBanner,
                { backgroundColor: scheme.errorContainer },
              ]}
            >
              <Text
                style={[
                  materialTypography.bodyMedium,
                  { color: scheme.onErrorContainer },
                ]}
              >
                {vm.error}
              </Text>
            </View>
          )}

          <View
            style={[
              styles.inputShell,
              { backgroundColor: scheme.surfaceContainer },
            ]}
          >
            <TextInput
              value={vm.draft}
              onChangeText={vm.setDraft}
              placeholder="Thêm công việc mới"
              placeholderTextColor={scheme.onSurfaceVariant}
              style={[
                styles.input,
                materialTypography.bodyLarge,
                { color: scheme.onSurface },
              ]}
              returnKeyType="done"
              onSubmitEditing={vm.addTodo}
            />
            <Pressable
              onPress={vm.addTodo}
              style={({ pressed }) => [
                styles.fab,
                {
                  backgroundColor: scheme.primary,
                  opacity: pressed || vm.loading ? 0.85 : 1,
                },
              ]}
              disabled={vm.loading}
            >
              <MaterialIcons name="add" size={24} color={scheme.onPrimary} />
            </Pressable>
          </View>

          <View style={styles.filterRow}>
            {FILTERS.map((item) => {
              const selected = vm.filter === item.key;
              return (
                <Pressable
                  key={item.key}
                  onPress={() => vm.setFilter(item.key)}
                  style={[
                    styles.filterChip,
                    {
                      backgroundColor: selected
                        ? scheme.secondaryContainer
                        : scheme.surface,
                      borderColor: scheme.outline,
                    },
                  ]}
                >
                  <Text
                    style={[
                      materialTypography.labelLarge,
                      {
                        color: selected
                          ? scheme.onSecondaryContainer
                          : scheme.onSurfaceVariant,
                      },
                    ]}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <FlatList
            data={vm.todos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.todoCard,
                  { backgroundColor: scheme.surfaceContainer },
                ]}
              >
                <Pressable
                  style={styles.todoMainButton}
                  onPress={() => vm.toggleTodo(item.id)}
                >
                  <View
                    style={[
                      styles.statusButton,
                      {
                        backgroundColor: item.completed
                          ? scheme.surfaceVariant
                          : scheme.primary,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        materialTypography.labelSmall,
                        {
                          color: item.completed
                            ? scheme.onSurfaceVariant
                            : scheme.onPrimary,
                        },
                      ]}
                    >
                      {item.completed ? "Chưa hoàn thành" : "Hoàn thành"}
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.todoText,
                      materialTypography.bodyLarge,
                      {
                        color: item.completed
                          ? scheme.onSurfaceVariant
                          : scheme.onSurface,
                        textDecorationLine: item.completed
                          ? "line-through"
                          : "none",
                      },
                    ]}
                  >
                    {item.title}
                  </Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.deleteButton,
                    { backgroundColor: scheme.errorContainer },
                  ]}
                  onPress={() => vm.removeTodo(item.id)}
                >
                  <MaterialIcons
                    name="delete"
                    size={20}
                    color={scheme.onErrorContainer}
                  />
                </Pressable>
              </View>
            )}
            ListEmptyComponent={
              <View
                style={[
                  styles.emptyCard,
                  { backgroundColor: scheme.surfaceContainerLow },
                ]}
              >
                <Text
                  style={[
                    materialTypography.bodyMedium,
                    { color: scheme.onSurfaceVariant },
                  ]}
                >
                  Không có công việc nào
                </Text>
              </View>
            }
            contentContainerStyle={styles.listContent}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  flexOne: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    gap: 14,
  },
  heroCard: {
    borderRadius: 28,
    paddingHorizontal: 20,
    paddingVertical: 18,
    gap: 4,
  },
  heroHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  signOutButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  signOutButtonSmall: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  signOutButtonIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  headerButtons: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  themeToggleButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  footerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 10,
  },
  signOutButtonFull: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    letterSpacing: 0.2,
  },
  subtitle: {
    letterSpacing: 0.1,
  },
  errorBanner: {
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  inputShell: {
    borderRadius: 22,
    paddingLeft: 16,
    paddingRight: 10,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  input: {
    flex: 1,
    minHeight: 44,
  },
  fab: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  filterChip: {
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  listContent: {
    paddingBottom: 28,
  },
  separator: {
    height: 10,
  },
  todoCard: {
    borderRadius: 20,
    paddingVertical: 12,
    paddingLeft: 12,
    paddingRight: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  todoMainButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingRight: 12,
  },
  todoText: {
    flexShrink: 1,
  },
  statusButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  deleteButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyCard: {
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 16,
  },
});
