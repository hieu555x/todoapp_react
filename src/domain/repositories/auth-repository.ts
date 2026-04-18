import type { AuthUser } from "@/src/domain/entities/auth-user";

export interface AuthRepository {
  getCurrentUser(): Promise<AuthUser | null>;
  signIn(email: string, password: string): Promise<AuthUser>;
  signUp(email: string, password: string): Promise<AuthUser | null>;
  signOut(): Promise<void>;
  onAuthStateChange(callback: (user: AuthUser | null) => void): {
    unsubscribe: () => void;
  };
}
