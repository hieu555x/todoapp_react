import { todoContainer } from "@/src/data/container/todo-container";
import type { Todo, TodoFilter } from "@/src/domain/entities/todo";
import { useCallback, useMemo, useState } from "react";

export function useTodoViewModel() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [draft, setDraft] = useState("");
  const [filter, setFilter] = useState<TodoFilter>("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadTodos = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await todoContainer.getTodosUseCase.execute();
      setTodos(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Không thể tải todo.");
    } finally {
      setLoading(false);
    }
  }, []);

  const addTodo = useCallback(async () => {
    if (!draft.trim()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await todoContainer.addTodoUseCase.execute(draft);
      setDraft("");
      await loadTodos();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Không thể thêm todo.");
    } finally {
      setLoading(false);
    }
  }, [draft, loadTodos]);

  const toggleTodo = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const nextTodos = await todoContainer.toggleTodoUseCase.execute(id);
      setTodos(nextTodos);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Không thể cập nhật todo.");
    } finally {
      setLoading(false);
    }
  }, []);

  const removeTodo = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const nextTodos = await todoContainer.removeTodoUseCase.execute(id);
      setTodos(nextTodos);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Không thể xóa todo.");
    } finally {
      setLoading(false);
    }
  }, []);

  const clearTodos = useCallback(() => {
    setTodos([]);
    setDraft("");
    setFilter("all");
    setError(null);
  }, []);

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case "active":
        return todos.filter((todo) => !todo.completed);
      case "completed":
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }, [filter, todos]);

  const activeCount = useMemo(
    () => todos.filter((todo) => !todo.completed).length,
    [todos],
  );

  return {
    draft,
    filter,
    loading,
    error,
    todos: filteredTodos,
    totalCount: todos.length,
    activeCount,
    setDraft,
    setFilter,
    setError,
    loadTodos,
    addTodo,
    toggleTodo,
    removeTodo,
    clearTodos,
  };
}
