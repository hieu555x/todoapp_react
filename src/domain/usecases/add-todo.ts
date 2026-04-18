import type { Todo } from "@/src/domain/entities/todo";
import type { TodoRepository } from "@/src/domain/repositories/todo-repository";

export class AddTodoUseCase {
  constructor(private readonly repository: TodoRepository) {}

  execute(title: string): Promise<Todo> {
    return this.repository.add(title);
  }
}
