import type { AuthUser } from "@/src/domain/entities/auth-user";
import type { AuthRepository } from "@/src/domain/repositories/auth-repository";

export class GetCurrentUserUseCase {
  constructor(private readonly repository: AuthRepository) {}

  execute(): Promise<AuthUser | null> {
    return this.repository.getCurrentUser();
  }
}
