import type { AuthUser } from "@/src/domain/entities/auth-user";
import type { AuthRepository } from "@/src/domain/repositories/auth-repository";

export class SignUpUseCase {
  constructor(private readonly repository: AuthRepository) {}

  execute(email: string, password: string): Promise<AuthUser | null> {
    return this.repository.signUp(email, password);
  }
}
