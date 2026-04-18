import { todoContainer } from "@/src/data/container/todo-container";
import type { AuthUser } from "@/src/domain/entities/auth-user";
import { useCallback, useEffect, useState } from "react";

type AuthMode = "sign-in" | "sign-up";

export function useAuthViewModel() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<AuthMode>("sign-in");
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [signupCooldownSeconds, setSignupCooldownSeconds] = useState(0);

  useEffect(() => {
    if (signupCooldownSeconds <= 0) {
      return;
    }

    const timerId = setInterval(() => {
      setSignupCooldownSeconds((seconds) => (seconds > 0 ? seconds - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [signupCooldownSeconds]);

  useEffect(() => {
    let mounted = true;

    async function bootstrap() {
      try {
        console.log("[Auth] Starting bootstrap...");
        const currentUser = await todoContainer.getCurrentUserUseCase.execute();
        console.log("[Auth] Current user:", currentUser);
        if (mounted) {
          setUser(currentUser);
          setError(null);
        }
      } catch (e) {
        console.log("[Auth] Bootstrap error:", e);
        if (mounted) {
          const message =
            e instanceof Error ? e.message : "Không thể tải phiên đăng nhập.";
          setError(message);
        }
      } finally {
        if (mounted) {
          setInitializing(false);
        }
      }
    }

    bootstrap();

    const subscription = todoContainer.authRepository.onAuthStateChange(
      (nextUser) => {
        console.log("[Auth] State changed:", nextUser);
        setUser(nextUser);
      },
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const submit = useCallback(async () => {
    if (!email.trim() || !password.trim()) {
      setError("Vui lòng nhập email và mật khẩu.");
      setNotice(null);
      return;
    }

    if (password.trim().length < 6) {
      setError("Mật khẩu cần tối thiểu 6 ký tự.");
      setNotice(null);
      return;
    }

    if (mode === "sign-up" && signupCooldownSeconds > 0) {
      setError(`Vui lòng đợi ${signupCooldownSeconds}s rồi thử đăng ký lại.`);
      setNotice(null);
      return;
    }

    setLoading(true);
    setError(null);
    setNotice(null);

    try {
      if (mode === "sign-in") {
        await todoContainer.signInUseCase.execute(email.trim(), password);
        setNotice(null);
      } else {
        await todoContainer.signUpUseCase.execute(email.trim(), password);
        setMode("sign-in");
        setNotice("Đăng ký thành công! Vui lòng đăng nhập.");
      }

      setPassword("");
    } catch (e) {
      const nextError = e instanceof Error ? e.message : "Có lỗi xác thực.";
      setError(nextError);

      if (mode === "sign-up" && nextError.toLowerCase().includes("qua nhieu")) {
        setSignupCooldownSeconds(60);
      }

      setNotice(null);
    } finally {
      setLoading(false);
    }
  }, [email, mode, password, signupCooldownSeconds]);

  const signOut = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      await todoContainer.signOutUseCase.execute();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Không thể đăng xuất.");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    user,
    email,
    password,
    mode,
    loading,
    initializing,
    error,
    notice,
    signupCooldownSeconds,
    setEmail,
    setPassword,
    setMode,
    setError,
    setNotice,
    submit,
    signOut,
  };
}
