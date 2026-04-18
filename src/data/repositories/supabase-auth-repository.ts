import type { AuthUser } from "@/src/domain/entities/auth-user";
import type { AuthRepository } from "@/src/domain/repositories/auth-repository";
import { supabase } from "@/src/infrastructure/supabase/supabase-client";
import { mapSupabaseError } from "@/src/infrastructure/supabase/supabase-error";

function mapAuthUser(input: { id: string; email?: string | null }): AuthUser {
  return {
    id: input.id,
    email: input.email ?? "",
  };
}

export class SupabaseAuthRepository implements AuthRepository {
  async getCurrentUser(): Promise<AuthUser | null> {
    try {
      console.log("[SupabaseAuth] Getting current user...");
      const { data, error } = await supabase.auth.getUser();

      console.log(
        "[SupabaseAuth] getUser response - error:",
        error,
        "user:",
        data.user?.email,
      );

      // "Auth session missing" é esperado quando usuário não está logado
      if (error?.message === "Auth session missing!") {
        console.log(
          "[SupabaseAuth] No active session (expected on first load)",
        );
        return null;
      }

      if (error) {
        throw new Error(error.message);
      }

      return data.user ? mapAuthUser(data.user) : null;
    } catch (error) {
      console.log("[SupabaseAuth] getCurrentUser error:", error);
      throw mapSupabaseError(error);
    }
  }

  async signIn(email: string, password: string): Promise<AuthUser> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error || !data.user) {
        throw new Error(error?.message ?? "Unable to sign in");
      }

      return mapAuthUser(data.user);
    } catch (error) {
      throw mapSupabaseError(error);
    }
  }

  async signUp(email: string, password: string): Promise<AuthUser | null> {
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });

      if (error) {
        throw new Error(error.message);
      }

      return data.user ? mapAuthUser(data.user) : null;
    } catch (error) {
      throw mapSupabaseError(error);
    }
  }

  async signOut(): Promise<void> {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      throw mapSupabaseError(error);
    }
  }

  onAuthStateChange(callback: (user: AuthUser | null) => void): {
    unsubscribe: () => void;
  } {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      callback(session?.user ? mapAuthUser(session.user) : null);
    });

    return {
      unsubscribe: () => subscription.unsubscribe(),
    };
  }
}
