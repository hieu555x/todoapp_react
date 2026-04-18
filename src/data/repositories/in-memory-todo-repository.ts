import type { Todo } from "@/src/domain/entities/todo";
import type { TodoRepository } from "@/src/domain/repositories/todo-repository";

export class InMemoryTodoRepository implements TodoRepository {
  private todos: Todo[] = [
    {
      id: "todo-1",
      title: "Lên kế hoạch tuần mới",
      completed: false,
      createdAt: Date.now() - 1000 * 60 * 60,
    },
    {
      id: "todo-2",
      title: "Xem lại thiết kế Material You",
      completed: true,
      createdAt: Date.now() - 1000 * 60 * 30,
    },
  ];

  async getAll(): Promise<Todo[]> {
    return [...this.todos].sort((a, b) => b.createdAt - a.createdAt);
  }

  async add(title: string): Promise<Todo> {
    const nextTodo: Todo = {
      id: `todo-${Date.now()}`,
      title: title.trim(),
      completed: false,
      createdAt: Date.now(),
    };

    this.todos = [nextTodo, ...this.todos];
    return nextTodo;
  }

  async toggle(id: string): Promise<Todo[]> {
    this.todos = this.todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    );

    return this.getAll();
  }

  async remove(id: string): Promise<Todo[]> {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    return this.getAll();
  }
}
