import type { AuthRepository } from "@/src/domain/repositories/auth-repository";

export class SignOutUseCase {
  constructor(private readonly repository: AuthRepository) {}

  execute(): Promise<void> {
    return this.repository.signOut();
  }
}
