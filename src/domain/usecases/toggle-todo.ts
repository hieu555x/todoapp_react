import type { Todo } from "@/src/domain/entities/todo";
import type { TodoRepository } from "@/src/domain/repositories/todo-repository";

export class ToggleTodoUseCase {
  constructor(private readonly repository: TodoRepository) {}

  execute(id: string): Promise<Todo[]> {
    return this.repository.toggle(id);
  }
}
