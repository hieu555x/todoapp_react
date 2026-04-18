import type { Todo } from "@/src/domain/entities/todo";
import type { TodoRepository } from "@/src/domain/repositories/todo-repository";

export class RemoveTodoUseCase {
  constructor(private readonly repository: TodoRepository) {}

  execute(id: string): Promise<Todo[]> {
    return this.repository.remove(id);
  }
}
