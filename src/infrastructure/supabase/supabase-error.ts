export function mapSupabaseError(error: unknown): Error {
  if (error instanceof Error) {
    const message = error.message.toLowerCase();

    if (message.includes("auth session missing")) {
      return new Error("Bạn chưa đăng nhập.");
    }

    if (
      message.includes("network request failed") ||
      message.includes("failed to fetch")
    ) {
      return new Error(
        "Android khong ket noi duoc Supabase. Kiem tra Internet tren dien thoai, tat VPN/Private DNS, dong bo ngay gio he thong, sau do reload app.",
      );
    }

    if (message.includes("email rate limit exceeded")) {
      return new Error(
        "Ban da gui qua nhieu yeu cau dang ky. Vui long doi it phut roi thu lai.",
      );
    }

    if (message.includes("user already registered")) {
      return new Error(
        "Email nay da duoc dang ky. Hay chuyen sang Dang nhap hoac dat lai mat khau.",
      );
    }

    if (message.includes("email not confirmed")) {
      return new Error(
        "Tai khoan chua xac thuc email. Vui long mo email Supabase va bam link xac thuc.",
      );
    }

    return error;
  }

  return new Error("Da xay ra loi khong xac dinh khi goi Supabase.");
}
