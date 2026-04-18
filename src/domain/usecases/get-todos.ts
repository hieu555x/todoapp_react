import type { Todo } from "@/src/domain/entities/todo";
import type { TodoRepository } from "@/src/domain/repositories/todo-repository";

export class GetTodosUseCase {
  constructor(private readonly repository: TodoRepository) {}

  execute(): Promise<Todo[]> {
    return this.repository.getAll();
  }
}
