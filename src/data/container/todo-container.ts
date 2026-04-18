import { SupabaseAuthRepository } from "@/src/data/repositories/supabase-auth-repository";
import { SupabaseTodoRepository } from "@/src/data/repositories/supabase-todo-repository";
import { AddTodoUseCase } from "@/src/domain/usecases/add-todo";
import { GetCurrentUserUseCase } from "@/src/domain/usecases/get-current-user";
import { GetTodosUseCase } from "@/src/domain/usecases/get-todos";
import { RemoveTodoUseCase } from "@/src/domain/usecases/remove-todo";
import { SignInUseCase } from "@/src/domain/usecases/sign-in";
import { SignOutUseCase } from "@/src/domain/usecases/sign-out";
import { SignUpUseCase } from "@/src/domain/usecases/sign-up";
import { ToggleTodoUseCase } from "@/src/domain/usecases/toggle-todo";

const todoRepository = new SupabaseTodoRepository();
const authRepository = new SupabaseAuthRepository();

export const todoContainer = {
  // Todo UseCases
  getTodosUseCase: new GetTodosUseCase(todoRepository),
  addTodoUseCase: new AddTodoUseCase(todoRepository),
  toggleTodoUseCase: new ToggleTodoUseCase(todoRepository),
  removeTodoUseCase: new RemoveTodoUseCase(todoRepository),

  // Auth UseCases
  signInUseCase: new SignInUseCase(authRepository),
  signUpUseCase: new SignUpUseCase(authRepository),
  signOutUseCase: new SignOutUseCase(authRepository),
  getCurrentUserUseCase: new GetCurrentUserUseCase(authRepository),

  // Repositories
  authRepository,
};
