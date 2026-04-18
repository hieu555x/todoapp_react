import type { Todo } from "@/src/domain/entities/todo";

export interface TodoRepository {
  getAll(): Promise<Todo[]>;
  add(title: string): Promise<Todo>;
  toggle(id: string): Promise<Todo[]>;
  remove(id: string): Promise<Todo[]>;
}
