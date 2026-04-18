import type { Todo } from "@/src/domain/entities/todo";
import type { TodoRepository } from "@/src/domain/repositories/todo-repository";
import { supabase } from "@/src/infrastructure/supabase/supabase-client";
import { mapSupabaseError } from "@/src/infrastructure/supabase/supabase-error";

type TodoRow = {
  id: string;
  title: string;
  completed: boolean;
  created_at: string;
};

function mapTodo(row: TodoRow): Todo {
  return {
    id: row.id,
    title: row.title,
    completed: row.completed,
    createdAt: new Date(row.created_at).getTime(),
  };
}

async function requireUserId(): Promise<string> {
  try {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      throw new Error(error.message);
    }

    if (!data.user) {
      throw new Error("Bạn cần đăng nhập để thao tác todo.");
    }

    return data.user.id;
  } catch (error) {
    throw mapSupabaseError(error);
  }
}

export class SupabaseTodoRepository implements TodoRepository {
  async getAll(): Promise<Todo[]> {
    try {
      const userId = await requireUserId();

      const { data, error } = await supabase
        .from("todos")
        .select("id,title,completed,created_at")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) {
        throw new Error(error.message);
      }

      return (data as TodoRow[]).map(mapTodo);
    } catch (error) {
      throw mapSupabaseError(error);
    }
  }

  async add(title: string): Promise<Todo> {
    try {
      const userId = await requireUserId();

      const { data, error } = await supabase
        .from("todos")
        .insert({
          user_id: userId,
          title: title.trim(),
          completed: false,
        })
        .select("id,title,completed,created_at")
        .single();

      if (error || !data) {
        throw new Error(error?.message ?? "Không thể thêm todo.");
      }

      return mapTodo(data as TodoRow);
    } catch (error) {
      throw mapSupabaseError(error);
    }
  }

  async toggle(id: string): Promise<Todo[]> {
    try {
      const userId = await requireUserId();

      const { data: current, error: currentError } = await supabase
        .from("todos")
        .select("completed")
        .eq("id", id)
        .eq("user_id", userId)
        .single();

      if (currentError || !current) {
        throw new Error(currentError?.message ?? "Không tìm thấy todo.");
      }

      const { error } = await supabase
        .from("todos")
        .update({ completed: !current.completed })
        .eq("id", id)
        .eq("user_id", userId);

      if (error) {
        throw new Error(error.message);
      }

      return this.getAll();
    } catch (error) {
      throw mapSupabaseError(error);
    }
  }

  async remove(id: string): Promise<Todo[]> {
    try {
      const userId = await requireUserId();

      const { error } = await supabase
        .from("todos")
        .delete()
        .eq("id", id)
        .eq("user_id", userId);

      if (error) {
        throw new Error(error.message);
      }

      return this.getAll();
    } catch (error) {
      throw mapSupabaseError(error);
    }
  }
}
